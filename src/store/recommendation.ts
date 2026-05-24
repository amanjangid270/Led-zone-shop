import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EventLog {
  id: string;
  eventType: 'add_to_cart' | 'wishlist_toggle' | 'compare_toggle' | 'quick_buy' | 'view';
  productId: string;
  timestamp: string;
}

interface RecState {
  viewedProducts: string[];
  lastSearchQueries: string[];
  interactedCategories: string[]; // e.g., 'new', 'refurbished', 'repair'
  trackedEvents: EventLog[];
  addViewedProduct: (id: string) => void;
  addSearchQuery: (query: string) => void;
  addInteractedCategory: (category: string) => void;
  trackEvent: (eventType: EventLog['eventType'], productId: string) => void;
  clearHistory: () => void;
}

export const useRecommendationStore = create<RecState>()(
  persist(
    (set) => ({
      viewedProducts: [],
      lastSearchQueries: [],
      interactedCategories: [],
      trackedEvents: [],
      addViewedProduct: (id) =>
        set((state) => ({
          viewedProducts: [id, ...state.viewedProducts.filter((x) => x !== id)].slice(0, 5),
        })),
      addSearchQuery: (query) =>
        set((state) => ({
          lastSearchQueries: [query, ...state.lastSearchQueries.filter((x) => x !== query)].slice(0, 5),
        })),
      addInteractedCategory: (category) =>
        set((state) => ({
          interactedCategories: [category, ...state.interactedCategories.filter((x) => x !== category)].slice(0, 5),
        })),
      trackEvent: (eventType, productId) =>
        set((state) => {
          const newEvent: EventLog = {
            id: 'evt-' + Math.random().toString(36).substring(2, 9),
            eventType,
            productId,
            timestamp: new Date().toISOString()
          };
          return {
            trackedEvents: [newEvent, ...state.trackedEvents].slice(0, 50)
          };
        }),
      clearHistory: () =>
        set({ viewedProducts: [], lastSearchQueries: [], interactedCategories: [], trackedEvents: [] }),
    }),
    {
      name: 'ledzone-recs',
    }
  )
);
