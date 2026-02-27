import React from 'react';
import Link from 'next/link';

export default function DarkPromoBanner() {
    return (
        <section className="w-full bg-[#121212] lg:h-[450px] my-16 overflow-hidden relative">
            <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-2 px-6 sm:px-12 items-center">

                {/* Left Text */}
                <div className="py-16 lg:py-0 z-10 flex flex-col justify-center items-start">
                    <span className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">
                        iPhone 15 Pro
                    </span>
                    <h2 className="text-white text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
                        Pro. Beyond.
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl font-medium max-w-md mb-8">
                        The most powerful display components and internal parts engineered for perfection.
                    </p>
                    <Link href="/shop?category=LCD Screens">
                        <button className="bg-[#2ea4d5] hover:bg-[#2389b3] text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg shadow-[#2ea4d5]/40 hover:scale-105 active:scale-95">
                            Shop Now
                        </button>
                    </Link>
                </div>

                {/* Right Image */}
                <div className="relative h-[300px] lg:h-full w-full flex justify-end items-end lg:items-center">
                    {/* Glowing effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                    <img
                        src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop"
                        alt="iPhone 15 Pro Display"
                        className="w-[80%] max-h-full object-contain drop-shadow-2xl relative z-10 lg:-mr-12"
                    />
                </div>
            </div>
        </section>
    );
}
