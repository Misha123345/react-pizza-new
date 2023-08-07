import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

type FetchPizzasParams = {
  url: string;
  params: {
    category: number | string;
    sortBy: "rating" | "price" | "name";
    page: number;
    limit: number;
  }
}

type PizzaItem = { 
  id: string,
  name: string, 
  price: number, 
  imageUrl: string, 
  sizes: number[], 
  types: number[] 
}

interface PizzasSliceState {
  items: PizzaItem[];
  status: Status
}


export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasParams>(
  "pizzas/fetchPizzasStatus",
  async ({ url, params }: FetchPizzasParams) => {
    const response = await axios.get<PizzaItem[]>(url, { params });
    return response.data;
  },
);

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
