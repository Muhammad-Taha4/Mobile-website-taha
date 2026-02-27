"use client";
import { useState, useEffect, memo } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import toast from 'react-hot-toast';

const WeeklyBestSellers = memo(() => {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const addToCart = useCartStore(state => state.addToCart);

    useEffect(() => {
        const fetchWeeklySellers = async () => {
            setIsLoading(true);
            try {
                // Fetch first 10 products for the best sellers section
                const res = await fetch('http://localhost:5000/api/products?category=lcd-screens&limit=10');
                const data = await res.json();

                const raw = Array.isArray(data) ? data : (data.products || []);

                const mapped = raw.slice(0, 5).map((p: any, i: number) => {
                    const brandName = (p.brand && typeof p.brand === 'object') ? p.brand.name : (p.brand || "iShine");
                    return {
                        id: p.id,
                        cat: brandName + " Parts",
                        name: p.name,
                        price: parseFloat(p.wholesalePrice),
                        priceStr: `$${p.wholesalePrice}`,
                        hiddenMd: i === 4,
                        sku: p.sku,
                        img: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : (p.images ? (typeof p.images === 'string' && p.images.startsWith('[') ? JSON.parse(p.images)[0] : p.images) : "")
                    };
                });
                setProducts(mapped);
            } catch (error) {
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeeklySellers();
    }, []);

    const handleAddToCart = (e: React.MouseEvent, p: any) => {
        e.preventDefault();
        addToCart({
            id: p.id || String(Math.random()),
            name: p.name,
            price: p.price,
            image: p.img,
            quantity: 1,
            sku: p.sku
        });
    };

    if (!products) return null;

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Wholesale LCDs & Screens</h2>
                <div className="flex gap-6 mt-6 md:mt-0 border-b border-gray-200 pb-3 w-full md:w-auto overflow-x-auto">
                    <button className="text-brand font-bold border-b-2 border-brand pb-3 whitespace-nowrap">Best Selling LCDs</button>
                    <button className="text-gray-500 hover:text-brand font-semibold pb-3 transition whitespace-nowrap">Professional Tools</button>
                    <button className="text-gray-500 hover:text-brand font-semibold pb-3 transition whitespace-nowrap">Premium Accessories</button>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
                {isLoading ? (
                    [...Array(5)].map((_, i) => (
                        <div key={i} className={`border border-slate-100 rounded-2xl p-4 bg-white h-[320px] flex flex-col animate-pulse ${i > 3 ? 'hidden lg:flex' : ''}`}>
                            <div className="h-44 bg-slate-100 rounded-xl mb-5 w-full"></div>
                            <div className="h-3 bg-slate-100 w-1/3 mb-2 rounded"></div>
                            <div className="h-4 bg-slate-200 w-3/4 mb-4 rounded"></div>
                            <div className="mt-auto h-10 w-full bg-slate-100 rounded-xl"></div>
                        </div>
                    ))
                ) : (
                    products?.map((p, i) => (
                        <Link href={`/shop/${p.id || '1'}`} key={i} className={`border border-slate-100 rounded-2xl p-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white flex flex-col group ${p.hiddenMd ? 'hidden lg:flex' : 'flex'}`}>
                            <div className="h-44 bg-slate-50 rounded-xl mb-5 flex items-center justify-center p-4 relative overflow-hidden shrink-0 text-slate-400">
                                <Image
                                    src={p.img || '/placeholder.png'}
                                    alt={`iShine Wireless ${p.name}`}
                                    fill
                                    className="object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <p className="text-sm font-medium text-slate-500 mb-1.5">{p.cat}</p>
                                <h3 className="font-bold text-slate-800 mb-3 truncate group-hover:text-brand transition-colors text-lg">{p.name}</h3>
                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="text-2xl font-extrabold text-brand">{p.priceStr}</div>
                                    </div>
                                    <button
                                        onClick={(e) => handleAddToCart(e, p)}
                                        className="w-full border border-slate-200 text-brand font-bold py-2.5 rounded-xl hover:bg-brand hover:text-white transition-all duration-300 shadow-sm"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div >
    );
});

export default WeeklyBestSellers;
