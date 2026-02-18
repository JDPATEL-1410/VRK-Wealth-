import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
      ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/60 border-b border-slate-100'
      : 'bg-white shadow-md border-b-2 border-[#0d9488]'
      }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-2 sm:py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src={logo}
              alt="VRK Wealth Logo"
              className="h-16 sm:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 group ${isActive(to)
                    ? 'text-[#0d9488] bg-teal-50'
                    : 'text-slate-700 hover:text-[#0d9488] hover:bg-slate-50'
                  }`}
              >
                {label}
                <span className={`absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] rounded-full transition-transform duration-300 origin-left ${isActive(to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative group">
              <button className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isServicesActive ? 'text-[#0d9488] bg-teal-50' : 'text-slate-700 hover:text-[#0d9488] hover:bg-slate-50'
                }`}>
                Services
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 top-full pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white shadow-2xl shadow-slate-200/80 rounded-2xl border border-slate-100 overflow-hidden">
                  <div className="p-2">
                    <Link to="/services" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 text-slate-800 hover:text-[#1e3a8a] font-bold text-sm transition-all">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#0d9488]" />
                      All Services
                    </Link>
                    {[
                      { to: '/services/mutual-funds', label: 'Mutual Funds' },
                      { to: '/services/goal-based-investing', label: 'Goal-Based Investing' },
                      { to: '/services/stocks-equity', label: 'Stocks & Equity' },
                      { to: '/services/fixed-deposits', label: 'Fixed Deposits' },
                      { to: '/services/tax-planning', label: 'Tax Planning' },
                      { to: '/services/life-insurance', label: 'Life Insurance' },
                      { to: '/services/health-insurance', label: 'Health Insurance' },
                      { to: '/services/specialised-investment-fund', label: 'Specialised Investment Fund' },
                    ].map(({ to, label }) => (
                      <Link key={to} to={to} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-[#1e3a8a] text-sm transition-all">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] flex-shrink-0" />
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {[
              { to: '/calculators', label: 'Calculators', check: () => isActive('/calculators') || location.pathname.startsWith('/calculators/') },
              { to: '/knowledge-hub', label: 'Knowledge Hub', check: () => isActive('/knowledge-hub') },
              { to: '/contact', label: 'Contact Us', check: () => isActive('/contact') },
            ].map(({ to, label, check }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 group ${check()
                    ? 'text-[#0d9488] bg-teal-50'
                    : 'text-slate-700 hover:text-[#0d9488] hover:bg-slate-50'
                  }`}
              >
                {label}
                <span className={`absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] rounded-full transition-transform duration-300 origin-left ${check() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
              </Link>
            ))}

            <Link
              to="/client-login"
              className="ml-2 px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#e6c965] text-white rounded-xl text-sm font-bold shadow-md shadow-amber-200/50 hover:shadow-lg hover:shadow-amber-200/60 hover:scale-105 transition-all duration-200"
            >
              Client Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -mr-1 rounded-xl hover:bg-slate-100 transition-colors touch-manipulation"
            aria-label="Toggle menu"
          >
            {isMenuOpen
              ? <X className="w-6 h-6 text-[#1e3a8a]" />
              : <Menu className="w-6 h-6 text-[#1e3a8a]" />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-slate-100 pt-3">
            <div className="space-y-1">
              <Link to="/" className="block py-3 px-4 text-sm text-slate-700 hover:text-[#0d9488] hover:bg-teal-50 rounded-xl font-semibold transition-all">Home</Link>
              <Link to="/about" className="block py-3 px-4 text-sm text-slate-700 hover:text-[#0d9488] hover:bg-teal-50 rounded-xl font-semibold transition-all">About</Link>

              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full py-3 px-4 text-sm text-slate-700 hover:text-[#0d9488] hover:bg-teal-50 rounded-xl font-semibold transition-all"
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isServicesOpen && (
                  <div className="ml-4 mt-1 space-y-1 bg-slate-50 rounded-xl p-2">
                    {[
                      { to: '/services', label: 'All Services' },
                      { to: '/services/mutual-funds', label: 'Mutual Funds' },
                      { to: '/services/goal-based-investing', label: 'Goal-Based Investing' },
                      { to: '/services/stocks-equity', label: 'Stocks & Equity' },
                      { to: '/services/fixed-deposits', label: 'Fixed Deposits' },
                      { to: '/services/tax-planning', label: 'Tax Planning' },
                      { to: '/services/life-insurance', label: 'Life Insurance' },
                      { to: '/services/health-insurance', label: 'Health Insurance' },
                    ].map(({ to, label }) => (
                      <Link key={to} to={to} className="block py-2 px-3 text-sm text-slate-600 hover:text-[#0d9488] rounded-lg transition-all">
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/calculators" className="block py-3 px-4 text-sm text-slate-700 hover:text-[#0d9488] hover:bg-teal-50 rounded-xl font-semibold transition-all">Calculators</Link>
              <Link to="/knowledge-hub" className="block py-3 px-4 text-sm text-slate-700 hover:text-[#0d9488] hover:bg-teal-50 rounded-xl font-semibold transition-all">Knowledge Hub</Link>
              <Link to="/contact" className="block py-3 px-4 text-sm text-slate-700 hover:text-[#0d9488] hover:bg-teal-50 rounded-xl font-semibold transition-all">Contact Us</Link>
              <Link to="/client-login" className="block mt-2 py-3 px-4 bg-gradient-to-r from-[#d4af37] to-[#e6c965] text-white rounded-xl text-sm font-bold text-center shadow-md">
                Client Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
