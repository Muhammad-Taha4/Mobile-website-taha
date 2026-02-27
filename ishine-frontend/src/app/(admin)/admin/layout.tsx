'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const user = useAuthStore(state => state.user);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Strict Client-Side Auth Guard
        // For demonstration, simply ensuring a user is logged in. 
        // In reality, enforce user.role === 'ADMIN'. 
        if (!user) {
            router.replace('/login');
        } else if (user.role && user.role !== 'ADMIN' && user.role !== 'admin') {
            // Optional: stricter role checking
            router.replace('/');
        }
    }, [user, router]);

    // Prevent hydration errors / flashing content before auth check
    if (!isClient || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B4182]"></div>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-80px)] md:h-screen bg-slate-50 overflow-hidden relative z-[100]">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                {children}
            </main>
        </div>
    );
}
