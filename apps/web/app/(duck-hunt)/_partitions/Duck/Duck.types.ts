import { Models } from "@repo/ws-client";

export enum DuckInstanceTexture {
  A = 0,
  B = 1,
  Dead = 2,
}

export enum DuckInstanceStatus {
  Flying = "flying",
  Hit = "hit",
}

export interface DuckInstanceStartHandlerParams {
  roundId: string;
  path: Models.RoundMessagePath;
}

export interface DuckInstanceEndHandlerParams {
  roundId: string;
  path: Models.RoundMessagePath;
}

export type DuckInstanceStartHandler = (
  params: DuckInstanceStartHandlerParams,
) => void;

export type DuckInstanceEndHandler = (
  params: DuckInstanceEndHandlerParams,
) => void;

export type DuckInstanceMoveHandler = (
  params: DuckInstanceMoveHandlerParams,
) => void;

export interface DuckInstanceMoveHandlerParams {
  roundId: string;
  path: Models.RoundMessagePath;
}

export interface DuckInstance {
  start: DuckInstanceStartHandler;
  end: DuckInstanceEndHandler;
}

export interface DuckState {
  roundId: string;
  x: number;
  y: number;
  texture: DuckInstanceTexture;
  status: DuckInstanceStatus;
  direction: Models.RoundMessagePathDirection;
}

export interface DuckOnClickHandlerParams {
  roundId: string;
}

export type DuckOnClickHandler = (
  params: DuckOnClickHandlerParams,
) => void;
