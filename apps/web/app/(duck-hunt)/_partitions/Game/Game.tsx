"use client";

import { useMount } from "react-use";
import { useSocketEmit, useSocketEvent } from "@repo/ws-client";
import { Fragment, useCallback, useRef } from "react";
import { Duck, DuckInstance } from "../Duck";
import { OnRoundStartedHandler } from "./Game.types";

export const Game = () => {
  const duck = useRef<DuckInstance>(null);

  const { emit } = useSocketEmit();

  const handleOnRoundStarted: OnRoundStartedHandler = useCallback(
    ([{ roundId, path }]) => {
      console.log(roundId, path);
    },
    [],
  );

  useSocketEvent("duck-hunt/round/start", {
    handler: handleOnRoundStarted,
  });

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
