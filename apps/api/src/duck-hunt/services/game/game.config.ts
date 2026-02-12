export const GAME_CONFIG = {
    // baseline spec:
    flightDurationMs: 5_000,
    showAfterHitMs: 3_000,
  
    // bonus: "about 20s ± 10s"
    nextRoundMinDelayMs: 10_000,
    nextRoundMaxDelayMs: 30_000,
  
    // game area (used only to generate start/end points)
    // keep it in sync with frontend container size or treat as normalized coords.
    area: {
      width: 1000,
      height: 500,
      padding: 40,
    },
  
    // presets (simple + test-friendly)
    presets: [
      { id: 'L2R_STRAIGHT', direction: 'L2R' as const, diagonal: 0 },
      { id: 'R2L_STRAIGHT', direction: 'R2L' as const, diagonal: 0 },
      { id: 'L2R_DIAG_UP', direction: 'L2R' as const, diagonal: -120 },
      { id: 'L2R_DIAG_DOWN', direction: 'L2R' as const, diagonal: 120 },
      { id: 'R2L_DIAG_UP', direction: 'R2L' as const, diagonal: -120 },
      { id: 'R2L_DIAG_DOWN', direction: 'R2L' as const, diagonal: 120 },
    ],
  } as const;
  
  export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  