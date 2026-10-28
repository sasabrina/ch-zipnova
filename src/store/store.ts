import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './filters/filtersSlice'
import shipmentsReducer from './shipments/shipmentsSlice'
import uiReducer from './ui/uiSlice'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    shipments: shipmentsReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
