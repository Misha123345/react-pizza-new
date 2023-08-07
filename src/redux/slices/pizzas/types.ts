export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type FetchPizzasParams = {
  url: string;
  params: {
    category: number | string;
    sortBy: "rating" | "price" | "name";
    page: number;
    limit: number;
  }
}

export type PizzaItem = { 
  id: string,
  name: string, 
  price: number, 
  imageUrl: string, 
  sizes: number[], 
  types: number[] 
}

export interface PizzasSliceState {
  items: PizzaItem[];
  status: Status
}