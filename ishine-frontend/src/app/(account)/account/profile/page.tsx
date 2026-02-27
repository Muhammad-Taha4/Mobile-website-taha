'use client';

import React from 'react';
import AccountSidebar from '@/components/layout/AccountSidebar';

export default function ProfilePage() {
    return (
        <main className="bg-slate-50 py-8 lg:py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
                <AccountSidebar />

                <section className="w-full lg:w-3/4 flex flex-col gap-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Business Profile</h1>
                        <p className="text-slate-500 mt-1">Manage your company details and security settings.</p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Business Details</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
                                    <input type="text" defaultValue="iRepair Solutions LLC" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0B4182] outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tax ID / EIN</label>
                                    <input type="text" defaultValue="XX-XXXXXXX" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0B4182] outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Contact Name</label>
                                    <input type="text" defaultValue="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0B4182] outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Email</label>
                                    <input type="email" defaultValue="john@irepairsolutions.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0B4182] outline-none transition-all" />
                                </div>
                            </div>
                            <button type="button" className="bg-[#0B4182] hover:bg-[#082f5e] text-white font-bold py-3 px-6 rounded-xl transition-colors">
                                Save Profile Changes
                            </button>
                        </form>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Security</h2>
                        <form className="space-y-6">
                            <div className="max-w-md space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0B4182] outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0B4182] outline-none transition-all" />
                                </div>
                            </div>
                            <button type="button" className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                                Update Password
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}
