import { Models } from "@repo/ws-client";

interface DuckInstanceFlyHandlerParams {
  path: Models.RoundStartedMessagePath;
}

type DuckInstanceFlyHandler = (params: DuckInstanceFlyHandlerParams) => void;

export interface DuckInstance {
  fly: DuckInstanceFlyHandler;
}
