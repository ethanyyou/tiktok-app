import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import axios from 'axios';
import { User } from '../types';

export type AuthState = {
  userProfile: User | null;
  addUser: (user: User) => void;
  removeUser: () => void;
};

const authStore = (set: any): AuthState => ({
  userProfile: null,
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
});

const useAuthStore = create<AuthState>()(
  persist(authStore, {
    name: 'auth',
  })
);

export default useAuthStore;
