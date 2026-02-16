"use client";

import { FC, PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@common/store";
import { useMount } from "react-use";

import { setIsReady } from "../../_slice/duckHunt.slice";
import { Banner } from "../Banner";

export const Initializer: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  
  const isReady = useSelector((state: RootState) => state.duckHunt.isReady);

  useMount(() => {
    dispatch(setIsReady(true));
  });

  if (!isReady) {
    return <Banner>Loading...</Banner>;
  }

  return <>{children}</>;
};
