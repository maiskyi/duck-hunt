
interface GameStatsMessage {
  rounds: number;
  hits: number;
  additionalProperties?: Map<string, any>;
}
export type { GameStatsMessage };