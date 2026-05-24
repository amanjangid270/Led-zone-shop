import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, XCircle } from 'lucide-react';
import { useShopStore } from '../../store/shop';
import { products } from '../../lib/data';

export const CompareModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { compareList, toggleCompare, clearCompare } = useShopStore();
  
  const compareProducts = compareList.map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products;

  if (!isOpen) return null;

  const allSpecs = Array.from(new Set(compareProducts.flatMap(p => Object.keys(p.specs))));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Compare Products</h2>
            <div className="flex items-center gap-4">
              <button 
                onClick={clearCompare}
                className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:bg-black hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-auto p-6">
            {compareProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-400 font-medium">No products selected for comparison.</p>
              </div>
            ) : (
              <div className="min-w-[800px]">
                {/* Headers */}
                <div className="grid border-b border-gray-200 pb-6 items-end" style={{ gridTemplateColumns: `repeat(${compareProducts.length + 1}, minmax(0, 1fr))` }}>
                  <div className="font-bold text-sm text-gray-400 uppercase tracking-widest px-4 pb-4">Product</div>
                  {compareProducts.map(p => (
                    <div key={p.id} className="relative px-4 flex flex-col items-center text-center">
                      <button 
                        onClick={() => toggleCompare(p.id)}
                        className="absolute top-0 right-4 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors z-10"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                      <div className="h-32 mb-4 flex items-center justify-center w-full">
                        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{p.brand}</div>
                      <div className="text-xs font-black uppercase leading-tight line-clamp-2 h-8">{p.name}</div>
                      <div className="mt-2 font-black text-sm">₹{p.price.toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                </div>

                {/* Specs */}
                <div className="py-4 space-y-4">
                  {allSpecs.map(spec => (
                    <div key={spec} className="grid items-center rounded bg-gray-50/50 hover:bg-gray-50 transition-colors py-3" style={{ gridTemplateColumns: `repeat(${compareProducts.length + 1}, minmax(0, 1fr))` }}>
                      <div className="font-bold text-[10px] text-gray-500 uppercase tracking-widest px-4">{spec}</div>
                      {compareProducts.map(p => {
                        const val = p.specs[spec];
                        if (spec === 'Power Efficiency Score' && val) {
                          const percentageStr = val.includes('%') ? val : `${val}%`;
                          return (
                            <div key={p.id} className="px-4 text-sm font-bold text-gray-900 text-center flex flex-col items-center justify-center">
                              <span className="text-[#06b6d4] font-black font-mono text-xs mb-1 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-100">
                                {val}
                              </span>
                              <div className="w-full max-w-[140px] bg-zinc-200 h-3 rounded-full overflow-hidden border border-zinc-300 p-0.5 shadow-inner">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: percentageStr }}
                                  transition={{ duration: 1, ease: 'easeOut' }}
                                  className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full"
                                />
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div key={p.id} className="px-4 text-sm font-medium text-gray-900 text-center">
                            {val || '-'}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
                
                {/* Basic info */}
                <div className="py-4 space-y-4 border-t border-gray-100">
                  <div className="grid items-center rounded py-3" style={{ gridTemplateColumns: `repeat(${compareProducts.length + 1}, minmax(0, 1fr))` }}>
                    <div className="font-bold text-[10px] text-gray-500 uppercase tracking-widest px-4">Condition</div>
                    {compareProducts.map(p => (
                      <div key={p.id} className="px-4 text-sm font-medium text-center">
                        {p.isRefurbished ? <span className="text-cyan-600 font-bold">Refurbished</span> : <span className="text-black font-bold">New</span>}
                      </div>
                    ))}
                  </div>
                  <div className="grid items-center rounded py-3 bg-gray-50/50" style={{ gridTemplateColumns: `repeat(${compareProducts.length + 1}, minmax(0, 1fr))` }}>
                    <div className="font-bold text-[10px] text-gray-500 uppercase tracking-widest px-4">Rating</div>
                    {compareProducts.map(p => (
                      <div key={p.id} className="px-4 text-sm font-medium text-center flex items-center justify-center space-x-1">
                         <span className="font-bold">{p.rating}</span>
                         <span className="text-xs text-gray-400">({p.reviews})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
