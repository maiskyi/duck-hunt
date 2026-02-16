"use client";

import { FC, PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@common/store";
import { useMount } from "react-use";

import { setIsReady } from "../../_slice/duckHunt.slice";
import { Sounds } from "../../_services/sounds";
import { Loader } from "../Loader";

export const Initializer: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();

  const isReady = useSelector((state: RootState) => state.duckHunt.isReady);

  useMount(() => {
    Sounds.init().then(() => {
      dispatch(setIsReady(true));
    });
  });

  if (!isReady) return <Loader />;

  return <>{children}</>;
};
