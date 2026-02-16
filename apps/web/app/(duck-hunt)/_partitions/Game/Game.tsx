"use client";

import { useMount } from "react-use";
import { useSocketEmit, useSocketEvent } from "@repo/ws-client";
import { Fragment, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

import { setStats } from "../../_slice";
import { Duck, DuckInstance } from "../Duck";
import { Banner, BannerInstance, BannerVariant } from "../Banner";

import { OnGameStatsHandler, OnRoundEndedHandler, OnRoundStartedHandler } from "./Game.types";

export const Game = () => {
  const dispatch = useDispatch();
  const duck = useRef<DuckInstance>(null);
  const banner = useRef<BannerInstance>(null);

  const { emit } = useSocketEmit();

  const handleOnDuckClick = useCallback(() => {
    banner.current?.show({
      variant: BannerVariant.Warning,
      message: "Duck clicked",
      duration: 3000,
    });
  }, []);

  const handleOnRoundStarted: OnRoundStartedHandler = useCallback(
    ([{ roundId, path }]) => {
      duck.current?.start({ roundId, path });
    },
    [],
  );

  const handleOnRoundEnded: OnRoundEndedHandler = useCallback(([{ roundId, path }]) => {
    duck.current?.end({ roundId, path });
  }, []);

  const handleOnGameStats: OnGameStatsHandler = useCallback(([{ rounds, hits }]) => {
    dispatch(setStats({ rounds, hits }));
  }, [dispatch]);

  useSocketEvent("duck-hunt/round/start", {
    handler: handleOnRoundStarted,
  });

  useSocketEvent("duck-hunt/round/end", {
    handler: handleOnRoundEnded,
  });

  useSocketEvent("duck-hunt/game/stats", {
    handler: handleOnGameStats,
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
      <Banner ref={banner} />
      <Duck ref={duck} onClick={handleOnDuckClick} />
    </Fragment>
  );
};
