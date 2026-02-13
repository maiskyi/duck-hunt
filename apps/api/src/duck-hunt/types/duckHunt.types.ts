export enum DuckHuntTopic {
  GameStart = 'duck-hunt/game/start',
  RoundStart = 'duck-hunt/round/start',
  RoundEnd = 'duck-hunt/round/end',
}

export enum DuckHuntPathDirection {
  Left2Right = 'left2Right',
  Right2Left = 'right2Left',
}

export enum DuckHuntRoundEndReason {
  Hit = 'hit',
  Timeout = 'timeout',
}

export interface DuckHuntPathCoordinates {
  x: number;
  y: number;
}

export interface DuckHuntRoundPath {
  start: DuckHuntPathCoordinates;
  end: DuckHuntPathCoordinates;
  direction: DuckHuntPathDirection;
  speed: number;
}

export interface DuckHuntRound {
  roundId: string;
  startedAt: number;
  endsAt: number;
  ended: boolean;
  endedReason?: DuckHuntRoundEndReason;
  path: DuckHuntRoundPath;
}