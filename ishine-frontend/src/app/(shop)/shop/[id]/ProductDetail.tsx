"use client";
import { useState, useEffect } from "react";
import { useCartStore } from '@/store/useCartStore';
import toast from 'react-hot-toast';

export default function ProductDetail({ productId }: { productId?: string }) {
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mainImage, setMainImage] = useState("");
    const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

    // Add to cart state
    const [quantity, setQuantity] = useState(1);
    const addToCart = useCartStore(state => state.addToCart);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const url = `http://localhost:5000/api/products/${productId}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error("Product not found");
                const data = await res.json();

                // Safely parse JSON arrays from DB if they are strings
                const parseJsonOption = (field: any, defaultVal: any) => {
                    if (Array.isArray(field)) return field;
                    if (typeof field === 'string' && field.startsWith('[')) {
                        try { return JSON.parse(field); } catch (e) { return defaultVal; }
                    }
                    return defaultVal;
                };

                const mappedProduct = {
                    id: data.id,
                    title: data.name,
                    brand: (data.brand && typeof data.brand === 'object') ? data.brand.name : (data.brand || "iShine"),
                    price: parseFloat(data.wholesalePrice),
                    priceStr: `$${data.wholesalePrice}`,
                    description: data.description || data.shortDescription,
                    sku: data.sku,
                    badge: data.warranty || "OEM Refurb", // We overloaded warranty to hold condition from seed
                    badgeColor: (data.warranty === "New" || data.warranty === "Premium Aftermarket") ? "blue" : "purple",
                    stock: data.stock,
                    images: parseJsonOption(data.images, []),
                    features: parseJsonOption(data.features, []),
                    reviews: parseJsonOption(data.reviews, []),
                };

                setProduct(mappedProduct);
                if (mappedProduct.images.length > 0) setMainImage(mappedProduct.images[0]);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (productId) fetchProduct();
    }, [productId]);

    const getDiscountedPrice = (qty: number) => {
        if (!product) return 0;
        if (qty >= 20) return product.price * 0.87;
        if (qty >= 5) return product.price * 0.95;
        return product.price;
    };

    const currentUnitPrice = getDiscountedPrice(quantity);
    const totalPrice = currentUnitPrice * quantity;

    // Determine active tier based on quantity
    const activeTierId = quantity >= 20 ? 2 : quantity >= 5 ? 1 : 0;

    const bulkTiers = [
        { id: 0, range: "1 - 4", price: product ? `$${product.price.toFixed(2)}` : "-", savings: "Standard", popular: false },
        { id: 1, range: "5 - 19", price: product ? `$${(product.price * 0.95).toFixed(2)}` : "-", savings: "Save 5%", popular: true },
        { id: 2, range: "20+", price: product ? `$${(product.price * 0.87).toFixed(2)}` : "-", savings: "Save 13%", popular: false }
    ];

    const handleAddToCart = () => {
        if (!product) return;
        addToCart({
            id: product.id || String(productId),
            name: product.title,
            price: currentUnitPrice,
            image: mainImage,
            quantity: quantity,
            sku: product.sku
        });
        toast.success(`${quantity}x ${product.title} added to cart!`);
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium">Loading premium product data...</div>;
    }

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium">Product not found.</div>;
    }

    const images = product.images.length > 0 ? product.images : ["/assets/B1255519-1-400x400.webp"];
    const avgRating = product.reviews && product.reviews.length > 0
        ? (product.reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) / product.reviews.length).toFixed(1)
        : "5.0";

    return (
        <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6 lg:py-10 bg-slate-50 min-h-screen animate-in fade-in duration-500">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-2 mb-6 text-sm font-semibold tracking-wide text-slate-500">
                <a className="hover:text-brand transition-colors" href="/">Home</a>
                <span className="text-slate-300 material-symbols-outlined text-[16px]">chevron_right</span>
                <a className="hover:text-brand transition-colors" href="/shop">Shop</a>
                <span className="text-slate-300 material-symbols-outlined text-[16px]">chevron_right</span>
                <a className="hover:text-brand transition-colors" href={`/shop?brand=${encodeURIComponent(product.brand)}`}>{product.brand}</a>
                <span className="text-slate-300 material-symbols-outlined text-[16px]">chevron_right</span>
                <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-none">{product.title}</span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-14">
                {/* Left Column: Image Gallery */}
                <div className="xl:col-span-7 flex flex-col gap-4">
                    {/* Main Image */}
                    <div className="relative w-full aspect-square md:aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex items-center justify-center group p-8">
                        {images.length === 0 && <span className="material-symbols-outlined text-6xl text-slate-200">image</span>}
                        {mainImage && (
                            <img
                                alt={product.title}
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                src={mainImage}
                                onError={(e) => { e.currentTarget.src = "/assets/placeholder-image.jpg"; }}
                            />
                        )}
                        {/* Badges Overlay */}
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                            {product.stock > 0 && (
                                <span className="bg-emerald-500 text-white text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-full shadow-md">
                                    IN STOCK
                                </span>
                            )}
                            {product.badge === "OEM Refurb" && (
                                <span className="bg-purple-100 text-purple-700 border border-purple-200 text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-full shadow-sm">
                                    OEM Grade
                                </span>
                            )}
                        </div>
                        <button className="absolute bottom-6 right-6 size-10 flex items-center justify-center bg-white/80 hover:bg-white text-slate-700 rounded-full shadow-md backdrop-blur-md transition-all active:scale-95">
                            <span className="material-symbols-outlined text[20px]">zoom_in</span>
                        </button>
                    </div>

                    {/* Thumbnails Row */}
                    <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                        {images.map((img: string, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setMainImage(img)}
                                className={`shrink-0 size-24 rounded-xl border-2 overflow-hidden p-2 transition-all duration-300 bg-white ${mainImage === img ? 'border-brand shadow-md scale-100' : 'border-slate-100 hover:border-brand/40 opacity-70 hover:opacity-100 hover:scale-95'}`}
                            >
                                <img alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" src={img} onError={(e) => { e.currentTarget.src = "/assets/placeholder-image.jpg"; }} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column: Premium Info Panel */}
                <div className="xl:col-span-5 flex flex-col">
                    <div className="space-y-8 sticky top-24">

                        {/* Title & Core Meta */}
                        <div className="space-y-3">
                            <div className="flex items-start justify-between gap-4">
                                <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-[1.15]">{product.title}</h1>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold">
                                <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-200">
                                    <span className="material-symbols-outlined text-[16px] text-yellow-500 fill-current">star</span>
                                    <span>{avgRating} <span className="font-medium opacity-70">({product.reviews.length} reviews)</span></span>
                                </div>
                                <div className="size-1 rounded-full bg-slate-300"></div>
                                <span className="text-slate-500">SKU: <span className="font-bold text-slate-700 uppercase">{product.sku}</span></span>
                                <div className="size-1 rounded-full bg-slate-300"></div>
                                <span className="text-slate-500">Brand: <span className="font-bold text-slate-700 uppercase">{product.brand}</span></span>
                            </div>
                        </div>

                        {/* Feature Bullets */}
                        {product.features && product.features.length > 0 && (
                            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">At a Glance</h3>
                                <ul className="space-y-2.5">
                                    {product.features.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-[18px] text-emerald-500 shrink-0 mt-0.5">check_circle</span>
                                            <span className="text-sm font-semibold text-slate-600 leading-snug">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Interactive Pricing Engine */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-200/50 flex flex-col gap-6">

                            {/* Dynamic Price Display */}
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Calculated Price</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-slate-800 tracking-tighter">${currentUnitPrice.toFixed(2)}</span>
                                    <span className="text-lg text-slate-500 font-bold">/ unit</span>
                                    {quantity > 1 && (
                                        <span className="ml-2 text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                            Total: ${totalPrice.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="h-px w-full bg-slate-100"></div>

                            {/* Bulk Tiers */}
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px]">inventory</span>
                                    Volume Discounts
                                </h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {bulkTiers.map((tier) => (
                                        <div
                                            key={tier.id}
                                            onClick={() => {
                                                if (tier.id === 0) setQuantity(1);
                                                else if (tier.id === 1) setQuantity(5);
                                                else if (tier.id === 2) setQuantity(20);
                                            }}
                                            className={`cursor-pointer rounded-xl p-3 border-2 transition-all flex flex-col items-center justify-center text-center gap-1 ${activeTierId === tier.id ? 'border-brand bg-brand/5' : 'border-slate-100 bg-slate-50 hover:border-brand/30'}`}
                                        >
                                            <span className={`text-sm font-black ${activeTierId === tier.id ? 'text-brand' : 'text-slate-700'}`}>{tier.range}</span>
                                            <span className={`text-[11px] font-bold uppercase ${tier.savings !== '-' ? 'text-emerald-500' : 'text-slate-400'}`}>{tier.savings}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cart Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <div className="h-14 w-full sm:w-36 flex items-center rounded-2xl border-2 border-slate-200 bg-slate-50 overflow-hidden focus-within:border-brand focus-within:bg-white transition-all">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-brand transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">remove</span>
                                    </button>
                                    <input
                                        className="w-full text-center border-none p-0 focus:ring-0 text-slate-800 font-black text-lg bg-transparent"
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    />
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-brand transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">add</span>
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 h-14 bg-brand hover:bg-brand-hover text-white rounded-2xl font-black shadow-lg shadow-brand/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-brand/40 active:scale-95 flex items-center justify-center gap-3 text-lg"
                                >
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    Add to Cart
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Sleek Content Tabs (Below the Fold) */}
            <div className="mt-20 xl:mt-32 max-w-5xl">
                {/* Tab Headers */}
                <div className="flex gap-8 border-b-2 border-slate-200 mb-8 overflow-x-auto custom-scrollbar">
                    <button
                        onClick={() => setActiveTab("description")}
                        className={`pb-4 px-2 text-base font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'description' ? 'text-brand border-b-2 border-brand -mb-[2px]' : 'text-slate-400 hover:text-slate-700 border-b-2 border-transparent -mb-[2px]'}`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setActiveTab("specs")}
                        className={`pb-4 px-2 text-base font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'specs' ? 'text-brand border-b-2 border-brand -mb-[2px]' : 'text-slate-400 hover:text-slate-700 border-b-2 border-transparent -mb-[2px]'}`}
                    >
                        Specifications
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`flex items-center gap-2 pb-4 px-2 text-base font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'reviews' ? 'text-brand border-b-2 border-brand -mb-[2px]' : 'text-slate-400 hover:text-slate-700 border-b-2 border-transparent -mb-[2px]'}`}
                    >
                        Customer Reviews
                        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">{product.reviews?.length || 0}</span>
                    </button>
                </div>

                {/* Tab Content Panels */}
                <div className="min-h-[300px] animate-in slide-in-from-bottom-4 fade-in duration-300">

                    {/* Description Tab */}
                    {activeTab === "description" && (
                        <div className="prose prose-slate prose-lg max-w-none prose-p:leading-relaxed prose-p:text-slate-600">
                            {product.description ? (
                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                            ) : (
                                <p>No detailed description provided for this part.</p>
                            )}
                        </div>
                    )}

                    {/* Specifications Tab */}
                    {activeTab === "specs" && (
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            <table className="w-full text-left text-sm text-slate-600">
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <th className="py-4 px-6 font-bold text-slate-800 w-1/3 border-r border-slate-100">Brand</th>
                                        <td className="py-4 px-6 font-semibold uppercase">{product.brand}</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <th className="py-4 px-6 font-bold text-slate-800 border-r border-slate-100">Quality Grade</th>
                                        <td className="py-4 px-6 font-semibold">{product.badge} Quality</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <th className="py-4 px-6 font-bold text-slate-800 border-r border-slate-100">Model Compatibility</th>
                                        <td className="py-4 px-6">{product.title.split(' ').slice(0, 4).join(' ')}</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <th className="py-4 px-6 font-bold text-slate-800 border-r border-slate-100">Stock Availability</th>
                                        <td className="py-4 px-6">{product.stock} Units in Central Warehouse</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <th className="py-4 px-6 font-bold text-slate-800 border-r border-slate-100">Warranty</th>
                                        <td className="py-4 px-6 font-semibold text-emerald-600">Lifetime on Manufacturer Defects</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Reviews Tab */}
                    {activeTab === "reviews" && (
                        <div className="space-y-6">
                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((rev: any, idx: number) => (
                                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                                        <div className="size-12 shrink-0 bg-brand/10 text-brand font-black text-xl rounded-full flex items-center justify-center uppercase">
                                            {rev.author.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                <h4 className="font-bold text-slate-800 text-lg">{rev.author}</h4>
                                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{rev.date}</span>
                                            </div>
                                            <div className="flex text-yellow-400 text-sm mb-3">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <span key={i} className={`material-symbols-outlined fill-current ${i < rev.rating ? '' : 'text-slate-200'}`}>star</span>
                                                ))}
                                            </div>
                                            <p className="text-slate-600 leading-relaxed font-medium">"{rev.comment}"</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
                                    <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">forum</span>
                                    <h3 className="text-lg font-bold text-slate-700">No Reviews Yet</h3>
                                    <p className="text-slate-500">Be the first to review this high-quality part.</p>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>

            {/* Warranty & Guarantee Bottom Ribbon */}
            <div className="mt-20 border-t border-slate-200 pt-12 pb-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-4xl text-slate-400">verified_user</span>
                    <div>
                        <h4 className="font-black text-slate-700 text-sm uppercase tracking-widest">Lifetime Warranty</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Strictly covering all manufacturer defects post-installation.</p>
                    </div>
                </div>
                <div className="hidden md:block w-px h-16 bg-slate-200"></div>
                <div className="flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-4xl text-slate-400">local_shipping</span>
                    <div>
                        <h4 className="font-black text-slate-700 text-sm uppercase tracking-widest">Same-Day Shipping</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-[200px]">On all B2B orders processed before 3:00 PM EST.</p>
                    </div>
                </div>
            </div>

        </main>
    );
}
