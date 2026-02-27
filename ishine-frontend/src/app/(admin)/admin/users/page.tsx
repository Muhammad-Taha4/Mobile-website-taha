'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
    const { token } = useAuthStore();
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/auth/', { // Corrected path to userRoutes based on earlier setup
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) fetchUsers();
    }, [token]);

    const handleToggleStatus = async (user: any) => {
        try {
            const res = await fetch(`http://localhost:5000/api/auth/${user.id}`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ isActive: !user.isActive })
            });
            if (res.ok) {
                toast.success('User status updated');
                setUsers(users.map(u => u.id === user.id ? { ...u, isActive: !u.isActive } : u));
            }
        } catch (error) {
            toast.error('Failed to update status');
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
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">User Management</h1>
                <p className="text-slate-500 mt-1">Manage accounts, roles, and reseller permissions.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">User</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Contact</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Business</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Role</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Status</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium whitespace-nowrap">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                                {user.firstName[0]}{user.lastName[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">{user.firstName} {user.lastName}</div>
                                                <div className="text-[11px] text-slate-400 font-mono">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs">{user.businessPhone || 'N/A'}</td>
                                    <td className="px-6 py-4 text-xs font-semibold text-slate-700">{user.businessName || 'Regular Customer'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-extrabold tracking-tighter ${user.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${user.isActive ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                            {user.isActive ? 'ACTIVE' : 'SUSPENDED'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => handleToggleStatus(user)}
                                                className={`p-2 rounded-lg transition-colors ${user.isActive ? 'text-red-400 hover:bg-red-50 hover:text-red-600' : 'text-green-400 hover:bg-green-50 hover:text-green-600'}`}
                                                title={user.isActive ? 'Suspend' : 'Activate'}
                                            >
                                                <span className="material-symbols-outlined text-[18px]">
                                                    {user.isActive ? 'block' : 'check_circle'}
                                                </span>
                                            </button>
                                            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-[#0B4182] transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                            </button>
                                        </div>
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
