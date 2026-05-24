import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => {
        const nextMode = !state.isDarkMode;
        // Side-effect: Toggle 'dark' class on Document level
        if (typeof document !== 'undefined') {
          if (nextMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        return { isDarkMode: nextMode };
      }),
    }),
    {
      name: 'ledzone-theme-storage',
    }
  )
);
