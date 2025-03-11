'use client';

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
  },
  paris: {
    city: 'Paris',
    center: [48.8566, 2.3522],
    zoom: 13,
    locations: [
      {
        name: 'Le Baratin',
        type: 'food',
        coordinates: [48.8721, 2.3874],
        description: 'Authentic bistro with creative French cuisine'
      },
      {
        name: 'Pierre Hermé',
        type: 'food',
        coordinates: [48.8513, 2.3287],
        description: 'World-renowned patisserie famous for macarons'
      },
      {
        name: 'Fromagerie Barthélémy',
        type: 'food',
        coordinates: [48.8547, 2.3264],
        description: 'Exceptional cheese shop in the 7th arrondissement'
      },
      {
        name: 'Le Petit Journal',
        type: 'entertainment',
        coordinates: [48.8539, 2.3345],
        description: 'Historic jazz club in Saint-Germain'
      },
      {
        name: 'Little Red Door',
        type: 'entertainment',
        coordinates: [48.8632, 2.3624],
        description: 'Award-winning speakeasy cocktail bar'
      }
    ]
  },
  istanbul: {
    city: 'Istanbul',
    center: [41.0082, 28.9784],
    zoom: 13,
    locations: [
      {
        name: 'Asmalı Cavit',
        type: 'food',
        coordinates: [41.0316, 28.9773],
        description: 'Traditional meyhane in Beyoğlu'
      },
      {
        name: 'Kadıköy Market',
        type: 'food',
        coordinates: [40.9892, 29.0282],
        description: 'Vibrant market with street food and spices'
      },
      {
        name: 'Kurukahveci Mehmet Efendi',
        type: 'food',
        coordinates: [41.0165, 28.9719],
        description: 'Historic Turkish coffee shop since 1871'
      },
      {
        name: 'Babylon',
        type: 'entertainment',
        coordinates: [41.0335, 28.9757],
        description: 'Live music venue featuring local and international artists'
      },
      {
        name: 'Galata Tower',
        type: 'entertainment',
        coordinates: [41.0258, 28.9744],
        description: 'Historic tower with panoramic views and evening entertainment'
      }
    ]
  },
  newyork: {
    city: 'New York',
    center: [40.7128, -74.0060],
    zoom: 12,
    locations: [
      {
        name: 'Smorgasburg',
        type: 'food',
        coordinates: [40.7216, -73.9873],
        description: 'Open-air food market with diverse vendors'
      },
      {
        name: 'Russ & Daughters',
        type: 'food',
        coordinates: [40.7222, -73.9875],
        description: 'Iconic Jewish appetizing store since 1914'
      },
      {
        name: 'Other Half Brewing',
        type: 'food',
        coordinates: [40.6738, -73.9958],
        description: 'Popular craft brewery in Brooklyn'
      },
      {
        name: 'Blue Note Jazz Club',
        type: 'entertainment',
        coordinates: [40.7308, -74.0027],
        description: 'World-famous jazz venue in Greenwich Village'
      },
      {
        name: 'The Public Theater',
        type: 'entertainment',
        coordinates: [40.7287, -73.9914],
        description: 'Historic theater known for innovative productions'
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