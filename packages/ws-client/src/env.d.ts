import "use-socket-io-react";
import { GameStartPayload } from "./__generated__/models/GameStartPayload";
import { RoundStartedEndedMessage } from "./__generated__/models/RoundStartedEndedMessage";
import { GameStatsMessage } from "./__generated__/models/GameStatsMessage";
import { HitConfirmedRejectedMessage } from "./__generated__/models/HitConfirmedRejectedMessage";
import { DuckHitPayload } from "./__generated__/models/DuckHitPayload";

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
