import './App.css'
import ShipmentsMap from './features/map/ShipmentsMap'
import ShipmentList from './features/shipments/ShipmentList'
import { setShipmentIds } from './store/filters/filtersSlice'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { shipmentSelectors } from './store/shipments/shipmentsSlice'
import type { SelectOption } from './types'
import MultiSelect from './ui/Multiselect/MultiSelect'

function App() {
  const dispatch = useAppDispatch()
  const allShipments = useAppSelector(shipmentSelectors.selectAll)
  const shipmentIds = useAppSelector(state => state.filters.shipmentIds)

  const options: SelectOption[] = allShipments.map(s => ({
    label: `${s.id} - ${s.customer}`,
    value: s.id,
    filterTerm: `${s.id}|${s.trackingNumber}|${s.customer}`,
  }))

  return (
    <div className='flex h-screen flex-col bg-canvas text-t-primary'>
      <MultiSelect options={options} value={shipmentIds} onChange={ids => dispatch(setShipmentIds(ids))} />

      <div className='flex min-h-0 flex-1'>
        <ShipmentList />

        {/* mapa */}
        <ShipmentsMap />
      </div>
    </div>
  )
}

export default App
