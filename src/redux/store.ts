import { configureStore } from "@reduxjs/toolkit";

import filtersReducer from "./slices/filter/slice";
import cartReducer from "./slices/cart/slice";
import pizzasReducer from "./slices/pizzas/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
