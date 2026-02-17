"use client";

import { FC, useEffect, useState } from "react";

import styles from "../../page.module.scss";

export const Crosshair: FC = () => {
  const [cursor, setCursor] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const onMove = ({ clientX, clientY }: MouseEvent) => 
      setCursor(() => ({ left: clientX, top: clientY }));
    document.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className={styles.crosshair} style={cursor}>
      <svg width="32" height="32" viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r="10"
          fill="none"
          stroke="#ff2200"
          strokeWidth="2"
        />
        <circle cx="16" cy="16" r="2" fill="#ff2200" />
        <line x1="16" y1="0" x2="16" y2="8" stroke="#ff2200" strokeWidth="2" />
        <line
          x1="16"
          y1="24"
          x2="16"
          y2="32"
          stroke="#ff2200"
          strokeWidth="2"
        />
        <line x1="0" y1="16" x2="8" y2="16" stroke="#ff2200" strokeWidth="2" />
        <line
          x1="24"
          y1="16"
          x2="32"
          y2="16"
          stroke="#ff2200"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
