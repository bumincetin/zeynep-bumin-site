'use client';

import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Create custom red pin icon
const createRedPinIcon = () => L.divIcon({
  className: 'custom-pin',
  html: `<div style="
    width: 24px;
    height: 24px;
    background-color: #ff4444;
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    transform: translate(-50%, -50%);
  "></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

type Feature = 'food' | 'drink' | 'music' | 'entertainment' | 'sightseeing' | 'culture';

interface Location {
  name: string;
  features: Feature[];
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
        features: ['food'],
        coordinates: [41.8879, 12.4773],
        description: 'Famous for traditional Roman pasta dishes'
      },
      {
        name: 'Roscioli',
        features: ['food', 'drink'],
        coordinates: [41.8939, 12.4756],
        description: 'Best Cacio e Pepe in Rome and excellent wine selection'
      },
      {
        name: 'Teatro dell\'Opera',
        features: ['entertainment', 'culture', 'music'],
        coordinates: [41.8998, 12.4956],
        description: 'Classical music and opera performances'
      },
      {
        name: 'Big Mama',
        features: ['entertainment', 'music', 'drink'],
        coordinates: [41.8891, 12.4707],
        description: 'Popular jazz venue with great cocktails'
      },
      {
        name: 'Pantheon',
        features: ['sightseeing', 'culture'],
        coordinates: [41.8986, 12.4769],
        description: 'Ancient Roman temple, architectural marvel'
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
        features: ['food', 'culture'],
        coordinates: [35.6654, 139.7707],
        description: 'Famous fish market and street food'
      },
      {
        name: 'Blue Note Tokyo',
        features: ['entertainment', 'music', 'drink'],
        coordinates: [35.6897, 139.7129],
        description: 'World-class jazz venue'
      },
      {
        name: 'Kabukiza Theatre',
        features: ['entertainment', 'culture'],
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
        features: ['food', 'culture', 'sightseeing'],
        coordinates: [41.3816, 2.1715],
        description: 'Historic market with fresh produce'
      },
      {
        name: 'Quimet & Quimet',
        features: ['food', 'drink'],
        coordinates: [41.3738, 2.1685],
        description: 'Famous for montaditos'
      },
      {
        name: 'Palau de la Música',
        features: ['entertainment', 'music', 'culture', 'sightseeing'],
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
        features: ['food', 'drink'],
        coordinates: [48.8721, 2.3874],
        description: 'Authentic bistro with creative French cuisine'
      },
      {
        name: 'Pierre Hermé',
        features: ['food'],
        coordinates: [48.8513, 2.3287],
        description: 'World-renowned patisserie famous for macarons'
      },
      {
        name: 'Fromagerie Barthélémy',
        features: ['food', 'culture'],
        coordinates: [48.8547, 2.3264],
        description: 'Exceptional cheese shop in the 7th arrondissement'
      },
      {
        name: 'Le Petit Journal',
        features: ['entertainment', 'music', 'drink'],
        coordinates: [48.8539, 2.3345],
        description: 'Historic jazz club in Saint-Germain'
      },
      {
        name: 'Little Red Door',
        features: ['drink', 'entertainment'],
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
        features: ['food', 'drink', 'culture'],
        coordinates: [41.0316, 28.9773],
        description: 'Traditional meyhane in Beyoğlu'
      },
      {
        name: 'Kadıköy Market',
        features: ['food', 'culture', 'sightseeing'],
        coordinates: [40.9892, 29.0282],
        description: 'Vibrant market with street food and spices'
      },
      {
        name: 'Kurukahveci Mehmet Efendi',
        features: ['drink', 'culture'],
        coordinates: [41.0165, 28.9719],
        description: 'Historic Turkish coffee shop since 1871'
      },
      {
        name: 'Babylon',
        features: ['entertainment', 'music', 'drink'],
        coordinates: [41.0335, 28.9757],
        description: 'Live music venue featuring local and international artists'
      },
      {
        name: 'Galata Tower',
        features: ['sightseeing', 'culture', 'entertainment'],
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
        features: ['food', 'culture'],
        coordinates: [40.7216, -73.9873],
        description: 'Open-air food market with diverse vendors'
      },
      {
        name: 'Russ & Daughters',
        features: ['food', 'culture'],
        coordinates: [40.7222, -73.9875],
        description: 'Iconic Jewish appetizing store since 1914'
      },
      {
        name: 'Other Half Brewing',
        features: ['drink'],
        coordinates: [40.6738, -73.9958],
        description: 'Popular craft brewery in Brooklyn'
      },
      {
        name: 'Blue Note Jazz Club',
        features: ['entertainment', 'music', 'drink'],
        coordinates: [40.7308, -74.0027],
        description: 'World-famous jazz venue in Greenwich Village'
      },
      {
        name: 'The Public Theater',
        features: ['entertainment', 'culture'],
        coordinates: [40.7287, -73.9914],
        description: 'Historic theater known for innovative productions'
      }
    ]
  }
};

interface ExploreMapProps {
  selectedCity?: string;
}

const featureLabels: Record<Feature, string> = {
  food: 'Food',
  drink: 'Drinks',
  music: 'Music',
  entertainment: 'Entertainment',
  sightseeing: 'Sightseeing',
  culture: 'Culture'
};

export default function ExploreMap({ selectedCity }: ExploreMapProps) {
  const [activeFeatures, setActiveFeatures] = useState<Set<Feature>>(
    new Set(['food', 'drink', 'music', 'entertainment', 'sightseeing', 'culture'] as Feature[])
  );
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<L.Marker[]>([]);

  const toggleFeature = (feature: Feature) => {
    const newFeatures = new Set(activeFeatures);
    if (newFeatures.has(feature)) {
      newFeatures.delete(feature);
    } else {
      newFeatures.add(feature);
    }
    setActiveFeatures(newFeatures);
  };

  // Initialize map
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Fix Leaflet icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/zeynep-bumin-site/images/marker-icon-2x.png',
        iconUrl: '/zeynep-bumin-site/images/marker-icon.png',
        shadowUrl: '/zeynep-bumin-site/images/marker-shadow.png',
      });

      if (!map) {
        const newMap = L.map('map');
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }).addTo(newMap);
        setMap(newMap);
      }
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  // Handle markers
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.remove());
    const newMarkers: L.Marker[] = [];

    try {
      // Create markers for selected city or all cities
      if (selectedCity && cityLocations[selectedCity]) {
        const cityData = cityLocations[selectedCity];
        map.setView(cityData.center, cityData.zoom);

        // Add markers for the selected city
        cityData.locations.forEach(location => {
          if (location.features.some(feature => activeFeatures.has(feature))) {
            const marker = L.marker(location.coordinates, { icon: createRedPinIcon() })
              .addTo(map)
              .bindPopup(`
                <strong>${location.name}</strong><br>
                <em>${location.features.map(f => featureLabels[f]).join(', ')}</em><br>
                ${location.description}
              `);
            newMarkers.push(marker);
          }
        });
      } else {
        // Show all cities if no specific city is selected
        const bounds = new L.LatLngBounds([]);
        Object.values(cityLocations).forEach(cityData => {
          cityData.locations.forEach(location => {
            if (location.features.some(feature => activeFeatures.has(feature))) {
              const marker = L.marker(location.coordinates, { icon: createRedPinIcon() })
                .addTo(map)
                .bindPopup(`
                  <strong>${location.name}</strong><br>
                  <em>${cityData.city}</em><br>
                  <em>${location.features.map(f => featureLabels[f]).join(', ')}</em><br>
                  ${location.description}
                `);
              bounds.extend(location.coordinates);
              newMarkers.push(marker);
            }
          });
        });
        if (bounds.getNorthEast() && bounds.getSouthWest()) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      }

      setMarkers(newMarkers);
    } catch (error) {
      console.error('Error updating markers:', error);
    }

    return () => {
      newMarkers.forEach(marker => marker.remove());
    };
  }, [selectedCity, activeFeatures, map]);

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Filter by Features</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(featureLabels).map(([feature, label]) => (
            <button
              key={feature}
              onClick={() => toggleFeature(feature as Feature)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeFeatures.has(feature as Feature)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-[600px] relative rounded-lg overflow-hidden">
        <div id="map" className="w-full h-full"></div>
      </div>
    </div>
  );
} 