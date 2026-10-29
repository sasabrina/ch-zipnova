import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './filters/filtersSlice'
import shipmentsReducer from './shipments/shipmentsSlice'
import uiReducer from './ui/uiSlice'
import driversReducer from './drivers/driversSlice'
import vehiclesReducer from './vehicles/vehiclesSlice'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    shipments: shipmentsReducer,
    ui: uiReducer,
    drivers: driversReducer,
    vehicles: vehiclesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
