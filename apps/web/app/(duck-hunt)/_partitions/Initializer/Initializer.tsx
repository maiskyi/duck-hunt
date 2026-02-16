"use client";

import { FC, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@common/store";

import { Banner } from "../Banner";

export const Initializer: FC<PropsWithChildren> = ({ children }) => {
  const isReady = useSelector((state: RootState) => state.duckHunt.isReady);

  if (!isReady) {
    return <Banner>Loading...</Banner>;
  }

  return <>{children}</>;
};
