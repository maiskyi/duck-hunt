"use client";

import { useMount } from "react-use";
import { Models, useSocketEmit, useSocketEvent } from "@repo/ws-client";
import { Fragment, useRef } from "react";
import { Duck, DuckInstance } from "../Duck";

export const Game = () => {
  const duck = useRef<DuckInstance>(null);

  const { emit } = useSocketEmit();

  useSocketEvent('duck-hunt/game/start', {
    handler: () => {},
  });

  useMount(() => {
    emit("duck-hunt/game/start", [
      new Models.GameStartPayload({
        timestamp: Date.now(),
      }),
    ]);
  });

  return (
    <Fragment>
      <Duck ref={duck} />
    </Fragment>
  );
};
