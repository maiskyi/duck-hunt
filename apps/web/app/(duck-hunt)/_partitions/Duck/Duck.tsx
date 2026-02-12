"use client";

import { forwardRef, Fragment, useCallback, useImperativeHandle } from "react";

export interface DuckInstance {
  fly: () => void;
}

export const Duck = forwardRef<DuckInstance, {}>((props, ref) => {
  const fly = useCallback(() => {
    console.log("Duck is flying");
  }, []);

  useImperativeHandle(ref, () => ({
    fly,
  }));

  return <Fragment>Duck</Fragment>;
});

Duck.displayName = "Duck";
