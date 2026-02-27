"use client";
import Link from 'next/link';
import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { generatedProducts } from '@/lib/mockData';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/context/AuthContext';
import { useDebounce } from '@/hooks/useDebounce';

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { name: 'Home', href: '/', hasDropdown: false },
        { name: 'Apple', href: '/shop?category=Apple', hasDropdown: true },
        { name: 'Samsung', href: '/shop?category=Samsung', hasDropdown: true },
        { name: 'Motorola', href: '/shop?category=Motorola', hasDropdown: true },
        { name: 'Other Brands', href: '/shop?category=Other+Brands', hasDropdown: true, badge: 'NEW' },
        { name: 'WEGA CELL', href: '/shop?category=WEGA+CELL', hasDropdown: true },
        { name: 'NCC', href: '/shop?category=NCC', hasDropdown: false },
        { name: 'Speakers', href: '/shop?category=Speakers', hasDropdown: false },
        { name: 'Tools', href: '/shop?category=Tools', hasDropdown: false, badge: 'NEW' },
        { name: 'Game Accessories', href: '/shop?category=Game+Accessories', hasDropdown: true, badge: 'NEW' }
    ];

    // Context / Zustand State
    const cartItems = useCartStore((state) => state.items);
    const { user: authUser, logout } = useAuth();

    // Calculate cart totals safely after mount
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

    // Close search dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchActive(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

    // Filter real products from our 100-item dataset
    const filteredResults = useMemo(() => {
        if (!debouncedSearchQuery) return [];
        return generatedProducts
            .filter(item => item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
            .slice(0, 6)
            .map(p => ({
                name: p.title,
                price: p.price,
                img: p.imageSrc
            }));
    }, [debouncedSearchQuery]);

    const appleMegaMenu = (
        <div className="flex w-full h-full min-h-[440px] animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Left Sidebar */}
            <div className="w-1/5 bg-slate-50 border-r border-slate-100 p-8 flex flex-col gap-3">
                <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Apple Ecosystem</h3>
                {[
                    'Genuine Apple Parts', 'iPhone', 'iPad', 'Watch', 'iPod',
                    'AirPods', 'iMac', 'MacBook Pro', 'Mac Mini', 'Mac Studio'
                ].map(item => (
                    <Link
                        key={item}
                        href={`/shop?category=${item}`}
                        className="text-[14px] font-bold text-slate-700 hover:text-brand transition-all flex items-center justify-between group/link"
                    >
                        {item}
                        <span className="material-symbols-outlined text-[16px] opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all font-bold">chevron_right</span>
                    </Link>
                ))}
            </div>

            {/* Right Content Grid */}
            <div className="flex-1 p-10 grid grid-cols-4 lg:grid-cols-5 gap-10 bg-white">
                {/* iPhone Column */}
                <div className="space-y-6">
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] border-b border-slate-100 pb-3">iPhone</h4>
                    <div className="flex flex-col gap-4">
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand flex items-center gap-2">
                            iPhone 17 Pro Max
                            <span className="bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-sm font-black uppercase tracking-tighter">NEW</span>
                        </Link>
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">iPhone 17 Pro</Link>
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">iPhone 16 Pro Max</Link>
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">iPhone 16</Link>
                        <Link href="/shop" className="text-[13px] font-black text-brand hover:underline mt-2 flex items-center gap-1">
                            View all models
                            <span className="material-symbols-outlined text-[14px] font-bold">arrow_forward</span>
                        </Link>
                    </div>
                </div>

                {/* iPad Column */}
                <div className="space-y-6">
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] border-b border-slate-100 pb-3">iPad</h4>
                    <div className="flex flex-col gap-4">
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">iPad Pro 13"</Link>
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">iPad Pro 11"</Link>
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">iPad Air 13"</Link>
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">iPad mini</Link>
                        <Link href="/shop" className="text-[13px] font-black text-brand hover:underline mt-2 flex items-center gap-1">
                            View all models
                            <span className="material-symbols-outlined text-[14px] font-bold">arrow_forward</span>
                        </Link>
                    </div>
                </div>

                {/* Watch Column */}
                <div className="space-y-6">
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] border-b border-slate-100 pb-3">Watch</h4>
                    <div className="flex flex-col gap-4">
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">Series SE</Link>
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">Series Ultra</Link>
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">Series 10</Link>
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">Series 9</Link>
                    </div>
                </div>

                {/* Accessories Column */}
                <div className="space-y-6">
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] border-b border-slate-100 pb-3">Essentials</h4>
                    <div className="flex flex-col gap-4">
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">AirPods Pro 2</Link>
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">MagSafe Cases</Link>
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">Replacement Batteries</Link>
                        <Link href="/shop" className="text-[14px] font-bold text-slate-600 hover:text-brand transition-colors">OLED Assemblies</Link>
                    </div>
                </div>
            </div>
        </div>
    );

    const allCategoriesMenu = (
        <div className="p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
            {[
                { name: 'Cables', icon: 'cable', color: 'bg-blue-50 text-blue-600' },
                { name: 'Car Chargers', icon: 'directions_car', color: 'bg-orange-50 text-orange-600' },
                { name: 'Power Banks', icon: 'battery_charging_full', color: 'bg-green-50 text-green-600' },
                { name: 'Wireless Earbuds', icon: 'headphones', color: 'bg-purple-50 text-purple-600' }
            ].map(cat => (
                <Link
                    key={cat.name}
                    href={`/shop?category=${cat.name}`}
                    className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-brand hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center gap-4"
                >
                    <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                        <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
                    </div>
                    <span className="font-bold text-slate-800 group-hover:text-brand transition-colors uppercase tracking-widest text-xs">{cat.name}</span>
                </Link>
            ))}
        </div>
    );

    return (
        <header className="w-full bg-white relative z-50 shadow-sm">
            {/* Top Bar */}
            <div className="bg-gray-50 border-b border-gray-200 text-sm py-2 hidden md:block">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <p className="text-gray-500">Welcome to iShine Wireless - Premium Repair Parts</p>
                    <div className="flex gap-4 text-gray-500">
                        <Link href="/contact" className="hover:text-brand transition">Store Locator</Link>
                        <Link href="/account" className="hover:text-brand transition">Track Order</Link>
                        <span className="hover:text-brand transition cursor-pointer">English | USD</span>
                    </div>
                </div>
            </div>

            {/* Main Header / Search */}
            <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between gap-4 md:gap-8">

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="md:hidden text-gray-800 hover:text-brand transition"
                >
                    <span className="material-symbols-outlined text-[28px]">menu</span>
                </button>

                <Link href="/" className="text-2xl md:text-3xl font-bold text-brand tracking-tight shrink-0">
                    iShine Wireless<span className="text-gray-800">.</span>
                </Link>

                {/* Desktop/Tablet Search */}
                <div className="hidden md:flex flex-grow w-full max-w-2xl relative" ref={searchRef}>
                    <input
                        type="text"
                        placeholder="Search for screens, batteries, tools..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setIsSearchActive(true);
                        }}
                        onFocus={() => setIsSearchActive(true)}
                        className="w-full border border-gray-300 rounded-full py-3 px-6 pr-12 text-gray-800 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
                    />
                    <button className="absolute right-4 top-3 text-gray-400 hover:text-brand transition">
                        <span className="material-symbols-outlined text-[24px]">search</span>
                    </button>

                    {/* Quick Results Dropdown */}
                    {isSearchActive && searchQuery.length > 0 && (
                        <div className="absolute top-14 left-0 w-full bg-white shadow-xl rounded-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                            {filteredResults.length > 0 ? (
                                <div className="max-h-[300px] overflow-y-auto">
                                    <h4 className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">Top Matches</h4>
                                    {filteredResults.map((res, i) => (
                                        <Link href="/shop" key={i} onClick={() => setIsSearchActive(false)} className="flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors border-b border-slate-50 group">
                                            <div className="w-10 h-10 bg-slate-100 rounded-md p-1 shrink-0 group-hover:bg-white transition-colors">
                                                <img src={res.img} alt={res.name} className="w-full h-full object-contain mix-blend-multiply" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-slate-800 group-hover:text-brand transition-colors line-clamp-1">{res.name}</p>
                                                <p className="text-xs text-brand font-semibold">{res.price}</p>
                                            </div>
                                        </Link>
                                    ))}
                                    <Link href="/shop" className="block w-full text-center py-3 text-sm font-bold text-brand hover:bg-brand hover:text-white transition-colors">
                                        View all results for "{searchQuery}"
                                    </Link>
                                </div>
                            ) : (
                                <div className="p-6 text-center text-slate-500 text-sm">
                                    No products found for "{searchQuery}".
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Action Icons */}
                <div className="flex items-center gap-4 md:gap-6 shrink-0 text-gray-800">
                    {mounted && authUser && (authUser.role === 'ADMIN' || authUser.role === 'admin') && (
                        <Link
                            href="/admin"
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-brand transition-all border border-slate-800 shadow-md group"
                        >
                            <span className="material-symbols-outlined text-[20px] group-hover:rotate-45 transition-transform duration-500">settings</span>
                            <span className="text-xs font-black uppercase tracking-widest">ERP Master</span>
                        </Link>
                    )}

                    {mounted && authUser ? (
                        <div className="flex items-center gap-4">
                            <Link href="/account" className="hidden md:flex items-center gap-2 cursor-pointer hover:text-brand transition">
                                <span className="material-symbols-outlined text-[28px]">person</span>
                                <div className="text-sm leading-tight">
                                    <span className="text-gray-400 text-xs block truncate w-16">{authUser.firstName}</span>Account
                                </div>
                            </Link>
                            <button
                                onClick={() => logout()}
                                className="hidden md:flex items-center gap-2 text-red-500 hover:text-red-700 transition"
                            >
                                <span className="material-symbols-outlined text-[24px]">logout</span>
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="hidden md:flex items-center gap-2 cursor-pointer hover:text-brand transition">
                            <span className="material-symbols-outlined text-[28px]">person</span>
                            <div className="text-sm leading-tight">
                                <span className="text-gray-400 text-xs block">Account</span>Sign In
                            </div>
                        </Link>
                    )}
                    <Link href="/cart" className="flex items-center gap-1 md:gap-2 cursor-pointer hover:text-brand transition">
                        <div className="relative">
                            <span className="material-symbols-outlined text-[28px]">shopping_cart</span>
                            {mounted && cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>
                            )}
                        </div>
                        <div className="text-sm leading-tight hidden md:block">
                            <span className="text-gray-400 text-xs block">Total</span>
                            {mounted ? `$${cartTotal}` : "$0.00"}
                        </div>
                    </Link>
                </div>
            </div>

            {/* Mobile Search Bar (Visible only on mobile) */}
            <div className="md:hidden px-4 pb-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded-full py-2.5 px-5 pr-10 text-sm text-gray-800 focus:outline-none focus:border-brand"
                    />
                    <button className="absolute right-3 top-2 text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </button>
                </div>
            </div>

            {/* Categories / Navigation Menu (Desktop Only) */}
            <div className="bg-white border-y border-gray-200 hidden md:block relative">
                <div className="container mx-auto px-4 h-14 flex items-center">
                    {/* All Categories Button */}
                    <div
                        className="h-full border-r border-gray-100 relative group"
                        onMouseEnter={() => setActiveMegaMenu('all-categories')}
                        onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                        <button className="h-full bg-slate-900 text-white px-6 flex items-center gap-3 font-black text-[13px] tracking-[0.1em] hover:bg-brand transition-all mr-6">
                            <span className="material-symbols-outlined text-[20px]">menu</span>
                            ALL CATEGORIES
                        </button>
                        {activeMegaMenu === 'all-categories' && allCategoriesMenu}
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 flex flex-row items-center whitespace-nowrap overflow-x-auto no-scrollbar gap-6 h-full">
                        {navItems.map((item, index) => (
                            <div
                                key={index}
                                className="relative flex items-center h-full group"
                                onMouseEnter={() => item.hasDropdown && setActiveMegaMenu(item.name)}
                                onMouseLeave={() => setActiveMegaMenu(null)}
                            >
                                <Link href={item.href} className="relative flex items-center gap-1 text-[15px] font-bold text-gray-800 hover:text-[#2ea4d5] transition-colors py-2">
                                    {item.name}
                                    {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-0.5" strokeWidth={2.5} />}
                                    {item.badge && (
                                        <span className="bg-red-500 text-white text-[10px] px-1 absolute -top-3 -right-3 rounded">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Full-Width Mega Menu Panel */}
                <div
                    className={`absolute top-full left-0 w-full bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] border-t border-slate-200 z-[60] transition-all duration-300 transform ${activeMegaMenu && activeMegaMenu !== 'all-categories' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible pointer-events-none'
                        }`}
                    onMouseEnter={() => activeMegaMenu && activeMegaMenu !== 'all-categories' && setActiveMegaMenu(activeMegaMenu)}
                    onMouseLeave={() => setActiveMegaMenu(null)}
                >
                    <div className="container mx-auto">
                        {activeMegaMenu === 'Apple' && appleMegaMenu}
                        {activeMegaMenu === 'Samsung' && samsungMegaMenu}
                        {activeMegaMenu === 'Motorola' && motorolaMegaMenu}
                        {activeMegaMenu === 'Other Brands' && otherBrandsMegaMenu}
                        {activeMegaMenu === 'WEGA CELL' && samsungMegaMenu} {/* Using Samsung as placeholder for WEGA CELL */}
                        {activeMegaMenu === 'Tools' && toolsMegaMenu}
                        {activeMegaMenu === 'Game Accessories' && gameMegaMenu}
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] md:hidden animate-in fade-in"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Side Drawer */}
            <div className={`fixed inset-y-0 left-0 w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 border-b border-gray-100 flex items-center justify-between shadow-sm">
                    <span className="text-xl font-bold text-brand">Menu</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-brand bg-gray-50 rounded-full p-1">
                        <span className="material-symbols-outlined text-[24px]">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <nav className="p-4 flex flex-col gap-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 mt-2">Menu</p>
                        {navItems.map(item => (
                            <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-sm font-semibold text-gray-800 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                                <span className="flex items-center gap-2 relative mt-1">
                                    {item.name}
                                    {item.badge && <span className="bg-red-500 text-white text-[10px] px-1 absolute -top-3 -right-6 rounded">{item.badge}</span>}
                                </span>
                                {item.hasDropdown ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <span className="material-symbols-outlined text-[18px] text-gray-400">chevron_right</span>}
                            </Link>
                        ))}

                        <div className="my-4 border-t border-gray-100"></div>

                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">My Account</p>
                        {mounted && authUser ? (
                            <>
                                {(authUser.role === 'ADMIN' || authUser.role === 'admin') && (
                                    <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-bold text-[#2ea4d5] p-3 rounded-lg bg-blue-50 border border-blue-100 mb-2">
                                        <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                                        ERP Master Panel
                                    </Link>
                                )}
                                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-semibold text-gray-800 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <span className="material-symbols-outlined text-[20px] text-brand">dashboard</span>
                                    Dashboard
                                </Link>
                                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 text-sm font-semibold text-gray-800 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <span className="material-symbols-outlined text-[20px] text-brand">logout</span>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-semibold text-gray-800 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="material-symbols-outlined text-[20px] text-brand">login</span>
                                Sign In
                            </Link>
                        )}
                        <Link href="/account/orders/123" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-semibold text-gray-800 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="material-symbols-outlined text-[20px] text-brand">local_shipping</span>
                            Track Order
                        </Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-semibold text-gray-800 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="material-symbols-outlined text-[20px] text-brand">support_agent</span>
                            Support
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
