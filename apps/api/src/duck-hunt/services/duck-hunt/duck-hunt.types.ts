import { DuckHuntPathDirection, DuckHuntRoundEndReason } from '../../types';

export interface DuckPathCoordinates {
  x: number;
  y: number;
}

export interface DuckPath {
  start: DuckPathCoordinates;
  end: DuckPathCoordinates;
  direction: DuckHuntPathDirection;
  speed: number;
}

export interface RoundState {
  roundId: string;
  startedAt: number;
  endsAt: number;
  ended: boolean;
  endedReason?: DuckHuntRoundEndReason;
  path: DuckPath;
}

export interface SessionState {
  clientId: string;
  currentRound: RoundState | null;
  nextRoundTimer: NodeJS.Timeout | null;
  endRoundTimer: NodeJS.Timeout | null;
  rounds: number;
  hits: number;
}

export interface CreateSessionParams {
  clientId: string;
}

export interface RemoveSessionParams {
  clientId: string;
}

export interface StartRoundParams {
  clientId: string;
  onStart?: (round: RoundState) => void;
}

export interface ClearTimersParams {
  clientId: string;
}

export interface EndRoundParams {
  clientId: string;
  reason: DuckHuntRoundEndReason;
}

export interface ScheduleNextRoundParams {
  clientId: string;
}
