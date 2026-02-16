import { FC } from "react";

export const DuckASvg: FC = () => {
  return (
    <svg
      viewBox="0 0 48 32"
      width={72}
      height={48}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Body */}
      <rect x={10} y={12} width={28} height={14} fill="#5a8a00" />
      <rect x={8} y={14} width={32} height={10} fill="#6aaa00" />
      {/* Head */}
      <rect x={30} y={6} width={12} height={12} fill="#004400" />
      <rect x={28} y={8} width={14} height={8} fill="#005500" />
      {/* Eye */}
      <rect x={38} y={8} width={2} height={2} fill="#ffff00" />
      <rect x={39} y={9} width={1} height={1} fill="#000" />
      {/* Beak */}
      <rect x={42} y={12} width={6} height={3} fill="#ff8800" />
      {/* Wing A - up */}
      <rect x={12} y={6} width={18} height={8} fill="#4a7a00" />
      <rect x={14} y={4} width={14} height={4} fill="#3a6a00" />
      {/* Tail */}
      <rect x={6} y={10} width={6} height={10} fill="#3a6a00" />
      <rect x={4} y={8} width={4} height={6} fill="#2a5a00" />
      {/* Feet */}
      <rect x={18} y={26} width={4} height={4} fill="#ff8800" />
      <rect x={26} y={26} width={4} height={4} fill="#ff8800" />
    </svg>
  );
};
