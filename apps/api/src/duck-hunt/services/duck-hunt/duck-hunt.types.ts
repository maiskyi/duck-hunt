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

interface OnRoundStartedEndedCallbackParams {
  clientId: string;
  round: DuckHuntRound;
  rounds: number;
  hits: number;
}

type OnRoundStartedEndedCallback = (params: OnRoundStartedEndedCallbackParams) => void;

export interface StartRoundParams {
  clientId: string;
  onRoundStart?: OnRoundStartedEndedCallback;
  onRoundEnd?: OnRoundStartedEndedCallback;
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
  onRoundStart?: OnRoundStartedEndedCallback;
}
