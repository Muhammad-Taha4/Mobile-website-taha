'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

export default function AdminOrdersPage() {
    const { token } = useAuthStore();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/orders', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setOrders(data.orders);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) fetchOrders();
    }, [token]);

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                toast.success('Order status updated');
                setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
            }
        } catch (error) {
            toast.error('Failed to update order status');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B4182]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Order Fulfillment</h1>
                <p className="text-slate-500 mt-1">Track orders, manage shipments, and process refunds.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Order ID</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Customer</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Total</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Status</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Date</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium whitespace-nowrap">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-[#0B4182]">#{order.orderNumber}</div>
                                        <div className="text-[10px] text-slate-400">{order.items.length} items</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-800">{order.user.firstName} {order.user.lastName}</div>
                                        <div className="text-xs text-slate-500">{order.user.businessName || 'N/A'}</div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900">${Number(order.totalAmount).toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <select 
                                            value={order.status} 
                                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                            className={`text-[10px] font-bold border rounded-full px-2 py-1 outline-none appearance-none cursor-pointer ${
                                                order.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                order.status === 'SHIPPED' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                                                order.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border-green-100' :
                                                'bg-slate-50 text-slate-500 border-slate-100'
                                            }`}
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="CONFIRMED">CONFIRMED</option>
                                            <option value="PROCESSING">PROCESSING</option>
                                            <option value="SHIPPED">SHIPPED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-slate-200 transition">
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
