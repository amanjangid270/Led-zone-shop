import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CorrectionMessage {
  field: string;
  original: string;
  corrected: string;
  explanation: string;
  timestamp: number;
}

interface PreferredAction {
  category: 'repair' | 'buy_new' | 'buy_refurbished' | 'none';
  severity: 'low' | 'medium' | 'high';
  rationale: string;
  savings?: number;
}

interface AIBrainState {
  // Saved returning user details
  savedName: string;
  savedPhone: string;
  savedAddress: string;
  
  // AI Diagnostics Status
  activeDiagnostics: PreferredAction | null;
  corrections: Record<string, CorrectionMessage>;
  hasAutoFilled: boolean;
  totalAutofills: number;
  
  // Actions
  saveUserDetails: (name: string, phone: string, address: string) => void;
  registerCorrection: (field: string, original: string, corrected: string, explanation: string) => void;
  removeCorrection: (field: string) => void;
  setHasAutoFilled: (flag: boolean) => void;
  setDiagnostics: (diag: PreferredAction | null) => void;
  clearAIBrain: () => void;
}

export const useAIBrainStore = create<AIBrainState>()(
  persist(
    (set) => ({
      savedName: '',
      savedPhone: '',
      savedAddress: '',
      activeDiagnostics: null,
      corrections: {},
      hasAutoFilled: false,
      totalAutofills: 0,

      saveUserDetails: (name, phone, address) => 
        set((state) => ({
          savedName: name.trim(),
          savedPhone: phone.trim(),
          savedAddress: address.trim(),
          // Don't override totalAutofills
        })),

      registerCorrection: (field, original, corrected, explanation) =>
        set((state) => {
          const newCorrections = { ...state.corrections };
          if (original.trim() === corrected.trim()) {
            delete newCorrections[field];
          } else {
            newCorrections[field] = {
              field,
              original,
              corrected,
              explanation,
              timestamp: Date.now()
            };
          }
          return { corrections: newCorrections };
        }),

      removeCorrection: (field) =>
        set((state) => {
          const newCorrections = { ...state.corrections };
          delete newCorrections[field];
          return { corrections: newCorrections };
        }),

      setHasAutoFilled: (flag) => 
        set((state) => ({ 
          hasAutoFilled: flag, 
          totalAutofills: flag ? state.totalAutofills + 1 : state.totalAutofills 
        })),

      setDiagnostics: (diag) => set({ activeDiagnostics: diag }),

      clearAIBrain: () => 
        set({
          savedName: '',
          savedPhone: '',
          savedAddress: '',
          activeDiagnostics: null,
          corrections: {},
          hasAutoFilled: false
        })
    }),
    {
      name: 'ledzone-ai-brain-context',
    }
  )
);
