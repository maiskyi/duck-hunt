"use client";

import { useMount } from "react-use";
import { useSocketEmit } from "@repo/ws-client";
import { Fragment, useRef } from "react";
import { Duck, DuckInstance } from "../Duck";

export const Game = () => {
  const duck = useRef<DuckInstance>(null);
  
  const { emit } = useSocketEmit();

  useMount(() => {
    emit("duck-hunt/game/start", [
      {
        timestamp: Date.now(),
      },
    ]);
  });

  return (
    <Fragment>
      <Duck ref={duck} />
    </Fragment>
  );
};
