"use client";

import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { Models } from "@repo/ws-client";

import styles from "../../page.module.scss";

import {
  DuckInstance,
  DuckInstanceEndHandler,
  DuckInstanceFlyHandler,
  DuckInstanceStartHandler,
  DuckInstanceStatus,
  DuckInstanceTexture,
  DuckState,
} from "./Duck.types";
import { DUCK_TEXTURE_FRAMES } from "./Duck.const";

interface DuckProps {
  onClick: () => void;
}

export const Duck = forwardRef<DuckInstance, DuckProps>(({ onClick }, ref) => {
  const [state, setState] = useState<DuckState | null>(null);
  const stateRef = useRef<DuckState | null>(null);

  stateRef.current = state;

  const fly: DuckInstanceFlyHandler = useCallback(
    ({ path, roundId }) => {
      if (state?.status !== DuckInstanceStatus.Flying) return;
      console.log({ path, roundId });
    },
    [state?.status],
  );

  const start: DuckInstanceStartHandler = useCallback(({ path, roundId }) => {
    console.log("start", { path, roundId });
    if (stateRef.current?.status === DuckInstanceStatus.Flying) return;
    setState(() => ({
      roundId,
      texture: DuckInstanceTexture.A,
      status: DuckInstanceStatus.Flying,
      direction: path.direction,
    }));
  }, []);

  const end: DuckInstanceEndHandler = useCallback(({ roundId, path }) => {
    console.log("end", { path, roundId });
    if (stateRef.current?.status !== DuckInstanceStatus.Flying) return;
    setState(() => null);
  }, []);

  useImperativeHandle(ref, () => ({
    fly,
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
          state.direction === Models.RoundMessagePathDirection.LEFT2_RIGHT,
      })}
      onClick={state.status === DuckInstanceStatus.Flying ? onClick : undefined}
      style={
        {
          // left: `${duck.position.x}%`,
          // top: `${Math.max(2, Math.min(duck.position.y, 72))}%`,
        }
      }
    >
      <Component />
    </div>
  );
});

Duck.displayName = "Duck";
