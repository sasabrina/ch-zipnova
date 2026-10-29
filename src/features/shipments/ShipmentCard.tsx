import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { useAppDispatch } from '../../store/hooks'
import { setSelectedShipmentId } from '../../store/ui/uiSlice'
import type { Shipment } from '../../types'
import LocateIcon from '../../ui/icons/LocateIcon'
import ShipmentTotal from './ShipmentTotal'
import { formatPackages, formatValue, formatVolume, formatWeight, getShipmentTotals } from './shipmentUtils'
import ShipmentPackage from './ShipmentPackage'
import AssignIcon from '../../ui/icons/AssignIcon'
import Button from '../../ui/Button/Button'

type ShipmentCardProps = {
  shipment: Shipment
  onAssign: () => void
}

function ShipmentCard({ shipment, onAssign }: ShipmentCardProps) {
  const dispatch = useAppDispatch()
  const totals = getShipmentTotals(shipment)

  return (
    <Disclosure as='article' className='max-w-94 overflow-hidden rounded-xl'>
      <div className={`flex items-center gap-2 bg-surface-02 p-3`}>
        <div className='flex-1'>
          <h3 className='text-base font-medium'>Entrega {shipment.id}</h3>
          <p className='text-xs'>{shipment.trackingNumber}</p>
        </div>

        <Button
          className='mr-3 cursor-pointer'
          variant='secondary'
          aria-label='Ver en el mapa'
          onClick={() => dispatch(setSelectedShipmentId(shipment.id))}
        >
          <LocateIcon />
        </Button>

        <DisclosureButton aria-label='Ver detalle' className='group size-5'>
          <svg
            viewBox='0 0 16 16'
            className='size-4 cursor-pointer text-icon-neutral-secondary transition-transform group-data-open:rotate-180'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
          >
            <path d='M4 6l4 4 4-4' />
          </svg>
        </DisclosureButton>
      </div>

      <DisclosurePanel className='max-w-94 rounded-b-xl bg-input-default px-3 py-2 text-t-secondary'>
        <div className='flex justify-between pt-2'>
          <ShipmentTotal icon='weight' label={formatWeight(totals.weightKg)} />
          <ShipmentTotal icon='volume' label={formatVolume(totals.volumeM3)} />
          <ShipmentTotal icon='box' label={formatPackages(totals.packages)} />
          <ShipmentTotal icon='cash' label={formatValue(totals.valueArs)} />
        </div>

        {shipment.packages.map(p => (
          <ShipmentPackage key={p.id} pkg={p} />
        ))}

        <div className='mt-2 flex justify-between'>
          <p className='text-xs text-t-primary'>{`${shipment.status === 'pending' ? 'Sin asignar' : 'Asignado'}`}</p>
          <button type='button' aria-label='Asignas' onClick={onAssign}>
            <AssignIcon />
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default ShipmentCard
