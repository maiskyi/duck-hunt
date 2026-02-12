import styles from "./page.module.scss";

import { Scenery } from "./_partitions/Scenery";
import { Score } from "./_partitions/Score";
import { Clouds } from "./_partitions/Clouds";

const DuckHuntPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.scanline} />
      <div className={styles.title}>DUCK HUNT</div>
      <Scenery />
      <div className={styles.groundbar}>
        <span>CLICK THE DUCK</span>
      </div>
      <div className={styles.vignette} />
      <Score />
      <Clouds />
    </div>
  );
}

export default DuckHuntPage;
