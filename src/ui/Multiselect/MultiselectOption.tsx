import { ComboboxOption } from '@headlessui/react'
import CheckboxIcon from './CheckboxIcon'

type MultiSelectOptionProps = { value: string; label: string; checked?: boolean; className?: string }

const MultiSelectOption = ({ value, label, checked, className = '' }: MultiSelectOptionProps) => (
  <ComboboxOption
    value={value}
    className={`group flex cursor-pointer items-center gap-2 rounded-xl px-3 py-1.5 text-base data-focus:bg-surface-700 ${className}`}
  >
    {({ selected }) => (
      <>
        <CheckboxIcon checked={checked ?? selected} />
        {label}
      </>
    )}
  </ComboboxOption>
)

export default MultiSelectOption
