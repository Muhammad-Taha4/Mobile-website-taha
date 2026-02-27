'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';
import { Search, Star, AlertCircle, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

const API = 'http://localhost:5000';

export default function FeaturedProductsManager() {
    const token = useAuthStore(state => state.token);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // we use limit 100 for admin view, could add real pagination later
            const res = await fetch(`${API}/api/admin/products?limit=100`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setProducts(data.products || []);
            }
        } catch {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const toggleFeatured = async (product: any) => {
        const newStatus = !product.isFeatured;

        // Optimistic UI update
        setProducts(products.map(p => p.id === product.id ? { ...p, isFeatured: newStatus } : p));

        try {
            const res = await fetch(`${API}/api/admin/products/${product.id}/feature`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ isFeatured: newStatus })
            });

            if (res.ok) {
                toast.success(`${product.name} is now ${newStatus ? 'featured' : 'unfeatured'}`);
            } else {
                throw new Error('Failed');
            }
        } catch {
            // Revert on error
            setProducts(products.map(p => p.id === product.id ? { ...p, isFeatured: !newStatus } : p));
            toast.error('Failed to update product status');
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const featuredCount = products.filter(p => p.isFeatured).length;

    if (loading) return (
        <div className="flex items-center justify-center py-32">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0B4182] border-t-transparent" />
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Featured Products Manager</h1>
                    <p className="text-slate-500 text-sm mt-1">Select the products that will appear on the homepage.</p>
                </div>

                <div className="flex items-center gap-4 bg-[#0B4182]/5 px-5 py-3 rounded-xl border border-[#0B4182]/10">
                    <div className="bg-[#0B4182]/10 p-2 rounded-lg text-[#0B4182]">
                        <Star size={20} className="fill-[#0B4182]" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900">{featuredCount} Products</p>
                        <p className="text-xs font-semibold text-slate-500">Currently Featured</p>
                    </div>
                </div>
            </div>

            {/* Toolbox */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search products by name or SKU..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#0B4182]/20 transition-all text-sm font-medium outline-none"
                    />
                </div>

                {featuredCount === 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl text-sm font-bold w-full sm:w-auto">
                        <AlertCircle size={16} /> No homepage products selected!
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-black">
                            <th className="p-5 font-bold">Product</th>
                            <th className="p-5 font-bold">Category</th>
                            <th className="p-5 font-bold">Stock</th>
                            <th className="p-5 font-bold text-right">Featured Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-16 text-center text-slate-400">
                                    No products found matching "{searchQuery}"
                                </td>
                            </tr>
                        ) : filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                                            {product.images?.[0] ? (
                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <ImageIcon size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-[#0B4182] transition-colors">
                                                <Link href={`/shop/${product.id}`} target="_blank">{product.name}</Link>
                                            </p>
                                            <p className="text-xs text-slate-500 mt-0.5 font-medium">SKU: {product.sku}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-600 font-medium">
                                    {typeof product.category === 'object' ? product.category?.name : (product.category || 'Uncategorized')}
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${product.stock > 10 ? 'bg-emerald-50 text-emerald-600' :
                                        product.stock > 0 ? 'bg-amber-50 text-amber-600' :
                                            'bg-red-50 text-red-600'
                                        }`}>
                                        {product.stock} in stock
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <label className="relative inline-flex items-center cursor-pointer justify-end ml-auto">
                                        <input
                                            type="checkbox"
                                            checked={product.isFeatured}
                                            onChange={() => toggleFeatured(product)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B4182]"></div>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
