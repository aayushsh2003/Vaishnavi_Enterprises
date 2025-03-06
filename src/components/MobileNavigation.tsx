import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: ShoppingBag, label: 'Cart', path: '/cart', badge: totalItems },
    { icon: User, label: 'Account', path: '/account' },
    { icon: Menu, label: 'Menu', path: '/categories' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-lg border-t border-gray-200 safe-area-bottom z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="relative flex flex-col items-center justify-center w-16 h-16 touch-manipulation"
          >
            {isActive(item.path) && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-indigo-50 rounded-full"
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              />
            )}
            <item.icon
              className={`w-6 h-6 ${
                isActive(item.path) ? 'text-indigo-600' : 'text-gray-600'
              }`}
            />
            <span className="text-xs mt-1 text-gray-600">
              {item.label}
            </span>
            {item.badge && item.badge > 0 && (
              <span className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;