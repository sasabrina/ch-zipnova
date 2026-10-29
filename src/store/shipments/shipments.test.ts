import { configureStore } from '@reduxjs/toolkit'
import { describe, expect, it } from 'vitest'
import filtersReducer from '../filters/filtersSlice'
import shipmentsReducer, { assignShipment, shipmentSelectors } from './shipmentsSlice'

describe('assignShipment', () => {
  it('asigna conductor y vehículo, y pasa el envío a "assigned"', () => {
    const store = configureStore({ reducer: { shipments: shipmentsReducer, filters: filtersReducer } })
    store.dispatch(assignShipment({ id: '123445', driverId: 'd5', vehicleId: 'v5' }))

    const shipment = shipmentSelectors.selectById(store.getState(), '123445')
    expect(shipment).toMatchObject({ driverId: 'd5', vehicleId: 'v5', status: 'assigned' })
  })
})
// tests de filtros¨
