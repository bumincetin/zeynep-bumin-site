'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiInfo } from 'react-icons/fi';
import Navigation from './Navigation';
import Footer from './Footer';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

interface CityGuideContentProps {
  guide: {
    title: string;
    image: string;
    sections: {
      [key: string]: {
        title: string;
        items: Array<{
          title: string;
          description: string;
          duration: string;
          bestTime: string;
          tips: string;
        }>;
      };
    };
  };
}

export default function CityGuideContent({ guide }: CityGuideContentProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main>
        {/* Hero Section */}
        <div className="relative h-[60vh] bg-gray-900">
          <div className="absolute inset-0">
            <Image
              src={guide.image}
              alt={guide.title}
              fill
              className="object-cover opacity-50"
              priority
              quality={75}
              sizes="100vw"
            />
          </div>
          <div className="relative h-full flex items-center justify-center text-center">
            <motion.h1 
              className="text-4xl md:text-6xl text-white font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {guide.title}
            </motion.h1>
          </div>
        </div>

        {/* Guide Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {Object.entries(guide.sections).map(([sectionKey, section], sectionIndex) => (
            <motion.section
              key={sectionKey}
              {...fadeIn}
              transition={{ delay: sectionIndex * 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{section.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {section.items.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + sectionIndex * 0.2 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <FiClock className="w-5 h-5 mr-2" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiMapPin className="w-5 h-5 mr-2" />
                        <span>{item.bestTime}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiInfo className="w-5 h-5 mr-2" />
                        <span>{item.tips}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
} 