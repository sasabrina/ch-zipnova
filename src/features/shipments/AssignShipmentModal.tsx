import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import type { Shipment } from '../../types'
import ShipmentTotal from './ShipmentTotal'
import { formatVolume, formatWeight, getShipmentTotals } from './shipmentUtils'
import AssignShopmentForm from './AssignShipmentForm'

type AssignShipmentModalProps = {
  shipment: Shipment
  onClose: () => void
}

const AssignShipmentModal = ({ shipment, onClose }: AssignShipmentModalProps) => {
  const totals = getShipmentTotals(shipment)

  return (
    <Dialog open={true} onClose={onClose} className='relative z-50'>
      <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
        <DialogPanel className='max-w-lg space-y-4 rounded-2xl bg-input-default p-4 text-t-primary shadow shadow-fg-subtle'>
          <DialogTitle className='font-bold'>Asignar entrega {shipment.id}</DialogTitle>

          <div className='flex justify-end gap-2'>
            <ShipmentTotal icon='weight' label={formatWeight(totals.weightKg)} />
            <ShipmentTotal icon='volume' label={formatVolume(totals.volumeM3)} />
          </div>

          <AssignShopmentForm shipment={shipment} onDone={onClose} />
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default AssignShipmentModal
