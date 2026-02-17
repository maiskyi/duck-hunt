import { DuckHuntRoundEndReason, DuckHuntRound } from '../../types';

export interface SessionState {
  clientId: string;
  currentRound: DuckHuntRound | null;
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

interface OnRoundStartEndParams {
  clientId: string;
  round: DuckHuntRound;
  rounds: number;
  hits: number;
}

export type OnRoundStartEndHandler= (
  params: OnRoundStartEndParams,
) => void;

export interface BindHandlersParams {
  onRoundStart?: OnRoundStartEndHandler;
  onRoundEnd?: OnRoundStartEndHandler;
}

export interface StartRoundParams {
  clientId: string;
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

export interface StartGameParams {
  clientId: string;
}

export interface HitParams {
  clientId: string;
  roundId: string;
}
