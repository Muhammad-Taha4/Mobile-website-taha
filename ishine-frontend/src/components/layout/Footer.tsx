import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#2ea4d5] border-t border-[#2389b3] pt-16 pb-8 mt-12 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Column 1: Brand Info */}
                    <div className="col-span-1">
                        <div className="text-3xl font-extrabold text-white tracking-tight mb-1">
                            iShine Wireless<span className="text-white">.</span>
                        </div>
                        <p className="text-sm font-bold text-white/90 uppercase tracking-wider mb-4">
                            Purveyor of Electronic Fashion
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed mb-6">
                            iShine Wireless is your trusted source for high-quality mobile accessories and replacement parts, designed to keep your devices powered and protected.
                        </p>
                    </div>

                    {/* Column 2: Navigations */}
                    <div>
                        <h4 className="font-bold text-white mb-5 uppercase tracking-wide">Navigations</h4>
                        <ul className="space-y-3 text-white/80 text-sm">
                            <li><Link href="/" className="hover:text-white transition font-medium">Home</Link></li>
                            <li><Link href="/about" className="hover:text-white transition font-medium">About Us</Link></li>
                            <li><Link href="/shop" className="hover:text-white transition font-medium">Shop</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition font-medium">Contact</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-white transition font-medium">Privacy Policy</Link></li>
                            <li><Link href="/terms-conditions" className="hover:text-white transition font-medium">Terms and Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Categories */}
                    <div>
                        <h4 className="font-bold text-white mb-5 uppercase tracking-wide">Categories</h4>
                        <ul className="space-y-3 text-white/80 text-sm">
                            <li><Link href="/shop?category=lcd" className="hover:text-white transition font-medium">LCD's</Link></li>
                            <li><Link href="/shop?category=earbuds" className="hover:text-white transition font-medium">Earbuds</Link></li>
                            <li><Link href="/shop?category=cables" className="hover:text-white transition font-medium">Cables</Link></li>
                            <li><Link href="/shop?category=car-chargers" className="hover:text-white transition font-medium">Car Chargers</Link></li>
                            <li><Link href="/shop?category=camera-glass" className="hover:text-white transition font-medium">Camera Glass</Link></li>
                            <li><Link href="/shop?category=power-banks" className="hover:text-white transition font-medium">Power Banks</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Reach Us */}
                    <div>
                        <h4 className="font-bold text-white mb-5 uppercase tracking-wide">Reach Us</h4>
                        <ul className="space-y-4 text-white/80 text-sm font-medium">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-white shrink-0 text-xl">mail</span>
                                <a href="mailto:sales@ishinewireless.com" className="hover:text-white transition">
                                    sales@ishinewireless.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-white shrink-0 text-xl">thumb_up</span>
                                <a href="#" className="hover:text-white transition">
                                    iShine Wireless
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-white shrink-0 text-xl">call</span>
                                <a href="tel:469-260-2475" className="hover:text-white transition">
                                    (469) 260-2475
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-white shrink-0 text-xl">location_on</span>
                                <span className="leading-snug">
                                    11311 Harry Hines Blvd #503,<br /> Dallas, TX 75229
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-white shrink-0 text-xl">schedule</span>
                                <span>8:00 AM - 7:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-white/60">© 2026 iShine Wireless. All rights reserved.</p>
                    <div className="flex gap-2">
                        <div className="w-10 h-6 bg-white/10 border border-white/20 rounded text-[10px] flex items-center justify-center font-bold text-white">VISA</div>
                        <div className="w-10 h-6 bg-white/10 border border-white/20 rounded text-[10px] flex items-center justify-center font-bold text-white">MC</div>
                        <div className="w-10 h-6 bg-white/10 border border-white/20 rounded text-[10px] flex items-center justify-center font-bold text-white">AMEX</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
