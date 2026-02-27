import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <main className="bg-slate-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4">

                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <p className="text-[#0B4182] font-bold tracking-widest uppercase text-sm mb-4 flex items-center justify-center gap-2">
                        <span className="w-8 h-px bg-[#0B4182]"></span>
                        Purveyor of Electronic Fashion
                        <span className="w-8 h-px bg-[#0B4182]"></span>
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Empowering the Mobile Repair Industry
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Based in Dallas, TX, iShine Wireless is the premier B2B wholesale partner for repair shops, technicians, and retailers nationwide. We specialize in providing top-tier replacement parts, high-grade LCDs, and professional repair tools.
                    </p>
                </div>

                {/* Our Mission (Split Layout) */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-20">
                    <div className="flex flex-col lg:flex-row">
                        {/* Text Block */}
                        <div className="w-full lg:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission & Commitment</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                We understand that the foundation of a successful repair business lies in the reliability of its parts. Our mission is to eliminate the guesswork for repair technicians by offering rigorously tested, OEM-grade components.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                From advanced OLED screens to high-capacity batteries and precision tools, every item shipped from our Dallas facility undergoes strict multi-point quality control. We don't just supply parts; we supply peace of mind.
                            </p>
                            <div className="flex items-center gap-4">
                                <Link href="/shop" className="bg-[#0B4182] hover:bg-[#082f5e] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm inline-block">
                                    Browse Catalog
                                </Link>
                                <Link href="/contact" className="text-slate-600 font-bold hover:text-[#0B4182] transition-colors inline-block px-4">
                                    Contact Sales
                                </Link>
                            </div>
                        </div>
                        {/* Image Block */}
                        <div className="w-full lg:w-1/2 bg-slate-100 min-h-[400px] relative">
                            {/* Realistic Repair Shop/Parts image */}
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#0B4182]/20 to-transparent mix-blend-multiply"></div>
                        </div>
                    </div>
                </div>

                {/* The iShine Advantage (4-Column Grid) */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">The iShine Advantage</h2>
                        <p className="text-slate-500 mt-2">Why hundreds of shops trust us as their primary supplier.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#0B4182]/30 transition-all group">
                            <div className="w-14 h-14 bg-blue-50 text-[#0B4182] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0B4182] group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">verified</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Strict QC</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                We implement multi-point testing on every LCD, battery, and critical part to ensure defect-free installations.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#0B4182]/30 transition-all group">
                            <div className="w-14 h-14 bg-blue-50 text-[#0B4182] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0B4182] group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">local_shipping</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Fast Dispatch</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Benefit from lightning-fast shipping directly from our local Dallas warehouse to keep your repair queues moving.
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#0B4182]/30 transition-all group">
                            <div className="w-14 h-14 bg-blue-50 text-[#0B4182] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0B4182] group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">savings</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Bulk Savings</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Unlock powerful tiered wholesale pricing designed specifically to scale with your business volume and maximize margins.
                            </p>
                        </div>
                        {/* Card 4 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#0B4182]/30 transition-all group">
                            <div className="w-14 h-14 bg-blue-50 text-[#0B4182] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0B4182] group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">support_agent</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Dedicated Support</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Work directly with real B2B account managers who understand the daily demands and technical needs of repair shops.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Location Call to Action */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden flex flex-col items-center border border-slate-700">
                    <span className="material-symbols-outlined text-5xl mb-6 text-[#0B4182]">location_city</span>
                    <h2 className="text-3xl font-bold mb-4">Visit Our Headquarters</h2>
                    <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
                        We are proudly headquartered in Texas. Local partners are welcome to arrange pick-ups and consultations.
                    </p>
                    <div className="bg-black/20 px-8 py-4 rounded-full border border-white/10 flex flex-col md:flex-row items-center gap-2 md:gap-4 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-white/70">location_on</span>
                        <span className="font-medium tracking-wide">11311 Harry Hines Blvd #503, Dallas, TX 75229</span>
                    </div>
                </div>

            </div>
        </main>
    );
}
