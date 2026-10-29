import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { selectFilteredShipments } from '../../store/shipments/shipmentsSelectors'
import ShipmentCard from './ShipmentCard'
import AssignShipmentModal from './AssignShipmentModal'

const ShipmentList = () => {
  const shipments = useAppSelector(selectFilteredShipments)

  const [assigningId, setAssigningId] = useState<string | null>(null)
  // const [isOpen, setIsOpen] = useState<boolean>(false)

  const assigning = shipments.find(s => s.id === assigningId)

  const handleOpenAssign = (id: string) => {
    setAssigningId(id)
    // setIsOpen(true)
  }

  return (
    <>
      <ul className='flex w-96 flex-col gap-2 overflow-y-auto'>
        {shipments.map(s => (
          <li key={s.id}>
            <ShipmentCard shipment={s} onAssign={() => handleOpenAssign(s.id)} />
          </li>
        ))}
      </ul>

      {assigning && (
        <AssignShipmentModal
          key={assigning.id}
          shipment={assigning}
          // open={isOpen}
          onClose={() => setAssigningId(null)}
        />
      )}
    </>
  )
}

export default ShipmentList
