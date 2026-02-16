import { WsClientProvider } from "@repo/ws-client";

import styles from "./page.module.scss";
import { Scenery } from "./_partitions/Scenery";
import { Score } from "./_partitions/Score";
import { Clouds } from "./_partitions/Clouds";
import { Game } from "./_partitions/Game";
import { Initializer } from "./_partitions/Initializer";

const DuckHuntPage = () => {
  return (
    <WsClientProvider uri="http://localhost:3001/duck-hunt">
      <div className={styles.root}>
        <Initializer>
          <Game />
        </Initializer>
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
    </WsClientProvider>
  );
};

export default DuckHuntPage;
