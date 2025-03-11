'use client';

import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Create custom pin icons for different categories
const createPinIcon = (color: string) => L.divIcon({
  className: 'custom-pin',
  html: `<div style="
    width: 24px;
    height: 24px;
    background-color: ${color};
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    transform: translate(-50%, -50%);
  "></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const getPinColor = (features: Feature[]): string => {
  if (features.some(f => ['music', 'entertainment'].includes(f))) {
    return 'var(--color-lavender)'; // Lavender for entertainment/music
  } else if (features.some(f => ['food', 'drink'].includes(f))) {
    return 'var(--color-terra)'; // Terra cotta for food/drink
  } else {
    return 'var(--color-sage)'; // Sage for culture/sightseeing
  }
};

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

export default function ExploreMap({ selectedCity: initialSelectedCity }: ExploreMapProps) {
  const [activeFeatures, setActiveFeatures] = useState<Set<Feature>>(
    new Set(['food', 'drink', 'music', 'entertainment', 'sightseeing', 'culture'] as Feature[])
  );
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<L.Marker[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(initialSelectedCity);

  const toggleFeature = (feature: Feature) => {
    const newFeatures = new Set(activeFeatures);
    if (newFeatures.has(feature)) {
      newFeatures.delete(feature);
    } else {
      newFeatures.add(feature);
    }
    setActiveFeatures(newFeatures);
  };

  const handleCitySelect = (city: string | undefined) => {
    setSelectedCity(city);
    if (map && city && cityLocations[city]) {
      const { center, zoom } = cityLocations[city];
      map.setView(center, zoom);
    } else if (map && !city) {
      // Show all cities if no city is selected
      const bounds = new L.LatLngBounds([]);
      Object.values(cityLocations).forEach(cityData => {
        cityData.locations.forEach(location => {
          bounds.extend(location.coordinates);
        });
      });
      if (bounds.getNorthEast() && bounds.getSouthWest()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
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
            const pinColor = getPinColor(location.features);
            const marker = L.marker(location.coordinates, { icon: createPinIcon(pinColor) })
              .addTo(map)
              .bindPopup(`
                <div class="custom-popup handwritten">
                  <div class="text-xl font-bold mb-2" style="color: var(--color-earth);">✧ ${location.name} ✧</div>
                  <div class="mb-2" style="color: var(--color-clay);">
                    ${location.features.map(f => `${getFeatureIcon(f)} ${featureLabels[f]}`).join(' • ')}
                  </div>
                  <div style="color: var(--color-terra); font-family: 'Quicksand', sans-serif;">
                    ${location.description}
                  </div>
                </div>
              `, {
                className: 'bohemian-popup',
                maxWidth: 300
              });
            newMarkers.push(marker);
          }
        });
      } else {
        // Show all cities if no specific city is selected
        const bounds = new L.LatLngBounds([]);
        Object.values(cityLocations).forEach(cityData => {
          cityData.locations.forEach(location => {
            if (location.features.some(feature => activeFeatures.has(feature))) {
              const pinColor = getPinColor(location.features);
              const marker = L.marker(location.coordinates, { icon: createPinIcon(pinColor) })
                .addTo(map)
                .bindPopup(`
                  <div class="custom-popup handwritten">
                    <div class="text-xl font-bold mb-2" style="color: var(--color-earth);">✧ ${location.name} ✧</div>
                    <div class="mb-1" style="color: var(--color-clay); font-family: 'Quicksand', sans-serif;">
                      ${cityData.city}
                    </div>
                    <div class="mb-2" style="color: var(--color-clay);">
                      ${location.features.map(f => `${getFeatureIcon(f)} ${featureLabels[f]}`).join(' • ')}
                    </div>
                    <div style="color: var(--color-terra); font-family: 'Quicksand', sans-serif;">
                      ${location.description}
                    </div>
                  </div>
                `, {
                  className: 'bohemian-popup',
                  maxWidth: 300
                });
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

  // Add legend to explain marker colors
  useEffect(() => {
    if (!map) return;

    class LegendControl extends L.Control {
      onAdd(map: L.Map) {
        const div = L.DomUtil.create('div', 'info legend bohemian-card');
        div.style.backgroundColor = 'var(--color-cream)';
        div.style.padding = '15px';
        div.style.borderRadius = '12px';
        div.style.border = '2px solid var(--color-sand)';
        div.style.fontFamily = "'Quicksand', sans-serif";
        div.style.fontSize = '14px';
        div.style.maxWidth = '200px';

        div.innerHTML = `
          <div style="margin-bottom: 10px;" class="handwritten text-xl">✧ Local Treasures ✧</div>
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <div style="width: 16px; height: 16px; background: var(--color-lavender); border-radius: 50%; margin-right: 8px; border: 2px solid white;"></div>
            <span>🎵 Arts & Entertainment</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <div style="width: 16px; height: 16px; background: var(--color-terra); border-radius: 50%; margin-right: 8px; border: 2px solid white;"></div>
            <span>🍴 Food & Drinks</span>
          </div>
          <div style="display: flex; align-items: center;">
            <div style="width: 16px; height: 16px; background: var(--color-sage); border-radius: 50%; margin-right: 8px; border: 2px solid white;"></div>
            <span>🏛️ Culture & Sights</span>
          </div>
        `;

        return div;
      }
    }

    const legend = new LegendControl({ position: 'bottomright' });
    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return (
    <div className="space-y-6 relative">
      {/* Decorative elements */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 handwritten text-2xl text-terra opacity-80">
        ✧ Discover Hidden Gems ✧
      </div>
      
      <div className="bohemian-card space-y-6 relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-sand opacity-50 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-sand opacity-50 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-sand opacity-50 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-sand opacity-50 rounded-br-lg"></div>

        <div>
          <h3 className="text-2xl mb-4 text-center">Choose Your Journey</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => handleCitySelect(undefined)}
              className={`btn-bohemian ${
                !selectedCity ? 'scale-105' : 'opacity-90 hover:opacity-100'
              }`}
            >
              ⋆ All Cities ⋆
            </button>
            {Object.entries(cityLocations).map(([cityKey, cityData]) => (
              <button
                key={cityKey}
                onClick={() => handleCitySelect(cityKey)}
                className={`btn-bohemian ${
                  selectedCity === cityKey ? 'scale-105' : 'opacity-90 hover:opacity-100'
                }`}
              >
                ⋆ {cityData.city} ⋆
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl mb-4 text-center">Explore Experiences</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(featureLabels).map(([feature, label]) => (
              <button
                key={feature}
                onClick={() => toggleFeature(feature as Feature)}
                className={`feature-btn ${
                  activeFeatures.has(feature as Feature) ? 'active' : ''
                }`}
              >
                {getFeatureIcon(feature as Feature)} {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bohemian-card h-[600px] relative overflow-hidden">
        <div id="map" className="w-full h-full rounded-lg"></div>
      </div>

      {/* Decorative bottom element */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 handwritten text-xl text-terra opacity-80">
        ❀ Local Secrets Await ❀
      </div>
    </div>
  );
}

// Helper function to get feature icons
function getFeatureIcon(feature: Feature): string {
  const icons: Record<Feature, string> = {
    food: '🍴',
    drink: '🍷',
    music: '🎵',
    entertainment: '🎭',
    sightseeing: '🏛️',
    culture: '🎨'
  };
  return icons[feature];
} 