'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
    const { token } = useAuthStore();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/products', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) fetchProducts();
    }, [token]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Product deleted');
                setProducts(products.filter(p => p.id !== id));
            }
        } catch (error) {
            toast.error('Failed to delete product');
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
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Inventory Engine</h1>
                    <p className="text-slate-500 mt-1">Manage your catalog, stock, and pricing tiers.</p>
                </div>
                <Link href="/admin/products/new" className="bg-[#0B4182] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#082f5e] transition shadow-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    New Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Product</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">SKU</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Stock</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Wholesale</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100">Status</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-100 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium whitespace-nowrap">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                                                <img
                                                    src={Array.isArray(product.images) ? product.images[0] : (typeof product.images === 'string' && product.images.startsWith('[') ? JSON.parse(product.images)[0] : product.images)}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">{product.name}</div>
                                                <div className="text-[10px] text-slate-400 uppercase tracking-tighter">
                                                    {typeof product.brand === 'object' ? product.brand?.name : product.brand} |
                                                    {typeof product.category === 'object' ? product.category?.name : (product.category || 'General')}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-[#0B4182]">{product.sku}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${product.stock <= product.lowStockThreshold ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-50 text-slate-600'}`}>
                                            {product.stock} units
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900">${Number(product.wholesalePrice).toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${product.isActive ? 'bg-green-50 text-green-700 border-green-100' : 'bg-slate-50 text-slate-500'}`}>
                                            {product.isActive ? 'LIVE' : 'DRAFT'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-[#0B4182] transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                            </button>
                                            <button onClick={() => handleDelete(product.id)} className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
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
