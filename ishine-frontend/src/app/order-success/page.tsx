import React from 'react';
import Link from 'next/link';

export default function OrderSuccessPage() {
    return (
        <main className="bg-slate-50 min-h-screen py-16 px-4 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

                {/* Success Hero Section */}
                <div className="text-center p-10 md:p-14 border-b border-slate-100 bg-slate-50/50">
                    <span className="material-symbols-outlined text-[80px] text-green-500 mb-6 drop-shadow-sm">
                        check_circle
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Thank You for Your Order!
                    </h1>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
                        Order <span className="font-bold text-slate-900">#ORD-99281</span> has been successfully placed. A confirmation email has been sent to your registered business email.
                    </p>
                </div>

                <div className="p-8 md:p-12">
                    {/* Order Info (3-Column Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {/* Card 1: Shipping Address */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2ea4d5] text-lg">home_pin</span>
                                Shipping Address
                            </h3>
                            <div className="text-slate-600 text-sm leading-relaxed">
                                <p className="font-bold text-slate-800">John Doe</p>
                                <p>iRepair Solutions LLC</p>
                                <p>123 Business Way</p>
                                <p>Dallas, TX 75001</p>
                            </div>
                        </div>

                        {/* Card 2: Shipping Method */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2ea4d5] text-lg">local_shipping</span>
                                Shipping Method
                            </h3>
                            <div className="text-slate-600 text-sm leading-relaxed">
                                <p className="font-bold text-slate-800">FedEx Ground</p>
                                <p>(3-5 Business Days)</p>
                            </div>
                        </div>

                        {/* Card 3: Payment Method */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2ea4d5] text-lg">credit_card</span>
                                Payment Method
                            </h3>
                            <div className="text-slate-600 text-sm leading-relaxed">
                                <p className="font-bold text-slate-800">Credit Card</p>
                                <p>(Ending in 4242)</p>
                            </div>
                        </div>
                    </div>

                    {/* Mini Order Summary */}
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            {/* Mock Item 1 */}
                            <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                                <div className="w-16 h-16 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center p-2">
                                    <img src="/assets/B1255519-1-400x400.webp" alt="iPhone 13 OLED" className="object-contain w-full h-full mix-blend-multiply" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900 text-sm">iPhone 13 Pro Max OLED Display</h4>
                                    <p className="text-slate-500 text-xs mt-1">Qty: 5</p>
                                </div>
                                <div className="text-right font-bold text-slate-900">
                                    $925.00
                                </div>
                            </div>

                            {/* Mock Item 2 */}
                            <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                                <div className="w-16 h-16 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center p-2">
                                    <img src="/assets/B1083502-1-400x400-1.webp" alt="S24 Battery" className="object-contain w-full h-full mix-blend-multiply" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900 text-sm">Samsung Galaxy S24 Ultra Battery</h4>
                                    <p className="text-slate-500 text-xs mt-1">Qty: 4</p>
                                </div>
                                <div className="text-right font-bold text-slate-900">
                                    $140.00
                                </div>
                            </div>
                        </div>

                        {/* Total Amount */}
                        <div className="flex justify-between items-center py-5 border-t border-slate-200">
                            <span className="text-lg font-bold text-slate-900">Total Charged</span>
                            <span className="text-3xl font-extrabold text-[#2ea4d5]">$1,117.00</span>
                        </div>
                    </div>

                    {/* Interactive Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <Link
                            href="/account"
                            className="bg-[#2ea4d5] hover:bg-[#2389b3] text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
                        >
                            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">local_shipping</span>
                            Track Order
                        </Link>
                        <Link
                            href="/shop"
                            className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-8 rounded-xl border-2 border-slate-200 transition-all text-center"
                        >
                            Continue Shopping
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}
