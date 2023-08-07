import { RootState } from "../../store"
import { CartSliceItem } from "./types"

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => ( state: RootState) => state.cart.items.filter((item: CartSliceItem) => item.id === id)
