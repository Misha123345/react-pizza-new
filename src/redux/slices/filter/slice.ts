import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FilterSliceState, SortVariants } from "./types";

export const initialState: FilterSliceState= {
  searchValue: "",
  categoryId: 0,
  selectedSort: "rating",
  currentPage: 0,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeSearch(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    clearSearch(state) {
      state.searchValue = "";
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },

    setSelectedSort(state, action: PayloadAction<SortVariants>) {
      state.selectedSort = action.payload;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.selectedSort = action.payload.selectedSort
    },
  },
});

export const {
  changeSearch,
  clearSearch,
  setCategoryId,
  setSelectedSort,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
