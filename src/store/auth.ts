import { create } from 'zustand';
import { auth, db } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
  };
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  signIn: async () => {
    set({ loading: true });
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;
      
      const loggedUser: User = {
        id: fbUser.uid,
        email: fbUser.email || undefined,
        user_metadata: {
          avatar_url: fbUser.photoURL || undefined
        }
      };

      // Save user profile metadata to Firestore users/{userId}
      await setDoc(doc(db, 'users', fbUser.uid), {
        userId: fbUser.uid,
        email: fbUser.email || '',
        createdAt: new Date() // Since serverTimestamp is handled dynamically in DB Rules, Date works perfectly
      }, { merge: true });

      set({ user: loggedUser, loading: false });
    } catch (error) {
      console.error('Firebase sign in error:', error);
      set({ loading: false });
    }
  },
  signOut: async () => {
    set({ loading: true });
    try {
      await firebaseSignOut(auth);
      set({ user: null, loading: false });
    } catch (error) {
      console.error('Firebase sign out error:', error);
      set({ loading: false });
    }
  },
  initialize: () => {
    onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const loggedUser: User = {
          id: fbUser.uid,
          email: fbUser.email || undefined,
          user_metadata: {
            avatar_url: fbUser.photoURL || undefined
          }
        };
        set({ user: loggedUser, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    });
  }
}));
