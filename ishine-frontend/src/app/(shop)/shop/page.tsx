"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SidebarFilters from "@/components/shop/SidebarFilters";
import ProductCard from "@/components/product/ProductCard";
import { generatedProducts } from "@/lib/mockData";

function ShopContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const grades = searchParams.get("grade");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const inStock = searchParams.get("inStock");
    const router = useRouter();
    const pathname = usePathname();

    const [isFiltering, setIsFiltering] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState<any[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchProducts = async () => {
            setIsFiltering(true);
            try {
                let url = `http://localhost:5000/api/products?page=${currentPage}&limit=${itemsPerPage}`;
                if (category) url += `&category=${encodeURIComponent(category)}`;
                if (grades) url += `&grade=${encodeURIComponent(grades)}`;
                if (minPrice) url += `&minPrice=${encodeURIComponent(minPrice)}`;
                if (maxPrice) url += `&maxPrice=${encodeURIComponent(maxPrice)}`;
                if (inStock === 'true') url += `&inStock=true`;

                const res = await fetch(url);
                const data = await res.json();

                const rawProducts = data.products || data || [];
                const pagination = data.pagination || { total: rawProducts.length || 0 };

                const mappedProducts = rawProducts.map((p: any) => ({
                    id: p.id,
                    title: p.name,
                    brand: typeof p.brand === 'object' ? p.brand?.name : (p.brand || "iShine"),
                    price: `$${p.wholesalePrice}`,
                    badge: p.qualityGrade || "New",
                    badgeColor: p.qualityGrade === "OEM Refurb" ? "purple" : (p.qualityGrade === "Premium Aftermarket" ? "blue" : "green"),
                    stockStatus: p.stock > 0 ? "In Stock" : "Out of Stock",
                    stockCount: `${p.stock}+ units`,
                    imageSrc: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : (p.images ? (typeof p.images === 'string' && p.images.startsWith('[') ? JSON.parse(p.images)[0] : p.images) : ""),
                    sku: p.sku
                }));

                setProducts(mappedProducts);
                setTotalProducts(pagination.total || 0);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setProducts([]);
                setTotalProducts(0);
            } finally {
                setIsFiltering(false);
            }
        };

        fetchProducts();
    }, [currentPage, category, grades, minPrice, maxPrice, inStock]);

    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const paginatedProducts = products; // Already paginated by API

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const removeFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const existing = params.get(key)?.split(',') || [];
        const next = existing.filter(v => v !== value);

        if (next.length > 0) params.set(key, next.join(','));
        else params.delete(key);

        params.delete('page');
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSelectProduct = (id: string, selected: boolean) => {
        setSelectedIds(prev =>
            selected ? [...prev, id] : prev.filter(i => i !== id)
        );
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(products.map(p => String(p.id)));
        } else {
            setSelectedIds([]);
        }
    };

    const activeFilters = [
        ...(category?.split(',') || []).map(v => ({ key: 'category', value: v, label: v.replace(/-/g, ' ') })),
        ...(grades?.split(',') || []).map(v => ({ key: 'grade', value: v, label: v })),
        ...(minPrice ? [{ key: 'minPrice', value: minPrice, label: `Min: $${minPrice}` }] : []),
        ...(maxPrice ? [{ key: 'maxPrice', value: maxPrice, label: `Max: $${maxPrice}` }] : []),
    ];

    return (
        <div className="bg-background-light min-h-screen">
            <div className="mx-auto flex w-full max-w-[1440px] flex-1 items-start gap-8 px-4 py-8 sm:px-6 lg:px-8">
                <SidebarFilters />

                <main className="flex-1">
                    {/* Breadcrumbs & Title */}
                    <div className="mb-6">
                        <nav aria-label="Breadcrumb" className="flex text-sm text-text-secondary mb-2">
                            <ol className="flex items-center space-x-2">
                                <li><a className="hover:text-primary transition" href="/">Home</a></li>
                                <li><span className="text-gray-300">/</span></li>
                                <li><a className="hover:text-primary transition" href="/shop">Parts</a></li>
                                <li><span className="text-gray-300">/</span></li>
                                <li aria-current="page" className="font-medium text-text-main">LCD Screens &amp; Digitizers</li>
                            </ol>
                        </nav>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-text-main capitalize">
                                    {category ? category.replace(/-/g, ' ') : "All Products"}
                                </h1>
                                <p className="mt-2 text-sm text-text-secondary">Showing <span className="font-bold text-text-main">{products.length} results</span>.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <select className="appearance-none cursor-pointer rounded-lg border border-border-light bg-surface-light py-2 pl-3 pr-10 text-sm font-medium text-text-main shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                                        <option>Sort: Best Match</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Newest Arrivals</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary">
                                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                    </div>
                                </div>
                                <div className="flex rounded-lg border border-border-light bg-surface-light p-1 shadow-sm">
                                    <button className="rounded p-1 text-primary bg-primary/10">
                                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                    </button>
                                    <button className="rounded p-1 text-text-secondary hover:text-primary hover:bg-background-light transition">
                                        <span className="material-symbols-outlined text-[20px]">view_list</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters */}
                    <div className="mb-6 flex flex-wrap gap-2">
                        {activeFilters.map(filter => (
                            <span key={`${filter.key}-${filter.value}`} className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 capitalize">
                                {filter.label}
                                <button
                                    onClick={() => removeFilter(filter.key, filter.value)}
                                    className="ml-1.5 inline-flex size-4 items-center justify-center rounded-full hover:bg-primary/20 transition"
                                >
                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                </button>
                            </span>
                        ))}
                        {activeFilters.length > 0 && (
                            <button
                                onClick={() => router.push(pathname)}
                                className="text-xs text-text-secondary hover:text-primary hover:underline font-bold px-2 py-1"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Bulk Actions Bar */}
                    <div className={`mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-3 gap-4 transition-all ${selectedIds.length > 0 ? 'bg-primary/10 border-primary/40 shadow-sm' : 'bg-primary/5 border-primary/20'}`}>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={selectedIds.length > 0 && selectedIds.length === products.length}
                                onChange={handleSelectAll}
                                className="size-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer shadow-sm hover:scale-110 transition-transform"
                            />
                            <span className="text-sm font-semibold text-text-main">{selectedIds.length} Items Selected</span>
                        </div>
                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            <button
                                disabled={selectedIds.length === 0}
                                className={`flex-1 sm:flex-none text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm flex items-center justify-center gap-1 ${selectedIds.length > 0 ? 'bg-white border border-primary text-primary hover:bg-primary/5' : 'bg-white border border-gray-200 text-gray-700 opacity-50 cursor-not-allowed'}`}
                            >
                                <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
                                Compare Selected
                            </button>
                            <button
                                disabled={selectedIds.length === 0}
                                className={`flex-1 sm:flex-none text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm flex items-center justify-center gap-1 ${selectedIds.length > 0 ? 'bg-primary text-white hover:bg-primary-hover shadow-md' : 'bg-primary text-white opacity-50 cursor-not-allowed'}`}
                            >
                                <span className="material-symbols-outlined text-[16px]">shopping_cart_checkout</span>
                                Add Selected to Cart
                            </button>
                        </div>
                    </div>

                    {/* Product Grid / Skeleton */}
                    {isFiltering ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((sk) => (
                                <div key={sk} className="flex flex-col overflow-hidden rounded-xl border border-border-light bg-white shadow-sm h-[420px]">
                                    <div className="h-56 w-full bg-slate-100 animate-pulse"></div>
                                    <div className="p-5 flex-1 flex flex-col gap-3">
                                        <div className="h-3 w-1/3 bg-slate-200 animate-pulse rounded"></div>
                                        <div className="h-5 w-3/4 bg-slate-200 animate-pulse rounded"></div>
                                        <div className="h-6 w-1/4 bg-slate-200 animate-pulse rounded mt-2"></div>
                                        <div className="mt-auto h-10 w-full bg-slate-200 animate-pulse rounded-lg"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {paginatedProducts?.map((m, i) => (
                                <ProductCard
                                    key={i}
                                    id={m.id || m.sku || ''}
                                    title={m.title}
                                    brand={m.brand}
                                    price={m.price ? parseFloat(m.price.replace(/[^0-9.]/g, '')) : 0}
                                    badge={m.badge}
                                    badgeColor={m.badgeColor as "purple" | "green" | "blue" | "red"}
                                    stockStatus={m.stockStatus}
                                    stockCount={m.stockCount}
                                    imageSrc={m.imageSrc}
                                    isSelected={selectedIds.includes(String(m.id))}
                                    onSelectChange={handleSelectProduct}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="mt-10 flex items-center justify-between border-t border-border-light pt-6">
                        <p className="text-sm text-text-secondary">Showing <span className="font-medium text-text-main">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-text-main">{Math.min(currentPage * itemsPerPage, totalProducts)}</span> of <span className="font-medium text-text-main">{totalProducts}</span> results</p>
                        <div className="flex gap-2">
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className="inline-flex items-center rounded-lg border border-border-light bg-white px-4 py-2 text-sm font-medium text-text-secondary hover:bg-gray-50 disabled:opacity-50 transition"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="inline-flex items-center rounded-lg border border-border-light bg-white px-4 py-2 text-sm font-medium text-text-secondary hover:bg-gray-50 disabled:opacity-50 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}
