import { EventHandler } from "@repo/ws-client";

export type OnRoundStartedHandler = EventHandler<"duck-hunt/round/start">;

export type OnRoundEndedHandler = EventHandler<"duck-hunt/round/end">;