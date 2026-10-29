import { Field, Label, Select } from '@headlessui/react'
import { driverSelectors } from '../../store/drivers/driversSlice'
import { useAppSelector } from '../../store/hooks'
import { vehiclesSelectors } from '../../store/vehicles/vehiclesSlice'
import type { SelectOption, Shipment } from '../../types'

type AssignShipmentFormProps = {
  shipment: Shipment
  onDone: () => void
}

function AssignShopmentForm({ shipment, onDone }: AssignShipmentFormProps) {
  const drivers = useAppSelector(driverSelectors.selectAll)
  const vehicles = useAppSelector(vehiclesSelectors.selectAll)

  const driversOptions: SelectOption[] = drivers.map(d => ({
    value: d.id,
    label: d.name,
  }))

  const vehiclesOptions: SelectOption[] = vehicles.map(v => ({
    value: v.id,
    label: `${v.type} ${v.model} ${v.plate}`,
  }))

  return (
    <form className='flex flex-col gap-4'>
      <Field className='flex flex-col'>
        <Label>Conductor</Label>
        <Select name='drivers'>
          <option value='' disabled>
            Elegí un conductor
          </option>
          {driversOptions.map(d => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field className='flex flex-col'>
        <Label>Vehículo</Label>
        <Select name='vehicles'>
          <option value='' disabled>
            Elegí un vehículo
          </option>
          {vehiclesOptions.map(v => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </Select>
      </Field>

      <div className='flex justify-end gap-4'>
        <button type='button'>Cancelar</button>
        <button type='button'>Asignar</button>
      </div>
    </form>
  )
}

export default AssignShopmentForm
