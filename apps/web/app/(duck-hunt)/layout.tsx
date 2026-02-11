import { FC, PropsWithChildren } from "react";
import styles from "./layout.module.scss";

type BaseLayoutProps = PropsWithChildren;

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.scanline} />
      <div className={styles.title}>DUCK HUNT</div>
      <div className={styles.groundbar}>
        <span>CLICK THE DUCK</span>
      </div>
      {children}
    </div>
  );
};

export default BaseLayout;
