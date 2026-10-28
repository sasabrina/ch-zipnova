// Dataset mock: 20 envíos, 5 conductores y 5 vehículos en CABA y alrededores.
// Las coordenadas son aproximadas (a nivel cuadra/barrio).
// Las fechas se calculan relativas a hoy para que el filtro de fecha siempre tenga datos.

export type ShipmentStatus = 'pending' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled'
export type Priority = 'low' | 'medium' | 'high'

export type Package = {
  id: string
  code: string
  name: string
  weightKg: number
  volumeM3: number
  valueArs: number
}

export type Shipment = {
  id: string
  trackingNumber: string
  customer: string
  destination: {
    lat: number
    lng: number
    address: string
    neighborhood: string
  }
  status: ShipmentStatus
  priority: Priority
  driverId?: string
  vehicleId?: string
  estimatedDelivery: string // ISO 8601
  packages: Package[]
}

export type Driver = {
  id: string
  name: string
  phone: string
  defaultVehicleId?: string
}

export type VehicleType = 'motorcycle' | 'van' | 'truck'

export type Vehicle = {
  id: string
  plate: string
  model: string
  type: VehicleType
  capacityKg: number
  capacityM3: number
}

export type SelectOption = {
  label: string
  value: string
  filterTerm?: string
}
