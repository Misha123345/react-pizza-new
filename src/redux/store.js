import { configureStore } from "@reduxjs/toolkit";

import filtersReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
});
