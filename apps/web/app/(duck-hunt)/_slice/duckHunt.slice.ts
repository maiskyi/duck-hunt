import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface DuckHuntState {
  rounds: number;
  hits: number;
  isReady: boolean;
}

const initialState: DuckHuntState = {
  rounds: 0,
  hits: 0,
  isReady: false,
};

export const duckHuntSlice = createSlice({
  name: "duckHunt",
  initialState,
  reducers: {
    setStats: (
      state,
      action: PayloadAction<{ rounds: number; hits: number }>,
    ) => {
      state.rounds = action.payload.rounds;
      state.hits = action.payload.hits;
    },
  },
});

export const { setStats } = duckHuntSlice.actions;

export const reducer = duckHuntSlice.reducer;
