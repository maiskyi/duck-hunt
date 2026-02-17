import "use-socket-io-react";
import { RoundStartedEndedMessage } from "./models/RoundStartedEndedMessage";
import { GameStatsMessage } from "./models/GameStatsMessage";
import { HitConfirmedRejectedMessage } from "./models/HitConfirmedRejectedMessage";
import { GameStartPayload } from "./models/GameStartPayload";
import { DuckHitPayload } from "./models/DuckHitPayload";

declare module "use-socket-io-react" {
  interface ServerToClientEvents {
    "duck-hunt/round/start": (message: RoundStartedEndedMessage) => void;
    "duck-hunt/round/end": (message: RoundStartedEndedMessage) => void;
    "duck-hunt/game/stats": (message: GameStatsMessage) => void;
    "duck-hunt/hit/confirmed": (message: HitConfirmedRejectedMessage) => void;
    "duck-hunt/hit/rejected": (message: HitConfirmedRejectedMessage) => void;
  }

  interface ClientToServerEvents {
    "duck-hunt/game/start": (payload: GameStartPayload) => void;
    "duck-hunt/duck/hit": (payload: DuckHitPayload) => void;
  }
}
