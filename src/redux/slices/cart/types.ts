export type CartSliceItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

export interface ICartSliceState {
  items: CartSliceItem[];
  totalPrice: number;
}
