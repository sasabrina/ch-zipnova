import { ComboboxOption } from '@headlessui/react'
import CheckboxIcon from '../Checkbox/CheckboxIcon'

type MultiSelectOptionProps = { value: string; label: string; checked?: boolean; className?: string }

const MultiSelectOption = ({ value, label, checked, className = '' }: MultiSelectOptionProps) => (
  <ComboboxOption
    value={value}
    className={`group flex cursor-pointer items-center gap-2 rounded-xl px-3 py-1.5 text-base data-focus:bg-surface-02 ${className}`}
  >
    {({ selected }) => (
      <>
        <CheckboxIcon
          checked={checked ?? selected}
          className={`${(checked ?? selected) ? '' : 'invisible group-data-focus:visible'}`}
        />
        {label}
      </>
    )}
  </ComboboxOption>
)

export default MultiSelectOption
