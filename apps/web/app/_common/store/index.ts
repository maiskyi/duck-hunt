"use client";

import { configureStore } from "@reduxjs/toolkit";

import { reducer as duckHuntReducer } from "../../(duck-hunt)/_slice";

export const store = configureStore({
  reducer: {
    duckHunt: duckHuntReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
