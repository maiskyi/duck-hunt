// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./__generated__/events.d.ts" />

// Components
export * from "./components/WsClientProvider";

// Models
export * as Models from "./models";

// Hooks
export * from "./hooks";

// Types
export type {
  EventHandler,
  ServerToClientEvents,
  ClientToServerEvents,
} from "use-socket-io-react";
