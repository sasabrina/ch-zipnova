import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShipmentStatus } from "../../types";

export type FiltersState = {
  search: string;
  statuses: ShipmentStatus[];
};

const initialState: FiltersState = {
  search: "",
  statuses: [],
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
  },
});

export const { setSearch, setStatuses } = filtersSlice.actions;

export default filtersSlice.reducer;
