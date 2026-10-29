import type { Package } from '../../types'
import Divider from '../../ui/Divider/Divider'
import BoxIcon from '../../ui/icons/BoxIcon'
import { formatVolume, formatWeight } from './shipmentUtils'

type ShipmentPackageProps = {
  pkg: Package
}

const ShipmentPackage = ({ pkg }: ShipmentPackageProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <Divider className='mt-3' />
      <div className='flex items-center gap-2'>
        <BoxIcon width={12} height={12} />
        <p className='text-base text-t-primary'>{pkg.name}</p>
      </div>

      <div className='flex justify-between rounded-lg bg-surface-02 p-2'>
        <p className='text-xs'>{pkg.code}</p>
        <p className='text-xs'>
          {formatWeight(pkg.weightKg)} - {formatVolume(pkg.volumeM3)}
        </p>
      </div>
    </div>
  )
}

export default ShipmentPackage
