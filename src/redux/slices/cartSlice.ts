import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store"

export type CartSliceItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

interface CartSliceState {
  items: CartSliceItem[];
  totalPrice: number;
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
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



export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => ( state: RootState) => state.cart.items.filter((item: CartSliceItem) => item.id === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
