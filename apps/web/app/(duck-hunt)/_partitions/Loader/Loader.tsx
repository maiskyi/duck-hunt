import { FC } from "react";
import classNames from "classnames";

import styles from "../../page.module.scss";

export const Loader: FC = () => {
  return (
    <div
      className={classNames(
        styles.loader,
        styles.default,
      )}
    >
      LOADING...
    </div>
  );
};
