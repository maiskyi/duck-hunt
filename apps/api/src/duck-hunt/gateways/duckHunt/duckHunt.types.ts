import { DuckHuntRound, DuckHuntRoundEndReason } from '../../types';

export interface RoundStartEndParams {
  clientId: string;
  round: DuckHuntRound;
}

export interface GameStatsParams {
  clientId: string;
  rounds: number;
  hits: number;
}

export interface HitConfirmedRejectedParams {
  clientId: string;
  roundId: string;
  reason: DuckHuntRoundEndReason;
}
