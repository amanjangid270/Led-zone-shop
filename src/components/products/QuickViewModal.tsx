import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, ShieldCheck, Check, Star } from 'lucide-react';
import { useShopStore } from '../../store/shop';
import { products } from '../../lib/data';
import { toast } from 'react-hot-toast';
import { ProductImage } from './ProductImage';

export const QuickViewModal = () => {
  const { quickViewProductId, setQuickView, addToCart } = useShopStore();

  const product = products.find((p) => p.id === quickViewProductId);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product.id);
    toast.success('Added to Cart');
    setQuickView(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickView(null)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          <button
            onClick={() => setQuickView(null)}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left: Image */}
          <div className={`w-full md:w-1/2 p-8 flex items-center justify-center relative ${
            product.image.startsWith('custom-') ? 'p-0 bg-transparent' : 'p-8 bg-gray-50'
          }`}>
            {product.isRefurbished ? (
              <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500 text-[10px] text-white rounded font-bold tracking-widest z-10">REFURBISHED</div>
            ) : (
              <div className="absolute top-4 left-4 px-3 py-1 bg-black text-[10px] text-white rounded font-bold tracking-widest z-10">NEW</div>
            )}
            <ProductImage 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto max-h-[400px] object-contain"
            />
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
            <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-2">{product.brand}</div>
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter leading-none">{product.name}</h2>
            
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-black text-gray-800">{product.rating}</span>
              </div>
              <span className="text-sm font-semibold text-gray-400">
                ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-end space-x-4 mb-8 border-b border-gray-100 pb-6">
              <span className="text-3xl font-black">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through mb-1">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                <div key={key} className="flex flex-col border-b border-gray-50 pb-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{key}</span>
                  <span className="text-sm font-semibold">{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 px-8 rounded-full font-black uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-cyan-500 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
