import { configureStore } from "@reduxjs/toolkit";
import { MealReducer } from "../features";

const store = configureStore({
  reducer: {
    meal: MealReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
