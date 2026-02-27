"use client";
import React, { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import toast from 'react-hot-toast';

const DiscountedProducts = memo(() => {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const addToCart = useCartStore(state => state.addToCart);
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    useEffect(() => {
        const fetchDiscounted = async () => {
            setIsLoading(true);
            try {
                // Fetch products for discounted section (e.g. products 20-24)
                const res = await fetch('http://localhost:5000/api/products?limit=10&page=2');
                const data = await res.json();

                const raw = Array.isArray(data) ? data : (data.products || []);

                const mapped = raw.slice(0, 4).map((p: any) => ({
                    id: p.id,
                    title: p.name,
                    desc: p.shortDescription || "Premium Quality | Fully Tested",
                    oldPrice: `$${(parseFloat(p.wholesalePrice) * 1.35).toFixed(2)}`,
                    newPriceStr: `$${p.wholesalePrice}`,
                    price: parseFloat(p.wholesalePrice),
                    sku: p.sku,
                    img: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : (p.images ? (typeof p.images === 'string' && p.images.startsWith('[') ? JSON.parse(p.images)[0] : p.images) : "")
                }));

                // Initialize quantities
                const initialQuants: Record<string, number> = {};
                mapped.forEach((p: any) => {
                    initialQuants[p.id || p.title] = 1;
                });
                setQuantities(initialQuants);
                setProducts(mapped);
            } catch (error) {
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDiscounted();
    }, []);

    const handleQuantityChange = (id: string, value: string) => {
        const num = parseInt(value, 10);
        if (!isNaN(num) && num > 0) {
            setQuantities(prev => ({ ...prev, [id]: num }));
        }
    };

    const handleAddToCart = (e: React.MouseEvent, p: any) => {
        e.preventDefault();
        const qty = quantities[p.id || p.title] || 1;
        addToCart({
            id: p.id || String(Math.random()),
            name: p.title,
            price: p.price,
            image: p.img,
            quantity: qty,
            sku: p.sku
        });
    };

    if (!products) return null;

    return (
        <section className="max-w-[1400px] mx-auto px-4 md:px-10 py-10 mt-10 mb-10">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">Products With Discounts</h3>
                <Link href="/shop" className="text-sm text-brand font-semibold hover:underline cursor-pointer">View All Offers</Link>
            </div>

            <div className="rounded-sm p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left Promo Banners */}
                <div className="space-y-4">
                    <Link href="/shop?category=LCD Screens" className="bg-gradient-to-r from-slate-900 to-brand rounded-md p-6 flex justify-between items-center h-40 text-white relative overflow-hidden group block">
                        <div className="z-10 group-hover:scale-105 transition-transform duration-300">
                            <h4 className="text-lg font-bold leading-tight mb-2">Premium OLED<br />Screens</h4>
                            <p className="text-xs opacity-90">Starting from</p>
                            <p className="text-2xl font-bold text-yellow-500">$65.00</p>
                        </div>
                        <div className="relative w-28 h-28 shrink-0">
                            <Image src="/assets/B1255519-1-400x400.webp" alt="OLED Screens" fill className="object-contain rounded-md mix-blend-multiply" loading="lazy" />
                        </div>
                    </Link>
                    <Link href="/shop?category=Batteries" className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-md p-6 flex justify-between items-center h-40 text-white relative overflow-hidden group block">
                        <div className="z-10 group-hover:scale-105 transition-transform duration-300">
                            <h4 className="text-lg font-bold leading-tight mb-2">High-Capacity<br />Batteries</h4>
                            <p className="text-xs opacity-90">Up to 30% Off</p>
                            <p className="text-2xl font-bold text-yellow-500">$15.00</p>
                        </div>
                        <div className="relative w-28 h-28 shrink-0">
                            <Image src="/assets/B1083502-1-400x400-1.webp" alt="Batteries" fill className="object-contain rounded-md mix-blend-multiply" loading="lazy" />
                        </div>
                    </Link>
                </div>

                {/* Right Product Cards Column 1 */}
                <div className="space-y-4">
                    {isLoading ? (
                        [...Array(2)].map((_, i) => (
                            <div key={i} className="border border-slate-100 rounded-md p-3 flex gap-4 h-[120px] animate-pulse">
                                <div className="w-24 h-24 bg-slate-100 rounded"></div>
                                <div className="flex-1 space-y-2 py-1">
                                    <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                                    <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        products?.slice(0, 2).map((p, i) => (
                            <Link href={`/shop/${p.id || '1'}`} key={i} className="border border-slate-100 rounded-md p-3 flex gap-4 hover:shadow-lg hover:scale-[1.01] hover:border-brand/30 transition-shadow transition-transform duration-300 group">
                                <div className="relative w-24 h-24 bg-white shrink-0">
                                    <span className="absolute top-0 left-0 bg-brand text-[10px] text-white px-1.5 py-0.5 rounded-md font-bold shadow-sm z-10">25% Off</span>
                                    <Image src={p.img || '/placeholder.png'} alt={p.title} fill className="object-contain mix-blend-multiply" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h5 className="text-base font-bold text-slate-800 line-clamp-2">{p.title}</h5>
                                        <p className="text-xs font-medium text-slate-500 mt-0.5">{p.desc}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex flex-col">
                                            <span className="text-brand font-black text-lg">{p.newPriceStr}</span>
                                            <span className="text-slate-400 text-xs font-semibold line-through">{p.oldPrice}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="number"
                                                min="1"
                                                value={quantities[p.id || p.title] || 1}
                                                onChange={(e) => handleQuantityChange(p.id || p.title, e.target.value)}
                                                onClick={(e) => e.preventDefault()}
                                                className="w-10 text-[10px] border border-slate-200 rounded p-1 outline-none focus:border-brand"
                                            />
                                            <button
                                                onClick={(e) => handleAddToCart(e, p)}
                                                className="border border-brand text-brand p-1 rounded hover:bg-brand hover:text-white transition-colors shadow-sm"
                                            >
                                                <span className="material-symbols-outlined text-sm">shopping_cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {/* Right Product Cards Column 2 */}
                <div className="space-y-4">
                    {isLoading ? (
                        [...Array(2)].map((_, i) => (
                            <div key={i} className="border border-slate-100 rounded-md p-3 flex gap-4 h-[120px] animate-pulse">
                                <div className="w-24 h-24 bg-slate-100 rounded"></div>
                                <div className="flex-1 space-y-2 py-1">
                                    <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                                    <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        products?.slice(2, 4).map((p, i) => (
                            <Link href={`/shop/${p.id || '1'}`} key={i} className="border border-slate-100 rounded-md p-3 flex gap-4 hover:shadow-lg hover:scale-[1.01] hover:border-brand/30 transition-shadow transition-transform duration-300 group">
                                <div className="relative w-24 h-24 bg-white shrink-0">
                                    <span className="absolute top-0 left-0 bg-brand text-[10px] text-white px-1.5 py-0.5 rounded-md font-bold shadow-sm z-10">25% Off</span>
                                    <Image src={p.img || '/placeholder.png'} alt={`iShine Wireless ${p.title}`} fill className="object-contain mix-blend-multiply" loading="lazy" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h5 className="text-xs font-medium text-slate-800 line-clamp-2">{p.title}</h5>
                                        <p className="text-[10px] text-slate-400 mt-0.5">{p.desc}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex flex-col">
                                            <span className="text-brand font-bold text-sm">{p.newPriceStr}</span>
                                            <span className="text-slate-300 text-[10px] line-through">{p.oldPrice}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="number"
                                                min="1"
                                                value={quantities[p.id || p.title] || 1}
                                                onChange={(e) => handleQuantityChange(p.id || p.title, e.target.value)}
                                                onClick={(e) => e.preventDefault()}
                                                className="w-10 text-[10px] border border-slate-200 rounded p-1 outline-none focus:border-brand"
                                            />
                                            <button
                                                onClick={(e) => handleAddToCart(e, p)}
                                                className="border border-brand text-brand p-1 rounded hover:bg-brand hover:text-white transition-colors shadow-sm"
                                            >
                                                <span className="material-symbols-outlined text-sm">shopping_cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section >
    );
});

export default DiscountedProducts;
