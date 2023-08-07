import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getItemsFromLS } from "../../../utils/getItemsFromLS";
import { CartSliceItem, ICartSliceState } from "./types";

const cartDataFromLS = getItemsFromLS('cart')

const initialState: ICartSliceState = {
  items: cartDataFromLS.items,
  totalPrice: cartDataFromLS.totalPrice,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartSliceItem>) {
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
    minusItem(state, action: PayloadAction<CartSliceItem>) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size,
      );
      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeItem(state, action: PayloadAction<CartSliceItem>) {
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

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
