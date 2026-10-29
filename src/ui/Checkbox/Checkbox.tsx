import { Field, Label, Checkbox as HeadlessCheckbox } from '@headlessui/react'
import CheckboxIcon from './CheckboxIcon'

type CheckboxProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => (
  <Field className='flex items-center gap-2'>
    <HeadlessCheckbox checked={checked} onChange={onChange} className='cursor-pointer outline-none'>
      {({ checked }) => <CheckboxIcon checked={checked} />}
    </HeadlessCheckbox>
    <Label className='cursor-pointer text-base'>{label}</Label>
  </Field>
)

export default Checkbox
