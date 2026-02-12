export type Direction = 'L2R' | 'R2L';

export type RoundReason = 'hit' | 'timeout';

export interface DuckPath {
  start: { x: number; y: number };
  end: { x: number; y: number };
  presetId: string;
  direction: Direction;
  speedMs: number; // flight duration
}

export interface RoundState {
  roundId: string;
  startedAt: number;        // epoch ms
  endsAt: number;           // epoch ms
  ended: boolean;
  endedReason?: RoundReason;
  duck: DuckPath;
}

export interface RoundStartPayload {
  roundId: string;
  startedAt: number;
  flightDurationMs: number;
  showAfterHitMs: number;
  duck: DuckPath;
}

export interface RoundEndPayload {
  roundId: string;
  reason: RoundReason;
}

export interface HitConfirmedPayload {
  roundId: string;
  hitAt: number;
}

export interface HitRejectedPayload {
  roundId: string;
  reason: 'no_active_round' | 'already_ended' | 'late';
}
