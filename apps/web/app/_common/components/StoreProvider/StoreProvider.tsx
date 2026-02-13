"use client";

import { FC, PropsWithChildren } from "react";
import { Provider, ProviderProps } from "react-redux";


type StoreProviderProps = PropsWithChildren<ProviderProps>;

export const StoreProvider: FC<StoreProviderProps> = ({ children, ...props }) => {
  return <Provider {...props}>{children}</Provider>;
};
