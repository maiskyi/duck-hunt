import "use-socket-io-react";
import { GameStartPayload } from "./__generated__/models/GameStartPayload";
import { RoundStartedEndedMessage } from "./__generated__/models/RoundStartedEndedMessage";

declare module "use-socket-io-react" {
  interface ServerToClientEvents {
    "duck-hunt/round/start": (message: RoundStartedEndedMessage) => void;
    "duck-hunt/round/end": (message: RoundStartedEndedMessage) => void;
  }

  interface ClientToServerEvents {
    "duck-hunt/game/start": (payload: GameStartPayload) => void;
  }
}
