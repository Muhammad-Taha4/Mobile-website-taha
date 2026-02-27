'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function AccountSidebar() {
    const pathname = usePathname();
    const { user, token, logout } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!token) return;
        const fetchProfile = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/user/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                }
            } catch (error) {
                console.error('Failed to fetch profile', error);
            }
        };
        fetchProfile();
    }, [token]);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !token) return;

        const formData = new FormData();
        formData.append('avatar', file);
        if (profile) {
            formData.append('name', profile.name || '');
            formData.append('businessName', profile.businessName || '');
            formData.append('phone', profile.phone || '');
            formData.append('taxId', profile.taxId || '');
        }

        setUploading(true);
        try {
            const res = await fetch('http://localhost:5000/api/user/profile', {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                setProfile(data.user);
                toast.success('Avatar updated successfully!');
            } else {
                toast.error('Failed to update avatar.');
            }
        } catch (error) {
            toast.error('Error uploading avatar.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const navItems = [
        { id: 'overview', icon: 'dashboard', label: 'Dashboard Overview', href: '/account' },
        { id: 'profile', icon: 'storefront', label: 'Business Profile', href: '/account/profile' },
        { id: 'faq', icon: 'help_outline', label: 'FAQ & Support', href: '/faq' },
    ];

    const displayUser = profile || user || {};

    return (
        <aside className="w-full lg:w-1/4 flex flex-col gap-6 shrink-0">
            {/* User Profile Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col items-center text-center">
                <div
                    onClick={handleAvatarClick}
                    className={`w-20 h-20 rounded-full bg-slate-200 mb-4 overflow-hidden ring-4 ring-blue-50 bg-cover bg-center cursor-pointer group relative ${uploading ? 'opacity-50' : ''}`}
                    style={{ backgroundImage: `url('${displayUser?.avatar ? `http://localhost:5000${displayUser.avatar}` : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}')` }}
                >
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-white">photo_camera</span>
                    </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
                <h2 className="text-slate-900 text-lg font-bold">{displayUser?.name || 'Customer'}</h2>
                <p className="text-slate-500 text-sm mb-3">{displayUser?.businessName || 'Business Account'}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 uppercase">
                    {displayUser?.role || 'Customer'}
                </span>
            </div>

            {/* Navigation Menu */}
            <nav className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-2 flex flex-col gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors w-full text-left ${isActive ? 'bg-blue-50 text-[#2ea4d5] border-l-4 border-[#2ea4d5]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'}`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                    <div className="my-2 border-t border-slate-100"></div>
                    <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full text-left border-l-4 border-transparent cursor-pointer">
                        <span className="material-symbols-outlined">logout</span>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Helper Card */}
            <div className="bg-gradient-to-br from-[#2ea4d5] to-[#2389b3] rounded-xl p-6 text-white relative overflow-hidden shadow-sm">
                <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                    <p className="text-white/90 text-sm mb-4">Contact your dedicated account manager for bulk orders.</p>
                    <button className="bg-white text-[#2ea4d5] text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors shadow-sm cursor-pointer">Contact Support</button>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-white/10 rotate-12 pointer-events-none">support_agent</span>
            </div>
        </aside>
    );
}
