import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { shipmentSelectors } from "./shipmentsSlice";

const selectFilters = (state: RootState) => state.filters;

export const selectFilteredShipments = createSelector(
  [shipmentSelectors.selectAll, selectFilters],
  (shipments, { search }) => {
    const normalize = (text: string) =>
      text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const searchTerm = normalize(search.trim());
    return shipments.filter((s) => {
      const matches =
        searchTerm === "" ||
        s.id.includes(searchTerm) ||
        normalize(s.customer).includes(searchTerm) ||
        s.status.includes(searchTerm);

      return matches;
    });
  },
);
