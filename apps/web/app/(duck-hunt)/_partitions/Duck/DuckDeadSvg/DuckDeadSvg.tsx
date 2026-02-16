import { FC } from "react";

export const DuckDeadSvg: FC = () => {
  return (
    <svg
      viewBox="0 0 48 40"
      width={72}
      height={60}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Feathers falling */}
      <rect x={5} y={2} width={4} height={2} fill="#6aaa00" opacity={0.7} />
      <rect x={30} y={0} width={3} height={3} fill="#5a8a00" opacity={0.6} />
      <rect x={18} y={4} width={2} height={4} fill="#4a7a00" opacity={0.8} />
      {/* Body upside / rotated */}
      <rect x={10} y={18} width={28} height={14} fill="#5a8a00" />
      <rect x={8} y={20} width={32} height={10} fill="#6aaa00" />
      {/* Head drooping */}
      <rect x={30} y={14} width={12} height={10} fill="#004400" />
      <rect x={28} y={16} width={14} height={8} fill="#005500" />
      {/* X eyes */}
      <rect x={36} y={15} width={2} height={2} fill="#fff" />
      <rect x={36} y={17} width={2} height={2} fill="#fff" />
      <rect x={37} y={16} width={2} height={2} fill="#fff" />
      <rect x={35} y={16} width={2} height={2} fill="#fff" />
      {/* Beak drooping */}
      <rect x={40} y={22} width={6} height={3} fill="#ff8800" />
      {/* Wings splayed */}
      <rect x={8} y={26} width={12} height={6} fill="#4a7a00" />
      <rect x={28} y={26} width={12} height={6} fill="#4a7a00" />
      {/* Feet up */}
      <rect x={16} y={14} width={4} height={6} fill="#ff8800" />
      <rect x={26} y={12} width={4} height={6} fill="#ff8800" />
    </svg>
  );
};
