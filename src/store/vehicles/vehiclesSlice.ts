import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { vehicles } from '../../data/mock'
import type { Vehicle } from '../../types'

const vehiclesAdapter = createEntityAdapter<Vehicle>()

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: vehiclesAdapter.setAll(vehiclesAdapter.getInitialState(), vehicles),
  reducers: {},
})

export const vehiclesSelectors = vehiclesAdapter.getSelectors(
  (state: { vehicles: ReturnType<typeof vehiclesSlice.reducer> }) => state.vehicles,
)

export default vehiclesSlice.reducer
