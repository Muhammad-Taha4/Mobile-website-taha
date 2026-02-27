"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Hero() {
    const slides = [
        {
            image: "/images/banners/banner1.jpeg",
            alt: "Premium Wireless Accessories & Parts",
            title: "Next-Gen Mobile Solutions",
            subtitle: "Quality screens, batteries, and professional tools for repair experts."
        },
        {
            image: "/images/banners/banner2.jpeg",
            alt: "Wholesale Mobile Repair Components",
            title: "Wholesale Excellence",
            subtitle: "Global sourcing for the most reliable inventory in the industry."
        },
        {
            image: "/images/banners/bannner3.jpeg",
            alt: "Professional Repair Tools & Kits",
            title: "Tools for Pros",
            subtitle: "Precision engineering for the most delicate mobile repairs."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 mt-8 mb-6 sm:mb-10">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/50 bg-slate-100">
                <Swiper
                    modules={[Autoplay, Pagination, EffectFade]}
                    effect="fade"
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        // Custom bullet styling
                        bulletClass: 'swiper-pagination-bullet !bg-white/50 !h-1.5 !w-1.5 transition-all duration-300',
                        bulletActiveClass: '!bg-white !w-6 !rounded-full',
                    }}
                    loop={true}
                    className="h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px]"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-full group">
                                <img
                                    src={slide.image}
                                    alt={slide.alt}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/30 to-transparent" />

                                <div className="absolute inset-0 flex items-center px-8 md:px-16">
                                    <div className="max-w-xl space-y-4">
                                        <div className="inline-block px-3 py-1 bg-brand/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                                            New Arrival
                                        </div>
                                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                                            {slide.title}
                                        </h2>
                                        <p className="text-slate-200 text-sm md:text-lg font-medium max-w-md leading-relaxed">
                                            {slide.subtitle}
                                        </p>
                                        <div className="pt-4 flex gap-4">
                                            <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-brand hover:text-white transition-all duration-300 shadow-lg">
                                                Shop Now
                                            </button>
                                            <button className="px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-full hover:bg-white/20 transition-all duration-300">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

