import { Combobox, ComboboxButton, ComboboxInput, ComboboxOptions } from '@headlessui/react'
import { useRef, useState } from 'react'
import type { SelectOption } from '../../types'
import MultiSelectOption from './MultiselectOption'
import { filterOptions, toggleAll } from './multiSelectUtils'
import Button from '../Button/Button'

type MultiSelectProps = {
  options: SelectOption[]
  value: string[]
  label?: string
  onChange: (value: string[]) => void
}

const SELECT_ALL = 'select_all'

const MultiSelect = ({ options, value, label, onChange }: MultiSelectProps) => {
  const [search, setSearch] = useState<string>('')

  const filteredOptions = filterOptions(options, search)
  const visibleValues = filteredOptions.map(o => o.value)
  const allSelected = visibleValues.length > 0 && visibleValues.every(v => value.includes(v))

  const handleChange = (next: string[]) => onChange(next.includes(SELECT_ALL) ? toggleAll(value, visibleValues) : next)

  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <Combobox multiple immediate value={value} onChange={handleChange} onClose={() => setSearch('')}>
      {({ open }) => (
        <>
          <div className='relative w-85'>
            <ComboboxInput
              aria-label={label}
              value={search}
              placeholder='Buscar'
              onChange={e => setSearch(e.target.value)}
              onClick={() => !open && buttonRef.current?.click()}
              className='h-9 w-full rounded-4xl bg-input-default px-4 outline-none placeholder:text-sm focus-visible:ring-1 focus-visible:ring-accent data-open:rounded-t-2xl data-open:rounded-b-none'
            />

            <div className='absolute inset-y-0 right-0 flex items-center gap-1 pr-2'>
              {search && (
                <Button variant='secondary' aria-label='Limpiar búsqueda' onClick={() => setSearch('')}>
                  ✕
                </Button>
              )}
              <ComboboxButton ref={buttonRef} className='group'>
                <svg
                  viewBox='0 0 16 16'
                  className='size-4 transition-transform group-data-open:rotate-180'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                >
                  <path d='M4 6l4 4 4-4' />
                </svg>
              </ComboboxButton>
            </div>
          </div>

          <ComboboxOptions
            anchor='bottom start'
            className='z-1000 w-(--input-width) rounded-b-2xl border-t border-t-divider bg-input-default text-sm text-fg shadow-lg'
          >
            {filteredOptions.length === 0 ? (
              <div>No options</div>
            ) : (
              <>
                <MultiSelectOption className='m-1' value={SELECT_ALL} label='Seleccionar todo' checked={allSelected} />

                <div className='max-h-56 overflow-y-auto border-t border-t-divider p-1'>
                  <p className='my-1 px-2 py-1 text-xs text-t-secondary'>Selecciona algunas opciones</p>
                  {filteredOptions.map(o => (
                    <MultiSelectOption key={o.value} value={o.value} label={o.label} />
                  ))}
                </div>
              </>
            )}
          </ComboboxOptions>
        </>
      )}
    </Combobox>
  )
}

export default MultiSelect
