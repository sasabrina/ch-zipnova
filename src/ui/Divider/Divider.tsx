type DividerProps = {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  className?: string
}

const Divider = ({ orientation = 'horizontal', decorative = false, className = '' }: DividerProps) => {
  const base = orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch'

  return (
    <div
      role={decorative ? undefined : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      aria-hidden={decorative || undefined}
      className={`shrink-0 bg-divider ${base} ${className}`}
    />
  )
}

export default Divider
