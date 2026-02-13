import {
  DuckHuntRoundEndReason,
  DuckHuntRound,
  DuckHuntRoundPath,
} from '../../types';

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

interface OnRoundStartedCallbackParams {
  clientId: string;
  round: DuckHuntRound;
}

type OnRoundStartedCallback = (
  params: OnRoundStartedCallbackParams,
) => void;

export interface StartRoundParams {
  clientId: string;
  onStarted?: OnRoundStartedCallback;
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
