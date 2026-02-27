'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';

interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    activeUsers: number;
    pendingShipments: number;
}

export default function AdminDashboardPage() {
    const { token } = useAuthStore();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/admin/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setStats(data.stats);
                    setRecentActivity(data.recentActivity);
                }
            } catch (error) {
                console.error("Failed to fetch admin stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) fetchStats();
    }, [token]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B4182]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Overview</h1>
                    <p className="text-slate-500 mt-1">Live metrics and recent storefront activity.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100 shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse relative">
                            <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
                        </span>
                        CORE SYNCED
                    </span>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                    title="Total Revenue (30d)" 
                    value={`$${stats?.totalRevenue.toLocaleString() || '0.00'}`} 
                    trend="+0%" 
                    icon="attach_money" 
                />
                <MetricCard 
                    title="Total Orders" 
                    value={stats?.totalOrders.toString() || '0'} 
                    trend="+0%" 
                    icon="shopping_cart" 
                />
                <MetricCard 
                    title="Active Resellers" 
                    value={stats?.activeUsers.toString() || '0'} 
                    trend="0 new" 
                    icon="group" 
                />
                <MetricCard 
                    title="Pending Shipments" 
                    value={stats?.pendingShipments.toString() || '0'} 
                    isWarning={stats?.pendingShipments ? stats.pendingShipments > 0 : false} 
                    icon="deployed_code" 
                />
            </div>

            {/* Feature Demo: Advanced Product Creator Card */}
            <div className="bg-[#0B4182] rounded-2xl p-8 text-white shadow-xl shadow-[#0B4182]/20 mb-8 mt-8 border-b-4 border-[#082f5e] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-2xl font-extrabold flex items-center gap-2">
                            <span className="material-symbols-outlined text-[28px] text-blue-300">build_circle</span>
                            Advanced Product Engine
                        </h2>
                        <p className="text-blue-100 mt-2 font-medium max-w-xl text-sm leading-relaxed">
                            Experience the new state-driven taxonomy creator. Seamlessly configure variants, build specs, set wholesale price matrices, and trigger instant cache-invalidation to the live storefront.
                        </p>
                    </div>
                    <Link href="/admin/products/new" className="bg-white text-[#0B4182] font-extrabold px-6 py-3 rounded-xl hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 shrink-0">
                        Create New Product
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </Link>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 font-bold text-slate-800 flex justify-between items-center bg-slate-50/50">
                    Recent Activity (Live Feed)
                    <Link href="/admin/orders" className="text-[#0B4182] text-sm hover:underline">View All Orders</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Event Type</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">User / Details</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Date/Time</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium whitespace-nowrap">
                            {recentActivity.length > 0 ? (
                                recentActivity.map((order) => (
                                    <TableRow 
                                        key={order.id}
                                        icon="shopping_bag" 
                                        title={`Order #${order.orderNumber}`} 
                                        subtitle={`${order.user.firstName} ${order.user.lastName} (${order.user.businessName || 'Regular'})`} 
                                        date={new Date(order.createdAt).toLocaleString()} 
                                        status={order.status} 
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">No recent activity detected.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, trend, icon, isWarning = false }: any) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${isWarning ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'} group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                {!isWarning && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">{trend}</span>}
                {isWarning && <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">Action Req</span>}
            </div>
            <h3 className="text-slate-500 text-sm font-semibold mb-1">{title}</h3>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</p>
        </div>
    );
}

function TableRow({ icon, title, subtitle, date, status }: any) {
    const statusColor =
        status === 'PENDING' ? 'bg-amber-100 text-amber-700 border-amber-200' :
            status === 'PROCESSING' || status === 'PROCESSING' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                status === 'DELIVERED' || status === 'CONFIRMED' ? 'bg-green-100 text-green-700 border-green-200' :
                    'bg-slate-100 text-slate-700 border-slate-200';

    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-md text-slate-500 shrink-0">
                        <span className="material-symbols-outlined text-[18px]">{icon}</span>
                    </div>
                    <span className="font-bold text-slate-800">{title}</span>
                </div>
            </td>
            <td className="px-6 py-4">{subtitle}</td>
            <td className="px-6 py-4 text-slate-400 text-xs">{date}</td>
            <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${statusColor}`}>
                    {status}
                </span>
            </td>
        </tr>
    );
}
