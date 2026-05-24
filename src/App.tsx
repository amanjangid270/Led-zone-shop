/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Booking } from './pages/Booking';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { MyOrders } from './pages/MyOrders';
import { ChatBot } from './components/chatbot/ChatBot';
import { FloatingButtons } from './components/layout/FloatingButtons';
import { QuickViewModal } from './components/products/QuickViewModal';
import { CompareBar } from './components/layout/CompareBar';
import { useThemeStore } from './store/themeStore';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

function KeyboardShortcutsAndTheme() {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
         activeEl.tagName === 'TEXTAREA' ||
         (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'h') {
        e.preventDefault();
        navigate('/');
        toast.success('Navigated to Home (Shortcut: H)', { id: 'shortcut-toast' });
      } else if (key === 'c') {
        e.preventDefault();
        navigate('/cart');
        toast.success('Navigated to Cart (Shortcut: C)', { id: 'shortcut-toast' });
      } else if (key === 's') {
        e.preventDefault();
        navigate('/new-leds');
        toast.success('Focused Products Search (Shortcut: S)', { id: 'shortcut-toast' });
        setTimeout(() => {
          const searchInput = document.getElementById('product-search-input') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            searchInput.select();
          }
        }, 150);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

export default function App() {
  const { isDarkMode } = useThemeStore();
  
  return (
    <Router>
      <KeyboardShortcutsAndTheme />
      <div className={`min-h-screen bg-white text-black dark:bg-[#09090c] dark:text-zinc-100 selection:bg-cyan-100 dark:selection:bg-cyan-950 selection:text-cyan-600 dark:selection:text-cyan-400 transition-colors duration-350`}>
        <Navbar />
        <main className="pt-[72px] pb-24 lg:pb-0 relative min-h-screen">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-50 dark:bg-cyan-950/10 rounded-full blur-[100px] opacity-40 dark:opacity-20 -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-blue-50 dark:bg-zinc-900/10 rounded-full blur-[80px] opacity-30 dark:opacity-10 -z-10 pointer-events-none"></div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-leds" element={<Products type="new" />} />
            <Route path="/refurbished-leds" element={<Products type="refurbished" />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Routes>
        </main>
        <FloatingButtons />
        <ChatBot />
        <QuickViewModal />
        <CompareBar />
        <Toaster 
          position="bottom-center"
          toastOptions={{
            style: {
              background: isDarkMode ? '#111115' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
              border: isDarkMode ? '1px solid #1f1f23' : '1px solid #f3f4f6',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              fontSize: '12px',
              fontFamily: '"Inter", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: '700'
            },
            success: {
              iconTheme: {
                primary: '#06b6d4',
                secondary: '#fff',
              },
            },
          }} 
        />
      </div>
    </Router>
  );
}
