'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
    const pathname = usePathname();

    const navGroups = [
        {
            title: 'Core Operations',
            items: [
                { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
                { name: 'Inventory Engine', href: '/admin/products', icon: 'inventory_2' },
                { name: 'Taxonomy & Brands', href: '/admin/taxonomy', icon: 'category' },
                { name: 'Order Fulfillment', href: '/admin/orders', icon: 'local_shipping' },
            ]
        },
        {
            title: 'Storefront CMS',
            items: [
                { name: 'Hero Banners', href: '/admin/content/banners', icon: 'view_carousel' },
                { name: 'Featured Products', href: '/admin/cms/featured', icon: 'star' },
                { name: 'Pages (CMS)', href: '/admin/cms', icon: 'description' },
            ]
        },
        {
            title: 'Settings',
            items: [
                { name: 'General Settings', href: '/admin/settings/general', icon: 'settings' },
                { name: 'User Management', href: '/admin/users', icon: 'group' },
                { name: 'Payments & Finance', href: '/admin/finance', icon: 'payments' },
            ]
        }
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shadow-sm flex-shrink-0 z-20 h-full">
            {/* Header */}
            <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0 shadow-sm">
                <span className="text-xl font-extrabold text-[#2ea4d5] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[24px]">manage_accounts</span>
                    ERP Master
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                {navGroups.map((group) => (
                    <div key={group.title}>
                        <h3 className="px-4 text-[10px] uppercase font-black text-slate-400 mb-3 tracking-wider">
                            {group.title}
                        </h3>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-semibold text-sm ${isActive
                                            ? 'bg-[#2ea4d5] text-white shadow-md shadow-[#2ea4d5]/20'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-[#2ea4d5]'
                                            }`}
                                    >
                                        <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                            {item.icon}
                                        </span>
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-[#2ea4d5] transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">storefront</span>
                    Exit to Store
                </Link>
            </div>
        </aside>
    );
}
