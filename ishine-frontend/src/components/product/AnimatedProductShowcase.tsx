'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock Premium Products Data
const showcaseProducts = [
    {
        id: 1,
        name: 'iPhone 13 Pro Max OLED Display',
        price: '$185.00',
        oldPrice: '$210.00',
        badge: 'FEATURED DEAL',
        specs: ['120Hz ProMotion', 'Super Retina XDR', 'OEM Grade'],
        image: '/iPhone-13-Pro-Max-3.svg',
    },
    {
        id: 2,
        name: 'Precision Mobile Repair Toolkit',
        price: '$34.99',
        oldPrice: '$49.00',
        badge: 'TOP SELLER',
        specs: ['Magnetic Driver', 'Anti-Static Tweezers', 'CR-V Steel Bits'],
        image: '/assets/6092C-Professional-Precision-70-in-1-Multifunction-Screwdriver-Set-in-lahore.webp',
    },
    {
        id: 3,
        name: 'Samsung S24 Ultra OLED Screen',
        price: '$210.50',
        oldPrice: '$240.00',
        badge: 'NEW ARRIVAL',
        specs: ['120Hz Dynamic AMOLED', 'Pre-Installed Frame', 'OEM Standard'],
        image: '/S24-Ultra-LCD.svg',
    }
];

export default function AnimatedProductShowcase() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseProducts.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="w-full max-w-7xl mx-auto px-4 relative my-8">

            <style jsx>{`
                @keyframes fillBar {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                .animate-fill {
                    animation: fillBar 4s linear forwards;
                }
            `}</style>

            {/* Light Premium Card to match the website */}
            <div className="relative w-full rounded-2xl bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row min-h-[400px]">

                {/* Left Column: Image Presentation (Light Gray Background) */}
                <div className="relative w-full md:w-1/2 h-[300px] md:h-auto bg-slate-50 flex justify-center items-center overflow-hidden border-b md:border-b-0 md:border-r border-slate-100">

                    {showcaseProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className={`absolute inset-0 flex justify-center items-center transition-all duration-1000 ease-in-out p-8 md:p-12 ${index === currentIndex
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 scale-95 pointer-events-none'
                                }`}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-xl shadow-md"
                            />
                        </div>
                    ))}
                </div>

                {/* Right Column: Product Details (Clean White Background) */}
                <div className="relative w-full md:w-1/2 flex flex-col justify-center bg-white z-10">
                    {showcaseProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-center transition-all duration-700 ease-in-out ${index === currentIndex
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-4 pointer-events-none'
                                }`}
                        >
                            {/* Subtle Badge */}
                            <div className="mb-4 flex items-center gap-3">
                                <span className="inline-block px-3 py-1 rounded-md bg-red-50 text-red-600 text-xs font-bold tracking-wider uppercase border border-red-100">
                                    {product.badge}
                                </span>
                            </div>

                            {/* Dark Title */}
                            <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-5">
                                {product.name}
                            </h2>

                            {/* Clean Specs */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {product.specs.map((spec, i) => (
                                    <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-sm">
                                        <span className="material-symbols-outlined text-[16px] text-[#2ea4d5]">check_circle</span>
                                        {spec}
                                    </span>
                                ))}
                            </div>

                            {/* Pricing */}
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-4xl font-extrabold text-slate-900">
                                    {product.price}
                                </span>
                                <span className="text-lg text-slate-400 line-through font-medium">
                                    {product.oldPrice}
                                </span>
                            </div>

                            {/* Standard Brand Buttons */}
                            <div className="flex items-center gap-4">
                                <button className="flex items-center justify-center gap-2 bg-[#2ea4d5] hover:bg-[#2389b3] text-white px-6 py-3.5 rounded-lg font-semibold transition-colors shadow-sm w-full md:w-auto">
                                    <span className="material-symbols-outlined text-sm">shopping_cart</span>
                                    Add to Cart
                                </button>
                                <Link href="/shop" className="px-6 py-3.5 rounded-lg font-semibold text-slate-600 hover:bg-slate-50 border border-slate-200 transition-colors text-center w-full md:w-auto">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Controls & Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full z-20">
                    {/* Dots Indicator (Centered) */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {showcaseProducts.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex ? 'w-6 bg-[#2ea4d5]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Subtle Loading Bar */}
                    <div className="h-0.5 bg-slate-100 w-full relative">
                        <div
                            key={currentIndex}
                            className="h-full bg-[#2ea4d5]/20 animate-fill"
                        ></div>
                    </div>
                </div>

            </div>
        </section>
    );
}


