'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { memo } from 'react';

const categories = [
    { id: 1, name: 'iPhone Displays', slug: 'Apple', image: '/assets/B1255519-1-400x400.webp' },
    { id: 2, name: 'Professional Tools', slug: 'Tools & Supplies', image: '/assets/6092C-Professional-Precision-70-in-1-Multifunction-Screwdriver-Set-in-lahore.webp' },
    { id: 3, name: 'Batteries', slug: 'Batteries', image: '/assets/B1083502-1-400x400-1.webp' },
    { id: 4, name: 'Premium Accessories', slug: 'Accessories', image: '/assets/B1288001-1-400x400-1.webp' },
    { id: 5, name: 'Cables', slug: 'Accessories', image: '/assets/C2.webp' },
    { id: 6, name: 'Car Chargers', slug: 'Accessories', image: '/assets/B1288001-1-400x400-1.webp' },
    { id: 7, name: 'Power Banks', slug: 'Accessories', image: '/assets/B1083502-1-400x400-1.webp' },
    { id: 8, name: 'Wireless Earbuds', slug: 'Accessories', image: '/assets/B1255519-1-400x400.webp' },
];

const CategoryCard = memo(({ category }: { category: typeof categories[0] }) => (
    <Link
        href={`/shop?category=${category.slug}`}
        className="flex-shrink-0 w-[200px] bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center cursor-pointer group"
    >
        <div className="w-24 h-24 mb-4 relative flex items-center justify-center">
            <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
        </div>
        <h3 className="font-semibold text-gray-800 text-center text-sm">{category.name}</h3>
        <span className="text-blue-600 text-xs font-medium mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
            SHOP NOW <ArrowRight size={12} />
        </span>
    </Link>
));

const ShopByCategory = () => {
    // Duplicate categories for seamless infinite loop
    const duplicatedCategories = [...categories, ...categories, ...categories];

    return (
        <section className="py-12 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
                        <p className="text-gray-500 mt-1">Premium components for professional repairs and retail.</p>
                    </div>
                </div>

                {/* Scrolling Container */}
                <div className="overflow-hidden relative">
                    {/* Gradient Fades on edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

                    {/* Animated Track */}
                    <div
                        className="flex gap-6 animate-scroll-rtl hover:[animation-play-state:paused]"
                        style={{
                            width: 'max-content',
                        }}
                    >
                        {duplicatedCategories.map((category, index) => (
                            <CategoryCard key={`${category.id}-${index}`} category={category} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(ShopByCategory);
