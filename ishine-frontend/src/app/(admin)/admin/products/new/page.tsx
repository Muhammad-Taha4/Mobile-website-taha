'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/useAuthStore';

interface Category {
    id: string;
    name: string;
    slug: string;
    parentId: string | null;
}

export default function NewProductPage() {
    const router = useRouter();
    const { token } = useAuthStore();
    const [isSaving, setIsSaving] = useState(false);

    // Taxonomy State
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        sku: '',
        brand: '',
        rootCategory: '',
        subCategory: '',
        targetModel: '',
        partType: '',
        description: '',
        price: '',
        wholesalePrice: '',
        costPrice: '',
        badge: '',
        badgeColor: 'blue',
        stockCount: '25',
        lowStockThreshold: '10',
        imageSrc: '',
        compatibility: ''
    });

    // Fetch initial taxonomy data
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [catRes, brandRes] = await Promise.all([
                    fetch('http://localhost:5000/api/admin/taxonomy/categories', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('http://localhost:5000/api/admin/taxonomy/brands', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);
                
                if (catRes.ok) setAllCategories(await catRes.json());
                if (brandRes.ok) setBrands(await brandRes.json());
            } catch (error) {
                console.error("Taxonomy fetch failed:", error);
            }
        };

        if (token) fetchInitialData();
    }, [token]);

    // Derived Categories
    const rootCategories = allCategories.filter(c => !c.parentId);
    const subCategories = allCategories.filter(c => c.parentId === formData.rootCategory);
    const modelCategories = allCategories.filter(c => c.parentId === formData.subCategory);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Reset downstream selections on change
        if (name === 'rootCategory') setFormData(prev => ({ ...prev, subCategory: '', targetModel: '' }));
        if (name === 'subCategory') setFormData(prev => ({ ...prev, targetModel: '' }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const finalCategoryId = formData.targetModel || formData.subCategory || formData.rootCategory;
            
            if (!finalCategoryId) {
                toast.error("Please select a category hierarchy");
                setIsSaving(false);
                return;
            }

            const payload = {
                sku: formData.sku || `ISW-${Date.now().toString().slice(-6)}`,
                name: formData.title,
                slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                brand: formData.brand,
                description: formData.description,
                wholesalePrice: parseFloat(formData.wholesalePrice),
                retailPrice: parseFloat(formData.price),
                costPrice: parseFloat(formData.costPrice) || null,
                stock: parseInt(formData.stockCount),
                lowStockThreshold: parseInt(formData.lowStockThreshold),
                images: JSON.stringify([formData.imageSrc]),
                categoryId: finalCategoryId,
                compatibility: formData.compatibility,
                warranty: formData.badge // Using warranty field for badge text for now to match seed logic
            };

            const res = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to create product');

            toast.success('Product published successfully!');
            router.push('/admin/products');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSave} className="space-y-8 max-w-5xl mx-auto pb-20 mt-4 md:mt-0 animate-in slide-in-from-bottom-4 duration-700">
            {/* Header Sticky Action Bar */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center -mx-4 md:-mx-8 sm:mx-0 rounded-b-xl sm:rounded-xl shadow-sm mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="text-slate-400 hover:text-[#0B4182] transition rounded-full hover:bg-slate-100 p-2 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </Link>
                    <div>
                        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">Advanced Product Creator</h1>
                        <p className="text-xs md:text-sm font-semibold text-green-600 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Live SYNC Module v2.4
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button type="button" className="flex-1 md:flex-none px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition shadow-sm text-sm">
                        Save Draft
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex-1 md:flex-none justify-center px-5 py-2.5 rounded-lg bg-[#0B4182] text-white font-bold hover:bg-[#09356A] transition shadow-md shadow-[#0B4182]/20 flex items-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                        <span className="material-symbols-outlined text-[18px]">{isSaving ? 'sync' : 'publish'}</span>
                        {isSaving ? 'Syncing...' : 'Publish to Live'}
                    </button>
                </div>
            </div>

            {/* Section A: Core Info */}
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -mr-10 -mt-10 pointer-events-none"></div>

                <h2 className="text-xl font-extrabold text-[#0B4182] mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined">info</span>
                    Core Info & Smart Taxonomy
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Internal Title (Storefront Display)</label>
                        <input name="title" value={formData.title} onChange={handleChange} required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0B4182] focus:ring-1 focus:ring-[#0B4182] transition-colors font-medium shadow-inner" placeholder="e.g. iPhone 16 Pro Max Screen Replacement (Soft OLED)" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">SKU / Origin Code</label>
                        <input name="sku" value={formData.sku} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0B4182] focus:ring-1 focus:ring-[#0B4182] transition-colors font-mono text-sm shadow-inner uppercase" placeholder="ISW-AUTO-GEN" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Brand Selection</label>
                        <select name="brand" value={formData.brand} onChange={handleChange} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0B4182] focus:ring-1 focus:ring-[#0B4182] transition-colors font-medium shadow-inner">
                            <option value="">Select Brand</option>
                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                            <option value="Tools">Tools & Equipment</option>
                        </select>
                    </div>

                    {/* Cascading Taxonomy */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Top Level</label>
                            <select name="rootCategory" value={formData.rootCategory} onChange={handleChange} required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0B4182] focus:ring-1 focus:ring-[#0B4182] font-medium text-sm">
                                <option value="">Select Hierarchy</option>
                                {rootCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Category</label>
                            <select name="subCategory" value={formData.subCategory} onChange={handleChange} disabled={!formData.rootCategory} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0B4182] focus:ring-1 focus:ring-[#0B4182] font-medium text-sm disabled:opacity-50">
                                <option value="">Sub Category</option>
                                {subCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Series / Model</label>
                            <select name="targetModel" value={formData.targetModel} onChange={handleChange} disabled={!formData.subCategory} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0B4182] focus:ring-1 focus:ring-[#0B4182] font-medium text-sm disabled:opacity-50">
                                <option value="">Target Model</option>
                                {modelCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Compatibility Notes</label>
                        <input name="compatibility" value={formData.compatibility} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0B4182] font-medium shadow-inner" placeholder="e.g. iPhone 15 Pro, iPhone 15 Pro Max" />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Detailed Specs (HTML Allowed)</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0B4182] font-medium shadow-inner" placeholder="Highlight technical features..."></textarea>
                    </div>
                </div>
            </section>

            {/* Section B: Pricing */}
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[100px] -mr-10 -mt-10 pointer-events-none"></div>
                <h2 className="text-xl font-extrabold text-green-700 mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined">payments</span>
                    Pricing & Profitability
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Cost Price</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3 text-slate-400 font-bold">$</span>
                            <input name="costPrice" value={formData.costPrice} onChange={handleChange} type="number" step="0.01" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-green-600 font-bold" placeholder="0.00" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Wholesale (B2B)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3 text-slate-400 font-bold">$</span>
                            <input name="wholesalePrice" value={formData.wholesalePrice} onChange={handleChange} required type="number" step="0.01" className="w-full bg-green-50/30 border border-green-200 rounded-xl pl-10 pr-4 py-3 text-green-900 focus:outline-none focus:border-green-600 font-bold" placeholder="0.00" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Retail (MSRP)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3 text-slate-400 font-bold">$</span>
                            <input name="price" value={formData.price} onChange={handleChange} required type="number" step="0.01" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-green-600 font-bold" placeholder="0.00" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section D: Media & Stock */}
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-[100px] -mr-10 -mt-10 pointer-events-none"></div>
                <h2 className="text-xl font-extrabold text-amber-600 mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined">inventory_2</span>
                    Media & Pipeline
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Global Stock</label>
                            <input name="stockCount" value={formData.stockCount} onChange={handleChange} required type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-amber-500 font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Alert Threshold</label>
                            <input name="lowStockThreshold" value={formData.lowStockThreshold} onChange={handleChange} type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-amber-500 font-bold" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Primary Image CDN URL</label>
                        <input name="imageSrc" value={formData.imageSrc} onChange={handleChange} required type="url" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-amber-500 font-medium" placeholder="https://..." />
                    </div>
                </div>
            </section>
        </form>
    );
}
