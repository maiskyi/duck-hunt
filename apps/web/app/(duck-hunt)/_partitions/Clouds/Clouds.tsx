"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { CLOUDS } from "./Clouds.const";
import styles from "../../page.module.scss";

export const Clouds = () => {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [tick, setTick] = useState(0);

  useLayoutEffect(() => {
    interval.current = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 200);
    
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  return (
    <>
      {CLOUDS.map(({ x, y, w, speed, id }) => {
        const offset = ((tick * speed) % 110) - 10;
        return (
          <div
            key={id}
            className={styles.cloud}
            style={{
              left: `${((x + offset) % 110) - 10}%`,
              top: `${y}%`,
              width: w,
            }}
          >
            <svg
              viewBox="0 0 120 28"
              width={w}
              height={28}
              style={{ imageRendering: "pixelated" }}
            >
              <rect x="16" y="16" width="88" height="12" fill="white" />
              <rect x="8" y="12" width="36" height="16" fill="white" />
              <rect x="36" y="4" width="48" height="20" fill="white" />
              <rect x="76" y="10" width="28" height="18" fill="white" />
            </svg>
          </div>
        );
      })}
    </>
  );
};
