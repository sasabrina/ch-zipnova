import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectFilteredShipments } from '../../store/shipments/shipmentsSelectors'
import { setSelectedShipmentId } from '../../store/ui/uiSlice'

const ShipmentsMap = () => {
  const shipments = useAppSelector(selectFilteredShipments)
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector(state => state.ui.selectedShipmentId)

  return (
    <MapContainer
      className='isolate order-first h-64 w-full shrink-0 md:order-0 md:h-full md:flex-1'
      center={[-34.6, -58.43]}
      zoom={12}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {shipments.map(s => {
        const isSelected = s.id === selectedId

        return (
          <CircleMarker
            key={s.id}
            center={[s.destination.lat, s.destination.lng]}
            radius={isSelected ? 8 : 6}
            pathOptions={{
              color: isSelected ? '#1bab85' : '#000000',
              weight: isSelected ? 2 : 1,
              fillColor: isSelected ? '#14efb6' : '#000000',
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
