# Zipnova – Challenge front-end

Herramienta para que un operador logístico gestione las entregas del día: ver los envíos en una lista y en un mapa, filtrarlos y asignarles conductor y vehículo.

## Qué hace

### Listado de envíos

- Cada envío se muestra en una card con su número de entrega y su código de seguimiento.
- Al expandir la card se muestra el detalle de la entrega, de cada paquete y el conductor asignado.

### Mapa

- Cada envío aparece como un marcador en su dirección de destino.
- La selección está sincronizada: al hacer click en el ícono de ubicación de una card se resalta su marcador, y al hacer click en un marcador se resalta su card.

### Filtros

- **Búsqueda:** selector múltiple que busca por número de entrega, código de seguimiento o cliente, con opción de seleccionar todos los resultados.
- **Alta prioridad:** muestra solo los envíos urgentes.
- **Limpiar filtros:** vuelve a la vista inicial.
- Por defecto se muestran solo los envíos activos (pendientes, asignados y en tránsito). Los entregados y cancelados quedan ocultos.

### Asignación

- Los envíos pendientes se pueden asignar desde su card.
- En el formulario se elige el conductor, y su vehículo habitual se preselecciona.
- Se valida que el vehículo tenga capacidad de peso y volumen suficiente para el envío.
- Al confirmar, el envío pasa a estado "asignado" y la card muestra el nombre del conductor.

Los datos son un mock local, con fechas relativas al día actual.

## Cómo correrlo

```bash
pnpm install
pnpm dev
```

Otros scripts: `pnpm build`, `pnpm lint`, `pnpm format`, `pnpm test`.

## Stack

- React 19
- TypeScript
- Tailwind CSS v4
- Redux Toolkit
- React Hook Form
- Vitest
- React Testing Library
- Headless UI
- react-leaflet
- date-fns

## Uso de IA

Usé Claude como asistente durante el desarrollo para planificar los tiempos, revisar el código, hacer research de librerías, crear el mock de datos y tokens iniciales.
No se usó IA para escribir código.

## Estructura

```
src/
├── ui/         Componentes genéricos de librería. No conocen el store ni la lógica de envíos: todo entra por props.
├── features/   Componentes específicos de la app. Se conectan al store.
├── store/      Slices, selectores y hooks tipados.
├── data/       Dataset mock.
└── types/      Tipos compartidos.
```

## Próximos pasos

- Menú de filtros con búsqueda por **dirección** y filtro por **fecha** (calendario).
- Selector de **estados** en la barra de filtros.
- Centrar el mapa en el envío seleccionado y hacer scroll hasta su card.
