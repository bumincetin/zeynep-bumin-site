'use client';

import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FiMapPin, FiCompass, FiCoffee, FiUsers } from 'react-icons/fi';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main>
        <Hero />

        {/* Featured Local Guides Section */}
        <section className="py-20 bg-earth-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeIn}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl sm:text-4xl text-earth-900 mb-4">
                Discover Local Experiences
              </h2>
              <p className="text-earth-700 max-w-2xl mx-auto">
                Immerse yourself in authentic local culture with our curated guides and experiences
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { city: 'Rome', image: '/images/roma.jpg', delay: 0 },
                { city: 'Tokyo', image: '/images/tokyo.jpg', delay: 0.2 },
                { city: 'Barcelona', image: '/images/barcelona.jpg', delay: 0.4 }
              ].map((item, index) => (
                <div
                  key={item.city}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img 
                    src={item.image}
                    alt={`${item.city} city guide`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl text-gray-900 font-bold mb-2">
                      Hidden Gems of {item.city}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Explore the secret spots and local favorites that make this city unique.
                    </p>
                    <button className="text-gray-900 hover:text-gray-600 font-semibold">
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <FiMapPin className="w-8 h-8" />, title: 'Hidden Spots', description: 'Discover secret locations only locals know about' },
                { icon: <FiCompass className="w-8 h-8" />, title: 'Local Adventures', description: 'Experience authentic cultural activities' },
                { icon: <FiCoffee className="w-8 h-8" />, title: 'Food & Drinks', description: 'Find the best local eateries and cafes' },
                { icon: <FiUsers className="w-8 h-8" />, title: 'Community', description: 'Connect with fellow travelers and locals' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-earth-100 text-earth-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-display mb-2 text-earth-900">{feature.title}</h3>
                  <p className="text-earth-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 