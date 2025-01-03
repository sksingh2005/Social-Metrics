import { Link } from 'react-router-dom';
import { BarChart2, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <BarChart2 className="w-6 h-6 text-blue-600 transform transition-transform duration-300 group-hover:scale-110" />
            <span className="font-bold text-xl">SocialMetrics</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Home</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Dashboard</Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg transform transition-all duration-300 
                           hover:bg-blue-700 hover:scale-105 hover:shadow-lg">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden transition-transform duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-slide-up">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Home</Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Dashboard</Link>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg transform transition-all duration-300 
                             hover:bg-blue-700 hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}