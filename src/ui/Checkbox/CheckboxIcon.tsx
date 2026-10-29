type CheckboxIconProps = { checked: boolean; className?: string }

function CheckboxIcon({ checked, className = '' }: CheckboxIconProps) {
  return (
    <span
      aria-hidden='true'
      className={`flex size-4 shrink-0 items-center justify-center rounded-sm border ${
        checked ? 'border-accent bg-accent' : 'border-b-primary bg-input-default'
      } ${className}`}
    >
      {checked && (
        <svg viewBox='0 0 12 12' className='size-3 text-on-accent' fill='none' stroke='currentColor' strokeWidth='2'>
          <path d='M2.5 6l2.5 2.5 4.5-5' />
        </svg>
      )}
    </span>
  )
}

export default CheckboxIcon
