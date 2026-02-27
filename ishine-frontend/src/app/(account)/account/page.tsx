'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AccountSidebar from '@/components/layout/AccountSidebar';
import { useAuth } from '@/context/AuthContext';

export default function AccountDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const { user, token } = useAuth();

    const [orders, setOrders] = useState<any[]>([]);
    const [stats, setStats] = useState({ totalOrders: 0, totalSpent: 0, pendingReturns: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/orders`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    const fetchedOrders = data.orders || [];
                    setOrders(fetchedOrders);

                    // compute stats
                    let totalSpent = 0;
                    let returns = 0;
                    fetchedOrders.forEach((o: any) => {
                        if (o.status !== 'cancelled' && o.status !== 'refunded') {
                            totalSpent += Number(o.total);
                        }
                        if (o.status === 'refunded' || o.status === 'return_pending') {
                            returns++;
                        }
                    });

                    setStats({
                        totalOrders: data.pagination?.total || fetchedOrders.length,
                        totalSpent,
                        pendingReturns: returns
                    });
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [token]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    const renderOrdersTable = (isFull: boolean) => {
        const displayOrders = isFull ? orders : orders.slice(0, 3);

        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900">{isFull ? 'Complete Order History' : 'Recent Orders'}</h3>
                    {!isFull && <button onClick={() => setActiveTab('orders')} className="text-sm font-medium text-[#0B4182] hover:text-blue-700 cursor-pointer">View All Orders</button>}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
                            <tr>
                                <th className="px-6 py-4" scope="col">Order ID</th>
                                <th className="px-6 py-4" scope="col">Date</th>
                                <th className="px-6 py-4" scope="col">Status</th>
                                <th className="px-6 py-4" scope="col">Items</th>
                                <th className="px-6 py-4 text-right" scope="col">Total Amount</th>
                                <th className="px-6 py-4 text-center" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr><td colSpan={6} className="text-center py-8">Loading orders...</td></tr>
                            ) : displayOrders.length === 0 ? (
                                <tr><td colSpan={6} className="text-center py-8">No orders found.</td></tr>
                            ) : (
                                displayOrders.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">#{order.orderNumber}</td>
                                        <td className="px-6 py-4">{formatDate(order.createdAt)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-slate-100 text-slate-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{order.items?.length || 0} items</td>
                                        <td className="px-6 py-4 text-right font-medium text-slate-900">${Number(order.total).toFixed(2)}</td>
                                        <td className="px-6 py-4 text-center">
                                            <Link href={`/account/orders/${order.orderNumber}`} className="text-[#0B4182] hover:text-blue-700 font-bold text-xs">Track Order</Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <main className="bg-slate-50 py-8 lg:py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
                <AccountSidebar />

                <section className="w-full lg:w-3/4 flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                                {activeTab === 'overview' ? `Welcome back, ${user?.firstName || user?.name || 'Customer'}` : 'Order History'}
                            </h1>
                            <p className="text-slate-500 mt-1">
                                {activeTab === 'overview' ? "Here's what's happening with your wholesale account today." : "View and track all your past and current wholesale orders."}
                            </p>
                        </div>
                        {activeTab === 'overview' && (
                            <div className="flex items-center gap-3">
                                <Link href="/shop" className="bg-[#0B4182] hover:bg-[#083266] text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors cursor-pointer">
                                    <span className="material-symbols-outlined text-lg">add</span>
                                    New Quick Order
                                </Link>
                            </div>
                        )}
                    </div>

                    {activeTab === 'overview' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between group hover:border-[#0B4182]/30 transition-colors">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium mb-1">Total Orders</p>
                                        <h3 className="text-3xl font-bold text-slate-900">{stats.totalOrders}</h3>
                                    </div>
                                    <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0B4182] flex items-center justify-center group-hover:bg-[#0B4182] group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">shopping_bag</span>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between group hover:border-[#0B4182]/30 transition-colors">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium mb-1">Total Spent</p>
                                        <h3 className="text-3xl font-bold text-slate-900">${stats.totalSpent.toFixed(2)}</h3>
                                        <div className="flex items-center mt-2 text-slate-400 text-xs font-medium">
                                            <span>Lifetime value</span>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0B4182] flex items-center justify-center group-hover:bg-[#0B4182] group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">payments</span>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between group hover:border-[#0B4182]/30 transition-colors">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium mb-1">Pending Returns</p>
                                        <h3 className="text-3xl font-bold text-slate-900">{stats.pendingReturns}</h3>
                                    </div>
                                    <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0B4182] flex items-center justify-center group-hover:bg-[#0B4182] group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">assignment_return</span>
                                    </div>
                                </div>
                            </div>

                            {renderOrdersTable(false)}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Weekly Deals</h4>
                                        <p className="text-sm text-slate-500 mb-4">Save up to 40% on iPhone Screens</p>
                                        <Link href="/shop" className="text-[#0B4182] font-medium text-sm hover:underline">Shop Deals</Link>
                                    </div>
                                    <div className="h-24 w-24 bg-slate-100 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&auto=format&fit=crop')" }}></div>
                                </div>
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">New Arrivals</h4>
                                        <p className="text-sm text-slate-500 mb-4">Check out the latest tools &amp; accessories</p>
                                        <Link href="/shop" className="text-[#0B4182] font-medium text-sm hover:underline">View New Items</Link>
                                    </div>
                                    <div className="h-24 w-24 bg-slate-100 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588508065123-287b28e0131b?q=80&w=800&auto=format&fit=crop')" }}></div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'orders' && (
                        <>
                            {renderOrdersTable(true)}
                        </>
                    )}
                </section>
            </div>
        </main>
    );
}
