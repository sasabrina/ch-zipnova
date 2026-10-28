import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShipmentStatus } from "../../types";

export type FiltersState = {
  search: string;
  statuses: ShipmentStatus[];
  date: string | null; // null = cualquier fecha
};

export const DEFAULT_STATUSES: ShipmentStatus[] = [
  "pending",
  "assigned",
  "in_transit",
];

const initialState: FiltersState = {
  search: "",
  statuses: DEFAULT_STATUSES,
  date: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setStatuses: (state, action: PayloadAction<ShipmentStatus[]>) => {
      state.statuses = action.payload;
    },
    setDate: (state, action: PayloadAction<string | null>) => {
      state.date = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setSearch, setStatuses } = filtersSlice.actions;

export default filtersSlice.reducer;
