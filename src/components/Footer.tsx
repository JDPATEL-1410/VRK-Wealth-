import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import logo from '../assets/logo.png';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1e3a8a] via-[#2d4a8a] to-[#0d9488] text-white relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <Link to="/" className="inline-block mb-6 group">
              <img
                src={logo}
                alt="VRK Wealth Logo"
                className="h-24 w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-gray-200 mb-6 leading-relaxed">
              VRK Wealth is an AMFI Registered Mutual Fund Distributor committed to helping individuals and families achieve their financial goals through disciplined, goal-based investing.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-[#0d9488] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-[#0d9488] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-[#0d9488] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                <Linkedin size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-[#0d9488] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#d4af37]">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-200 hover:text-[#d4af37] transition-colors duration-300 flex items-center group"><span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mr-2 group-hover:bg-[#d4af37] transition-colors"></span>Home</Link></li>
              <li><Link to="/about" className="text-gray-200 hover:text-[#d4af37] transition-colors duration-300 flex items-center group"><span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mr-2 group-hover:bg-[#d4af37] transition-colors"></span>About</Link></li>
              <li><Link to="/services" className="text-gray-200 hover:text-[#d4af37] transition-colors duration-300 flex items-center group"><span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mr-2 group-hover:bg-[#d4af37] transition-colors"></span>Services</Link></li>
              <li><Link to="/calculators" className="text-gray-200 hover:text-[#d4af37] transition-colors duration-300 flex items-center group"><span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mr-2 group-hover:bg-[#d4af37] transition-colors"></span>Calculators</Link></li>
              <li><Link to="/knowledge-hub" className="text-gray-200 hover:text-[#d4af37] transition-colors duration-300 flex items-center group"><span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mr-2 group-hover:bg-[#d4af37] transition-colors"></span>Knowledge Hub</Link></li>
              <li><Link to="/contact" className="text-gray-200 hover:text-[#d4af37] transition-colors duration-300 flex items-center group"><span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mr-2 group-hover:bg-[#d4af37] transition-colors"></span>Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#d4af37]">Our Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services/mutual-funds" className="text-gray-200 hover:text-[#d4af37] transition-colors duration-300 flex items-center group"><span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mr-2 group-hover:bg-[#d4af37] transition-colors"></span>Mutual Funds</Link></li>
              <li><Link to="/services/goal-based-investing" className="text-gray-200 hover:text-[#d4af37] transition-colors duration-300 flex items-center group"><span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mr-2 group-hover:bg-[#d4af37] transition-colors"></span>Goal-Based Investing</Link></li>
              <li><Link to="/services/stocks-equity" className="text-gray-200 hover:text-[#d4af37] transition-colors duration-300 flex items-center group"><span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mr-2 group-hover:bg-[#d4af37] transition-colors"></span>Stocks & Equity</Link></li>
              <li><Link to="/services/tax-planning" className="text-gray-200 hover:text-[#d4af37] transition-colors duration-300 flex items-center group"><span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mr-2 group-hover:bg-[#d4af37] transition-colors"></span>Tax Planning</Link></li>
              <li><Link to="/services/life-insurance" className="text-gray-200 hover:text-[#d4af37] transition-colors duration-300 flex items-center group"><span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mr-2 group-hover:bg-[#d4af37] transition-colors"></span>Life Insurance</Link></li>
              <li><Link to="/services/health-insurance" className="text-gray-200 hover:text-[#d4af37] transition-colors duration-300 flex items-center group"><span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mr-2 group-hover:bg-[#d4af37] transition-colors"></span>Health Insurance</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#d4af37]">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3 group-hover:bg-[#0d9488] transition-all duration-300 backdrop-blur-sm">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Call Us</p>
                  <a href="tel:+919876543210" className="text-white hover:text-[#d4af37] transition-colors font-semibold">+91 98765 43210</a>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3 group-hover:bg-[#0d9488] transition-all duration-300 backdrop-blur-sm">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Email Us</p>
                  <a href="mailto:info@vrkwealth.com" className="text-white hover:text-[#d4af37] transition-colors font-semibold break-all">info@vrkwealth.com</a>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3 group-hover:bg-[#0d9488] transition-all duration-300 backdrop-blur-sm">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Visit Us</p>
                  <p className="text-white font-semibold">Mumbai, Maharashtra</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-300 text-center md:text-left">
            <p className="mb-2">© {new Date().getFullYear()} VRK Wealth. All rights reserved.</p>
            <p className="text-xs">AMFI Registered Mutual Fund Distributor</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/disclaimer" className="text-gray-300 hover:text-[#d4af37] transition-colors">Disclaimer</Link>
            <span className="text-gray-500">•</span>
            <Link to="/privacy-policy" className="text-gray-300 hover:text-[#d4af37] transition-colors">Privacy Policy</Link>
            <span className="text-gray-500">•</span>
            <Link to="/risk-disclosure" className="text-gray-300 hover:text-[#d4af37] transition-colors">Risk Disclosure</Link>
            <span className="text-gray-500">•</span>
            <Link to="/commission-disclosure" className="text-gray-300 hover:text-[#d4af37] transition-colors">Commission Disclosure</Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
          <p className="text-xs text-gray-300 leading-relaxed text-center">
            <strong className="text-[#d4af37]">Mutual Fund Investments are subject to market risks.</strong> Read all scheme related documents carefully before investing.
            Past performance is not indicative of future returns. Please consider your specific investment requirements, risk tolerance,
            investment goal, time frame, risk and reward balance and the cost associated with the investment before choosing a fund,
            or designing a portfolio that suits your needs.
          </p>
        </div>
      </div>
    </footer>
  );
}
