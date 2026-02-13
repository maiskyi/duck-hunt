export enum DuckPathDirection {
  Left2Right = 'left2Right',
  Right2Left = 'right2Left',
}

export enum RoundEndReason {
  DuckHit = 'duckHit',
  RoundTimeout = 'roundTimeout',
}

export interface DuckPathCoordinates {
  x: number;
  y: number;
}

export interface DuckPath {
  start: DuckPathCoordinates;
  end: DuckPathCoordinates;
  presetId: string;
  direction: DuckPathDirection;
  speedMs: number;
}

export interface RoundState {
  roundId: string;
  startedAt: number;
  endsAt: number;
  ended: boolean;
  endedReason?: RoundEndReason;
  duck: DuckPath;
}

export interface SessionState {
  socketId: string;
  currentRound: RoundState | null;
  nextRoundTimer: NodeJS.Timeout | null;
  endRoundTimer: NodeJS.Timeout | null;
  rounds: number;
  hits: number;
}
