import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GAME_CONFIG, randInt } from './game.config';
import {
  RoundState,
  RoundStartPayload,
  RoundEndPayload,
  HitConfirmedPayload,
  HitRejectedPayload,
} from './game.types';

@Injectable()
export class GameService {
  private readonly logger = new Logger(GameService.name);

  private currentRound: RoundState | null = null;

  private nextRoundTimer: NodeJS.Timeout | null = null;
  private endRoundTimer: NodeJS.Timeout | null = null;

  /**
   * Hook for the gateway to subscribe and broadcast.
   */
  private emitRoundStart: ((payload: RoundStartPayload) => void) | null = null;
  private emitRoundEnd: ((payload: RoundEndPayload) => void) | null = null;
  private emitHitConfirmed: ((payload: HitConfirmedPayload) => void) | null =
    null;
  private emitHitRejected: ((payload: HitRejectedPayload) => void) | null =
    null;

  bindEmitters(emitters: {
    roundStart: (p: RoundStartPayload) => void;
    roundEnd: (p: RoundEndPayload) => void;
    hitConfirmed: (p: HitConfirmedPayload) => void;
    hitRejected: (p: HitRejectedPayload) => void;
  }) {
    this.emitRoundStart = emitters.roundStart;
    this.emitRoundEnd = emitters.roundEnd;
    this.emitHitConfirmed = emitters.hitConfirmed;
    this.emitHitRejected = emitters.hitRejected;
  }

  startAutoLoop() {
    // Start immediately, then schedule next rounds with jitter.
    this.clearAllTimers();
    this.startRoundNow();
  }

  stopAutoLoop() {
    this.clearAllTimers();
    this.currentRound = null;
  }

  onClientConnected() {
    // Optional: send the current round if active, so late joiners see it.
    if (!this.currentRound || this.currentRound.ended) return;
    const payload: RoundStartPayload = {
      roundId: this.currentRound.roundId,
      startedAt: this.currentRound.startedAt,
      flightDurationMs: GAME_CONFIG.flightDurationMs,
      showAfterHitMs: GAME_CONFIG.showAfterHitMs,
      duck: this.currentRound.duck,
    };
    this.emitRoundStart?.(payload);
  }

  handleHit(roundId: string): HitConfirmedPayload | HitRejectedPayload {
    const now = Date.now();

    if (!this.currentRound) {
      return { roundId, reason: 'no_active_round' };
    }
    if (this.currentRound.roundId !== roundId) {
      // Either old roundId or client is out-of-sync
      return { roundId, reason: 'no_active_round' };
    }
    if (this.currentRound.ended) {
      return { roundId, reason: 'already_ended' };
    }
    if (now > this.currentRound.endsAt) {
      return { roundId, reason: 'late' };
    }

    // Confirm hit
    this.endRound('hit');
    return { roundId, hitAt: now };
  }

  // ---------------------- internal ----------------------

  private startRoundNow() {
    const roundId = uuidv4();
    const startedAt = Date.now();
    const endsAt = startedAt + GAME_CONFIG.flightDurationMs;

    const duck = this.generateDuckPath();

    this.currentRound = {
      roundId,
      startedAt,
      endsAt,
      ended: false,
      duck,
    };

    const payload: RoundStartPayload = {
      roundId,
      startedAt,
      flightDurationMs: GAME_CONFIG.flightDurationMs,
      showAfterHitMs: GAME_CONFIG.showAfterHitMs,
      duck,
    };

    this.logger.log(`Round started: ${roundId}`);
    this.emitRoundStart?.(payload);

    // End on timeout
    this.endRoundTimer = setTimeout(() => {
      // If already ended by hit, ignore.
      if (!this.currentRound || this.currentRound.roundId !== roundId) return;
      if (this.currentRound.ended) return;
      this.endRound('timeout');
    }, GAME_CONFIG.flightDurationMs);

    // Schedule next round after jitter delay from now (or from end — either is ok).
    const delay = randInt(
      GAME_CONFIG.nextRoundMinDelayMs,
      GAME_CONFIG.nextRoundMaxDelayMs,
    );
    this.nextRoundTimer = setTimeout(() => this.startRoundNow(), delay);
  }

  private endRound(reason: 'hit' | 'timeout') {
    if (!this.currentRound || this.currentRound.ended) return;

    const roundId = this.currentRound.roundId;
    this.currentRound.ended = true;
    this.currentRound.endedReason = reason;

    // Stop timeout timer (if we ended early by hit)
    if (this.endRoundTimer) {
      clearTimeout(this.endRoundTimer);
      this.endRoundTimer = null;
    }

    this.logger.log(`Round ended: ${roundId} (${reason})`);
    this.emitRoundEnd?.({ roundId, reason });
  }

  private generateDuckPath() {
    const { width, height, padding } = GAME_CONFIG.area;

    const preset =
      GAME_CONFIG.presets[randInt(0, GAME_CONFIG.presets.length - 1)];
    const y = randInt(padding, height - padding);

    const startX = preset.direction === 'L2R' ? -padding : width + padding;
    const endX = preset.direction === 'L2R' ? width + padding : -padding;

    // diagonal is applied to endY, clamped
    const endYRaw = y + preset.diagonal;
    const endY = Math.max(padding, Math.min(height - padding, endYRaw));

    return {
      start: { x: startX, y },
      end: { x: endX, y: endY },
      presetId: preset.id,
      direction: preset.direction,
      speedMs: GAME_CONFIG.flightDurationMs,
    };
  }

  private clearAllTimers() {
    if (this.nextRoundTimer) clearTimeout(this.nextRoundTimer);
    if (this.endRoundTimer) clearTimeout(this.endRoundTimer);
    this.nextRoundTimer = null;
    this.endRoundTimer = null;
  }
}
