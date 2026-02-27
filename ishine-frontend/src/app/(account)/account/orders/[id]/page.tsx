'use client';

import React from 'react';
import AccountSidebar from '@/components/layout/AccountSidebar';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderDetailsPage() {
    const params = useParams();
    const orderId = params.id as string;

    // Timeline Steps
    const steps = [
        { label: 'Order Placed', date: 'Oct 24, 09:41 AM', completed: true },
        { label: 'Payment Confirmed', date: 'Oct 24, 09:45 AM', completed: true },
        { label: 'Processing', date: 'Oct 24, 11:30 AM', completed: true },
        { label: 'Shipped', date: 'Oct 25, 08:15 AM', completed: false, active: true },
        { label: 'Delivered', date: 'Estimated: Oct 28', completed: false },
    ];

    return (
        <main className="bg-slate-50 py-8 lg:py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
                <AccountSidebar />

                <section className="w-full lg:w-3/4 flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Link href="/account" className="text-sm font-medium text-slate-500 hover:text-[#0B4182] flex items-center gap-1 transition-colors">
                                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                    Back to Orders
                                </Link>
                                <span className="text-slate-300">|</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-100 text-blue-800">
                                    Shipped
                                </span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Order {orderId?.toUpperCase() || '#ORD-99281'}</h1>
                            <p className="text-slate-500 mt-1">Placed on October 24, 2026</p>
                        </div>
                        <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Download Invoice
                        </button>
                    </div>

                    {/* Order Tracking Timeline */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm overflow-hidden">
                        <h2 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#0B4182]">local_shipping</span>
                            Tracking Status
                        </h2>

                        <div className="relative">
                            {/* Blue connecting line (Background Track) */}
                            <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 rounded-full"></div>
                            {/* Active Track (Simulating 75% completion for 'Shipped') */}
                            <div className="absolute top-5 left-0 w-[75%] h-1 bg-[#0B4182] rounded-full transition-all duration-1000"></div>

                            {/* Timeline Nodes */}
                            <div className="relative flex justify-between">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="flex flex-col items-center w-1/5 relative group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-colors duration-300 ${step.completed ? 'bg-[#0B4182] text-white' : step.active ? 'bg-white border-2 border-[#0B4182] bg-blue-50' : 'bg-slate-200 text-slate-400'}`}>
                                            {step.completed ? (
                                                <span className="material-symbols-outlined text-sm font-bold">check</span>
                                            ) : step.active ? (
                                                <div className="w-3 h-3 bg-[#0B4182] rounded-full animate-pulse"></div>
                                            ) : (
                                                <span className="w-2 h-2 bg-white rounded-full"></span>
                                            )}
                                        </div>
                                        <div className="mt-4 text-center">
                                            <p className={`text-sm font-bold ${step.completed || step.active ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                                            <p className="text-xs text-slate-500 mt-1 hidden md:block">{step.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Courier Info */}
                        <div className="mt-12 bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-bold text-slate-900">FedEx Ground Shipment</p>
                                <p className="text-sm text-slate-600">Tracking Number: <span className="font-bold text-[#0B4182]">FX-9231-8402-111</span></p>
                            </div>
                            <button className="bg-[#0B4182] hover:bg-[#082f5e] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors shrink-0">
                                Track at FedEx
                            </button>
                        </div>
                    </div>

                    {/* Package Contents */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#0B4182]">inventory_2</span>
                            Package Contents
                        </h2>

                        <div className="space-y-4">
                            {/* Item 1 */}
                            <div className="flex items-center gap-6 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                <div className="w-20 h-20 bg-white border border-slate-200 rounded-xl shrink-0 flex items-center justify-center p-2 shadow-sm">
                                    <img src="/assets/B1255519-1-400x400.webp" alt="iPhone 13 OLED" className="object-contain w-full h-full mix-blend-multiply" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900 text-sm md:text-base">iPhone 13 Pro Max OLED Display</h4>
                                    <p className="text-slate-500 text-xs md:text-sm mt-1">Condition: New | Grade: OEM</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900">$925.00</p>
                                    <p className="text-slate-500 text-sm">Qty: 5</p>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex items-center gap-6 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                <div className="w-20 h-20 bg-white border border-slate-200 rounded-xl shrink-0 flex items-center justify-center p-2 shadow-sm">
                                    <img src="/assets/B1083502-1-400x400-1.webp" alt="S24 Battery" className="object-contain w-full h-full mix-blend-multiply" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900 text-sm md:text-base">Samsung Galaxy S24 Ultra Battery</h4>
                                    <p className="text-slate-500 text-xs md:text-sm mt-1">Condition: New | Grade: Premium</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900">$140.00</p>
                                    <p className="text-slate-500 text-sm">Qty: 4</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Total Ledger */}
                        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-end w-full space-y-2">
                            <div className="flex justify-between w-full md:w-1/2 text-sm text-slate-600">
                                <span>Subtotal</span>
                                <span className="font-medium text-slate-900">$1,065.00</span>
                            </div>
                            <div className="flex justify-between w-full md:w-1/2 text-sm text-slate-600">
                                <span>Shipping (FedEx Ground)</span>
                                <span className="font-medium text-slate-900">$12.00</span>
                            </div>
                            <div className="flex justify-between w-full md:w-1/2 text-sm text-slate-600">
                                <span>Taxes (Estimated)</span>
                                <span className="font-medium text-slate-900">$40.00</span>
                            </div>
                            <div className="flex justify-between w-full md:w-1/2 pt-4 border-t border-slate-100 mt-2">
                                <span className="text-lg font-bold text-slate-900">Total Charged</span>
                                <span className="text-2xl font-extrabold text-[#0B4182]">$1,117.00</span>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </main>
    );
}
