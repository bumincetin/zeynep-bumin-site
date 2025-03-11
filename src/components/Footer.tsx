import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Local Guides', href: '/guides' },
      { name: 'Food & Drink', href: '/food-drink' },
      { name: 'Cultural Insights', href: '/culture' },
      { name: 'Interactive Map', href: '/map' },
      { name: 'Community', href: '/community' },
    ],
    social: [
      { name: 'Facebook', href: '#', icon: FaFacebook },
      { name: 'Twitter', href: '#', icon: FaTwitter },
      { name: 'Instagram', href: '#', icon: FaInstagram },
      { name: 'Pinterest', href: '#', icon: FaPinterest },
    ],
  };

  return (
    <footer className="bg-earth-900 text-earth-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="font-handwritten text-2xl">LocallyGuided</span>
            </Link>
            <p className="mt-4 text-earth-300 text-sm">
              Discover authentic local experiences and connect with fellow travelers around the world.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigation.main.slice(0, 3).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-earth-300 hover:text-earth-50 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-0">
            <h3 className="font-display text-lg mb-4">More</h3>
            <ul className="space-y-2">
              {navigation.main.slice(3).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-earth-300 hover:text-earth-50 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-display text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-earth-300 hover:text-earth-50 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-earth-800">
          <p className="text-earth-300 text-sm text-center">
            © {new Date().getFullYear()} LocallyGuided. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 