import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { useEffect } from 'react'

// Fix for default marker icons in react-leaflet
const defaultIcon = new Icon({
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

export default function InteractiveMap() {
  useEffect(() => {
    // Fix for leaflet CSS in Next.js
    const L = require('leaflet')
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/marker-icon-2x.png',
      iconUrl: '/images/marker-icon.png',
      shadowUrl: '/images/marker-shadow.png',
    })
  }, [])

  const locations = [
    {
      id: 1,
      name: "Local Market",
      description: "Traditional market with fresh local produce",
      position: [40.7128, -74.0060]
    },
    {
      id: 2,
      name: "Hidden Cafe",
      description: "Cozy cafe loved by locals",
      position: [40.7150, -74.0080]
    },
    // Add more locations as needed
  ]

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[40.7128, -74.0060]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.position as [number, number]}
            icon={defaultIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-display text-lg mb-1">{location.name}</h3>
                <p className="text-sm text-gray-600">{location.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
} 