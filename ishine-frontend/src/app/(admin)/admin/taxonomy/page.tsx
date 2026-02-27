'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

export default function AdminTaxonomyPage() {
    const { token } = useAuthStore();
    const [categories, setCategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTaxonomy = async () => {
            try {
                const [catRes, brandRes] = await Promise.all([
                    fetch('http://localhost:5000/api/admin/taxonomy/categories', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('http://localhost:5000/api/admin/taxonomy/brands', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);
                
                if (catRes.ok) setCategories(await catRes.json());
                if (brandRes.ok) setBrands(await brandRes.json());
            } catch (error) {
                console.error("Failed to fetch taxonomy:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) fetchTaxonomy();
    }, [token]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B4182]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Taxonomy & Brands</h1>
                <p className="text-slate-500 mt-1">Configure your product classification system.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Brands Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 font-bold text-slate-800 bg-slate-50/50 flex justify-between items-center">
                        Active Brands
                        <button className="text-xs bg-[#0B4182] text-white px-3 py-1.5 rounded-lg">Add Brand</button>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {brands.map((brand) => (
                                <div key={brand} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-[#0B4182]/30 transition-all group">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition-transform font-bold text-[#0B4182]">
                                        {brand[0]}
                                    </div>
                                    <span className="text-xs font-bold text-slate-700">{brand}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 font-bold text-slate-800 bg-slate-50/50 flex justify-between items-center">
                        Global Categories
                        <button className="text-xs bg-[#0B4182] text-white px-3 py-1.5 rounded-lg">New Category</button>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {categories.filter(c => !c.parentId).map((cat) => (
                            <div key={cat.id} className="p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-50 text-[#0B4182] rounded flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[18px]">folder</span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800">{cat.name}</div>
                                            <div className="text-[10px] text-slate-400 font-mono uppercase">{cat.slug}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-1.5 text-slate-400 hover:text-[#0B4182]"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                                        <button className="p-1.5 text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                                    </div>
                                </div>
                                {/* Subcategories */}
                                <div className="ml-11 mt-2 space-y-2">
                                    {categories.filter(c => c.parentId === cat.id).map(sub => (
                                        <div key={sub.id} className="flex justify-between items-center text-xs py-1 text-slate-500 border-l-2 border-slate-100 pl-3">
                                            <span>{sub.name}</span>
                                            <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded uppercase">{sub.slug}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
