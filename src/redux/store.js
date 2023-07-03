import { configureStore } from "@reduxjs/toolkit";

import filtersReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import pizzasReducer from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});
