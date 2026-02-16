import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { random } from 'lodash';

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
} from './duckHuntGame.const';
import {
  ClearTimersParams,
  CreateSessionParams,
  EndRoundParams,
  RemoveSessionParams,
  ScheduleNextRoundParams,
  SessionState,
  StartGameParams,
  StartRoundParams,
} from './duckHuntGame.types';

@Injectable()
export class DuckHuntGameService {
  private sessions: Map<string, SessionState> = new Map();

  private logger = new Logger(DuckHuntGameService.name, {
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

  public start({ clientId, onRoundStart, onRoundEnd }: StartGameParams) {
    const session = this.sessions.get(clientId);
    if (!session) return;

    this.startRound({ clientId, onRoundStart, onRoundEnd });
  }

  private startRound({ clientId, onRoundStart, onRoundEnd }: StartRoundParams) {
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

    onRoundStart?.({
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
        onRoundEnd,
      });
      this.scheduleNextRound({
        clientId,
        onRoundStart,
        onRoundEnd,
      });
    }, FLIGHT_DURATION_MS);
  }

  private endRound({ clientId, reason, onRoundEnd }: EndRoundParams) {
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

    onRoundEnd?.({
      clientId,
      round,
      rounds: session.rounds,
      hits: session.hits,
    });

    this.logger.log(
      `Round ended for ${clientId}: ${round.roundId} (${reason})`,
    );
  }

  private scheduleNextRound({
    clientId,
    onRoundStart,
    onRoundEnd,
  }: ScheduleNextRoundParams) {
    const session = this.sessions.get(clientId);
    if (!session) return;

    const delay = random(NEXT_ROUND_MIN_DELAY_MS, NEXT_ROUND_MAX_DELAY_MS);

    session.nextRoundTimer = setTimeout(() => {
      this.startRound({ clientId, onRoundStart, onRoundEnd });
    }, delay);
  }
}
