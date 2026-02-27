"use client";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';

export default function SidebarFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Local state for immediate UI feedback before URL applies
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [inStockOnly, setInStockOnly] = useState(false);

    // Initialize from URL
    useEffect(() => {
        const catParam = searchParams.get('category');
        if (catParam) setSelectedCategories(catParam.split(','));
        else setSelectedCategories([]);

        const gradeParam = searchParams.get('grade');
        if (gradeParam) setSelectedGrades(gradeParam.split(','));
        else setSelectedGrades([]);

        setMinPrice(searchParams.get('minPrice') || '');
        setMaxPrice(searchParams.get('maxPrice') || '');
        setInStockOnly(searchParams.get('inStock') === 'true');
    }, [searchParams]);

    // Apply Filter to URL
    const applyFilter = useCallback((
        key: string,
        value: string | string[] | boolean
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (Array.isArray(value)) {
            if (value.length > 0) params.set(key, value.join(','));
            else params.delete(key);
        } else if (typeof value === 'boolean') {
            if (value) params.set(key, 'true');
            else params.delete(key);
        } else {
            if (value) params.set(key, value);
            else params.delete(key);
        }

        // Reset to page 1 always if filtering changes
        params.delete('page');

        router.push(`${pathname}?${params.toString()}`);
    }, [searchParams, pathname, router]);

    const handleCategoryChange = (cat: string) => {
        const next = selectedCategories.includes(cat)
            ? selectedCategories.filter(c => c !== cat)
            : [...selectedCategories, cat];
        setSelectedCategories(next);
        applyFilter('category', next);
    };

    const handleGradeChange = (grade: string) => {
        const next = selectedGrades.includes(grade)
            ? selectedGrades.filter(g => g !== grade)
            : [...selectedGrades, grade];
        setSelectedGrades(next);
        applyFilter('grade', next);
    };

    const handlePriceApply = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (minPrice) params.set('minPrice', minPrice);
        else params.delete('minPrice');
        if (maxPrice) params.set('maxPrice', maxPrice);
        else params.delete('maxPrice');
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleClearAll = () => {
        router.push(pathname);
    };

    return (
        <aside className="w-64 shrink-0 hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2">
            <div className="flex items-center justify-between pb-4">
                <h2 className="text-lg font-bold text-text-main">Filters</h2>
                <button onClick={handleClearAll} className="text-xs font-semibold text-primary hover:text-primary-hover hover:underline">
                    Clear All
                </button>
            </div>

            {/* Availability Toggle */}
            <div className="mb-6 flex items-center justify-between bg-primary/5 p-3 rounded-lg border border-primary/10">
                <span className="text-sm font-semibold text-text-main">Hide Out of Stock</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={inStockOnly}
                        onChange={(e) => {
                            setInStockOnly(e.target.checked);
                            applyFilter('inStock', e.target.checked);
                        }}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
            </div>

            <div className="space-y-6">
                {/* Category Filter */}
                <div className="border-b border-border-light pb-6">
                    <h3 className="mb-3 text-sm font-semibold text-text-main">Category</h3>
                    <ul className="space-y-2">
                        {[
                            { name: 'LCD Screens', slug: 'lcd-screens' },
                            { name: 'Batteries', slug: 'batteries' },
                            { name: 'Charging Ports', slug: 'charging-ports' },
                            { name: 'Board Components', slug: 'board-components' },
                            { name: 'Tools & Supplies', slug: 'tools-supplies' },
                            { name: 'Accessories', slug: 'accessories' }
                        ].map(cat => (
                            <li key={cat.slug}>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        checked={selectedCategories.includes(cat.slug)}
                                        onChange={() => handleCategoryChange(cat.slug)}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        type="checkbox"
                                    />
                                    <span className="text-sm text-text-secondary group-hover:text-primary font-semibold">
                                        {cat.name}
                                    </span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quality Grade Filter */}
                <div className="border-b border-border-light pb-6">
                    <h3 className="mb-3 text-sm font-semibold text-text-main">
                        Quality Grade
                    </h3>
                    <div className="space-y-2">
                        {[
                            { bg: 'bg-purple-500', name: 'OEM Refurb' },
                            { bg: 'bg-blue-500', name: 'Premium Aftermarket' },
                            { bg: 'bg-green-500', name: 'Standard' }
                        ].map(grade => (
                            <label key={grade.name} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    checked={selectedGrades.includes(grade.name)}
                                    onChange={() => handleGradeChange(grade.name)}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    type="checkbox"
                                />
                                <div className="flex items-center gap-2">
                                    <span className={`size-2 rounded-full ${grade.bg}`}></span>
                                    <span className="text-sm text-text-secondary group-hover:text-primary">
                                        {grade.name}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Filter */}
                <div className="pb-6">
                    <h3 className="mb-3 text-sm font-semibold text-text-main">
                        Price Range
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                <span className="text-gray-500 sm:text-xs">$</span>
                            </div>
                            <input
                                className="block w-full rounded-md border-0 py-1.5 pl-5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-xs sm:leading-6"
                                id="price-min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="0"
                                type="text"
                            />
                        </div>
                        <span className="text-gray-400 text-sm">-</span>
                        <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                <span className="text-gray-500 sm:text-xs">$</span>
                            </div>
                            <input
                                className="block w-full rounded-md border-0 py-1.5 pl-5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-xs sm:leading-6"
                                id="price-max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="500"
                                type="text"
                            />
                        </div>
                    </div>
                    <button onClick={handlePriceApply} className="mt-3 w-full rounded bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors">
                        Apply Price
                    </button>
                </div>
            </div>
        </aside>
    );
}
