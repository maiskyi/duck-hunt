import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { noop, random } from 'lodash';

import {
  DuckHuntPathDirection,
  DuckHuntRound,
  DuckHuntRoundEndReason,
  DuckHuntRoundPath,
} from '../../types';

import {
  FLIGHT_DURATION_MS,
  NEXT_ROUND_MIN_DELAY_MS,
  NEXT_ROUND_MAX_DELAY_MS,
} from './duckHunt.const';
import {
  BindHandlersParams,
  ClearTimersParams,
  CreateSessionParams,
  EndRoundParams,
  HitParams,
  RemoveSessionParams,
  ScheduleNextRoundParams,
  SessionState,
  StartGameParams,
  StartRoundParams,
  OnRoundStartEndHandler,
} from './duckHunt.types';

@Injectable()
export class DuckHuntService {
  private sessions: Map<string, SessionState> = new Map();

  private logger = new Logger(DuckHuntService.name, {
    timestamp: true,
  });

  private onRoundStart: OnRoundStartEndHandler = noop;

  private onRoundEnd: OnRoundStartEndHandler = noop;

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

  private startRound({ clientId }: StartRoundParams) {
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

    this.logger.log(`Round started for ${clientId}: ${roundId}`);

    this.onRoundStart({
      clientId,
      round,
      rounds: session.rounds,
      hits: session.hits,
    });

    session.endRoundTimer = setTimeout(() => {
      const session = this.sessions.get(clientId);
      if (!session?.currentRound) return;
      if (session.currentRound.roundId !== roundId) return;
      if (session.currentRound.ended) return;
      this.endRound({
        clientId,
        reason: DuckHuntRoundEndReason.Timeout,
      });
      this.scheduleNextRound({
        clientId,
      });
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

    this.onRoundEnd({
      clientId,
      round,
      rounds: session.rounds,
      hits: session.hits,
    });

    this.logger.log(
      `Round ended for ${clientId}: ${round.roundId} (${reason})`,
    );
  }

  private scheduleNextRound({ clientId }: ScheduleNextRoundParams) {
    const session = this.sessions.get(clientId);
    if (!session) return;

    const delay = random(NEXT_ROUND_MIN_DELAY_MS, NEXT_ROUND_MAX_DELAY_MS);

    session.nextRoundTimer = setTimeout(() => {
      this.startRound({
        clientId,
      });
    }, delay);
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

  public start({ clientId }: StartGameParams) {
    const session = this.sessions.get(clientId);
    if (!session) return;
    if (session.currentRound) return;

    this.startRound({
      clientId,
    });
  }

  public removeSession({ clientId }: RemoveSessionParams) {
    const session = this.sessions.get(clientId);
    if (!session) return;

    this.clearTimers({ clientId });
    this.sessions.delete(clientId);
    this.logger.log(`Session removed: ${clientId}`);
  }

  public hit({ clientId, roundId }: HitParams) {
    const session = this.sessions.get(clientId);
    const now = Date.now();

    if (!session || !session.currentRound) {
      return {
        roundId,
        reason: DuckHuntRoundEndReason.NoActiveRound,
      };
    }

    const round = session.currentRound;

    if (round.roundId !== roundId) {
      return {
        roundId,
        reason: DuckHuntRoundEndReason.NoActiveRound,
      };
    }
    if (round.ended) {
      return {
        roundId,
        reason: DuckHuntRoundEndReason.AlreadyEnded,
      };
    }
    if (now > round.endsAt) {
      return {
        roundId,
        reason: DuckHuntRoundEndReason.Late,
      };
    }

    session.hits += 1;

    this.endRound({
      clientId,
      reason: DuckHuntRoundEndReason.Hit,
    });

    this.scheduleNextRound({
      clientId,
    });

    return {
      roundId,
      reason: DuckHuntRoundEndReason.Hit,
      hits: session.hits,
    };
  }

  public bindHandlers({ onRoundStart, onRoundEnd }: BindHandlersParams) {
    this.onRoundStart = onRoundStart ?? this.onRoundStart;
    this.onRoundEnd = onRoundEnd ?? this.onRoundEnd;
  }
}
