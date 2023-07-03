import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size,
      );

      if (!findItem) {
        const newItem = { ...action.payload, count: 1 };
        state.items.push(newItem);
      } else {
        findItem.count++;
      }

      state.totalPrice += action.payload.price;
    },
    minusItem(state, action) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size,
      );

      if (findItem.count > 1) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeItem(state, action) {
      const itemToDelete = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type,
      );
      state.items = state.items.filter((item) => item !== itemToDelete);
      state.totalPrice = state.items.reduce(
        (acc, item) => (acc += item.count * item.price),
        0,
      );
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart
export const selectCartItemById = id => state => state.cart.items.filter((item) => item.id === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
