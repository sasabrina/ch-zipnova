import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectFilteredShipments } from '../../store/shipments/shipmentsSelectors'
import { setSelectedShipmentId } from '../../store/ui/uiSlice'

const ShipmentsMap = () => {
  const shipments = useAppSelector(selectFilteredShipments)
  const dispatch = useAppDispatch()

  return (
    <MapContainer className='isolate h-full w-full flex-1' center={[-34.6, -58.43]} zoom={12} scrollWheelZoom={false}>
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
              color: '#000000',
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
  )
}

export default ShipmentsMap
