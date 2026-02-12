import { FC } from "react";

export const Scenery: FC = () => {
  return (
    <svg
      viewBox="0 0 800 140"
      width="100%"
      height={140}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        imageRendering: "pixelated",
      }}
      preserveAspectRatio="none"
    >
      {/* Ground */}
      <rect x={0} y={80} width={800} height={60} fill="#3a6600" />
      <rect x={0} y={76} width={800} height={8} fill="#4a8800" />
      {/* Grass blades */}
      {[...Array(40)].map((_, i) => (
        <rect
          key={i}
          x={i * 20 + 4}
          y={72}
          width={4}
          height={8}
          fill="#5aaa00"
        />
      ))}
      {/* Trees */}
      {[60, 160, 300, 480, 620, 740].map((x, i) => (
        <g key={i}>
          <rect x={x + 12} y={36} width={8} height={44} fill="#6b3a2a" />
          <rect x={x} y={8} width={32} height={32} fill="#1a5c00" />
          <rect x={x + 4} y={2} width={24} height={16} fill="#2a7a00" />
          <rect x={x + 8} y={-2} width={16} height={10} fill="#3a9200" />
        </g>
      ))}
      {/* Bushes */}
      {[120, 260, 400, 540, 680].map((x, i) => (
        <g key={i}>
          <rect x={x} y={62} width={24} height={18} fill="#2a6600" />
          <rect x={x + 4} y={56} width={16} height={12} fill="#3a8800" />
        </g>
      ))}
    </svg>
  );
};
