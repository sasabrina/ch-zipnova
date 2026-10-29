import { Field, Label, Select } from '@headlessui/react'
import { driverSelectors } from '../../store/drivers/driversSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { vehiclesSelectors } from '../../store/vehicles/vehiclesSlice'
import type { SelectOption, Shipment } from '../../types'
import { useForm } from 'react-hook-form'
import { assignShipment } from '../../store/shipments/shipmentsSlice'
import { formatVolume, formatWeight, getShipmentTotals } from './shipmentUtils'

type AssignShipmentFormProps = {
  shipment: Shipment
  onDone: () => void
}

type AssignFormValues = { driverId: string; vehicleId: string }

function AssignShopmentForm({ shipment, onDone }: AssignShipmentFormProps) {
  const dispatch = useAppDispatch()
  const drivers = useAppSelector(driverSelectors.selectAll)
  const vehicles = useAppSelector(vehiclesSelectors.selectAll)
  const totals = getShipmentTotals(shipment)

  const driversOptions: SelectOption[] = drivers.map(d => ({
    value: d.id,
    label: d.name,
  }))

  const vehiclesOptions: SelectOption[] = vehicles.map(v => ({
    value: v.id,
    label: `${v.type} ${v.model} ${v.plate}`,
  }))

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AssignFormValues>({ defaultValues: { driverId: '', vehicleId: '' } })

  const validateCapacity = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId)
    if (!vehicle) return true
    if (totals.weightKg > vehicle.capacityKg) return `Excede la capacidad de peso (${formatWeight(vehicle.capacityKg)})`
    if (totals.volumeM3 > vehicle.capacityM3)
      return `Excede la capacidad de volumen (${formatVolume(vehicle.capacityM3)})`
    return true
  }

  const onSubmit = ({ driverId, vehicleId }: AssignFormValues) => {
    dispatch(assignShipment({ id: shipment.id, driverId, vehicleId }))
    onDone()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <Field className='flex flex-col'>
        <Label>Conductor</Label>
        <Select
          {...register('driverId', {
            required: 'Elegí un conductor',
            onChange: e => {
              const driver = drivers.find(d => d.id === e.target.value)
              if (driver?.defaultVehicleId) setValue('vehicleId', driver.defaultVehicleId, { shouldValidate: true })
            },
          })}
          invalid={!!errors.driverId}
        >
          <option value='' disabled>
            Elegí un conductor
          </option>
          {driversOptions.map(d => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </Select>
        {errors.driverId && <p className='text-xs text-red-500'>{errors.driverId.message}</p>}
      </Field>

      <Field className='flex flex-col'>
        <Label>Vehículo</Label>
        <Select
          {...register('vehicleId', { required: 'Elegí un vehículo', validate: validateCapacity })}
          invalid={!!errors.vehicleId}
        >
          <option value='' disabled>
            Elegí un vehículo
          </option>
          {vehiclesOptions.map(v => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </Select>
        {errors.vehicleId && <p className='text-xs text-red-500'>{errors.vehicleId.message}</p>}
      </Field>

      <div className='flex justify-end gap-4'>
        <button type='button' onClick={onDone}>
          Cancelar
        </button>
        <button type='submit' className='rounded-control bg-accent px-3 py-1.5 text-on-accent'>
          Asignar
        </button>
      </div>
    </form>
  )
}

export default AssignShopmentForm
