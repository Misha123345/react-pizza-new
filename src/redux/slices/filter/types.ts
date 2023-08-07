export type SortVariants = "rating" | "price" | "name"

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  selectedSort: SortVariants;
  currentPage: number;
}