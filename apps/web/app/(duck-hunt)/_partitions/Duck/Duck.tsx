"use client";

import { forwardRef, Fragment, useCallback, useImperativeHandle } from "react";
import { DuckInstance } from "./Duck.types";

interface DuckProps {
  onClick: () => void;
}

export const Duck = forwardRef<DuckInstance, DuckProps>(({ onClick }, ref) => {
  const fly = useCallback(() => {
    console.log("Duck is flying");
  }, []);

  useImperativeHandle(ref, () => ({
    fly,
  }));

  return <Fragment>Duck</Fragment>;
});

Duck.displayName = "Duck";
