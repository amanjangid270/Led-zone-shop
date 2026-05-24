import { MessageCircle, MapPin, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export const FloatingButtons = () => {
  const WHATSAPP_NUMBER = '919084184735';
  const EMAIL = 'Support.ledzone@gmail.com';

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
  };

  const openMap = () => {
    window.open('https://maps.app.goo.gl/Apm2Rjo3WRNvAbtC7', '_blank');
  };

  const openMail = () => {
    window.location.href = `mailto:${EMAIL}`;
  };

  return (
    <div className="fixed left-6 bottom-6 flex flex-col space-y-4 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openWhatsApp}
        className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-green-500 hover:border-green-500 shadow-xl transition-all"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 outline-none" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openMap}
        className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-blue-500 hover:border-blue-500 shadow-xl transition-all"
        title="Find us on Maps"
      >
        <MapPin className="w-6 h-6 outline-none" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openMail}
        className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-red-500 hover:border-red-500 shadow-xl transition-all"
        title="Email Us"
      >
        <Mail className="w-6 h-6 outline-none" />
      </motion.button>
    </div>
  );
};

