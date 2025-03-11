import React from 'react';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import Image from 'next/image';

const cityGuides = {
  rome: {
    name: 'Rome',
    image: '/images/roma.jpg',
    intro: 'Discover the eternal city through the eyes of locals, from authentic cuisine to vibrant nightlife.',
    sections: {
      foodAndDrink: {
        title: 'Food & Drink',
        description: 'From traditional pasta to artisanal gelato, Rome\'s culinary scene is a journey through history and flavor.',
        highlights: [
          {
            name: 'Traditional Pasta Dishes',
            items: ['Carbonara at Da Enzo al 29', 'Cacio e Pepe at Roscioli', 'Amatriciana at Armando al Pantheon'],
            tips: 'Best enjoyed for dinner, reservations recommended'
          },
          {
            name: 'Pizza & Street Food',
            items: ['Roman-style pizza at Antico Forno Roscioli', 'Supplì at Supplizio', 'Porchetta sandwiches at Salumeria Roscioli'],
            tips: 'Perfect for lunch or afternoon snack'
          },
          {
            name: 'Wine & Aperitivo',
            items: ['Local Frascati wines', 'Aperitivo at Hotel Locarno', 'Wine tasting at Rimessa Roscioli'],
            tips: 'Aperitivo time is typically 6-8pm'
          },
          {
            name: 'Desserts & Coffee',
            items: ['Gelato at Fatamorgana', 'Tiramisu at Pompi', 'Espresso at Sant\'Eustachio'],
            tips: 'Coffee is typically enjoyed standing at the bar'
          }
        ]
      },
      entertainment: {
        title: 'Entertainment & Music',
        description: 'Experience Rome\'s dynamic nightlife scene, from classical concerts to modern clubs.',
        highlights: [
          {
            name: 'Live Music Venues',
            items: ['Jazz at Big Mama', 'Classical at Teatro dell\'Opera', 'Contemporary at Monk Club'],
            tips: 'Book tickets in advance, especially for weekend shows'
          },
          {
            name: 'Nightlife Districts',
            items: ['Trastevere bars', 'Testaccio clubs', 'Pigneto alternative scene'],
            tips: 'Most venues get busy after 11pm'
          },
          {
            name: 'Cultural Shows',
            items: ['Summer concerts at Caracalla', 'Teatro Argentina performances', 'Villa Ada Roma Incontra il Mondo festival'],
            tips: 'Check seasonal schedules for outdoor events'
          }
        ]
      }
    }
  },
  tokyo: {
    name: 'Tokyo',
    image: '/images/tokyo.jpg',
    intro: 'Navigate Tokyo\'s dynamic culture through local perspectives, from street food adventures to cutting-edge entertainment.',
    sections: {
      foodAndDrink: {
        title: 'Food & Drink',
        description: 'Discover Tokyo\'s incredible culinary diversity, from humble street food to refined dining experiences.',
        highlights: [
          {
            name: 'Ramen & Noodles',
            items: ['Tsukemen at Fuunji', 'Tantanmen at Nakiryu', 'Udon at Mentsudan'],
            tips: 'Many shops have ticket machines for ordering'
          },
          {
            name: 'Sushi & Seafood',
            items: ['Tsukiji Outer Market stalls', 'Standing sushi at Uogashi Nihon-Ichi', 'Conveyor belt sushi at Hanamaru'],
            tips: 'Best quality for lunch sets'
          },
          {
            name: 'Izakaya Favorites',
            items: ['Yakitori at Torikizoku', 'Kushiage at Kushinobo', 'Sake tasting at Sasagin'],
            tips: 'Most izakayas open from 5pm onwards'
          },
          {
            name: 'Street Food',
            items: ['Takoyaki in Ameyoko', 'Monjayaki in Tsukishima', 'Taiyaki at Naniwaya'],
            tips: 'Markets are best visited during lunch hours'
          }
        ]
      },
      entertainment: {
        title: 'Entertainment & Music',
        description: 'From traditional performances to futuristic entertainment, Tokyo never stops amazing.',
        highlights: [
          {
            name: 'Live Music',
            items: ['Jazz at Blue Note Tokyo', 'Rock at O-NEST', 'Electronic at Contact'],
            tips: 'Last trains usually leave around midnight'
          },
          {
            name: 'Traditional Arts',
            items: ['Kabuki at Kabukiza Theatre', 'Sumo at Ryogoku', 'Taiko drums at Asakusa'],
            tips: 'English headsets available at most venues'
          },
          {
            name: 'Modern Entertainment',
            items: ['Karaoke at Big Echo', 'Gaming at Joypolis', 'Robot Restaurant show'],
            tips: 'Book karaoke rooms in advance on weekends'
          }
        ]
      }
    }
  },
  barcelona: {
    name: 'Barcelona',
    image: '/images/barcelona.jpg',
    intro: 'Experience Barcelona\'s vibrant culture through local traditions, from tapas to flamenco.',
    sections: {
      foodAndDrink: {
        title: 'Food & Drink',
        description: 'Savor the flavors of Catalonia, from traditional tapas to innovative cuisine.',
        highlights: [
          {
            name: 'Tapas & Pintxos',
            items: ['El Xampanyet for anchovies', 'Cal Pep for seafood', 'Quimet & Quimet for montaditos'],
            tips: 'Dinner typically starts after 8:30pm'
          },
          {
            name: 'Local Markets',
            items: ['La Boqueria fresh produce', 'Santa Caterina specialties', 'Sant Antoni local scene'],
            tips: 'Markets are best visited in the morning'
          },
          {
            name: 'Catalan Wines',
            items: ['Priorat reds', 'Penedès cavas', 'Natural wines at Bar Brutal'],
            tips: 'Start with vermut as an aperitif'
          },
          {
            name: 'Sweet Treats',
            items: ['Churros at Granja La Pallaresa', 'Crema catalana at Granja M. Viader', 'Pastries at Hofmann'],
            tips: 'Many cafes close for siesta'
          }
        ]
      },
      entertainment: {
        title: 'Entertainment & Music',
        description: 'From passionate flamenco to modern nightclubs, Barcelona\'s nights are alive with energy.',
        highlights: [
          {
            name: 'Flamenco Shows',
            items: ['Tablao Cordobes', 'Los Tarantos', 'Palacio del Flamenco'],
            tips: 'Book front row seats for the best experience'
          },
          {
            name: 'Live Music',
            items: ['Jazz at Jamboree', 'Alternative at Razzmatazz', 'Classical at Palau de la Música'],
            tips: 'Many venues have multiple rooms with different styles'
          },
          {
            name: 'Street Performance',
            items: ['Las Ramblas artists', 'Gothic Quarter musicians', 'Born district performers'],
            tips: 'Best atmosphere on weekend evenings'
          }
        ]
      }
    }
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

        {/* Sections */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            {/* Food & Drink Section */}
            <section className="mb-16">
              <h2 className="text-4xl font-bold mb-6">{cityData.sections.foodAndDrink.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{cityData.sections.foodAndDrink.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cityData.sections.foodAndDrink.highlights.map((highlight) => (
                  <div key={highlight.name} className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-semibold mb-4">{highlight.name}</h3>
                    <ul className="space-y-2 mb-4">
                      {highlight.items.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-clay-500 rounded-full mr-3"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-600 italic">{highlight.tips}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Entertainment Section */}
            <section>
              <h2 className="text-4xl font-bold mb-6">{cityData.sections.entertainment.title}</h2>
              <p className="text-xl text-gray-600 mb-8">{cityData.sections.entertainment.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cityData.sections.entertainment.highlights.map((highlight) => (
                  <div key={highlight.name} className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-semibold mb-4">{highlight.name}</h3>
                    <ul className="space-y-2 mb-4">
                      {highlight.items.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-clay-500 rounded-full mr-3"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-600 italic">{highlight.tips}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 