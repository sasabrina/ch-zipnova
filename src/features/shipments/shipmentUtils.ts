import type { Shipment } from '../../types'

export type ShipmentTotals = {
  weightKg: number
  volumeM3: number
  packages: number
  valueArs: number
}

export const getShipmentTotals = (shipment: Shipment): ShipmentTotals =>
  shipment.packages.reduce(
    (totals, p) => ({
      weightKg: totals.weightKg + p.weightKg,
      volumeM3: totals.volumeM3 + p.volumeM3,
      packages: totals.packages + 1,
      valueArs: totals.valueArs + p.valueArs,
    }),
    { weightKg: 0, volumeM3: 0, packages: 0, valueArs: 0 },
  )

const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })

export const formatWeight = (kg: number) => `${kg} kg`
export const formatVolume = (m3: number) => `${m3.toFixed(3)} m3`
export const formatPackages = (n: number) => `${n} ${n === 1 ? 'bulto' : 'bultos'}`
export const formatValue = (ars: number) => `$${compact.format(ars)}` // 230000 → "$230K"
