import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    // Replace with actual WhatsApp number
    const phoneNumber = '919876543210';
    const message = 'Hello VRK Wealth, I would like to know more about your services.';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-green-600 transition z-50 flex items-center justify-center group touch-manipulation"
      aria-label="Contact us on WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      <span className="hidden sm:block absolute right-full mr-3 bg-green-500 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
        Chat with us
      </span>
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
    </motion.button>
  );
}
