import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-blue-700">SriLanka Adventures</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md text-sm font-medium">
              About Us
            </Link>
            <Link to="/activities" className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md text-sm font-medium">
              Activities
            </Link>
            <Link to="/map" className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md text-sm font-medium">
              Map
            </Link>
            
            {user ? (
              <>
                <Link to="/bookings" className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md text-sm font-medium">
                  My Bookings
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md text-sm font-medium">
                    Admin
                  </Link>
                )}
                {user.role === 'service-provider' && (
                  <Link to="/notifications" className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md text-sm font-medium">
                    Notifications
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/activities"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Activities
          </Link>
          <Link
            to="/map"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Map
          </Link>
          
          {user ? (
            <>
              <Link
                to="/bookings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                My Bookings
              </Link>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {user.role === 'service-provider' && (
                <Link
                  to="/notifications"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Notifications
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;