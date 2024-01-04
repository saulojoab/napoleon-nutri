import { configureStore } from "@reduxjs/toolkit";
import { MealReducer } from "../features";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedMealReducer = persistReducer(persistConfig, MealReducer);

const store = configureStore({
  reducer: {
    meal: persistedMealReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
