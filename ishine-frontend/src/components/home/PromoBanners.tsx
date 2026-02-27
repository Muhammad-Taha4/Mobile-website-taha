import Link from 'next/link';

export default function PromoBanners() {
    const categoriesArray = [
        {
            title: "iPhone Displays",
            bg: "from-slate-100 to-slate-200 text-slate-900 border-slate-200",
            img: "/assets/B1255519-1-400x400.webp",
            href: "/shop?category=Apple"
        },
        {
            title: "Professional Tools",
            bg: "from-[#f0f4f8] to-[#e2e8f0] text-slate-800 border-slate-200",
            img: "/assets/6092C-Professional-Precision-70-in-1-Multifunction-Screwdriver-Set-in-lahore.webp",
            href: "/shop?category=Tools & Supplies"
        },
        {
            title: "Batteries",
            bg: "from-[#f8fafc] to-[#f1f5f9] text-slate-800 border-slate-200",
            img: "/assets/B1083502-1-400x400-1.webp",
            href: "/shop?category=Batteries"
        },
        {
            title: "Premium Accessories",
            bg: "from-[#fdfbfb] to-[#ebedee] text-slate-800 border-slate-100",
            img: "/assets/B1288001-1-400x400-1.webp",
            href: "/shop?category=Accessories"
        },
        {
            title: "Cables",
            bg: "from-blue-50 to-blue-100/50 text-blue-900 border-blue-100",
            img: "/assets/C2.webp",
            href: "/shop?category=Accessories"
        },
        {
            title: "Car Chargers",
            bg: "from-slate-50 to-slate-100 text-slate-800 border-slate-200",
            img: "/assets/B1288001-1-400x400-1.webp",
            href: "/shop?category=Accessories"
        },
        {
            title: "Power Banks",
            bg: "from-[#f4f7f9] to-[#ebf0f5] text-slate-800 border-slate-200",
            img: "/assets/B1083502-1-400x400-1.webp",
            href: "/shop?category=Accessories"
        },
        {
            title: "Wireless Earbuds",
            bg: "from-[#f8fafc] to-[#f1f5f9] text-slate-800 border-slate-200",
            img: "/assets/B1255519-1-400x400.webp",
            href: "/shop?category=Accessories"
        }
    ];

    return (
        <section className="w-full mx-auto py-16 overflow-hidden bg-white mt-12 border-y border-slate-100 shadow-sm">
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 mb-10">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Shop by Category</h2>
                        <p className="text-slate-500 mt-2 text-sm md:text-base font-medium">Premium components for professional repairs and retail.</p>
                    </div>
                    <div className="hidden md:flex gap-2 text-slate-300">
                        <span className="material-symbols-outlined text-3xl">swipe</span>
                    </div>
                </div>
            </div>

            <div className="w-full relative group">
                {/* Infinite Scroll Container */}
                <div className="flex overflow-hidden category-slider-container hover:[animation-play-state:paused] border-y border-slate-100 py-10 bg-slate-50/30">
                    <div className="flex gap-8 animate-scroll-left w-max pr-8">
                        {[...categoriesArray, ...categoriesArray].map((cat, i) => (
                            <Link
                                key={i}
                                href={cat.href}
                                className="bg-white rounded-[2rem] border-2 border-slate-200 hover:border-[#2ea4d5] hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 p-8 w-[280px] h-[340px] flex flex-col items-center justify-between cursor-pointer group shrink-0"
                            >
                                {/* Centered Image Viewport */}
                                <div className="flex-1 w-full flex items-center justify-center p-4">
                                    <img
                                        src={cat.img}
                                        alt={`iShine ${cat.title}`}
                                        className="max-h-40 max-w-[180px] object-contain mix-blend-multiply opacity-90 transition-all duration-500 ease-out group-hover:scale-115 drop-shadow-sm"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Clean Bottom Meta */}
                                <div className="w-full text-center mt-6">
                                    <h3 className="text-xl font-bold mb-2 tracking-tight text-slate-800">{cat.title}</h3>
                                    <span className="text-xs font-black uppercase tracking-widest text-[#2ea4d5] flex items-center justify-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                                        SHOP NOW
                                        <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1 font-bold">
                                            arrow_forward
                                        </span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
