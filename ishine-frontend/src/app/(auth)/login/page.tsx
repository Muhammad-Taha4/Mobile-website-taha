'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Update auth context
            login(data.user, data.token);
            toast.success("Welcome back!");

            // Redirect based on role
            if (data.user.role === 'ADMIN' || data.user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/account');
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
            toast.error(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex-1 w-full px-4 py-8 md:px-8 lg:px-12 flex justify-center bg-slate-50">
            <div className="w-full max-w-7xl flex flex-col gap-8">

                {/* Hero / Welcome Message */}
                <div className="text-center space-y-2 mb-4">
                    <h1 className="text-slate-900 text-3xl md:text-4xl font-bold leading-tight">Welcome to the B2B Portal</h1>
                    <p className="text-slate-600 text-lg">Secure wholesale access for authorized retailers & repair shops</p>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* Left Column: Login - WHITE CARD */}
                    <div className="flex flex-col h-full">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden h-full flex flex-col">

                            {/* Hero Image for Login */}
                            <div
                                className="h-48 w-full bg-cover bg-center relative"
                                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop")' }}
                            >
                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent flex items-end p-6">
                                    <div>
                                        <h3 className="text-white text-xl font-bold">Existing Customer Login</h3>
                                        <p className="text-slate-200 text-sm mt-1">Access your wholesale pricing and order history.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col justify-center">
                                {error && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-center gap-2 border border-red-100">
                                        <span className="material-symbols-outlined text-sm">error</span>
                                        {error}
                                    </div>
                                )}

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <label className="block">
                                        <span className="text-slate-700 font-medium text-sm mb-2 block">Email Address</span>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-slate-400">mail</span>
                                            </div>
                                            <input
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-input w-full pl-10 rounded-xl border-slate-300 bg-slate-50 text-slate-900 focus:border-[#2ea4d5] focus:ring-[#2ea4d5] h-12 placeholder:text-slate-400 outline-none"
                                                placeholder="name@company.com"
                                                type="email"
                                                required
                                            />
                                        </div>
                                    </label>

                                    <label className="block">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-slate-700 font-medium text-sm">Password</span>
                                            <Link className="text-[#2ea4d5] hover:text-[#2389b3] text-sm font-medium" href="#">Forgot Password?</Link>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-slate-400">lock</span>
                                            </div>
                                            <input
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="form-input w-full pl-10 rounded-xl border-slate-300 bg-slate-50 text-slate-900 focus:border-[#2ea4d5] focus:ring-[#2ea4d5] h-12 placeholder:text-slate-400 outline-none"
                                                placeholder="••••••••"
                                                type="password"
                                                required
                                            />
                                        </div>
                                    </label>

                                    <div className="pt-2">
                                        <button
                                            disabled={isLoading}
                                            className="w-full flex justify-center items-center gap-2 bg-[#2ea4d5] hover:bg-[#2389b3] text-white font-bold rounded-xl h-12 transition-colors shadow-md shadow-[#2ea4d5]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                            type="submit"
                                        >
                                            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                                            {!isLoading && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                                    <p className="text-slate-600 text-sm">
                                        Having trouble logging in? <Link className="text-[#2ea4d5] font-bold hover:underline" href="#">Contact Support</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Registration - WHITE CARD */}
                    <div className="flex flex-col h-full">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden h-full flex flex-col relative">
                            {/* Decorative Top Border */}
                            <div className="h-2 w-full bg-[#2ea4d5]"></div>

                            <div className="p-8">
                                <div className="mb-6">
                                    <h3 className="text-slate-900 text-2xl font-bold">Need a Wholesale Account?</h3>
                                    <p className="text-slate-600 mt-1">Join our network of 5,000+ repair shops and retailers.</p>
                                </div>

                                <div className="flex-1 flex flex-col items-center justify-center py-10 text-center space-y-6">
                                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-4xl text-[#2ea4d5]">storefront</span>
                                    </div>
                                    <div className="space-y-2 max-w-sm">
                                        <h4 className="text-lg font-bold text-slate-800">Exclusive B2B Benefits</h4>
                                        <ul className="text-sm text-slate-600 space-y-2 text-left bg-slate-50 p-4 rounded-xl">
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Tiered wholesale pricing</li>
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Same-day priority shipping</li>
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Dedicated account manager</li>
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Lifetime warranty on select parts</li>
                                        </ul>
                                    </div>
                                    <Link href="/signup" className="w-full">
                                        <button className="w-full flex justify-center items-center gap-2 bg-white border-2 border-[#2ea4d5] text-[#2ea4d5] hover:bg-slate-50 font-bold rounded-xl h-12 transition-colors mt-4">
                                            <span>Apply for Account</span>
                                            <span className="material-symbols-outlined text-sm">assignment</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="py-8 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-3xl text-slate-700">verified_user</span>
                        <span className="font-bold text-slate-700">Secure B2B</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-3xl text-slate-700">local_shipping</span>
                        <span className="font-bold text-slate-700">Same Day Shipping</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-3xl text-slate-700">price_check</span>
                        <span className="font-bold text-slate-700">Wholesale Pricing</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
