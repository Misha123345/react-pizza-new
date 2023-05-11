import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  searchValue: "",
  categoryId: 0,
  selectedSort: "rating",
  currentPage: 0,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeSearch(state, action) {
      state.searchValue = action.payload;
    },
    clearSearch(state) {
      state.searchValue = "";
    },

    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },

    setSelectedSort(state, action) {
      state.selectedSort = action.payload;
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.selectedSort = String(action.payload.selectedSort);
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
