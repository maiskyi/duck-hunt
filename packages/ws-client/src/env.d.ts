import "use-socket-io-react";
import { GameStartPayload } from "./__generated__/models/GameStartPayload";
import { RoundStartedMessage } from "./__generated__/models/RoundStartedMessage";

declare module "use-socket-io-react" {
  interface ServerToClientEvents {
    "duck-hunt/round/start": (message: RoundStartedMessage) => void;
  }

  interface ClientToServerEvents {
    "duck-hunt/game/start": (payload: GameStartPayload) => void;
  }
}
