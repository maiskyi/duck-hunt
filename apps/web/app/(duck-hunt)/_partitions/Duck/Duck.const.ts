import { FC } from "react";

import { DuckInstanceTexture } from "./Duck.types";
import { DuckASvg } from "./DuckASvg";
import { DuckBSvg } from "./DuckBSvg";
import { DuckDeadSvg } from "./DuckDeadSvg";

export const DUCK_TEXTURE_FRAMES: Record<DuckInstanceTexture, FC> = {
  [DuckInstanceTexture.A]: DuckASvg,
  [DuckInstanceTexture.B]: DuckBSvg,
  [DuckInstanceTexture.Dead]: DuckDeadSvg,
};
