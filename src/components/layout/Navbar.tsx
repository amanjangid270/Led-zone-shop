import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Heart, Menu, X, Tv, User as UserIcon, LogOut, QrCode, Sun, Moon, Camera } from 'lucide-react';
import { useShopStore } from '../../store/shop';
import { useAuthStore } from '../../store/auth';
import { useThemeStore } from '../../store/themeStore';
import { useEffect, useState, useRef } from 'react';
import { PaymentGuideModal } from './PaymentGuideModal';
import { QRCodeScannerModal } from './QRCodeScannerModal';

export const Navbar = () => {
  const { cart, wishlist } = useShopStore();
  const { user, signIn, signOut, initialize } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPaymentGuideOpen, setIsPaymentGuideOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'New LEDs', path: '/new-leds' },
    { name: 'Repair Booking', path: '/booking?type=repair' },
    { name: 'My Orders', path: '/my-orders' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group text-black dark:text-white">
            <div className="w-6 h-6 bg-black dark:bg-[#06b6d4] rounded-sm flex items-center justify-center transition-colors">
              <div className="w-3 h-3 border border-cyan-400 dark:border-black"></div>
            </div>
            <span className="text-lg font-black tracking-tighter uppercase relative">
              Led<span className="text-cyan-500 dark:text-cyan-455">Zone</span>
            </span>
          </Link>

          <div className="hidden md:flex space-x-6 text-[10px] font-bold uppercase tracking-widest items-center">
            {links.map((link) => {
              const fullPath = location.pathname + location.search;
              const isActive = link.path === '/' 
                ? fullPath === '/'
                : fullPath === link.path || location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors flex items-center space-x-1 ${
                    isActive ? 'text-black dark:text-cyan-400 font-extrabold' : 'text-gray-400 dark:text-zinc-500 hover:text-cyan-500 dark:hover:text-cyan-400'
                  }`}
                >
                  {isActive && <div className="w-1 h-1 bg-cyan-500 rounded-full" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Live Camera Scanner Button */}
            <button
              onClick={() => setIsScannerOpen(true)}
              className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#06b6d4] hover:text-white hover:bg-[#06b6d4] transition-all bg-cyan-50 dark:bg-cyan-950/15 border border-cyan-300/45 hover:border-transparent dark:border-cyan-800/40 px-3 py-1.5 rounded-xl cursor-pointer"
              title="Open QR Scanner (S)"
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Scanner</span>
            </button>

            {/* Payment Guide Action Trigger */}
            <button
              id="nav-payment-guide-btn"
              onClick={() => setIsPaymentGuideOpen(true)}
              className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-[#06b6d4] transition-all bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/65 dark:border-zinc-800 px-3 py-1.5 rounded-xl cursor-pointer"
              title="QR Payment Guide"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pay Guide</span>
            </button>

            {/* Global Dark Mode Toggler */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <Link to="/wishlist" className="relative group flex items-center text-gray-400 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-200 transition-colors cursor-pointer">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-black dark:bg-cyan-500 rounded-full flex items-center justify-center text-[8px] font-black text-white dark:text-black">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative group flex items-center text-gray-400 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-200 transition-colors cursor-pointer">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-cyan-500 rounded-full flex items-center justify-center text-[8px] font-black text-white dark:text-black">
                  {cart.length}
                </span>
              )}
            </Link>

            <div className="relative" ref={dropdownRef}>
              {user ? (
                <div>
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-8 h-8 rounded-full border border-gray-200 dark:border-zinc-800 overflow-hidden hover:border-cyan-500 transition-colors flex items-center justify-center bg-gray-50 dark:bg-zinc-900 cursor-pointer"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-[10px] uppercase text-black dark:text-white">{user.email?.slice(0,2)}</span>
                    )}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xl py-1 z-50">
                      <div className="px-4 py-2 text-[10px] text-gray-400 dark:text-zinc-500 border-b border-gray-50 dark:border-zinc-800 truncate uppercase tracking-widest font-bold">
                        {user.email}
                      </div>
                      <Link
                        to="/my-orders"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full text-left block px-4 py-3 text-xs text-gray-700 dark:text-zinc-300 font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 border-b border-gray-50 dark:border-zinc-800 transition-colors uppercase tracking-widest cursor-pointer"
                      >
                        My Bookings
                      </Link>
                      <button 
                        onClick={() => {
                          signOut();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-xs text-red-500 font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center space-x-2 transition-colors uppercase tracking-widest cursor-pointer"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={signIn}
                  className="w-8 h-8 rounded-full bg-black dark:bg-[#06b6d4] flex items-center justify-center text-white dark:text-black hover:bg-cyan-500 transition-colors cursor-pointer"
                >
                  <UserIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-500 dark:text-zinc-450 hover:text-black dark:hover:text-white cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-900 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col space-y-4">
              {links.map((link) => {
                const fullPath = location.pathname + location.search;
                const isActive = link.path === '/' 
                  ? fullPath === '/'
                  : fullPath === link.path || location.pathname.startsWith(link.path);

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-widest py-2 border-b border-gray-50 dark:border-zinc-900 ${
                      isActive ? 'text-black dark:text-cyan-400' : 'text-gray-400 dark:text-zinc-500'
                    }`}
                  >
                    {isActive && <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Guide Modal */}
      <PaymentGuideModal isOpen={isPaymentGuideOpen} onClose={() => setIsPaymentGuideOpen(false)} />

      {/* Live QR Scanner Modal */}
      <QRCodeScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </nav>
  );
};
