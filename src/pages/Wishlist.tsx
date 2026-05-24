import { useShopStore } from '../store/shop';
import { products } from '../lib/data';
import { motion } from 'motion/react';
import { ProductCard } from '../components/products/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Wishlist = () => {
  const { wishlist } = useShopStore();

  const wishlistItems = wishlist.map(id => products.find(p => p.id === id)).filter((p): p is typeof products[0] => p !== undefined);

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h2 className="text-2xl font-black uppercase mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 text-sm mb-8">Save items you like and buy them later.</p>
        <Link 
          to="/new-leds" 
          className="inline-block px-8 py-4 rounded-xl bg-black text-white font-bold tracking-widest text-[10px] uppercase hover:bg-cyan-500 hover:shadow-xl transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end mb-12 pb-8 border-b border-gray-100">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2 block">Your Favorites</span>
          <h1 className="text-4xl font-black tracking-tighter uppercase flex items-center">
            My <span className="text-cyan-500 ml-2">Wishlist</span>
            <Heart className="w-8 h-8 ml-4 fill-cyan-500 text-cyan-500 animate-pulse" />
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
