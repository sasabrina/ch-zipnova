import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { shipmentSelectors } from './shipmentsSlice'
import { format } from 'date-fns'

const selectFilters = (state: RootState) => state.filters

export const toDateKey = (iso: string) => format(new Date(iso), 'yyyy-MM-dd')

export const selectFilteredShipments = createSelector(
  [shipmentSelectors.selectAll, selectFilters],
  (shipments, { shipmentIds, statuses, date, highPriority }) => {
    return shipments.filter(s => {
      const matchesShipment = shipmentIds.length === 0 || shipmentIds.includes(s.id)
      const matchesStatus = statuses.length === 0 || statuses.includes(s.status)
      const matchesDate = date === null || toDateKey(s.estimatedDelivery) === date
      const matchesPriority = !highPriority || s.priority === 'high'

      return matchesShipment && matchesStatus && matchesDate && matchesPriority
    })
  },
)
