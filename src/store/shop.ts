import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useRecommendationStore } from './recommendation';

export interface ProductSlide {
  title: string;
  headline: string;
  description: string;
  image: string;
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  specs: Record<string, string>;
  isRefurbished: boolean;
  condition?: string;
  rating: number;
  reviews: number;
  slides?: ProductSlide[];
  buyUrl?: string;
}

interface ShopState {
  wishlist: string[];
  compareList: string[];
  cart: { productId: string; quantity: number }[];
  quickViewProductId: string | null;
  toggleWishlist: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  clearCompare: () => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setQuickView: (productId: string | null) => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      wishlist: [],
      compareList: [],
      cart: [],
      quickViewProductId: null,
      toggleWishlist: (productId) =>
        set((state) => {
          const result = state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId];
          
          // Log interaction
          useRecommendationStore.getState().trackEvent('wishlist_toggle', productId);
          
          return { wishlist: result };
        }),
      toggleCompare: (productId) =>
        set((state) => {
          const result = state.compareList.includes(productId)
            ? state.compareList.filter((id) => id !== productId)
            : state.compareList.length < 4
            ? [...state.compareList, productId]
            : state.compareList;

          // Log interaction
          useRecommendationStore.getState().trackEvent('compare_toggle', productId);

          return { compareList: result };
        }),
      clearCompare: () => set({ compareList: [] }),
      addToCart: (productId) =>
        set((state) => {
          // Log interaction
          useRecommendationStore.getState().trackEvent('add_to_cart', productId);

          // Haptic feedback for mobile users
          if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
            navigator.vibrate(60);
          }

          const existing = state.cart.find((item) => item.productId === productId);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          return { cart: [...state.cart, { productId, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        })),
      clearCart: () => set({ cart: [] }),
      setQuickView: (productId) => set({ quickViewProductId: productId }),
    }),
    {
      name: 'ledzone-shop-storage',
      partialize: (state) => ({ wishlist: state.wishlist, cart: state.cart }),
    }
  )
);
