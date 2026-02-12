import styles from "./page.module.scss";

import { Scenery } from "./_partitions/Scenery";
import { Score } from "./_partitions/Score";
import { Clouds } from "./_partitions/Clouds";
import { Game } from "./_partitions/Game";

const DuckHuntPage = () => {
  return (
    <div className={styles.root}>
      <Game />
      <div className={styles.scanline} />
      <div className={styles.title}>DUCK HUNT</div>
      <Scenery />
      <div className={styles.groundbar}>
        <span>Click the duck</span>
      </div>
      <div className={styles.vignette} />
      <Score />
      <Clouds />
    </div>
  );
}

export default DuckHuntPage;
