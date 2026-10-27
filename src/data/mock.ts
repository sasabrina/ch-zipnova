import type { Driver, Package, Shipment, Vehicle } from "../types";

// Fecha ISO a `days` días de hoy, a la hora indicada (hora local)
const at = (days: number, time: string): string => {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

let packageSeq = 11259495;

// [peso kg, volumen m3, valor ARS]
const pkgs = (
  shipmentId: string,
  items: [number, number, number][],
): Package[] =>
  items.map(([weightKg, volumeM3, valueArs], i) => ({
    id: `${shipmentId}-p${i + 1}`,
    code: `${packageSeq++}-1`,
    name: `Package ${i + 1}`,
    weightKg,
    volumeM3,
    valueArs,
  }));

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    plate: "AF 123 BC",
    model: "Fiat Fiorino",
    type: "van",
    capacityKg: 600,
    capacityM3: 3,
  },
  {
    id: "v2",
    plate: "AE 456 KD",
    model: "Renault Kangoo",
    type: "van",
    capacityKg: 800,
    capacityM3: 4,
  },
  {
    id: "v3",
    plate: "AD 789 FG",
    model: "Mercedes-Benz Sprinter",
    type: "van",
    capacityKg: 1500,
    capacityM3: 10.5,
  },
  {
    id: "v4",
    plate: "A123 BCD",
    model: "Honda CG 150",
    type: "motorcycle",
    capacityKg: 30,
    capacityM3: 0.15,
  },
  {
    id: "v5",
    plate: "AG 321 HJ",
    model: "Iveco Daily",
    type: "truck",
    capacityKg: 3500,
    capacityM3: 16,
  },
];

export const drivers: Driver[] = [
  {
    id: "d1",
    name: "Martín Gómez",
    phone: "+54 9 11 5123-4567",
    defaultVehicleId: "v1",
  },
  {
    id: "d2",
    name: "Lucía Fernández",
    phone: "+54 9 11 5234-5678",
    defaultVehicleId: "v2",
  },
  {
    id: "d3",
    name: "Diego Romero",
    phone: "+54 9 11 5345-6789",
    defaultVehicleId: "v3",
  },
  {
    id: "d4",
    name: "Camila Herrera",
    phone: "+54 9 11 5456-7890",
    defaultVehicleId: "v4",
  },
  // Libre: sin envíos asignados, útil para probar el form de asignación
  {
    id: "d5",
    name: "Santiago Ruiz",
    phone: "+54 9 11 5567-8901",
    defaultVehicleId: "v5",
  },
];

type Seed = Omit<Shipment, "trackingNumber" | "packages"> & {
  items: [number, number, number][];
};

const seeds: Seed[] = [
  {
    id: "123445",
    customer: "Librería El Ateneo",
    destination: {
      lat: -34.5958,
      lng: -58.394,
      address: "Av. Santa Fe 1860",
      neighborhood: "Recoleta",
    },
    status: "pending",
    priority: "high",
    estimatedDelivery: at(0, "14:00"),
    items: [
      [30, 0.1, 120000],
      [30, 0.1, 110000],
    ], // igual al ejemplo del Figma: 60 kg · 0,200 m3 · 2 · $230K
  },
  {
    id: "123446",
    customer: "Farmacia Central",
    destination: {
      lat: -34.604,
      lng: -58.385,
      address: "Av. Corrientes 1234",
      neighborhood: "San Nicolás",
    },
    status: "pending",
    priority: "high",
    estimatedDelivery: at(0, "12:00"),
    items: [[4, 0.02, 85000]],
  },
  {
    id: "123447",
    customer: "Tech Store SRL",
    destination: {
      lat: -34.599,
      lng: -58.3747,
      address: "Florida 537",
      neighborhood: "San Nicolás",
    },
    status: "assigned",
    priority: "medium",
    driverId: "d1",
    vehicleId: "v1",
    estimatedDelivery: at(0, "16:00"),
    items: [
      [12, 0.06, 950000],
      [8, 0.04, 620000],
    ],
  },
  {
    id: "123448",
    customer: "Café Martínez",
    destination: {
      lat: -34.5617,
      lng: -58.4561,
      address: "Av. Cabildo 2280",
      neighborhood: "Belgrano",
    },
    status: "in_transit",
    priority: "high",
    driverId: "d2",
    vehicleId: "v2",
    estimatedDelivery: at(0, "11:00"),
    items: [
      [25, 0.12, 64000],
      [25, 0.12, 64000],
      [18, 0.08, 41000],
    ],
  },
  {
    id: "123449",
    customer: "Mercado Caballito",
    destination: {
      lat: -34.6185,
      lng: -58.4357,
      address: "Av. Rivadavia 5100",
      neighborhood: "Caballito",
    },
    status: "in_transit",
    priority: "medium",
    driverId: "d2",
    vehicleId: "v2",
    estimatedDelivery: at(0, "13:00"),
    items: [[40, 0.3, 150000]],
  },
  {
    id: "123450",
    customer: "Anticuario Defensa",
    destination: {
      lat: -34.6197,
      lng: -58.3714,
      address: "Defensa 1050",
      neighborhood: "San Telmo",
    },
    status: "pending",
    priority: "low",
    estimatedDelivery: at(1, "10:00"),
    items: [[15, 0.25, 780000]],
  },
  {
    id: "123451",
    customer: "Óptica Visión",
    destination: {
      lat: -34.596,
      lng: -58.3925,
      address: "Av. Callao 1020",
      neighborhood: "Recoleta",
    },
    status: "delivered",
    priority: "low",
    driverId: "d4",
    vehicleId: "v4",
    estimatedDelivery: at(-1, "15:00"),
    items: [[2, 0.01, 210000]],
  },
  {
    id: "123452",
    customer: "Distribuidora Norte",
    destination: {
      lat: -34.547,
      lng: -58.463,
      address: "Av. del Libertador 7000",
      neighborhood: "Núñez",
    },
    status: "assigned",
    priority: "high",
    driverId: "d3",
    vehicleId: "v3",
    estimatedDelivery: at(0, "17:00"),
    items: [
      [120, 0.8, 540000],
      [95, 0.6, 410000],
    ],
  },
  {
    id: "123453",
    customer: "Bicicletería Urquiza",
    destination: {
      lat: -34.573,
      lng: -58.489,
      address: "Av. Triunvirato 4500",
      neighborhood: "Villa Urquiza",
    },
    status: "pending",
    priority: "medium",
    estimatedDelivery: at(1, "12:00"),
    items: [[22, 0.35, 890000]],
  },
  {
    id: "123454",
    customer: "Panadería La Esquina",
    destination: {
      lat: -34.6235,
      lng: -58.406,
      address: "Av. San Juan 2800",
      neighborhood: "San Cristóbal",
    },
    status: "cancelled",
    priority: "low",
    estimatedDelivery: at(0, "09:00"),
    items: [[10, 0.05, 32000]],
  },
  {
    id: "123455",
    customer: "Estudio Contable Pérez",
    destination: {
      lat: -34.6085,
      lng: -58.3735,
      address: "Av. de Mayo 575",
      neighborhood: "Monserrat",
    },
    status: "in_transit",
    priority: "medium",
    driverId: "d4",
    vehicleId: "v4",
    estimatedDelivery: at(0, "12:30"),
    items: [
      [1.5, 0.01, 15000],
      [1, 0.01, 12000],
    ],
  },
  {
    id: "123456",
    customer: "Ferretería Flores",
    destination: {
      lat: -34.637,
      lng: -58.456,
      address: "Av. Directorio 3500",
      neighborhood: "Flores",
    },
    status: "assigned",
    priority: "low",
    driverId: "d1",
    vehicleId: "v1",
    estimatedDelivery: at(1, "14:00"),
    items: [[60, 0.4, 180000]],
  },
  {
    id: "123457",
    customer: "Vinoteca Colegiales",
    destination: {
      lat: -34.579,
      lng: -58.457,
      address: "Av. Álvarez Thomas 1200",
      neighborhood: "Colegiales",
    },
    status: "in_transit",
    priority: "high",
    driverId: "d1",
    vehicleId: "v1",
    estimatedDelivery: at(0, "15:00"),
    items: [
      [18, 0.09, 320000],
      [18, 0.09, 295000],
    ],
  },
  {
    id: "123458",
    customer: "Hospital Barracas",
    destination: {
      lat: -34.639,
      lng: -58.377,
      address: "Av. Montes de Oca 1000",
      neighborhood: "Barracas",
    },
    status: "pending",
    priority: "high",
    estimatedDelivery: at(0, "18:00"),
    items: [[8, 0.04, 1250000]],
  },
  {
    id: "123459",
    customer: "Juguetería Olivos",
    destination: {
      lat: -34.511,
      lng: -58.492,
      address: "Av. Maipú 2500",
      neighborhood: "Olivos",
    },
    status: "assigned",
    priority: "medium",
    driverId: "d3",
    vehicleId: "v3",
    estimatedDelivery: at(2, "11:00"),
    items: [
      [35, 0.5, 410000],
      [20, 0.3, 230000],
      [15, 0.2, 170000],
    ],
  },
  {
    id: "123460",
    customer: "Club Atlético Avellaneda",
    destination: {
      lat: -34.662,
      lng: -58.365,
      address: "Av. Mitre 600",
      neighborhood: "Avellaneda",
    },
    status: "delivered",
    priority: "medium",
    driverId: "d3",
    vehicleId: "v3",
    estimatedDelivery: at(-1, "11:00"),
    items: [[80, 0.9, 260000]],
  },
  {
    id: "123461",
    customer: "Supermercado Liniers",
    destination: {
      lat: -34.642,
      lng: -58.525,
      address: "Av. Rivadavia 11000",
      neighborhood: "Liniers",
    },
    status: "pending",
    priority: "medium",
    estimatedDelivery: at(2, "09:30"),
    items: [[200, 1.5, 480000]], // excede la moto y casi todo: buen caso para validar capacidad
  },
  {
    id: "123462",
    customer: "Florería Palermo",
    destination: {
      lat: -34.5885,
      lng: -58.4305,
      address: "Thames 1650",
      neighborhood: "Palermo",
    },
    status: "in_transit",
    priority: "low",
    driverId: "d4",
    vehicleId: "v4",
    estimatedDelivery: at(0, "10:30"),
    items: [[3, 0.04, 45000]],
  },
  {
    id: "123463",
    customer: "Imprenta Monserrat",
    destination: {
      lat: -34.613,
      lng: -58.388,
      address: "Av. Belgrano 1500",
      neighborhood: "Monserrat",
    },
    status: "assigned",
    priority: "medium",
    driverId: "d2",
    vehicleId: "v2",
    estimatedDelivery: at(1, "16:00"),
    items: [
      [45, 0.2, 98000],
      [45, 0.2, 98000],
    ],
  },
  {
    id: "123464",
    customer: "Deportes Alto Palermo",
    destination: {
      lat: -34.588,
      lng: -58.4108,
      address: "Av. Santa Fe 3253",
      neighborhood: "Palermo",
    },
    status: "delivered",
    priority: "high",
    driverId: "d2",
    vehicleId: "v2",
    estimatedDelivery: at(-1, "17:00"),
    items: [[14, 0.1, 370000]],
  },
];

export const shipments: Shipment[] = seeds.map(({ items, ...s }, i) => ({
  ...s,
  trackingNumber: `0999-${2234908283 + i}`,
  packages: pkgs(s.id, items),
}));
