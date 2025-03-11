'use client';

import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '0.4'
        }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-6">
          Experience Cities Like a Local
        </h1>

        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Discover hidden gems, authentic experiences, and local secrets.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/guides"
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Explore Local Guides
          </Link>
          <Link
            href="/community"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10"
          >
            Join Community
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero; 