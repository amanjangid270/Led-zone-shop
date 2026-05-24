import { useShopStore } from '../store/shop';
import { products } from '../lib/data';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Heart, ShoppingBag } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Cart = () => {
  const { cart, removeFromCart } = useShopStore();
  const navigate = useNavigate();

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...product, quantity: item.quantity };
  }).filter((item): item is (typeof products[0] & { quantity: number }) => item.id !== undefined);

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h2 className="text-2xl font-black uppercase mb-2">Your cart is empty</h2>
        <p className="text-gray-500 text-sm mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/new-leds" 
          className="inline-block px-8 py-4 rounded-xl bg-black text-white font-bold tracking-widest text-[10px] uppercase hover:bg-cyan-500 hover:shadow-xl transition-all"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    // Generate a checkout list to pass to booking or whatsapp
    const itemsList = cartItems.map(i => `${i.quantity}x ${i.name}`).join(', ');
    navigate(`/booking?type=new&product=${encodeURIComponent(itemsList)}&amount=${total}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end mb-12 pb-8 border-b border-gray-100">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2 block">Checkout</span>
          <h1 className="text-4xl font-black tracking-tighter uppercase flex items-center">
            Your <span className="text-cyan-500 ml-2">Cart</span>
          </h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center space-x-6 shadow-sm hover:shadow-cyan-100 transition-all"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2">
                 <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.brand}</div>
                <h3 className="font-black text-sm uppercase leading-tight line-clamp-1 mb-2">{item.name}</h3>
                <div className="text-black font-black">₹{item.price.toLocaleString('en-IN')}</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="px-4 border border-gray-100 rounded-lg py-1 bg-gray-50">
                  <span className="text-xs font-bold">Qty: {item.quantity}</span>
                </div>
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.success('Removed from cart');
                  }}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center hover:bg-white hover:text-red-500 shadow-sm transition-colors text-gray-400"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl sticky top-28">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex justify-between border-b border-gray-200 pb-2 text-sm font-semibold">
                <span className="text-gray-500 tracking-widest uppercase text-xs">Subtotal ({cartItems.length} items)</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2 text-sm font-semibold">
                <span className="text-gray-500 tracking-widest uppercase text-xs">Shipping</span>
                <span className="text-green-500 uppercase tracking-widest text-xs font-black">Free</span>
              </div>
              <div className="pt-2 flex justify-between font-black text-xl">
                <span className="uppercase tracking-tighter">Total</span>
                <span className="text-cyan-500">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-4 rounded-xl bg-black text-white font-black tracking-widest text-[10px] uppercase hover:bg-cyan-500 hover:shadow-xl transition-all border border-black hover:border-cyan-500"
            >
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
