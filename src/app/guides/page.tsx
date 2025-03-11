'use client';

import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Link from 'next/link';

const cities = [
  { name: 'Rome', image: '/images/roma.jpg', guides: ['Hidden Cafes', 'Ancient Secrets', 'Local Markets'] },
  { name: 'Tokyo', image: '/images/tokyo.jpg', guides: ['Street Food Tour', 'Temple Walk', 'Night Life'] },
  { name: 'Barcelona', image: '/images/barcelona.jpg', guides: ['Tapas Trail', 'Gothic Quarter', 'Beach Life'] },
  { name: 'Paris', image: '/images/paris.jpg', guides: ['Hidden Bistros', 'Art Walk', 'Local Life'] },
  { name: 'Istanbul', image: '/images/istanbul.jpg', guides: ['Spice Markets', 'Bosphorus Tour', 'Tea Gardens'] },
  { name: 'New York', image: '/images/newyork.jpg', guides: ['Hidden Delis', 'Local Parks', 'Food Scene'] }
];

const genericGuides = [
  { title: 'Finding Local Events', description: 'Tips for discovering authentic local festivals and events.' },
  { title: 'Transportation Guide', description: 'Navigate like a local using public transport and walking routes.' },
  { title: 'Food Explorer Guide', description: 'How to find and enjoy authentic local cuisine safely.' },
  { title: 'Cultural Etiquette', description: 'Essential customs and manners for respectful travel.' }
];

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
              {cities.map((city) => (
                <Link 
                  href={`/guides/${city.name.toLowerCase()}`} 
                  key={city.name}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
                >
                  <div className="relative">
                    <img 
                      src={city.image} 
                      alt={city.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-200" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">{city.name}</h3>
                    <ul className="space-y-2">
                      {city.guides.map((guide) => (
                        <li key={guide} className="flex items-center">
                          <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                          {guide}
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
        <section className="py-16 bg-white">
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