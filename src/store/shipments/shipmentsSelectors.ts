import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { shipmentSelectors } from "./shipmentsSlice";
import { format } from "date-fns";

const selectFilters = (state: RootState) => state.filters;

export const toDateKey = (iso: string) => format(new Date(iso), "yyyy-MM-dd");

export const selectFilteredShipments = createSelector(
  [shipmentSelectors.selectAll, selectFilters],
  (shipments, { search, statuses, date }) => {
    const normalize = (text: string) =>
      text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const searchTerm = normalize(search.trim());

    return shipments.filter((s) => {
      const matchesSearch =
        searchTerm === "" ||
        s.id.includes(searchTerm) ||
        normalize(s.customer).includes(searchTerm) ||
        s.status.includes(searchTerm);

      const matchesStatus =
        statuses.length === 0 || statuses.includes(s.status);
      const matchesDate =
        date === null || toDateKey(s.estimatedDelivery) === date;

      return matchesSearch && matchesStatus && matchesDate;
    });
  },
);
