import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Hide tooltip after 5 seconds
  setTimeout(() => setShowTooltip(false), 5000);

  return (
    <>
      {/* WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 bg-white text-navy-900 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="text-sm font-medium">Need help? Chat with us!</div>
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
          </motion.div>
        )}

        {/* Chat Widget */}
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">VRK Wealth</div>
                    <div className="text-xs text-teal-100">Typically replies instantly</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 rounded-lg p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Message */}
            <div className="p-4 bg-gray-50">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-sm text-gray-700 mb-2">
                  Hello! 👋
                </p>
                <p className="text-sm text-gray-700">
                  How can we help you with your financial planning today?
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-4">
              <a
                href="https://wa.me/919876543210?text=Hi, I would like to know more about VRK Wealth services"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}

        {/* Main Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-green-500/50 transition-shadow group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulse Animation */}
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
          
          {/* Icon */}
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="w-7 h-7 relative z-10" />
            ) : (
              <MessageCircle className="w-7 h-7 relative z-10" />
            )}
          </motion.div>
        </motion.button>
      </motion.div>
    </>
  );
}
