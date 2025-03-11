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
  },
  paris: {
    title: 'Hidden Gems of Paris',
    image: '/zeynep-bumin-site/images/paris.jpg',
    sections: {
      food: {
        title: 'Food & Wine',
        items: [
          {
            title: 'Classic Bistros & Brasseries',
            description: 'Experience authentic Parisian dining at historic bistros and brasseries.',
            duration: '2-3 hours',
            bestTime: 'Lunch (12-2pm) or Dinner (7:30-10pm)',
            tips: 'Try the plat du jour for the best value and authenticity'
          },
          {
            title: 'Patisserie & Chocolate Tour',
            description: 'Discover the finest French pastries and artisanal chocolates.',
            duration: '3 hours',
            bestTime: 'Morning to early afternoon',
            tips: 'Visit Pierre Hermé for macarons and Jacques Genin for chocolates'
          },
          {
            title: 'Wine & Cheese Tasting',
            description: 'Sample curated selections of French wines paired with regional cheeses.',
            duration: '2 hours',
            bestTime: 'Late afternoon',
            tips: 'Visit fromageries in the 7th arrondissement for the best selection'
          }
        ]
      },
      entertainment: {
        title: 'Arts & Nightlife',
        items: [
          {
            title: 'Jazz Clubs of Saint-Germain',
            description: 'Experience live jazz in historic venues where legends once played.',
            duration: '3-4 hours',
            bestTime: 'Evening (starts around 9pm)',
            tips: 'Check Le Petit Journal and Caveau de la Huchette'
          },
          {
            title: 'Hidden Speakeasies',
            description: 'Discover secret bars and cocktail lounges in Le Marais and SoPi.',
            duration: '2-3 hours',
            bestTime: 'After 9pm',
            tips: 'Look for unmarked doors and make reservations when possible'
          }
        ]
      }
    }
  },
  istanbul: {
    title: 'Hidden Gems of Istanbul',
    image: '/zeynep-bumin-site/images/istanbul.jpg',
    sections: {
      food: {
        title: 'Food & Drink',
        items: [
          {
            title: 'Meyhane Experience',
            description: 'Traditional Turkish taverns serving meze and rakı in historic settings.',
            duration: '3-4 hours',
            bestTime: 'Evening (after 7pm)',
            tips: 'Try the seasonal meze and fish dishes in Beyoğlu'
          },
          {
            title: 'Street Food Journey',
            description: 'Explore local street food from simit to kokoreç in historic neighborhoods.',
            duration: '3 hours',
            bestTime: 'Late morning to afternoon',
            tips: 'Visit Kadıköy market for the best street food variety'
          },
          {
            title: 'Spice Bazaar & Turkish Coffee',
            description: 'Discover aromatic spices and traditional coffee culture.',
            duration: '2-3 hours',
            bestTime: 'Morning to afternoon',
            tips: 'Get your coffee fortune told at a traditional kahvehane'
          }
        ]
      },
      entertainment: {
        title: 'Music & Culture',
        items: [
          {
            title: 'Live Turkish Music',
            description: 'Experience traditional and modern Turkish music in atmospheric venues.',
            duration: '3-4 hours',
            bestTime: 'Evening',
            tips: 'Visit venues in Beyoğlu for authentic Turkish music'
          },
          {
            title: 'Bosphorus Night Tour',
            description: 'Evening cruise with dinner and entertainment along the Bosphorus.',
            duration: '4 hours',
            bestTime: 'Sunset onwards',
            tips: 'Book smaller boats for a more intimate experience'
          }
        ]
      }
    }
  },
  newyork: {
    title: 'Hidden Gems of New York',
    image: '/zeynep-bumin-site/images/newyork.jpg',
    sections: {
      food: {
        title: 'Food & Drink',
        items: [
          {
            title: 'Food Truck Safari',
            description: 'Sample diverse cuisines from the city\'s best food trucks.',
            duration: '3 hours',
            bestTime: 'Lunch (11am-2pm)',
            tips: 'Follow food trucks on social media for locations'
          },
          {
            title: 'Hidden Delis & Bagel Shops',
            description: 'Discover authentic New York delis and legendary bagel spots.',
            duration: '2-3 hours',
            bestTime: 'Morning to early afternoon',
            tips: 'Visit Russ & Daughters and Katz\'s Delicatessen'
          },
          {
            title: 'Craft Beer & Cocktail Tour',
            description: 'Explore local breweries and speakeasy-style cocktail bars.',
            duration: '4 hours',
            bestTime: 'Evening',
            tips: 'Check out Brooklyn breweries and East Village cocktail bars'
          }
        ]
      },
      entertainment: {
        title: 'Music & Shows',
        items: [
          {
            title: 'Jazz & Blues Venues',
            description: 'Experience live jazz at historic clubs in Greenwich Village.',
            duration: '3-4 hours',
            bestTime: 'Evening (after 8pm)',
            tips: 'Visit Blue Note and Village Vanguard'
          },
          {
            title: 'Off-Broadway Shows',
            description: 'Discover innovative theater productions in intimate venues.',
            duration: '2-3 hours',
            bestTime: 'Evening performances',
            tips: 'Check The Public Theater and St. Ann\'s Warehouse'
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