import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import './App.css'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { shipmentSelectors } from './store/shipments/shipmentsSlice'
import { setSelectedShipmentId } from './store/ui/uiSlice'

function App() {
  const shipments = useAppSelector(shipmentSelectors.selectAll)
  const selectedShipmentId = useAppSelector(state => state.ui.selectedShipmentId)
  const dispatch = useAppDispatch()

  return (
    <div className='flex h-screen'>
      <ul className='w-96 overflow-y-auto'>
        {shipments.map(s => (
          <li key={s.id} onClick={() => dispatch(setSelectedShipmentId(s.id))}>
            {s.id} - {s.customer} - {s.status}
          </li>
        ))}
      </ul>

      {/* mapa */}
      <MapContainer className='flex-1 h-full' center={[-34.60, -58.43]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <>
          {shipments.map(s => {
            const isSelected = s.id === selectedShipmentId

            return (
              <CircleMarker
                center={[s.destination.lat, s.destination.lng]}
                radius={isSelected ? 11 : 7}
                pathOptions={{
                  color: isSelected ? '#ffffff' : 'blue',  // borde
                  weight: isSelected ? 3 : 1,
                  fillColor: 'blue',
                  fillOpacity: 0.9,
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
  )
}

export default App
