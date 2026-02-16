import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

import styles from "../../page.module.scss";

import { BannerAnimation, BannerVariant } from "./Banner.types";

type BannerProps = PropsWithChildren<{
  variant?: BannerVariant;
  animation?: BannerAnimation;
}>;

export const Banner: FC<BannerProps> = ({
  children,
  variant = BannerVariant.Default,
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
