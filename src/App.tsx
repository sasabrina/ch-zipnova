import './App.css'
import { FiltersBar } from './features/filters'
import ShipmentsMap from './features/map/ShipmentsMap'
import ShipmentList from './features/shipments/ShipmentList'

function App() {
  return (
    <div className='flex h-screen flex-col bg-canvas p-4 text-t-primary'>
      <FiltersBar />

      <div className='mt-4 flex min-h-0 flex-1'>
        <ShipmentList />

        {/* mapa */}
        <ShipmentsMap />
      </div>
    </div>
  )
}

export default App
