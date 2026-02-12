import "use-socket-io-react";

declare module "use-socket-io-react" {
  interface ServerToClientEvents {
    chat: (message: string, sentAt: number) => void;
  }

  interface ClientToServerEvents {
    alert: (content: string) => void;
  }
}
