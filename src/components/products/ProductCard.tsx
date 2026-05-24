import React from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, useShopStore } from '../../store/shop';
import { toast } from 'react-hot-toast';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { wishlist, toggleWishlist, addToCart, compareList, toggleCompare, setQuickView } = useShopStore();
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  // Swipe to add to cart
  const xSwipe = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 80;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      addToCart(product.id);
      toast.success('Added to Cart');
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    toast.success('Added to Cart');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist');
  };

  const handleToggleCompare = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!isCompared && compareList.length >= 4) {
      toast.error('You can only compare up to 4 products');
      return;
    }
    toggleCompare(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickView(product.id);
  };

  return (
    <div className="relative h-full rounded-2xl">
      {/* Background for swipe action */}
      <div className="absolute inset-0 bg-cyan-500 rounded-2xl flex items-center justify-between px-6 text-white overflow-hidden pointer-events-none">
        <div className="flex flex-col items-center">
          <ShoppingCart className="w-6 h-6 mb-1" />
          <span className="text-[8px] font-black uppercase tracking-widest text-center">Add to Cart</span>
        </div>
        <div className="flex flex-col items-center">
          <ShoppingCart className="w-6 h-6 mb-1" />
          <span className="text-[8px] font-black uppercase tracking-widest text-center">Add to Cart</span>
        </div>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.4}
        onDragEnd={handleDragEnd}
        style={{ x: xSwipe }}
        className="h-full touch-pan-y"
      >
        <Link to={`/product/${product.id}`} className="block h-full cursor-grab active:cursor-grabbing" draggable={false}>
          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-cyan-100 transition-all h-full relative z-10"
          >
        <div className={`h-40 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center group/image ${
          product.image.startsWith('custom-') ? 'bg-transparent border border-gray-900 shadow-sm' : 'bg-gray-50'
        }`}>
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {product.isRefurbished ? (
              <div className="px-2 py-0.5 bg-cyan-500 text-[8px] text-white rounded font-bold tracking-widest w-fit">REFURBISHED</div>
            ) : (
              <div className="px-2 py-0.5 bg-black text-[8px] text-white rounded font-bold tracking-widest w-fit">NEW</div>
            )}
            {product.reviews > 2000 && (
              <div className="px-2 py-0.5 bg-red-600 text-[8px] text-white rounded font-bold tracking-widest w-fit shadow-[0_0_8px_rgba(220,38,38,0.5)] animate-pulse">LOW STOCK</div>
            )}
          </div>
          
          <ProductImage 
            src={product.image} 
            alt={product.name}
            className={`w-full h-full object-contain group-hover/image:scale-105 transition-transform mix-blend-multiply ${
              product.image.startsWith('custom-') ? 'p-0 rounded-xl' : 'p-4'
            }`}
          />

          {/* Quick View Button overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <button
              onClick={handleQuickView}
              className="px-4 py-2 bg-white rounded-full text-xs font-bold text-black border border-gray-100 shadow-lg hover:bg-black hover:text-white transition-colors pointer-events-auto flex items-center space-x-1 translate-y-4 group-hover/image:translate-y-0 duration-200"
            >
              <Eye className="w-3 h-3" />
              <span>Quick View</span>
            </button>
          </div>
          
          <button
            onClick={handleToggleWishlist}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 border border-gray-100 flex items-center justify-center hover:bg-white shadow-sm z-10"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-cyan-500 text-cyan-500' : 'text-gray-400'}`} />
          </button>
        </div>

        <div className="flex flex-col flex-grow">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{product.brand}</p>
          <h4 className="text-xs font-black mb-1 uppercase leading-tight line-clamp-2 overflow-hidden flex-grow">{product.name}</h4>
          
          <div className="flex items-center space-x-1 mb-3">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] font-bold text-gray-700">{product.rating}</span>
            <span className="text-[10px] text-gray-400">({product.reviews})</span>
          </div>
          
          <div className="flex justify-between items-center mt-auto">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-[10px] text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              <span className="font-black text-sm">₹{product.price.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <label 
                className="text-[10px] flex items-center gap-1 font-semibold text-gray-500 hover:text-black cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <input 
                  type="checkbox" 
                  className="rounded text-cyan-500 focus:ring-cyan-500"
                  checked={isCompared}
                  onChange={handleToggleCompare}
                />
                Compare
              </label>
              <button
                onClick={handleAddToCart}
                className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors shrink-0"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        </motion.div>
      </Link>
      </motion.div>
    </div>
  );
};

