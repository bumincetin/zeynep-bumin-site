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
        title: 'Food & Wine Experience',
        content: 'Savor authentic Roman cuisine at its finest. Start with traditional pasta dishes like Carbonara at Da Enzo al 29, try the famous Roman-style pizza at Antico Forno Roscioli, and indulge in gelato at Fatamorgana. Pair your meals with local wines from the Frascati region.',
        duration: '4-5 hours',
        bestTime: 'Dinner time (7:30pm-10:30pm)',
        tips: ['Make reservations for popular restaurants', 'Try the house wine (vino della casa)', 'Ask for local specialties not on the menu']
      },
      {
        title: 'Music & Nightlife',
        content: 'Experience Rome\'s vibrant nightlife scene. Begin at Big Mama for live blues and jazz, then head to Alexanderplatz Jazz Club for world-class performances. End the night at Club Circolo degli Artisti for contemporary music and dancing.',
        duration: '5-6 hours',
        bestTime: 'Late evening until early morning',
        tips: ['Check event schedules in advance', 'Book tickets online for popular venues', 'Take a taxi for late-night returns']
      }
    ]
  },
  tokyo: {
    name: 'Tokyo',
    image: '/images/tokyo.jpg',
    intro: 'Navigate Tokyo\'s dynamic culture through local perspectives, from street food adventures to peaceful temple walks.',
    guides: [
      {
        title: 'Izakaya & Sake Tour',
        content: 'Dive into Tokyo\'s izakaya culture in Shinjuku\'s Golden Gai. Sample different types of sake while enjoying traditional bar snacks. Visit Albatross for its unique atmosphere, then try Deathmatch in Paradise for their legendary chicken wings. End at Bar Plastic Model for creative cocktails.',
        duration: '4-5 hours',
        bestTime: 'Evening (6pm onwards)',
        tips: ['Make reservations for small izakayas', 'Try different grades of sake', 'Learn basic drinking etiquette']
      },
      {
        title: 'Ramen & Street Food Safari',
        content: 'Explore Tokyo\'s diverse ramen scene. Start at Fuunji for their famous tsukemen, try Nakiryu\'s tantanmen, and experience Ramen Street in Tokyo Station. Don\'t miss the street food in Ameya-Yokocho market, including takoyaki and yakitori.',
        duration: '3-4 hours',
        bestTime: 'Lunch or late dinner',
        tips: ['Be prepared to wait at popular spots', 'Look for shops with ticket machines', 'Try different ramen styles']
      },
      {
        title: 'Live Music & Entertainment',
        content: 'Experience Tokyo\'s eclectic music scene. Start at Blue Note Tokyo for world-class jazz, visit O-NEST in Shibuya for indie bands, and end at Contact for electronic music. Don\'t miss the unique experience of a karaoke room at Big Echo.',
        duration: '6-7 hours',
        bestTime: 'Evening until last train',
        tips: ['Book tickets in advance', 'Check last train times', 'Join the local music meetups']
      }
    ]
  },
  barcelona: {
    name: 'Barcelona',
    image: '/images/barcelona.jpg',
    intro: 'Experience Barcelona\'s vibrant culture through local traditions, from tapas trails to hidden beaches.',
    guides: [
      {
        title: 'Tapas & Wine Journey',
        content: 'Discover Barcelona\'s best tapas bars. Start at El Xampanyet for their house-made vermouth and anchovies, continue to Cal Pep for seafood specialties, and end at Quimet & Quimet for their montaditos. Pair everything with local Catalan wines.',
        duration: '4-5 hours',
        bestTime: 'Evening (8pm onwards)',
        tips: ['Order vermut to start', 'Try local Priorat wines', 'Share plates for more variety']
      },
      {
        title: 'Market & Food Workshop',
        content: 'Immerse yourself in Catalan cuisine. Visit La Boqueria market to source ingredients, learn to make paella at a local cooking school, and discover traditional desserts like crema catalana. End with a visit to a xocolateria for churros.',
        duration: '5-6 hours',
        bestTime: 'Morning market visits',
        tips: ['Arrive early at markets', 'Book cooking classes ahead', 'Try seasonal specialties']
      },
      {
        title: 'Flamenco & Live Music',
        content: 'Experience Barcelona\'s rich music scene. Watch authentic flamenco at Tablao Cordobes, enjoy jazz at Jamboree, and end the night at Razzmatazz for diverse music across five rooms. Don\'t miss the street performers on Las Ramblas.',
        duration: 'Full evening',
        bestTime: 'Late evening until early morning',
        tips: ['Book flamenco shows in advance', 'Check club schedules online', 'Try different music venues']
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