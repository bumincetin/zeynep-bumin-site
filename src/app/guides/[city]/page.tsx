import React from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const CityGuideContent = dynamic(() => import('../../../components/CityGuideContent'), {
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-xl text-gray-600">Loading guide...</div>
    </div>
  ),
});

const cityGuides = {
  rome: {
    title: 'Hidden Gems of Rome',
    image: '/zeynep-bumin-site/images/roma.jpg',
    sections: {
      food: {
        title: 'Food & Wine',
        items: [
          {
            title: 'Traditional Pasta & Pizza',
            description: 'Discover authentic Roman pasta dishes and pizza at local trattorias.',
            duration: '2-3 hours',
            bestTime: 'Lunch or dinner time',
            tips: 'Try Cacio e Pepe and Roman-style pizza'
          },
          {
            title: 'Wine & Aperitivo',
            description: 'Experience the Roman aperitivo culture with local wines.',
            duration: '2 hours',
            bestTime: '6-8 PM',
            tips: 'Visit enotecas in Trastevere'
          }
        ]
      },
      entertainment: {
        title: 'Music & Culture',
        items: [
          {
            title: 'Live Music & Shows',
            description: 'Enjoy live music at historic venues and cultural performances.',
            duration: '2-3 hours',
            bestTime: 'Evening',
            tips: 'Check local listings for performances'
          }
        ]
      }
    }
  },
  tokyo: {
    title: 'Hidden Gems of Tokyo',
    image: '/zeynep-bumin-site/images/tokyo.jpg',
    sections: {
      food: {
        title: 'Food & Drink',
        items: [
          {
            title: 'Izakaya & Sake Tour',
            description: 'Experience local izakaya culture and sake tasting.',
            duration: '3-4 hours',
            bestTime: 'Evening',
            tips: 'Try different types of sake'
          },
          {
            title: 'Ramen & Street Food',
            description: 'Explore various ramen styles and street food options.',
            duration: '2-3 hours',
            bestTime: 'Lunch or late night',
            tips: 'Visit ramen alleys in Shinjuku'
          }
        ]
      },
      entertainment: {
        title: 'Entertainment',
        items: [
          {
            title: 'Live Music & Shows',
            description: 'From traditional music to modern performances.',
            duration: '2-3 hours',
            bestTime: 'Evening',
            tips: 'Book tickets in advance'
          }
        ]
      }
    }
  },
  barcelona: {
    title: 'Hidden Gems of Barcelona',
    image: '/zeynep-bumin-site/images/barcelona.jpg',
    sections: {
      food: {
        title: 'Food & Wine',
        items: [
          {
            title: 'Tapas & Wine Journey',
            description: 'Discover local tapas bars and Catalan wines.',
            duration: '3-4 hours',
            bestTime: 'Evening',
            tips: 'Try vermut and pintxos'
          },
          {
            title: 'Market & Food Workshop',
            description: 'Visit local markets and learn to cook Catalan dishes.',
            duration: '4 hours',
            bestTime: 'Morning',
            tips: 'Visit La Boqueria market'
          }
        ]
      },
      entertainment: {
        title: 'Music & Dance',
        items: [
          {
            title: 'Flamenco & Live Music',
            description: 'Experience authentic flamenco shows and live music.',
            duration: '2-3 hours',
            bestTime: 'Evening',
            tips: 'Book authentic venues in advance'
          }
        ]
      }
    }
  }
};

export function generateStaticParams() {
  return Object.keys(cityGuides).map((city) => ({
    city: city.toLowerCase(),
  }));
}

export default function CityGuidePage({ params }: { params: { city: string } }) {
  const city = params.city.toLowerCase();
  const guide = cityGuides[city as keyof typeof cityGuides];

  if (!guide) {
    notFound();
  }

  return <CityGuideContent guide={guide} />;
} 