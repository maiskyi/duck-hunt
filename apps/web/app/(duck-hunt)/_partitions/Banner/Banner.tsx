import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

import styles from "../../page.module.scss";

import type { BannerAnimation, BannerVariant } from "./Banner.types";

type BannerProps = PropsWithChildren<{
  variant?: BannerVariant;
  animation?: BannerAnimation;
}>;

export const Banner: FC<BannerProps> = ({
  children,
  variant = "default",
  animation,
}) => {
  return (
    <div
      className={classNames(
        styles.banner,
        styles[variant],
        animation && styles[animation],
      )}
    >
      {children}
    </div>
  );
};
