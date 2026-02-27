"use client";
import { useState, useEffect, memo } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import toast from 'react-hot-toast';

const TopSelling = memo(() => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<any[]>([]);
    const addToCart = useCartStore(state => state.addToCart);

    useEffect(() => {
        const fetchTopSelling = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('http://localhost:5000/api/products?featured=true&limit=10');
                const data = await res.json();

                const raw = Array.isArray(data) ? data : (data.products || []);

                const mapped = raw.map((p: any, i: number) => {
                    const brandName = (p.brand && typeof p.brand === 'object') ? p.brand.name : (p.brand || "iShine");
                    return {
                        id: p.id,
                        cat: brandName + " Parts",
                        name: p.name,
                        price: parseFloat(p.wholesalePrice),
                        priceStr: `$${p.wholesalePrice}`,
                        oldPrice: i % 3 === 0 ? `$${(parseFloat(p.wholesalePrice) * 1.2).toFixed(2)}` : "",
                        badge: p.isFeatured ? "HOT" : "",
                        hiddenMd: i >= 5,
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

        fetchTopSelling();
    }, []);

    const handleAddToCart = (e: React.MouseEvent, p: any) => {
        e.preventDefault(); // Prevent Link navigation
        addToCart({
            id: p.id || String(Math.random()),
            name: p.name,
            price: p.price,
            image: p.img,
            quantity: 1,
            sku: p.sku
        });
    };

    if (!products) return <div className="p-10 text-center text-slate-500">Loading Premium Parts...</div>;

    return (
        <div className="container mx-auto px-4 pt-4 pb-12 md:pt-8 md:pb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Premium Wireless Repair Parts</h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 min-h-[350px]">
                {isLoading ? (
                    [...Array(5)].map((_, i) => (
                        <div key={i} className={`border border-slate-100 rounded-2xl p-4 bg-white h-[320px] flex flex-col animate-pulse ${i > 1 ? 'hidden lg:flex' : ''}`}>
                            <div className="h-44 bg-slate-100 rounded-xl mb-5 w-full"></div>
                            <div className="h-3 bg-slate-100 w-1/3 mb-2 rounded"></div>
                            <div className="h-4 bg-slate-200 w-3/4 mb-4 rounded"></div>
                            <div className="mt-auto h-10 w-full bg-slate-100 rounded-xl"></div>
                        </div>
                    ))
                ) : (
                    products?.map((p, i) => (
                        <Link href={`/shop/${p.id || '1'}`} key={i} className={`border border-slate-100 rounded-2xl p-4 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 bg-white relative group flex flex-col ${p.hiddenMd ? 'hidden lg:flex' : 'flex'}`}>
                            {p.badge && (
                                <span className="absolute top-4 left-4 bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-md shadow-sm z-10">
                                    {p.badge}
                                </span>
                            )}
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
                                <h3 className="font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-brand transition-colors text-lg">{p.name}</h3>
                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-2xl font-extrabold text-brand">
                                            {p.priceStr}{" "}
                                            {p.oldPrice && (
                                                <span className="text-base text-slate-400 line-through font-medium ml-1">{p.oldPrice}</span>
                                            )}
                                        </div>
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
        </div>
    );
});

export default TopSelling;
