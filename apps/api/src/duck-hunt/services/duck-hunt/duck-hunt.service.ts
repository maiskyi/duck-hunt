import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import {
  ClearTimersParams,
  CreateSessionParams,
  EndRoundParams,
  RemoveSessionParams,
  ScheduleNextRoundParams,
  SessionState,
  StartRoundParams,
} from './duck-hunt.types';
import {
  FLIGHT_DURATION_MS,
  SHOW_AFTER_HIT_MS,
  NEXT_ROUND_MIN_DELAY_MS,
  NEXT_ROUND_MAX_DELAY_MS,
} from './duck-hunt.const';
import { random } from 'lodash';
import { RoundEndPayload } from '../game/game.types';
import { DuckHuntPathDirection, DuckHuntRound, DuckHuntRoundEndReason, DuckHuntRoundPath } from '../../types';

@Injectable()
export class DuckHuntService {
  private sessions: Map<string, SessionState> = new Map();

  private logger = new Logger(DuckHuntService.name, {
    timestamp: true,
  });

  private clearTimers({ clientId }: ClearTimersParams) {
    const session = this.sessions.get(clientId);
    if (!session) return;

    if (session.nextRoundTimer) clearTimeout(session.nextRoundTimer);
    if (session.endRoundTimer) clearTimeout(session.endRoundTimer);

    session.nextRoundTimer = null;
    session.endRoundTimer = null;

    this.logger.log(`Timers cleared for ${clientId}`);
  }

  private genRoundPath(): DuckHuntRoundPath {
    const direction = random(0, 1)
      ? DuckHuntPathDirection.Left2Right
      : DuckHuntPathDirection.Right2Left;

    return {
      direction,
      start: {
        x: direction === DuckHuntPathDirection.Left2Right ? 0 : 100,
        y: random(0, 100),
      },
      end: {
        x: direction === DuckHuntPathDirection.Left2Right ? 100 : 0,
        y: random(0, 100),
      },
      speed: FLIGHT_DURATION_MS,
    };
  }

  public createSession({ clientId }: CreateSessionParams) {
    const existing = this.sessions.get(clientId);
    if (existing) return;

    this.sessions.set(clientId, {
      clientId,
      currentRound: null,
      nextRoundTimer: null,
      endRoundTimer: null,
      rounds: 0,
      hits: 0,
    });

    this.logger.log(`Session created: ${clientId}`);
  }

  public removeSession({ clientId }: RemoveSessionParams) {
    const session = this.sessions.get(clientId);
    if (!session) return;

    this.clearTimers({ clientId });
    this.sessions.delete(clientId);
    this.logger.log(`Session removed: ${clientId}`);
  }

  public startRound({ clientId, onStarted }: StartRoundParams) {
    const session = this.sessions.get(clientId);
    if (!session) return;

    // cancel pending timers to avoid overlap
    this.clearTimers(session);

    const roundId = uuid();
    const startedAt = Date.now();
    const endsAt = startedAt + FLIGHT_DURATION_MS;

    const path = this.genRoundPath();

    const round: DuckHuntRound = {
      roundId,
      startedAt,
      endsAt,
      ended: false,
      path,
    };

    session.currentRound = round;
    session.rounds += 1;

    onStarted?.({ clientId, round });

    // const startPayload: RoundStartPayload = {
    //   roundId,
    //   startedAt,
    //   flightDurationMs: FLIGHT_DURATION_MS,
    //   showAfterHitMs: SHOW_AFTER_HIT_MS,
    //   path,
    // };

    this.logger.log(`Round started for ${clientId}: ${roundId}`);

    // this.emitToClient?.(socketId, 'round:start', startPayload);
    // this.emitToClient?.(socketId, 'stats', { rounds: s.rounds, hits: s.hits });

    // End on timeout
    session.endRoundTimer = setTimeout(() => {
      const session = this.sessions.get(clientId);
      if (!session?.currentRound) return;
      if (session.currentRound.roundId !== roundId) return;
      if (session.currentRound.ended) return;
      this.endRound({
        clientId,
        reason: DuckHuntRoundEndReason.Timeout,
      });
      this.scheduleNextRound({ clientId });
    }, FLIGHT_DURATION_MS);
  }

  private endRound({ clientId, reason }: EndRoundParams) {
    const session = this.sessions.get(clientId);
    if (!session?.currentRound) return;

    const round = session.currentRound;
    if (round.ended) return;

    round.ended = true;
    round.endedReason = reason;

    if (session.endRoundTimer) {
      clearTimeout(session.endRoundTimer);
      session.endRoundTimer = null;
    }

    // const endPayload: RoundEndPayload = { roundId: round.roundId, reason };

    this.logger.log(
      `Round ended for ${clientId}: ${round.roundId} (${reason})`,
    );

    // this.emitToClient?.(socketId, 'round:end', endPayload);
    // this.emitToClient?.(socketId, 'stats', { rounds: s.rounds, hits: s.hits });
  }

  private scheduleNextRound({ clientId }: ScheduleNextRoundParams) {
    const session = this.sessions.get(clientId);
    if (!session) return;

    const delay = random(NEXT_ROUND_MIN_DELAY_MS, NEXT_ROUND_MAX_DELAY_MS);

    session.nextRoundTimer = setTimeout(() => {
      this.startRound({ clientId });
    }, delay);
  }
}
