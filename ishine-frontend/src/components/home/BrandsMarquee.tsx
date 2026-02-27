import React from 'react';
import Link from 'next/link';

export default function BrandsMarquee() {
    const renderGoogle = () => (
        <span className="flex tracking-widest font-extrabold text-3xl cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
        </span>
    );

    const brands = [
        { name: "Apple", className: "text-black drop-shadow-sm" },
        { name: "SAMSUNG", className: "text-[#1428A0]" },
        { name: "Google", custom: renderGoogle() },
        { name: "motorola", className: "text-slate-700 lowercase" },
        { name: "ONEPLUS", className: "text-[#F5010C] font-semibold tracking-normal" },
        { name: "xiaomi", className: "text-[#FF6900] lowercase" },
        { name: "HUAWEI", className: "text-[#FF0000]" },
        { name: "NOKIA", className: "text-[#124191]" },
    ];

    const BrandItem = ({ brand }: { brand: any }) => {
        if (brand.custom) {
            return (
                <Link href={`/shop?category=${encodeURIComponent(brand.name)}`} className="mx-12 flex items-center">
                    {brand.custom}
                </Link>
            );
        }
        return (
            <Link
                href={`/shop?category=${encodeURIComponent(brand.name)}`}
                className={`mx-12 text-3xl font-extrabold tracking-widest hover:opacity-80 transition-opacity cursor-pointer flex items-center ${brand.className || "text-slate-500"}`}
            >
                {brand.name}
            </Link>
        );
    };

    return (
        <div className="overflow-hidden w-full bg-white py-8 border-y border-gray-100 flex items-center">
            <div className="flex items-center w-max animate-marquee hover:[animation-play-state:paused]">
                {brands.map((brand, i) => (
                    <BrandItem key={i} brand={brand} />
                ))}
                {brands.map((brand, i) => (
                    <BrandItem key={`dup-${i}`} brand={brand} />
                ))}
            </div>
        </div>
    );
}
