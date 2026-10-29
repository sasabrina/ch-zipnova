import BoxIcon from '../../ui/icons/BoxIcon'
import CashIcon from '../../ui/icons/CashIcon'
import VolumeIcon from '../../ui/icons/VolumeIcon'
import WeightIcon from '../../ui/icons/WeightIcon'

const ICONS = {
  weight: WeightIcon,
  volume: VolumeIcon,
  box: BoxIcon,
  cash: CashIcon,
} as const

type ShipmentTotalProps = {
  icon: keyof typeof ICONS
  label: string
}

function ShipmentTotal({ icon, label }: ShipmentTotalProps) {
  const TotalIcon = ICONS[icon]

  return (
    <div className='flex items-center gap-1'>
      <TotalIcon width={8} height={8} />
      <span className='text-xs text-t-primary'>{label}</span>
    </div>
  )
}

export default ShipmentTotal
