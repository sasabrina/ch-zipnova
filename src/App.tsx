import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import './App.css'
import MultiSelect from './ui/Multiselect/MultiSelect'
import { setShipmentIds } from './store/filters/filtersSlice'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { selectFilteredShipments } from './store/shipments/shipmentsSelectors'
import { shipmentSelectors } from './store/shipments/shipmentsSlice'
import { setSelectedShipmentId } from './store/ui/uiSlice'
import type { SelectOption } from './types'

function App() {
  const dispatch = useAppDispatch()
  const allShipments = useAppSelector(shipmentSelectors.selectAll)
  const shipments = useAppSelector(selectFilteredShipments)
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
        <ul className='w-96 overflow-y-auto'>
          {/* {shipments.map(s => (
            <li key={s.id} >
              <button onClick={() => dispatch(setSelectedShipmentId(s.id))}><span>{s.id} - {s.customer} - {s.status}</span></button>
            </li>
          ))} */}
        </ul>

        {/* mapa */}
        <MapContainer className='h-full w-full flex-1' center={[-34.6, -58.43]} zoom={12} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {shipments.map(s => {
            return (
              <CircleMarker
                key={s.id}
                center={[s.destination.lat, s.destination.lng]}
                radius={8}
                pathOptions={{
                  color: '#000000', // borde
                  weight: 1,
                  fillColor: '#000000',
                  fillOpacity: 0.9,
                }}
                eventHandlers={{
                  click: () => dispatch(setSelectedShipmentId(s.id)),
                }}
              >
                <Popup>
                  {s.id} - {s.customer} - {s.status}
                </Popup>
              </CircleMarker>
            )
          })}
        </MapContainer>
      </div>
    </div>
  )
}

export default App
