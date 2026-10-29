import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { selectFilteredShipments } from '../../store/shipments/shipmentsSelectors'
import ShipmentCard from './ShipmentCard'
import AssignShipmentModal from './AssignShipmentModal'

const ShipmentList = () => {
  const shipments = useAppSelector(selectFilteredShipments)

  const [assigningId, setAssigningId] = useState<string | null>(null)

  const assigning = shipments.find(s => s.id === assigningId)

  const handleOpenAssign = (id: string) => {
    setAssigningId(id)
  }

  return (
    <>
      <ul className='flex min-h-0 w-full flex-1 flex-col gap-2 overflow-y-auto md:w-96 md:flex-none'>
        {shipments.map(s => (
          <li key={s.id}>
            <ShipmentCard shipment={s} onAssign={() => handleOpenAssign(s.id)} />
          </li>
        ))}
      </ul>

      {assigning && (
        <AssignShipmentModal key={assigning.id} shipment={assigning} onClose={() => setAssigningId(null)} />
      )}
    </>
  )
}

export default ShipmentList
