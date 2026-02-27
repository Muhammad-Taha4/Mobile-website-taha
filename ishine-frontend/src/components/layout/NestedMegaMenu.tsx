"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// Detailed 3-Level Architecture
const categoryData: Record<string, Record<string, { name: string, badge?: string }[]>> = {
    "Apple": {
        "iPhone": [
            { name: "iPhone 17 Pro Max", badge: "New" },
            { name: "iPhone 17 Pro", badge: "New" },
            { name: "iPhone 17", badge: "New" },
            { name: "iPhone 16E", badge: "New" },
            { name: "iPhone 16 Pro Max" },
            { name: "iPhone 16 Pro" },
            { name: "iPhone 16 Plus" },
            { name: "iPhone 16" },
            { name: "iPhone 15 Pro Max" },
            { name: "iPhone 15 Pro" },
            { name: "iPhone 15" },
            { name: "iPhone 14 Pro Max" },
            { name: "iPhone 14 Pro" },
            { name: "iPhone 14" },
            { name: "iPhone 13 Pro Max" },
            { name: "iPhone 13 Pro" },
            { name: "iPhone 13" },
            { name: "iPhone 12 Mini" }
        ],
        "iPad": [
            { name: "iPad Pro", badge: "New" },
            { name: "iPad Air 4" },
            { name: "iPad Air 5" },
            { name: "iPad (10th Gen)" },
            { name: "iPad 6/7/8/9" },
            { name: "iPad 5/6" }
        ],
        "MacBook & iMac": [
            { name: "MacBook Pro", badge: "New" },
            { name: "MacBook Air" },
            { name: "iMac" },
            { name: "Mac mini" }
        ],
        "Apple Watch": [
            { name: "Apple Watch Ultra" },
            { name: "Apple Watch Series 9" },
            { name: "Apple Watch SE" }
        ]
    },
    "Samsung": {
        "Galaxy S Series": [
            { name: "Galaxy S25 Ultra 5G", badge: "New" },
            { name: "Galaxy S25 Ultra", badge: "New" },
            { name: "Galaxy S25", badge: "New" },
            { name: "Galaxy S24 Ultra" },
            { name: "Galaxy S24" },
            { name: "Galaxy S23 Ultra" },
            { name: "Galaxy S23 FE" },
            { name: "Galaxy S22 Ultra" }
        ],
        "Galaxy Z Series": [
            { name: "Galaxy Z Fold 5", badge: "New" },
            { name: "Galaxy Z Flip 5", badge: "New" },
            { name: "Galaxy Z Fold 4" },
            { name: "Galaxy Z Flip 4" }
        ],
        "Galaxy Note Series": [
            { name: "Galaxy Note 20 Ultra" },
            { name: "Galaxy Note 20" },
            { name: "Galaxy Note 10+" }
        ],
        "Galaxy A Series": [
            { name: "Samsung A54 5G" },
            { name: "Samsung A53 5G" },
            { name: "Samsung A51 4G" },
            { name: "Samsung A35" },
            { name: "Samsung A34 5G" },
            { name: "Samsung A23 5G" },
            { name: "Samsung A17 5G" },
            { name: "Samsung A14 5G" }
        ],
        "Tablets": [
            { name: "Samsung Tab A9 Plus" }
        ]
    },
    "Motorola": {
        "Moto G Series": [
            { name: "Moto G Stylus 5G 2025", badge: "New" },
            { name: "Moto G Stylus 5G 2022" },
            { name: "Moto G Power 2024" },
            { name: "Moto G Power 2022" },
            { name: "Moto G Power 2021" },
            { name: "Moto G Play 2026", badge: "New" },
            { name: "Moto G Play 2023" },
            { name: "Moto G Play 2021" },
            { name: "MOTO G 5G 2023" }
        ],
        "Motorola Edge": [
            { name: "Motorola Edge+" },
            { name: "Motorola Edge" },
            { name: "Motorola Edge 30 Ultra" }
        ],
        "Motorola Razr": [
            { name: "Motorola Razr+", badge: "New" },
            { name: "Motorola Razr" }
        ]
    },
    "Google": {
        "Pixel Phones": [
            { name: "Pixel 10", badge: "New" },
            { name: "Pixel 9 Pro", badge: "New" },
            { name: "Pixel 8 Pro" },
            { name: "Pixel 8" },
            { name: "Pixel 8A" },
            { name: "Pixel 7 Pro" },
            { name: "Pixel 7" },
            { name: "Pixel 7A" },
            { name: "Pixel 6 Pro" },
            { name: "Pixel 6" },
            { name: "Pixel 6A" },
            { name: "Pixel Fold" }
        ],
        "Pixel Tablets": [
            { name: "Pixel Tablet" }
        ]
    },
    "OnePlus": {
        "OnePlus Phones": [
            { name: "OnePlus 12", badge: "New" },
            { name: "OnePlus 11 5G" },
            { name: "OnePlus Open" },
            { name: "OnePlus 5G N10" },
            { name: "OnePlus N300" },
            { name: "OnePlus N30 5G" },
            { name: "OnePlus Nord N30" }
        ]
    },
    "Game Consoles": {
        "PlayStation": [
            { name: "PlayStation 5" },
            { name: "PlayStation 4 Pro" },
            { name: "DualSense Controllers" }
        ],
        "Xbox": [
            { name: "Xbox Series X", badge: "New" },
            { name: "Xbox Series S" },
            { name: "Xbox One X" },
            { name: "Xbox One S" }
        ],
        "Nintendo": [
            { name: "Nintendo Switch 2", badge: "New" },
            { name: "Nintendo Switch OLED" },
            { name: "Nintendo Switch" }
        ]
    },
    "Tools & Supplies": {
        "Repair Tools": [
            { name: "iFixit Pro Tech Toolkit" },
            { name: "Precision Screwdrivers" },
            { name: "Spudgers" }
        ],
        "Charging Parts": [
            { name: "Revvl 7" },
            { name: "TCL Stylus 5G" },
            { name: "TCL 50 XE 5G" },
            { name: "TCL 50 XL 5G" }
        ],
        "Consumables": [
            { name: "Adhesive" },
            { name: "Charging Port Connector" }
        ]
    },
    "Other Parts": {},
    "Accessories": {},
    "Refurbishing": {},
    "Board Components": {},
    "Pre-Owned Devices": {}
};

export default function NestedMegaMenu() {
    const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
    const intentTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (brand: string) => {
        if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
        
        // 500ms delay to ensure intent before aggressive opening
        intentTimeoutRef.current = setTimeout(() => {
            setHoveredBrand(brand);
        }, 500); 
    };

    const handleClick = (brand: string) => {
        // If clicked, instantly open without intent delay
        if (intentTimeoutRef.current) clearTimeout(intentTimeoutRef.current);
        if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
        
        // If they click on the currently open brand, route them to it or clear it.
        // Usually clicking top level link should go to that brand's /shop page, but we'll show menu or act.
        // Actually, since the Link wraps the text, we just ensure menu opens for a better mobile-like or quick feel.
        setHoveredBrand(brand);
    };

    const handleMouseLeave = () => {
        if (intentTimeoutRef.current) clearTimeout(intentTimeoutRef.current);
        
        leaveTimeoutRef.current = setTimeout(() => {
            setHoveredBrand(null);
        }, 200); // slight delay to allow smooth tracking between nav and menu
    };

    const mainBrands = Object.keys(categoryData);

    const formatSlug = (str: string) => {
        return encodeURIComponent(str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    };

    return (
        <div className="flex flex-row items-center w-full h-full" onMouseLeave={handleMouseLeave}>
            
            {/* Horizontal Brand Links */}
            <nav className="flex flex-1 flex-row items-center justify-start gap-x-6 lg:gap-x-8 text-[13px] font-bold text-slate-700 h-full relative z-40">
                {mainBrands.map(brand => (
                    <div
                        key={brand}
                        onMouseEnter={() => handleMouseEnter(brand)}
                        onClick={() => handleClick(brand)}
                        className={`cursor-pointer h-full flex items-center transition-colors border-b-2 border-transparent uppercase tracking-wider ${hoveredBrand === brand ? '!border-brand !text-brand' : 'hover:text-brand'}`}
                    >
                        <Link href={`/shop?category=${encodeURIComponent(brand)}`} onClick={(e) => {
                            // If they click the Link we want it to browse to /shop?category=brand normally
                        }}>{brand}</Link>
                    </div>
                ))}
            </nav>

            {/* Absolutely Positioned Mega Menu Panel */}
            {hoveredBrand && categoryData[hoveredBrand] && (
                <div 
                    className="absolute top-full left-0 w-full min-h-[350px] bg-white border-t border-slate-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] z-[100] animate-in slide-in-from-top-2 fade-in duration-200"
                    onMouseEnter={() => handleMouseEnter(hoveredBrand)}
                >
                    <div className="container mx-auto px-4 py-8 flex">
                        
                        {/* 1. Left Sidebar Overview (300px width) */}
                        <div className="w-[300px] shrink-0 border-r border-slate-100 pr-8 flex flex-col justify-between">
                            <div>
                                <h3 className="text-[28px] font-black text-slate-800 mb-2 leading-tight uppercase tracking-tight">{hoveredBrand} <br/><span className="text-brand">Parts</span></h3>
                                <p className="text-slate-500 text-sm mb-6 leading-relaxed">Shop the highest quality replacement parts and components for {hoveredBrand}. All items are rigorously tested and guaranteed to work flawlessly.</p>
                            </div>
                            <Link href={`/shop?category=${encodeURIComponent(hoveredBrand)}`} onClick={() => setHoveredBrand(null)} className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-brand px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all shadow-md w-full">
                                Shop All {hoveredBrand}
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </Link>
                        </div>

                        {/* 2. Right Content Grid */}
                        <div className="flex-1 pl-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {/* Check if it has models */}
                                {Object.keys(categoryData[hoveredBrand] || {}).length > 0 ? (
                                    Object.entries(categoryData[hoveredBrand]).map(([subCatLabel, models]) => (
                                        <div key={subCatLabel} className="flex flex-col">
                                            <h4 className="text-sm font-black text-slate-800 mb-4 pb-2 border-b border-slate-100 uppercase tracking-widest">{subCatLabel}</h4>
                                            <ul className="flex flex-col gap-2.5">
                                                {models.map(model => (
                                                    <li key={model.name}>
                                                        <Link 
                                                            href={`/category/${formatSlug(hoveredBrand)}/${formatSlug(model.name)}`}
                                                            onClick={() => setHoveredBrand(null)}
                                                            className="group flex items-center text-[13px] font-semibold text-slate-600 hover:text-brand transition-colors"
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 mr-2 group-hover:bg-brand transition-colors"></span>
                                                            {model.name}
                                                            {model.badge && (
                                                                <span className="ml-2 text-[9px] font-black bg-red-50 text-red-600 px-1.5 py-0.5 rounded shadow-sm uppercase tracking-widest">
                                                                    {model.badge}
                                                                </span>
                                                            )}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full flex flex-col items-center justify-center h-full min-h-[200px] text-slate-400">
                                        <span className="material-symbols-outlined text-[48px] mb-2 opacity-20">inventory_2</span>
                                        <p className="text-sm font-medium">Explore all {hoveredBrand} products by clicking the button to the left.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Full Screen Dimmer Backdrop */}
            {hoveredBrand && (
                <div className="fixed inset-0 top-[125px] bg-black/40 backdrop-blur-[2px] z-30 pointer-events-none animate-in fade-in duration-300"></div>
            )}

        </div>
    );
}
