"use client";

import { FC, PropsWithChildren } from "react";
import { SocketProvider } from "use-socket-io-react";

type WsClientProviderProps = PropsWithChildren<{
  uri: string;
}>;

export const WsClientProvider: FC<WsClientProviderProps> = ({
  children,
  uri,
}) => {
  return <SocketProvider uri={uri}>{children}</SocketProvider>;
};
