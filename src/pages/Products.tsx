import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/products/ProductCard';
import { products } from '../lib/data';
import { useRecommendationStore } from '../store/recommendation';
import { RecommendationEngine } from '../components/recommendations/RecommendationEngine';
import { SlidersHorizontal, ArrowUpDown, Filter, RotateCcw } from 'lucide-react';

interface ProductsProps {
  type: 'new' | 'refurbished';
}

const ProductCardSkeleton = () => (
  <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col justify-between h-96 relative overflow-hidden animate-pulse">
    <div>
      <div className="h-40 bg-gray-100 rounded-xl mb-4" />
      <div className="h-2 w-1/4 bg-gray-100 rounded mb-2" />
      <div className="h-4 w-3/4 bg-gray-100 rounded mb-1" />
      <div className="h-4 w-1/2 bg-gray-100 rounded mb-4" />
      <div className="flex gap-2 mb-3">
        <div className="h-4 w-8 bg-gray-100 rounded" />
        <div className="h-4 w-16 bg-gray-100 rounded" />
      </div>
    </div>
    <div className="space-y-2 pt-2 border-t border-gray-50 mt-auto">
      <div className="flex justify-between">
        <div className="h-2 w-10 bg-gray-100 rounded" />
        <div className="h-2 w-20 bg-gray-100 rounded" />
      </div>
      <div className="flex justify-between">
        <div className="h-2 w-12 bg-gray-100 rounded" />
        <div className="h-2 w-16 bg-gray-100 rounded" />
      </div>
    </div>
  </div>
);

export const Products = ({ type }: ProductsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(3000000);
  const [sortBy, setSortBy] = useState<string>('default');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  
  const { addSearchQuery, addInteractedCategory } = useRecommendationStore();
  
  useEffect(() => {
    addInteractedCategory(type);
  }, [type, addInteractedCategory]);

  useEffect(() => {
    if (searchTerm.trim().length > 2) {
      const handler = setTimeout(() => {
        addSearchQuery(searchTerm);
      }, 1000);
      return () => clearTimeout(handler);
    }
  }, [searchTerm, addSearchQuery]);

  // Reset filters when type changes
  useEffect(() => {
    setSearchTerm('');
    setMaxPrice(3000000);
    setSortBy('default');
    setSelectedBrand('all');
  }, [type]);

  // Handle fake data fetching / filter transition delay
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [type, searchTerm, maxPrice, sortBy, selectedBrand]);

  const availableBrands = Array.from(
    new Set(
      products
        .filter(p => !p.id.startsWith('srv-') && p.isRefurbished === (type === 'refurbished'))
        .map(p => p.brand)
    )
  );

  const filteredProducts = products.filter(p => 
    !p.id.startsWith('srv-') && // Hide services from main grid
    p.isRefurbished === (type === 'refurbished') &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    p.price <= maxPrice &&
    (selectedBrand === 'all' || p.brand === selectedBrand)
  );

  // Sorting Implementation
  const sortedProducts = [...filteredProducts];
  if (sortBy === 'price-asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  const handleResetFilters = () => {
    setSearchTerm('');
    setMaxPrice(3000000);
    setSortBy('default');
    setSelectedBrand('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header section with Search / Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-6 gap-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2 block font-mono">Our Collection</span>
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
            {type === 'new' ? 'New ' : 'Renewed '}
            <span className="text-cyan-500">Displays</span>
          </h1>
        </div>
        
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search matching LEDs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-20 items-start">
        {/* Sidebar Filters */}
        <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-500" />
              <span className="text-xs font-black uppercase tracking-widest">Filters</span>
            </div>
            {(maxPrice < 3000000 || selectedBrand !== 'all' || sortBy !== 'default') && (
              <button 
                onClick={handleResetFilters}
                className="text-[10px] font-bold text-red-500 hover:text-red-600 flex items-center gap-1 uppercase tracking-widest transition-colors font-mono"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Quick Sorting Dropdown */}
          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block font-mono">Sort By</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wide focus:outline-none focus:border-cyan-500 appearance-none pr-8 cursor-pointer"
              >
                <option value="default">Default Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <ArrowUpDown className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Brands Selection Pills */}
          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block font-mono">Brand Selection</label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                  selectedBrand === 'all'
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                All Brands
              </button>
              {availableBrands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                    selectedBrand === brand
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block font-mono">Budget Limit</label>
              <span className="text-xs font-black text-cyan-600">
                {maxPrice === 3000000 ? 'Any Price' : `Under ₹${maxPrice.toLocaleString('en-IN')}`}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="3000000"
              step="50000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-cyan-500 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            
            {/* Short Cuts price limits buttons */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[100000, 500000, 1500000, 3000000].map((priceVal) => (
                <button
                  key={priceVal}
                  onClick={() => setMaxPrice(priceVal)}
                  className={`py-1.5 px-2 rounded-lg text-[9px] font-bold tracking-widest uppercase transition-all border ${
                    maxPrice === priceVal
                      ? 'bg-cyan-500 text-black border-cyan-500 font-black'
                      : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-100'
                  }`}
                >
                  {priceVal === 3000000 ? 'No Limit' : `₹${priceVal >= 1000000 ? `${(priceVal / 100000).toFixed(0)} L` : `${(priceVal / 1000).toFixed(0)}k`}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid Area with Framer-Motion Layout Animation */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <ProductCardSkeleton key={n} />
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <motion.div 
              layout 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {sortedProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      layout: { duration: 0.4, type: "spring", stiffness: 300, damping: 30 }
                    }}
                    className="h-full"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 font-black uppercase tracking-widest text-xs">
              No matching products found matching filters.
            </div>
          )}
        </div>
      </div>

      <RecommendationEngine />
    </div>
  );
};

