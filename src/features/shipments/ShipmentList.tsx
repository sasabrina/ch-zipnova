import { useAppSelector } from '../../store/hooks'
import { selectFilteredShipments } from '../../store/shipments/shipmentsSelectors'
import ShipmentCard from './ShipmentCard'

const ShipmentList = () => {
  const shipments = useAppSelector(selectFilteredShipments)

  return (
    <ul className='flex w-96 flex-col gap-2 overflow-y-auto'>
      {shipments.map(s => (
        <li key={s.id}>
          <ShipmentCard shipment={s} />
        </li>
      ))}
    </ul>
  )
}

export default ShipmentList
