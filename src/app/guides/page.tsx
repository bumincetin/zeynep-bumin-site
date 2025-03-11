import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const cities = [
  { 
    name: 'Rome', 
    image: '/zeynep-bumin-site/images/roma.jpg', 
    sections: [
      'Traditional Pasta & Pizza',
      'Wine & Aperitivo',
      'Live Music & Shows'
    ]
  },
  { 
    name: 'Tokyo', 
    image: '/zeynep-bumin-site/images/tokyo.jpg', 
    sections: [
      'Ramen & Street Food',
      'Izakaya & Sake',
      'Traditional & Modern Entertainment'
    ]
  },
  { 
    name: 'Barcelona', 
    image: '/zeynep-bumin-site/images/barcelona.jpg', 
    sections: [
      'Tapas & Catalan Wine',
      'Market & Local Cuisine',
      'Flamenco & Nightlife'
    ]
  },
  { 
    name: 'Paris', 
    image: '/zeynep-bumin-site/images/paris.jpg', 
    sections: [
      'Bistros & Fine Dining',
      'Wine & Cheese',
      'Jazz & Cabaret'
    ]
  },
  { 
    name: 'Istanbul', 
    image: '/zeynep-bumin-site/images/istanbul.jpg', 
    sections: [
      'Meyhane & Raki',
      'Street Food & Spices',
      'Traditional Music & Dance'
    ]
  },
  { 
    name: 'New York', 
    image: '/zeynep-bumin-site/images/newyork.jpg', 
    sections: [
      'Food Trucks & Delis',
      'Craft Beer & Cocktails',
      'Live Music & Broadway'
    ]
  }
] as const;

const genericGuides = [
  { title: 'Finding Local Events', description: 'Tips for discovering authentic local festivals and events.' },
  { title: 'Transportation Guide', description: 'Navigate like a local using public transport and walking routes.' },
  { title: 'Food Explorer Guide', description: 'How to find and enjoy authentic local cuisine safely.' },
  { title: 'Cultural Etiquette', description: 'Essential customs and manners for respectful travel.' }
] as const;

export default function Guides() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Local Travel Guides
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Discover authentic experiences and hidden gems with our curated city guides and travel tips.
            </p>
          </div>
        </div>

        {/* Cities Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Cities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cities.map((city, index) => (
                <Link 
                  href={`/guides/${city.name.toLowerCase()}`} 
                  key={city.name}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
                >
                  <div className="relative h-48">
                    <Image 
                      src={city.image} 
                      alt={city.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-200" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">{city.name}</h3>
                    <ul className="space-y-2">
                      {city.sections.map((section) => (
                        <li key={section} className="flex items-center">
                          <span className="w-2 h-2 bg-clay-500 rounded-full mr-3"></span>
                          {section}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 text-blue-600 hover:text-blue-800 font-semibold">
                      View All Guides →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Generic Guides */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Essential Travel Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {genericGuides.map((guide) => (
                <div 
                  key={guide.title} 
                  className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-white hover:bg-gray-50"
                >
                  <h3 className="text-xl font-semibold mb-3">{guide.title}</h3>
                  <p className="text-gray-600">{guide.description}</p>
                  <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                    Read More →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 