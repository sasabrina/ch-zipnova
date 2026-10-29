import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { drivers } from '../../data/mock'
import type { Driver } from '../../types'

const driversAdapter = createEntityAdapter<Driver>()

const driversSlice = createSlice({
  name: 'drivers',
  initialState: driversAdapter.setAll(driversAdapter.getInitialState(), drivers),
  reducers: {},
})

export const driverSelectors = driversAdapter.getSelectors(
  (state: { drivers: ReturnType<typeof driversSlice.reducer> }) => state.drivers,
)

export default driversSlice.reducer
