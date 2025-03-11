import React from 'react';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import Image from 'next/image';

const cityGuides = {
  rome: {
    name: 'Rome',
    image: '/images/roma.jpg',
    intro: 'Discover the eternal city through the eyes of locals, from hidden cafes to ancient secrets.',
    guides: [
      {
        title: 'Hidden Cafes of Trastevere',
        content: 'Explore the charming streets of Trastevere, where local cafes serve authentic Italian coffee and pastries. Visit Bar San Calisto for a traditional espresso, then head to Enzo and Dario for homemade cornetti. End your tour at Roscioli Caffè for their famous tiramisu.',
        duration: '3-4 hours',
        bestTime: 'Early morning or late afternoon',
        tips: ['Avoid tourist-heavy hours (11am-2pm)', 'Many cafes are cash-only', 'Learn basic Italian greetings']
      },
      {
        title: 'Ancient Secrets Walking Tour',
        content: 'Beyond the Colosseum lies a network of lesser-known ancient sites. Start at the Crypta Balbi, continue to the hidden Domus Aurea, and discover the underground layers of San Clemente Basilica. End at the overlooked but fascinating Baths of Caracalla.',
        duration: '5-6 hours',
        bestTime: 'Early morning to avoid crowds',
        tips: ['Book Domus Aurea visits in advance', 'Wear comfortable walking shoes', 'Bring water and snacks']
      },
      {
        title: 'Local Markets Guide',
        content: 'Experience Rome\'s vibrant market culture. Begin at Campo de\' Fiori for fresh produce, then explore the gourmet stands at Mercato Trionfale. Don\'t miss the authentic Roman lunch spots at Testaccio Market, and finish at the vintage Borghetto Flaminio market.',
        duration: '4-5 hours',
        bestTime: 'Morning (markets close early)',
        tips: ['Bring cash and reusable bags', 'Try samples offered by vendors', 'Learn basic food-related Italian words']
      }
    ]
  },
  tokyo: {
    name: 'Tokyo',
    image: '/images/tokyo.jpg',
    intro: 'Navigate Tokyo\'s dynamic culture through local perspectives, from street food adventures to peaceful temple walks.',
    guides: [
      {
        title: 'Street Food Tour of Shinjuku',
        content: 'Dive into Tokyo\'s street food scene in Shinjuku\'s Memory Lane (Omoide Yokocho). Start with yakitori at Tsunahachi, try monjayaki at Tsurukame, and explore the standing sushi bars. Don\'t miss the late-night ramen at Fuunji.',
        duration: '3-4 hours',
        bestTime: 'Evening (6pm onwards)',
        tips: ['Most places are cash-only', 'Learn basic Japanese food terms', 'Some places don\'t allow photos']
      },
      {
        title: 'Temple Walk Through History',
        content: 'Experience Tokyo\'s spiritual side. Begin at Sensō-ji in Asakusa, then visit the peaceful Gotoku-ji (Lucky Cat Temple). Continue to Tennō-ji for its stunning garden, and end at Zōjō-ji with views of Tokyo Tower.',
        duration: '6-7 hours',
        bestTime: 'Early morning for fewer crowds',
        tips: ['Remove shoes when required', 'Observe quiet zones', 'Bring coins for offerings']
      },
      {
        title: 'Night Life in Shimokitazawa',
        content: 'Experience Tokyo\'s alternative nightlife in Shimokitazawa. Start at Shimokita Garage for live music, explore vintage vinyl at Flash Disc Ranch, enjoy craft beer at Bear Pawz, and end the night at a karaoke box.',
        duration: '4-5 hours',
        bestTime: 'Evening until last train',
        tips: ['Check last train times', 'Most venues are cash-only', 'Book karaoke in advance on weekends']
      }
    ]
  },
  barcelona: {
    name: 'Barcelona',
    image: '/images/barcelona.jpg',
    intro: 'Experience Barcelona\'s vibrant culture through local traditions, from tapas trails to hidden beaches.',
    guides: [
      {
        title: 'Tapas Trail in Gràcia',
        content: 'Follow the locals through Gràcia\'s best tapas spots. Begin at La Pepita for modern tapas, continue to Cal Pep for seafood specialties, visit Bodega Lo Pinyol for traditional bites, and end at La Vermu for vermut and classic tapas.',
        duration: '4-5 hours',
        bestTime: 'Evening (8pm onwards)',
        tips: ['Reservations recommended', 'Learn basic Catalan phrases', 'Pace yourself']
      },
      {
        title: 'Gothic Quarter Hidden Gems',
        content: 'Explore the secrets of the Gothic Quarter. Start at the hidden Roman ruins under Plaça del Rei, discover the medieval Jewish quarter, visit the artisan workshops around Carrer Petritxol, and end at the rooftop of Santa Maria del Mar.',
        duration: '5-6 hours',
        bestTime: 'Morning or late afternoon',
        tips: ['Wear comfortable shoes', 'Bring a camera', 'Book rooftop access in advance']
      },
      {
        title: 'Local Beach Life',
        content: 'Escape the tourist crowds at Barcelona\'s hidden beaches. Start at Nova Icària for water sports, continue to Mar Bella for a local vibe, and end at Ocata Beach for pristine sand and authentic chiringuitos.',
        duration: 'Full day',
        bestTime: 'Early morning or late afternoon',
        tips: ['Bring sunscreen and water', 'Try local beach snacks', 'Use public transport']
      }
    ]
  }
} as const;

export function generateStaticParams() {
  return Object.keys(cityGuides).map((city) => ({
    city: city,
  }));
}

export default function CityGuide({ params }: { params: { city: string } }) {
  const citySlug = params.city.toLowerCase();
  const cityData = cityGuides[citySlug as keyof typeof cityGuides];

  if (!cityData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <h1 className="text-2xl text-gray-600">City guide not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh]">
          <Image 
            src={cityData.image}
            alt={`${cityData.name} city view`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">{cityData.name}</h1>
              <p className="text-xl max-w-2xl mx-auto px-4">{cityData.intro}</p>
            </div>
          </div>
        </div>

        {/* Guides Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {cityData.guides.map((guide) => (
                <div key={guide.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold mb-4">{guide.title}</h2>
                    <p className="text-gray-600 mb-6">{guide.content}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                        <p className="text-gray-600">{guide.duration}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Best Time</h3>
                        <p className="text-gray-600">{guide.bestTime}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-900 mb-2">Local Tips</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {guide.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
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