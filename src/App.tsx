import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import './App.css'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { shipmentSelectors } from './store/shipments/shipmentsSlice'
import { setSelectedShipmentId } from './store/ui/uiSlice'
import type { Shipment } from './types'

function App() {
  const shipments = useAppSelector(shipmentSelectors.selectAll)
  const selectedShipmentId = useAppSelector(state => state.ui.selectedShipmentId)
  const dispatch = useAppDispatch()
  const selectedShipment = useAppSelector(state =>
    selectedShipmentId ? shipmentSelectors.selectById(state, selectedShipmentId) : undefined,
  )

  const isShipmentSelected = (s: Shipment) => s.id === selectedShipmentId


  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-1 min-h-0'>
        <ul className='w-96 overflow-y-auto'>
          {shipments.map(s => (
            <li key={s.id} >
              <button onClick={() => dispatch(setSelectedShipmentId(s.id))}><span className={`${isShipmentSelected(s) ? 'font-bold' : 'font-light'}`}>{s.id} - {s.customer} - {s.status}</span></button>
            </li>
          ))}
        </ul>

        {/* mapa */}
        <MapContainer className='flex-1 h-full w-full' center={[-34.60, -58.43]} zoom={12} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <>
            {shipments.map(s => {
              const isSelected = isShipmentSelected(s)

              return (
                <CircleMarker
                  key={s.id}
                  center={[s.destination.lat, s.destination.lng]}
                  radius={isSelected ? 11 : 7}
                  pathOptions={{
                    color: isSelected ? '#ffffff' : '#000000',  // borde
                    weight: isSelected ? 3 : 1,
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
            })}</>
        </MapContainer>
      </div>

      <div className='mt-8 font-bold'>
        {selectedShipment &&
          <p>{selectedShipment.id} - {selectedShipment.customer} - {selectedShipment.status}</p>
        }
      </div>
    </div>
  )
}

export default App
