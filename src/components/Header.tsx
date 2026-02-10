import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-[#0d9488]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <img
              src={logo}
              alt="VRK Wealth Logo"
              className="h-20 sm:h-24 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`${isActive('/') ? 'text-[#0d9488] font-bold' : 'text-gray-700'} hover:text-[#0d9488] transition-all duration-300 text-base font-semibold relative group`}
            >
              Home
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] transform origin-left transition-transform duration-300 ${isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            <Link
              to="/about"
              className={`${isActive('/about') ? 'text-[#0d9488] font-bold' : 'text-gray-700'} hover:text-[#0d9488] transition-all duration-300 text-base font-semibold relative group`}
            >
              About
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] transform origin-left transition-transform duration-300 ${isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#0d9488] transition-all duration-300 text-base font-semibold">
                Services <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-2 w-72 bg-white shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-4 border-[#0d9488] overflow-hidden">
                <div className="py-3">
                  <Link to="/services" className="block px-6 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 text-gray-700 hover:text-[#1e3a8a] font-semibold transition-all duration-200">All Services</Link>
                  <Link to="/services/mutual-funds" className="block px-6 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 text-gray-700 hover:text-[#1e3a8a] transition-all duration-200">Mutual Funds</Link>
                  <Link to="/services/goal-based-investing" className="block px-6 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 text-gray-700 hover:text-[#1e3a8a] transition-all duration-200">Goal-Based Investing</Link>
                  <Link to="/services/stocks-equity" className="block px-6 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 text-gray-700 hover:text-[#1e3a8a] transition-all duration-200">Stocks & Equity</Link>
                  <Link to="/services/fixed-deposits" className="block px-6 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 text-gray-700 hover:text-[#1e3a8a] transition-all duration-200">Fixed Deposits</Link>
                  <Link to="/services/tax-planning" className="block px-6 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 text-gray-700 hover:text-[#1e3a8a] transition-all duration-200">Tax Planning</Link>
                  <Link to="/services/life-insurance" className="block px-6 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 text-gray-700 hover:text-[#1e3a8a] transition-all duration-200">Life Insurance</Link>
                  <Link to="/services/health-insurance" className="block px-6 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 text-gray-700 hover:text-[#1e3a8a] transition-all duration-200">Health Insurance</Link>
                  <Link to="/services/specialised-investment-fund" className="block px-6 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 text-gray-700 hover:text-[#1e3a8a] transition-all duration-200">Specialised Investment Fund</Link>
                </div>
              </div>
            </div>

            <Link
              to="/calculators"
              className={`${isActive('/calculators') || location.pathname.startsWith('/calculators/') ? 'text-[#0d9488] font-bold' : 'text-gray-700'} hover:text-[#0d9488] transition-all duration-300 text-base font-semibold relative group`}
            >
              Calculators
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] transform origin-left transition-transform duration-300 ${isActive('/calculators') || location.pathname.startsWith('/calculators/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>

            <Link
              to="/knowledge-hub"
              className={`${isActive('/knowledge-hub') ? 'text-[#0d9488] font-bold' : 'text-gray-700'} hover:text-[#0d9488] transition-all duration-300 text-base font-semibold relative group`}
            >
              Knowledge Hub
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] transform origin-left transition-transform duration-300 ${isActive('/knowledge-hub') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            <Link
              to="/contact"
              className={`${isActive('/contact') ? 'text-[#0d9488] font-bold' : 'text-gray-700'} hover:text-[#0d9488] transition-all duration-300 text-base font-semibold relative group`}
            >
              Contact Us
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] transform origin-left transition-transform duration-300 ${isActive('/contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            <Link
              to="/client-login"
              className="bg-gradient-to-r from-[#d4af37] to-[#e6c965] text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Client Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -mr-2 touch-manipulation hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-[#1e3a8a]" /> : <Menu className="w-6 h-6 text-[#1e3a8a]" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 max-h-[calc(100vh-80px)] overflow-y-auto bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-4 mb-4">
            <Link to="/" className="block py-3 text-base text-gray-700 hover:text-[#0d9488] hover:bg-white px-4 rounded-xl touch-manipulation font-semibold transition-all" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block py-3 text-base text-gray-700 hover:text-[#0d9488] hover:bg-white px-4 rounded-xl touch-manipulation font-semibold transition-all" onClick={() => setIsMenuOpen(false)}>About</Link>

            <div>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center justify-between py-3 px-4 text-base text-gray-700 hover:text-[#0d9488] hover:bg-white rounded-xl w-full touch-manipulation font-semibold transition-all"
              >
                <span>Services</span>
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="pl-4 bg-white rounded-xl mt-1 py-2">
                  <Link to="/services" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation transition-all" onClick={() => setIsMenuOpen(false)}>All Services</Link>
                  <Link to="/services/mutual-funds" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation transition-all" onClick={() => setIsMenuOpen(false)}>Mutual Funds</Link>
                  <Link to="/services/goal-based-investing" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation transition-all" onClick={() => setIsMenuOpen(false)}>Goal-Based Investing</Link>
                  <Link to="/services/stocks-equity" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation transition-all" onClick={() => setIsMenuOpen(false)}>Stocks & Equity</Link>
                  <Link to="/services/tax-planning" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation transition-all" onClick={() => setIsMenuOpen(false)}>Tax Planning</Link>
                  <Link to="/services/life-insurance" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation transition-all" onClick={() => setIsMenuOpen(false)}>Life Insurance</Link>
                  <Link to="/services/health-insurance" className="block py-2.5 px-4 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation transition-all" onClick={() => setIsMenuOpen(false)}>Health Insurance</Link>
                </div>
              )}
            </div>

            <Link to="/calculators" className="block py-3 text-base text-gray-700 hover:text-[#0d9488] hover:bg-white px-4 rounded-xl touch-manipulation font-semibold transition-all" onClick={() => setIsMenuOpen(false)}>Calculators</Link>
            <Link to="/knowledge-hub" className="block py-3 text-base text-gray-700 hover:text-[#0d9488] hover:bg-white px-4 rounded-xl touch-manipulation font-semibold transition-all" onClick={() => setIsMenuOpen(false)}>Knowledge Hub</Link>
            <Link to="/contact" className="block py-3 text-base text-gray-700 hover:text-[#0d9488] hover:bg-white px-4 rounded-xl touch-manipulation font-semibold transition-all" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
            <Link to="/client-login" className="block mt-3 bg-gradient-to-r from-[#d4af37] to-[#e6c965] text-white px-6 py-3.5 rounded-xl text-center font-bold hover:shadow-xl transition-all touch-manipulation" onClick={() => setIsMenuOpen(false)}>Client Login</Link>
          </div>
        )}
      </div>
    </header>
  );
}
