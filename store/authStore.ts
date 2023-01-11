import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import axios from 'axios';
import { User } from '../types';
import { BASE_URL } from '../utils';

export type AuthState = {
  userProfile: User | null;
  allUsers: User[];
  addUser: (user: User) => void;
  removeUser: () => void;
  fetchAllUsers: () => void;
};

const authStore = (set: any): AuthState => ({
  userProfile: null,
  allUsers: [],
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  fetchAllUsers: async () => {
    const { data } = await axios.get(`${BASE_URL}/api/users`);
    set({ allUsers: data });
  },
});

const useAuthStore = create<AuthState>()(
  persist(authStore, {
    name: 'auth',
  })
);

export default useAuthStore;
