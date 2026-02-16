"use client";

import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { Models } from "@repo/ws-client";

import styles from "../../page.module.scss";
import { Sounds } from "../../_services/sounds";

import {
  DuckInstance,
  DuckInstanceEndHandler,
  DuckInstanceMoveHandler,
  DuckInstanceStartHandler,
  DuckInstanceStatus,
  DuckInstanceTexture,
  DuckOnClickHandler,
  DuckState,
} from "./Duck.types";
import { DUCK_TEXTURE_FRAMES } from "./Duck.const";

interface DuckProps {
  onClick: DuckOnClickHandler;
}

export const DuckForwardRefExoticComponent = forwardRef<
  DuckInstance,
  DuckProps
>(function DuckForwardRefExoticComponent({ onClick }, ref) {
  const [state, setState] = useState<DuckState | null>(null);
  const stateRef = useRef<DuckState | null>(null);
  const moveRafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const textureIntervalRef = useRef<NodeJS.Timeout | null>(null);

  stateRef.current = state;

  const move: DuckInstanceMoveHandler = useCallback(
    ({
      path: {
        speed,
        start: { x: startX, y: startY },
        end: { x: endX, y: endY },
      },
    }) => {
      lastTimeRef.current = null;
      moveRafRef.current = requestAnimationFrame(function step(timestamp) {
        if (stateRef.current?.status !== DuckInstanceStatus.Flying) return;

        if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
        const elapsed = timestamp - lastTimeRef.current;
        const progress = Math.min(1, elapsed / speed);
        const x = startX + progress * (endX - startX);
        const y = startY + progress * (endY - startY);

        setState((prev) => {
          if (!prev) return null;
          return { ...prev, x, y };
        });

        moveRafRef.current = requestAnimationFrame(step);
      });
    },
    [],
  );

  const start: DuckInstanceStartHandler = useCallback(
    ({ path, roundId }) => {
      console.log("start", { path, roundId });
      if (stateRef.current?.status === DuckInstanceStatus.Flying) return;

      setState(() => ({
        roundId,
        texture: DuckInstanceTexture.A,
        status: DuckInstanceStatus.Flying,
        direction: path.direction,
        x: path.start.x,
        y: path.start.y,
      }));

      Sounds.play("quack");

      textureIntervalRef.current = setInterval(() => {
        setState((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            texture:
              prev.texture === DuckInstanceTexture.A
                ? DuckInstanceTexture.B
                : DuckInstanceTexture.A,
          };
        });
      }, 250);
      move({ path, roundId });
    },
    [move],
  );

  const end: DuckInstanceEndHandler = useCallback(({ roundId, path }) => {
    console.log("end", { path, roundId });
    if (stateRef.current?.status !== DuckInstanceStatus.Flying) return;
    if (textureIntervalRef.current) {
      clearInterval(textureIntervalRef.current);
      textureIntervalRef.current = null;
    }
    if (moveRafRef.current) {
      cancelAnimationFrame(moveRafRef.current);
      moveRafRef.current = null;
    }
    Sounds.stop("quack");
    setState(() => null);
  }, []);

  const handleOnClick = useCallback(() => {
    if (stateRef.current?.status !== DuckInstanceStatus.Flying) return;
    if (textureIntervalRef.current) {
      clearInterval(textureIntervalRef.current);
      textureIntervalRef.current = null;
    }
    if (moveRafRef.current) {
      cancelAnimationFrame(moveRafRef.current);
      moveRafRef.current = null;
    }
    Sounds.stop("quack");
    Sounds.play("awp");
    setState((prev) => {
      if (!prev) return null;
      return { ...prev, status: DuckInstanceStatus.Hit };
    });
    setTimeout(() => {
      setState(() => null);
    }, 3000);
    onClick({ roundId: stateRef.current?.roundId });
  }, [onClick]);

  useImperativeHandle(ref, () => ({
    start,
    end,
  }));

  if (!state) return null;

  const Component = DUCK_TEXTURE_FRAMES[state.texture];

  return (
    <div
      className={classNames(styles.duck, {
        [`${styles.hit}`]: state.status === DuckInstanceStatus.Hit,
        [`${styles.left}`]:
          state.direction === Models.RoundMessagePathDirection.RIGHT2_LEFT,
      })}
      onClick={handleOnClick}
      style={{
        left: `${state.x}%`,
        top: `${state.y}%`,
      }}
    >
      <Component />
    </div>
  );
});

export const Duck = memo(DuckForwardRefExoticComponent);
