'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const ExploreMap = dynamic(() => import('../../components/ExploreMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-xl text-gray-600">Loading map...</div>
    </div>
  ),
});

export default function ExplorePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Our Destinations
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Discover all our recommended places on the map, from local eateries to entertainment venues.
            </p>
          </div>
        </div>

        {/* Map Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ExploreMap />
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Food & Drink Spots</h3>
                <p className="text-gray-600">
                  Red markers indicate restaurants, markets, and other culinary destinations.
                  Click on any marker to see details about the location.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Entertainment Venues</h3>
                <p className="text-gray-600">
                  Blue markers show music venues, theaters, and other entertainment spots.
                  Each marker contains information about performances and shows.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 