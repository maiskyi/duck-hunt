import { EventHandler } from "@repo/ws-client";

export type OnRoundStartedHandler = EventHandler<"duck-hunt/round/started">;