import "use-socket-io-react";
import { GameStartPayload } from "./__generated__/models/GameStartPayload";

declare module "use-socket-io-react" {
  interface ServerToClientEvents {}

  interface ClientToServerEvents {
    "duck-hunt/game/start": Array<GameStartPayload>;
  }
}
