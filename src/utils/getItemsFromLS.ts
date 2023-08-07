import { ICartSliceState } from "../redux/slices/cart/types"

export function getItemsFromLS(key: string): ICartSliceState {
  const itemsFromLS = localStorage.getItem(key)
  return itemsFromLS ? JSON.parse(itemsFromLS) : {items: [], totalPrice: 0}
}