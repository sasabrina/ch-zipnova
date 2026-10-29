import { setHighPriority, setShipmentIds, resetFilters } from '../../store/filters/filtersSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { shipmentSelectors } from '../../store/shipments/shipmentsSlice'
import type { SelectOption } from '../../types'
import { Checkbox } from '../../ui/Checkbox'
import { MultiSelect } from '../../ui/Multiselect'

function FiltersBar() {
  const dispatch = useAppDispatch()
  const allShipments = useAppSelector(shipmentSelectors.selectAll)
  const shipmentIds = useAppSelector(state => state.filters.shipmentIds)
  const highPriority = useAppSelector(state => state.filters.highPriority)

  const options: SelectOption[] = allShipments.map(s => ({
    label: `${s.id} - ${s.customer}`,
    value: s.id,
    filterTerm: `${s.id}|${s.trackingNumber}|${s.customer}`,
  }))

  return (
    <header className='flex items-center gap-4'>
      <MultiSelect options={options} value={shipmentIds} onChange={ids => dispatch(setShipmentIds(ids))} />

      <Checkbox label='Alta prioridad' checked={highPriority} onChange={value => dispatch(setHighPriority(value))} />

      <button type='button' onClick={() => dispatch(resetFilters())}>
        Limpiar filtros
      </button>
    </header>
  )
}

export default FiltersBar
