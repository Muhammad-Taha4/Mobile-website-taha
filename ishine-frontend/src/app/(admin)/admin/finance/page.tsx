'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

export default function AdminFinancePage() {
    return (
        <div className="space-y-6 pb-20">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Payments & Finance</h1>
                <p className="text-slate-500 mt-1">Monitor transactions, manage Net-30 accounts, and process payouts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-semibold mb-1">Available Balance</h3>
                    <p className="text-3xl font-extrabold text-[#0B4182] tracking-tight">$42,850.20</p>
                    <button className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg font-bold text-sm">Withdraw Funds</button>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-semibold mb-1">Pending Net-30</h3>
                    <p className="text-3xl font-extrabold text-amber-600 tracking-tight">$18,400.00</p>
                    <p className="text-[10px] text-slate-400 mt-1">12 outstanding invoices</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-semibold mb-1">Lifetime Payouts</h3>
                    <p className="text-3xl font-extrabold text-green-600 tracking-tight">$1.2M</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 font-bold text-slate-800 bg-slate-50/50">Recent Transactions</div>
                <div className="p-12 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-200 mb-2">account_balance_wallet</span>
                    <p className="text-slate-400 italic">Advanced financial reporting module under final security audit.</p>
                </div>
            </div>
        </div>
    );
}
