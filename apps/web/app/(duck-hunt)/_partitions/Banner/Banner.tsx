"use client";

import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import classNames from "classnames";

import styles from "../../page.module.scss";

import type {
  BannerInstance,
  BannerInstanceShowHandlerParams,
} from "./Banner.types";

export const BannerForwardRefExoticComponent = forwardRef<
  BannerInstance,
  object
>(function BannerForwardRefExoticComponent(_, ref) {
  const [state, setState] = useState<BannerInstanceShowHandlerParams | null>(
    null,
  );

  const show = useCallback((params: BannerInstanceShowHandlerParams) => {
    setState(() => params);
    if (params.duration) {
      setTimeout(() => {
        setState(() => null);
      }, params.duration);
    }
  }, []);

  const hide = useCallback(() => {
    setState(() => null);
  }, []);

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  if (!state) return null;

  return (
    <div
      className={classNames(styles.loader, styles[state.variant], styles.blink)}
    >
      {state.message.toUpperCase()}
    </div>
  );
});

export const Banner = memo(BannerForwardRefExoticComponent);
