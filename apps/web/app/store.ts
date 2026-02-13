"use client";

import { configureStore } from "@reduxjs/toolkit";

import { reducer as duckHuntReducer } from "./(duck-hunt)/_slice";

export const store = configureStore({
  reducer: {
    duckHunt: duckHuntReducer,
  },
});
