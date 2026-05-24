/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black selection:bg-cyan-100 selection:text-cyan-600">
        <Navbar />
        <main className="pt-[72px] pb-24 lg:pb-0 relative min-h-screen">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-50 rounded-full blur-[100px] opacity-40 -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-blue-50 rounded-full blur-[80px] opacity-30 -z-10 pointer-events-none"></div>
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
              background: '#fff',
              color: '#000',
              border: '1px solid #f3f4f6',
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
