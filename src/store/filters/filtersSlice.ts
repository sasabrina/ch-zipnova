import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ShipmentStatus } from '../../types'

export type FiltersState = {
  shipmentIds: string[]
  statuses: ShipmentStatus[]
  date: string | null // null = cualquier fecha
  highPriority: boolean
}

export const DEFAULT_STATUSES: ShipmentStatus[] = ['pending', 'assigned', 'in_transit']

const initialState: FiltersState = {
  shipmentIds: [],
  statuses: DEFAULT_STATUSES,
  date: null,
  highPriority: false,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setShipmentIds: (state, action: PayloadAction<string[]>) => {
      state.shipmentIds = action.payload
    },
    setStatuses: (state, action: PayloadAction<ShipmentStatus[]>) => {
      state.statuses = action.payload
    },
    setDate: (state, action: PayloadAction<string | null>) => {
      state.date = action.payload
    },
    setHighPriority: (state, action: PayloadAction<boolean>) => {
      state.highPriority = action.payload
    },
    resetFilters: () => initialState,
  },
})

export const { setShipmentIds, setStatuses, setDate, setHighPriority, resetFilters } = filtersSlice.actions

export default filtersSlice.reducer
