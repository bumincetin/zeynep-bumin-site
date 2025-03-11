import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/zeynep-bumin-site/images/marker-icon-2x.png',
    iconUrl: '/zeynep-bumin-site/images/marker-icon.png',
    shadowUrl: '/zeynep-bumin-site/images/marker-shadow.png',
  });
};

interface Location {
  name: string;
  type: string;
  coordinates: [number, number];
  description: string;
}

interface CityLocations {
  city: string;
  center: [number, number];
  zoom: number;
  locations: Location[];
}

const cityLocations: { [key: string]: CityLocations } = {
  rome: {
    city: 'Rome',
    center: [41.9028, 12.4964],
    zoom: 13,
    locations: [
      {
        name: 'Da Enzo al 29',
        type: 'food',
        coordinates: [41.8879, 12.4773],
        description: 'Famous for traditional Roman pasta dishes'
      },
      {
        name: 'Roscioli',
        type: 'food',
        coordinates: [41.8939, 12.4756],
        description: 'Best Cacio e Pepe in Rome'
      },
      {
        name: 'Teatro dell\'Opera',
        type: 'entertainment',
        coordinates: [41.8998, 12.4956],
        description: 'Classical music and opera performances'
      },
      {
        name: 'Big Mama',
        type: 'entertainment',
        coordinates: [41.8891, 12.4707],
        description: 'Popular jazz venue'
      }
    ]
  },
  tokyo: {
    city: 'Tokyo',
    center: [35.6762, 139.6503],
    zoom: 12,
    locations: [
      {
        name: 'Tsukiji Outer Market',
        type: 'food',
        coordinates: [35.6654, 139.7707],
        description: 'Famous fish market and street food'
      },
      {
        name: 'Blue Note Tokyo',
        type: 'entertainment',
        coordinates: [35.6897, 139.7129],
        description: 'World-class jazz venue'
      },
      {
        name: 'Kabukiza Theatre',
        type: 'entertainment',
        coordinates: [35.6690, 139.7649],
        description: 'Traditional Kabuki performances'
      }
    ]
  },
  barcelona: {
    city: 'Barcelona',
    center: [41.3851, 2.1734],
    zoom: 13,
    locations: [
      {
        name: 'La Boqueria',
        type: 'food',
        coordinates: [41.3816, 2.1715],
        description: 'Historic market with fresh produce'
      },
      {
        name: 'Quimet & Quimet',
        type: 'food',
        coordinates: [41.3738, 2.1685],
        description: 'Famous for montaditos'
      },
      {
        name: 'Palau de la Música',
        type: 'entertainment',
        coordinates: [41.3875, 2.1752],
        description: 'Modernist concert hall'
      }
    ]
  }
};

interface ExploreMapProps {
  selectedCity?: string;
}

export default function ExploreMap({ selectedCity }: ExploreMapProps) {
  useEffect(() => {
    // Fix Leaflet icons
    fixLeafletIcons();

    // Initialize map
    const map = L.map('map');

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create markers for selected city or all cities
    if (selectedCity && cityLocations[selectedCity]) {
      const cityData = cityLocations[selectedCity];
      map.setView(cityData.center, cityData.zoom);

      // Add markers for the selected city
      cityData.locations.forEach(location => {
        const marker = L.marker(location.coordinates)
          .addTo(map)
          .bindPopup(`
            <strong>${location.name}</strong><br>
            ${location.description}
          `);
      });
    } else {
      // Show all cities if no specific city is selected
      const bounds = new L.LatLngBounds([]);
      Object.values(cityLocations).forEach(cityData => {
        cityData.locations.forEach(location => {
          const marker = L.marker(location.coordinates)
            .addTo(map)
            .bindPopup(`
              <strong>${location.name}</strong><br>
              <em>${cityData.city}</em><br>
              ${location.description}
            `);
          bounds.extend(location.coordinates);
        });
      });
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      map.remove();
    };
  }, [selectedCity]);

  return (
    <div className="w-full h-[600px] relative">
      <div id="map" className="w-full h-full"></div>
    </div>
  );
} 