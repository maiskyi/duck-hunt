import { DuckHuntRound } from '../../types';

export interface RoundStartEndParams {
  clientId: string;
  round: DuckHuntRound;
}

export interface GameStatsParams {
  clientId: string;
  rounds: number;
  hits: number;
}
