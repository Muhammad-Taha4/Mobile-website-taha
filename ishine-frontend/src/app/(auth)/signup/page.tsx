'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

export default function SignupPage() {
    const router = useRouter();
    const setAuth = useAuthStore(state => state.setAuth);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phone: '',
        taxId: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);
        console.log("Starting signup submission...", formData);
        try {
            const apiData = {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                businessName: formData.companyName,
                email: formData.email,
                phone: formData.phone,
                taxId: formData.taxId,
                password: formData.password
            };

            console.log("Sending API request to /api/auth/register", apiData);

            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiData)
            });

            console.log("Response status:", res.status);
            const data = await res.json();
            console.log("Response data:", data);

            if (res.ok && data.token) {
                toast.success("Account created successfully! Please log in.");
                router.push('/login'); // Redirect to login as requested
            } else {
                toast.error(data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup failed error:", error);
            toast.error("An error occurred during registration. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex-1 w-full px-4 py-8 md:px-8 lg:px-12 flex justify-center bg-slate-50">
            <div className="w-full max-w-3xl flex flex-col gap-6">

                {/* Hero / Welcome Message */}
                <div className="text-center space-y-2 mb-2">
                    <h1 className="text-slate-900 text-3xl md:text-4xl font-bold leading-tight">Wholesale Account Application</h1>
                    <p className="text-slate-600 text-lg">Join our network of 5,000+ repair shops and retailers.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
                    {/* Decorative Top Border */}
                    <div className="h-2 w-full bg-[#2ea4d5]"></div>

                    <div className="p-8">
                        <form className="space-y-5" onSubmit={handleSignup}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <label className="block">
                                    <span className="text-slate-700 font-medium text-sm mb-1.5 block">First Name <span className="text-red-500">*</span></span>
                                    <input
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="form-input w-full rounded-xl border-slate-300 bg-slate-50 text-slate-900 focus:border-[#2ea4d5] focus:ring-[#2ea4d5] h-11 px-4 placeholder:text-slate-400"
                                        placeholder="John"
                                        type="text"
                                        required
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-slate-700 font-medium text-sm mb-1.5 block">Last Name <span className="text-red-500">*</span></span>
                                    <input
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="form-input w-full rounded-xl border-slate-300 bg-slate-50 text-slate-900 focus:border-[#2ea4d5] focus:ring-[#2ea4d5] h-11 px-4 placeholder:text-slate-400"
                                        placeholder="Doe"
                                        type="text"
                                        required
                                    />
                                </label>
                            </div>

                            <label className="block">
                                <span className="text-slate-700 font-medium text-sm mb-1.5 block">Company Name</span>
                                <input
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="form-input w-full rounded-xl border-slate-300 bg-slate-50 text-slate-900 focus:border-[#2ea4d5] focus:ring-[#2ea4d5] h-11 px-4 placeholder:text-slate-400"
                                    placeholder="iRepair Solutions LLC"
                                    type="text"
                                />
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <label className="block">
                                    <span className="text-slate-700 font-medium text-sm mb-1.5 block">Business Email <span className="text-red-500">*</span></span>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-input w-full rounded-xl border-slate-300 bg-slate-50 text-slate-900 focus:border-[#2ea4d5] focus:ring-[#2ea4d5] h-11 px-4 placeholder:text-slate-400"
                                        placeholder="purchasing@irepair.com"
                                        type="email"
                                        required
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-slate-700 font-medium text-sm mb-1.5 block">Phone Number</span>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="form-input w-full rounded-xl border-slate-300 bg-slate-50 text-slate-900 focus:border-[#2ea4d5] focus:ring-[#2ea4d5] h-11 px-4 placeholder:text-slate-400"
                                        placeholder="(555) 123-4567"
                                        type="tel"
                                    />
                                </label>
                            </div>

                            <label className="block">
                                <span className="text-slate-700 font-medium text-sm mb-1.5 block">Tax ID / Reseller Number</span>
                                <input
                                    name="taxId"
                                    value={formData.taxId}
                                    onChange={handleChange}
                                    className="form-input w-full rounded-xl border-slate-300 bg-slate-50 text-slate-900 focus:border-[#2ea4d5] focus:ring-[#2ea4d5] h-11 px-4 placeholder:text-slate-400"
                                    placeholder="XX-XXXXXXX"
                                    type="text"
                                />
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <label className="block">
                                    <span className="text-slate-700 font-medium text-sm mb-1.5 block">Password <span className="text-red-500">*</span></span>
                                    <input
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-input w-full rounded-xl border-slate-300 bg-slate-50 text-slate-900 focus:border-[#2ea4d5] focus:ring-[#2ea4d5] h-11 px-4 placeholder:text-slate-400"
                                        placeholder="••••••••"
                                        type="password"
                                        required
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-slate-700 font-medium text-sm mb-1.5 block">Confirm Password <span className="text-red-500">*</span></span>
                                    <input
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="form-input w-full rounded-xl border-slate-300 bg-slate-50 text-slate-900 focus:border-[#2ea4d5] focus:ring-[#2ea4d5] h-11 px-4 placeholder:text-slate-400"
                                        placeholder="••••••••"
                                        type="password"
                                        required
                                    />
                                </label>
                            </div>

                            <div className="pt-4">
                                <button
                                    disabled={isLoading}
                                    className="w-full flex justify-center items-center gap-2 bg-[#2ea4d5] hover:bg-[#2389b3] text-white font-bold rounded-xl h-12 transition-colors shadow-md shadow-[#2ea4d5]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                    type="submit"
                                >
                                    <span>{isLoading ? 'Submitting Application...' : 'Submit Application'}</span>
                                    {!isLoading && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
                                </button>
                                <p className="text-sm text-slate-500 text-center mt-4">
                                    Already have an account? <Link className="text-[#2ea4d5] font-bold hover:underline" href="/login">Sign in here</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
