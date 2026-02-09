import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const calculators = [
    { name: 'SIP Calculator', path: '/calculators/sip' },
    { name: 'Lumpsum Calculator', path: '/calculators/lumpsum' },
    { name: 'SWP Calculator', path: '/calculators/swp' },
    { name: 'Step-Up SIP Calculator', path: '/calculators/stepup-sip' },
    { name: 'Delay Cost Calculator', path: '/calculators/delay-cost' },
    { name: 'Retirement Calculator', path: '/calculators/retirement' },
    { name: 'Education Calculator', path: '/calculators/education' },
    { name: 'Home Buying Calculator', path: '/calculators/home' },
    { name: 'Car Purchase Calculator', path: '/calculators/car' },
    { name: 'EMI Calculator', path: '/calculators/emi' },
    { name: 'FD Calculator', path: '/calculators/fd' },
    { name: 'Goal Planning Calculator', path: '/calculators/goal' },
    { name: 'STP Calculator', path: '/calculators/stp' },
    { name: 'Compounding Calculator', path: '/calculators/compounding' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg sm:text-xl">VW</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg sm:text-xl text-[#1e3a8a]">VRK Wealth</div>
              <div className="text-xs text-[#0d9488]">Save Today For Better Future</div>
            </div>
            <div className="sm:hidden">
              <div className="font-bold text-base text-[#1e3a8a]">VRK Wealth</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/') ? 'text-[#0d9488]' : 'text-gray-700'} hover:text-[#0d9488] transition`}>
              Home
            </Link>
            <Link to="/about" className={`${isActive('/about') ? 'text-[#0d9488]' : 'text-gray-700'} hover:text-[#0d9488] transition`}>
              About VRK Wealth
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#0d9488] transition">
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link to="/services" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#0d9488]">All Services</Link>
                  <Link to="/services/mutual-funds" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#0d9488]">Mutual Funds</Link>
                  <Link to="/services/goal-based-investing" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#0d9488]">Goal-Based Investing</Link>
                  <Link to="/services/stocks-equity" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#0d9488]">Stocks & Equity</Link>
                  <Link to="/services/fixed-deposits" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#0d9488]">Fixed Deposits</Link>
                  <Link to="/services/tax-planning" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#0d9488]">Tax Planning</Link>
                  <Link to="/services/life-insurance" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#0d9488]">Life Insurance</Link>
                  <Link to="/services/health-insurance" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#0d9488]">Health Insurance</Link>
                  <Link to="/services/specialised-investment-fund" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#0d9488]">Specialised Investment Fund</Link>
                </div>
              </div>
            </div>

            {/* Calculators Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#0d9488] transition">
                Calculators <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 max-h-96 overflow-y-auto">
                <div className="py-2">
                  {calculators.map((calc) => (
                    <Link key={calc.path} to={calc.path} className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#0d9488]">
                      {calc.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/knowledge-hub" className={`${isActive('/knowledge-hub') ? 'text-[#0d9488]' : 'text-gray-700'} hover:text-[#0d9488] transition`}>
              Knowledge Hub
            </Link>
            <Link to="/contact" className={`${isActive('/contact') ? 'text-[#0d9488]' : 'text-gray-700'} hover:text-[#0d9488] transition`}>
              Contact Us
            </Link>
            <Link to="/client-login" className="bg-[#d4af37] text-white px-6 py-2 rounded-lg hover:bg-[#b8941f] transition">
              Client Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden p-2 -mr-2 touch-manipulation hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            <Link to="/" className="block py-3 text-base text-gray-700 hover:text-[#0d9488] hover:bg-gray-50 px-2 rounded touch-manipulation" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block py-3 text-base text-gray-700 hover:text-[#0d9488] hover:bg-gray-50 px-2 rounded touch-manipulation" onClick={() => setIsMenuOpen(false)}>About VRK Wealth</Link>
            
            <div>
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)} 
                className="flex items-center justify-between py-3 px-2 text-base text-gray-700 hover:text-[#0d9488] hover:bg-gray-50 rounded w-full touch-manipulation"
              >
                <span>Services</span>
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="pl-4 bg-gray-50 rounded-lg mt-1">
                  <Link to="/services" className="block py-2.5 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation" onClick={() => setIsMenuOpen(false)}>All Services</Link>
                  <Link to="/services/mutual-funds" className="block py-2.5 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation" onClick={() => setIsMenuOpen(false)}>Mutual Funds</Link>
                  <Link to="/services/goal-based-investing" className="block py-2.5 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation" onClick={() => setIsMenuOpen(false)}>Goal-Based Investing</Link>
                  <Link to="/services/stocks-equity" className="block py-2.5 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation" onClick={() => setIsMenuOpen(false)}>Stocks & Equity</Link>
                  <Link to="/services/tax-planning" className="block py-2.5 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation" onClick={() => setIsMenuOpen(false)}>Tax Planning</Link>
                  <Link to="/services/life-insurance" className="block py-2.5 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation" onClick={() => setIsMenuOpen(false)}>Life Insurance</Link>
                  <Link to="/services/health-insurance" className="block py-2.5 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation" onClick={() => setIsMenuOpen(false)}>Health Insurance</Link>
                </div>
              )}
            </div>

            <div>
              <button 
                onClick={() => setIsCalculatorsOpen(!isCalculatorsOpen)} 
                className="flex items-center justify-between py-3 px-2 text-base text-gray-700 hover:text-[#0d9488] hover:bg-gray-50 rounded w-full touch-manipulation"
              >
                <span>Calculators</span>
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isCalculatorsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCalculatorsOpen && (
                <div className="pl-4 bg-gray-50 rounded-lg mt-1 max-h-64 overflow-y-auto">
                  {calculators.map((calc) => (
                    <Link key={calc.path} to={calc.path} className="block py-2.5 text-sm text-gray-600 hover:text-[#0d9488] touch-manipulation" onClick={() => setIsMenuOpen(false)}>
                      {calc.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/knowledge-hub" className="block py-3 text-base text-gray-700 hover:text-[#0d9488] hover:bg-gray-50 px-2 rounded touch-manipulation" onClick={() => setIsMenuOpen(false)}>Knowledge Hub</Link>
            <Link to="/contact" className="block py-3 text-base text-gray-700 hover:text-[#0d9488] hover:bg-gray-50 px-2 rounded touch-manipulation" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
            <Link to="/client-login" className="block mt-3 bg-[#d4af37] text-white px-6 py-3.5 rounded-lg text-center font-semibold hover:bg-[#b8941f] transition touch-manipulation" onClick={() => setIsMenuOpen(false)}>Client Login</Link>
          </div>
        )}
      </div>
    </header>
  );
}
