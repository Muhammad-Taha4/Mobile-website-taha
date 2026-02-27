import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

export default async function ModelPage({ params }: { params: Promise<{ brand: string, model: string }> }) {
    const { brand, model } = await params;

    // Convert slugs back to readable text (e.g. 'pixel-10' -> 'Pixel 10')
    const decodedBrand = decodeURIComponent(brand).replace(/-/g, ' ');
    const decodedModel = decodeURIComponent(model).replace(/-/g, ' ');

    // Fetch products
    let products: any[] = [];
    let suggestedProducts: any[] = [];
    try {
        // Fetching all to do reliable client/server side fuzzy filter
        const res = await fetch(`http://localhost:5000/api/products`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            const rawProducts = Array.isArray(data) ? data : (data.products || []);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            // Filter products that contain the model name in their title, compatibility, or category
            products = rawProducts.filter((p: any) => {
                const searchTokens = decodedModel.toLowerCase().split(' ');
                const catName = typeof p.category === 'object' ? p.category?.name : p.category;
                const targetText = `${p.name} ${p.compatibility || ''} ${catName || ''}`.toLowerCase();

                // Must match the core digits/words of the model (like "10" or "Pixel")
                return searchTokens.every(token => targetText.includes(token));
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            suggestedProducts = rawProducts.filter((p: any) => {
                const brandStr = typeof p.brand === 'object' ? p.brand?.name : p.brand;
                const catStr = typeof p.category === 'object' ? p.category?.name : p.category;
                const isSameBrand = brandStr?.toLowerCase() === decodedBrand.toLowerCase() || catStr?.toLowerCase().includes(decodedBrand.toLowerCase());
                const isNotAlreadyMatched = !products.some((mp: any) => mp.id === p.id);
                return isSameBrand && isNotAlreadyMatched;
            }).slice(0, 5); // Top 5 suggestions

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const mapProduct = (p: any) => ({
                id: p.id || p.sku || '',
                sku: p.sku,
                title: p.name,
                brand: typeof p.brand === 'object' ? p.brand?.name : (p.brand || decodedBrand),
                price: p.wholesalePrice ? parseFloat(p.wholesalePrice.toString().replace(/[^0-9.]/g, '')) : 0,
                badge: p.isFeatured ? "Featured" : "New",
                badgeColor: (p.isFeatured ? "purple" : "blue") as "purple" | "green" | "blue" | "red",
                stockStatus: p.stock > 0 ? "In Stock" : "Out of Stock",
                stockCount: `${p.stock}+ units`,
                imageSrc: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : (typeof p.images === 'string' && p.images.startsWith('[') ? JSON.parse(p.images)[0] : p.images) || ""
            });

            products = products.map(mapProduct);
            suggestedProducts = suggestedProducts.map(mapProduct);
        }
    } catch (err) {
        console.error("Failed to fetch products for model page:", err);
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-16">

            {/* Elegant Header Section */}
            <div className="bg-white border-b border-slate-200 pt-8 pb-10">
                <div className="container mx-auto px-4 max-w-[1440px]">
                    <nav aria-label="Breadcrumb" className="flex text-sm text-slate-500 mb-6 font-medium tracking-wide">
                        <ol className="flex items-center space-x-2">
                            <li><Link className="hover:text-brand transition" href="/">Home</Link></li>
                            <li><span className="text-slate-300 material-symbols-outlined text-[14px]">chevron_right</span></li>
                            <li><Link className="hover:text-brand transition" href="/shop">Shop</Link></li>
                            <li><span className="text-slate-300 material-symbols-outlined text-[14px]">chevron_right</span></li>
                            <li className="text-slate-600 capitalize"><Link className="hover:text-brand transition" href={`/shop?category=${encodeURIComponent(decodedBrand)}`}>{decodedBrand}</Link></li>
                            <li><span className="text-slate-300 material-symbols-outlined text-[14px]">chevron_right</span></li>
                            <li aria-current="page" className="text-brand font-bold capitalize">{decodedModel}</li>
                        </ol>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 text-brand rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
                                <span className="material-symbols-outlined text-[16px]">verified</span>
                                Quality Assured
                            </div>
                            <h1 className="text-3xl md:text-[40px] font-black tracking-tight text-slate-800 leading-tight">
                                {decodedModel} <span className="font-light text-slate-400">Parts</span>
                            </h1>
                            <p className="mt-3 text-slate-500 text-base md:text-lg max-w-2xl leading-relaxed">
                                Premium quality OLED screens, high-capacity batteries, and precise charging ports strictly tested for the {decodedBrand} {decodedModel}.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-2 rounded-xl shadow-sm">
                            <div className="text-center px-4 py-2 border-r border-slate-200">
                                <span className="block text-xl font-black text-brand">{products.length}</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Exact Matches</span>
                            </div>
                            <div className="text-center px-4 py-2">
                                <span className="block text-xl font-black text-slate-700">1-Year</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Warranty</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1440px] mt-8">

                {/* Filtering Bar */}
                {products.length > 0 && (
                    <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 pl-2">
                            <span className="material-symbols-outlined text-[20px] text-brand">filter_list</span>
                            Filter Parts
                        </div>
                        <div className="flex gap-2">
                            <select className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-lg px-4 py-2 outline-none focus:border-brand focus:ring-1 focus:ring-brand cursor-pointer">
                                <option>Recommended Matches</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest Arrivals</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Primary Exact Matches Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {products.map((m: any, i: number) => (
                            <ProductCard
                                key={m.id || i}
                                id={m.id}
                                title={m.title}
                                brand={m.brand}
                                price={m.price}
                                badge={m.badge}
                                badgeColor={m.badgeColor}
                                stockStatus={m.stockStatus}
                                stockCount={m.stockCount}
                                imageSrc={m.imageSrc}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <div className="w-20 h-20 bg-slate-50 flex items-center justify-center rounded-full mb-6">
                            <span className="material-symbols-outlined text-[40px] text-slate-300">inventory_2</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">No Exact Parts Found</h3>
                        <p className="text-slate-500 text-center max-w-md mb-8 leading-relaxed">
                            It looks like we don't have cataloged replacement parts strictly matching <strong className="text-slate-700">{decodedModel}</strong> at the moment.
                        </p>
                        <Link href="/shop" className="px-8 py-3 bg-brand text-white font-bold rounded-full hover:bg-brand-hover transition shadow-md">
                            Browse All Parts
                        </Link>
                    </div>
                )}

                {/* Suggestions Carousel / Grid */}
                {suggestedProducts.length > 0 && (
                    <div className="mt-20 pt-10 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">You Might Also Like</h3>
                                <p className="text-slate-500 text-sm mt-1">Other popular parts from {decodedBrand}</p>
                            </div>
                            <Link href={`/shop?category=${encodeURIComponent(decodedBrand)}`} className="text-sm font-bold text-brand hover:text-brand-hover flex items-center gap-1">
                                View all {decodedBrand}
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 opacity-90 hover:opacity-100 transition-opacity">
                            {suggestedProducts.map((m: any, i: number) => (
                                <ProductCard
                                    key={m.id || i}
                                    id={m.id}
                                    title={m.title}
                                    brand={m.brand}
                                    price={m.price}
                                    badge={m.badge}
                                    badgeColor={m.badgeColor}
                                    stockStatus={m.stockStatus}
                                    stockCount={m.stockCount}
                                    imageSrc={m.imageSrc}
                                />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
