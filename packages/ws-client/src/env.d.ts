import "use-socket-io-react";
import { GameStartPayload } from "./__generated__/models/GameStartPayload";

declare module "use-socket-io-react" {
  interface ServerToClientEvents {
    "duck-hunt/game/start": (payload: GameStartPayload) => void;
  }

  interface ClientToServerEvents {
    "duck-hunt/game/start": (payload: GameStartPayload) => void;
  }
}
