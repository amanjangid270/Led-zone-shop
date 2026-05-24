import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitCompare, X } from 'lucide-react';
import { useShopStore } from '../../store/shop';
import { CompareModal } from '../products/CompareModal';

export const CompareBar = () => {
  const { compareList, clearCompare } = useShopStore();
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-black text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                {compareList.length}
              </div>
              <span className="text-sm font-semibold whitespace-nowrap">Products Selected</span>
            </div>
            
            <div className="flex items-center gap-2 border-l border-white/20 pl-6">
              <button
                onClick={() => setIsCompareModalOpen(true)}
                disabled={compareList.length < 2}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-black uppercase tracking-widest text-[10px] px-6 py-2.5 rounded-full transition-colors"
              >
                <GitCompare className="w-4 h-4" />
                <span>Compare{compareList.length < 2 ? ' (Need 2+)' : ''}</span>
              </button>
              
              <button
                onClick={clearCompare}
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-white/60 hover:text-white"
                title="Clear comparison"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CompareModal 
        isOpen={isCompareModalOpen} 
        onClose={() => setIsCompareModalOpen(false)} 
      />
    </>
  );
};
