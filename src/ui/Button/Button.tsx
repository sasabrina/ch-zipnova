import { type ComponentProps } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = ComponentProps<'button'> & { variant?: ButtonVariant }

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover',
  secondary: 'text-t-primary hover:bg-surface-02',
}

const Button = ({ variant = 'primary', type = 'button', className = '', ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-control px-3 py-1.5 text-sm font-medium outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  )
}

export default Button
