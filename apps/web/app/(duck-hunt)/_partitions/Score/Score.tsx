import { FC } from "react";

import styles from "../../layout.module.scss";

export const Score: FC = () => {
  const hits = 0;
  const rounds = 0;
  return (
    <div className={styles.score}>
      <div className={styles.scoreTitle}>SCORE</div>
      <span className={styles.scoreValue}>{hits}</span>
      <span className={styles.scoreDivider}> / </span>
      <span className={styles.scoreTotal}>{rounds}</span>
    </div>
  );
};
