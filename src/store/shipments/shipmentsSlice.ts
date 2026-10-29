import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { shipments } from '../../data/mock'
import { type Shipment } from '../../types'

const shipmentsAdapter = createEntityAdapter<Shipment>()

const shipmentSlice = createSlice({
  name: 'shipments',
  initialState: shipmentsAdapter.setAll(shipmentsAdapter.getInitialState(), shipments),
  reducers: {
    assignShipment: (
      state,
      action: PayloadAction<{
        id: string
        driverId: string
        vehicleId: string
      }>,
    ) => {
      const { id, driverId, vehicleId } = action.payload
      shipmentsAdapter.updateOne(state, {
        id,
        changes: { driverId, vehicleId, status: 'assigned' },
      })
    },
    updateStatus: (state, action: PayloadAction<{ id: string; status: Shipment['status'] }>) => {
      const { id, status } = action.payload
      shipmentsAdapter.updateOne(state, {
        id,
        changes: { status },
      })
    },
  },
})

export const { assignShipment, updateStatus } = shipmentSlice.actions
export const shipmentSelectors = shipmentsAdapter.getSelectors(
  (state: { shipments: ReturnType<typeof shipmentSlice.reducer> }) => state.shipments,
)
export default shipmentSlice.reducer
