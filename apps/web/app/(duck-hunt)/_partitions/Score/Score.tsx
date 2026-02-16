"use client";

import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@common/store";

import styles from "../../page.module.scss";

export const Score: FC = () => {
const hits = useSelector(({ duckHunt: { hits } }: RootState) => hits);

const rounds = useSelector(({ duckHunt: { rounds } }: RootState) => rounds);

  return (
    <div className={styles.score}>
      <div className={styles.scoreTitle}>SCORE</div>
      <span className={styles.scoreValue}>{hits}</span>
      <span className={styles.scoreDivider}> / </span>
      <span className={styles.scoreTotal}>{rounds}</span>
    </div>
  );
};
