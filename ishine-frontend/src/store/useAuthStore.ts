import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    email: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    role: string;
    businessName?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            setAuth: (user, token) => set({ user, token }),
            logout: () => {
                if (typeof document !== 'undefined') document.cookie = 'token=; Max-Age=0; path=/;';
                set({ user: null, token: null });
            },
            isAuthenticated: () => !!get().token,
        }),
        {
            name: 'ishine-auth-storage',
        }
    )
);
