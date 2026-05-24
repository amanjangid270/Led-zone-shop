import { useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { ProductCard } from '../products/ProductCard';
import { products } from '../../lib/data';
import { Product } from '../../store/shop';
import { useRecommendationStore } from '../../store/recommendation';

interface RecommendationEngineProps {
  contextProductId?: string; // If we are on a specific product detail page
}

export const RecommendationEngine = ({ contextProductId }: RecommendationEngineProps) => {
  const [recommended, setRecommended] = useState<Product[]>([]);
  const { viewedProducts, interactedCategories, lastSearchQueries } = useRecommendationStore();

  useEffect(() => {
    // Recommendation Logic Engine
    const suggestions: Product[] = [];
    
    // Get context product if any
    const contextProduct = contextProductId ? products.find(p => p.id === contextProductId) : null;
    
    // Scoring system to rank products
    const scores = new Map<string, number>();
    
    products.forEach(p => {
      // Don't recommend the item currently being viewed
      if (p.id === contextProductId) return;
      
      let score = 0;
      
      // 1. Explicit Rule: Context Product
      if (contextProduct) {
        // If viewing new TV -> recommend warranty or install service
        if (!contextProduct.isRefurbished && !contextProduct.id.startsWith('srv-')) {
          if (p.id.startsWith('srv-warranty') || p.id.startsWith('srv-install')) score += 50;
        }
        
        // If viewing refurbished TV -> recommend repair sub
        if (contextProduct.isRefurbished) {
          if (p.id.startsWith('srv-repair')) score += 50;
        }
        
        // Same brand boost
        if (p.brand === contextProduct.brand && !p.id.startsWith('srv-')) score += 20;
      }
      
      // 2. Behavioral Rule: History
      viewedProducts.forEach((viewedId, idx) => {
        if (p.id === viewedId) {
            score -= 100; // Don't recommend what they just viewed today/recently, or maybe just lower score
        }
        
        const viewedProduct = products.find(vp => vp.id === viewedId);
        if (viewedProduct && viewedProduct.brand === p.brand && !p.id.startsWith('srv-')) {
          score += (10 - idx); // recent views give higher boost
        }
      });
      
      // 3. Category interaction (cross-sell logic)
      if (interactedCategories.includes('refurbished') && p.id.startsWith('srv-repair')) {
        score += 30; // Highly recommend repair if they look at refurbished
      }
      if (interactedCategories.includes('repair') && p.isRefurbished) {
        score += 15; // If looking for repair, maybe they want a cheap refurbished backup
      }
      if (interactedCategories.includes('new') && (p.id.startsWith('srv-warranty') || p.id.startsWith('srv-install'))) {
        score += 25;
      }
      
      // 4. Keyword matches from recent searches
      lastSearchQueries.forEach(query => {
        const q = query.toLowerCase();
        if (p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) {
            score += 40;
        }
      });

      // Default recs behavior for generic service exposure
      if (score === 0 && p.id.startsWith('srv-')) score += 5; 

      if (score > 0) {
        scores.set(p.id, score);
      }
    });
    
    // Sort and take top 4
    const topProdIds = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1]) // Descending
      .slice(0, 4)
      .map(entry => entry[0]);
      
    // If not enough intelligent suggestions, fallback to highest rated TVs or basic services
    let finals = topProdIds.map(id => products.find(p => p.id === id)!).filter(Boolean);
    
    if (finals.length < 4) {
      const fallbacks = products.filter(p => !finals.includes(p) && p.id !== contextProductId).sort((a,b) => b.rating - a.rating);
      finals = [...finals, ...fallbacks].slice(0, 4);
    }
    
    setRecommended(finals);
  }, [contextProductId, viewedProducts, interactedCategories, lastSearchQueries]);

  if (recommended.length === 0) return null;

  return (
    <div className="mt-16 pt-16 border-t border-gray-100 relative">
      <div className="absolute top-0 right-1/4 w-[200px] h-[200px] bg-cyan-50 rounded-full blur-[60px] opacity-40 -z-10 pointer-events-none"></div>
      
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-black tracking-widest text-cyan-500 mb-1 block">Smart Engine</span>
          <h2 className="text-2xl font-black uppercase tracking-tight">Recommended For You</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recommended.map((prod, i) => (
          <motion.div
            key={prod.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            {prod.id.startsWith('srv-') && (
              <div className="absolute -top-3 -right-3 z-20 text-[8px] bg-black text-white font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg border border-gray-800">
                Suggested Service
              </div>
            )}
            <ProductCard product={prod} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
