'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6 pb-20">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Storefront CMS</h1>
                <p className="text-slate-500 mt-1">Configure layout, banners, and global site behavior.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 font-bold text-slate-800 bg-slate-50/50">Homepage Sections</div>
                    <div className="p-6 space-y-4">
                        <Link href="/admin/content/banners"><CMSItem title="Hero Banners" description="Edit the main scrolling billboard." icon="view_carousel" /></Link>
                        <Link href="/admin/cms/featured"><CMSItem title="Featured Products" description="Select which items appear on the home grid." icon="star" /></Link>
                        <CMSItem title="Announcement Bar" description="Set global sitewide alerts (coming soon)." icon="campaign" />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 font-bold text-slate-800 bg-slate-50/50">Legal & Policy Pages</div>
                    <div className="p-6 space-y-4">
                        <Link href="/admin/pages/privacy-policy"><CMSItem title="Privacy Policy" description="Manage user privacy and data collection terms." icon="gavel" /></Link>
                        <Link href="/admin/pages/terms-of-service"><CMSItem title="Terms of Service" description="Mandatory B2B agreement text." icon="contract" /></Link>
                        <Link href="/admin/pages/shipping-policy"><CMSItem title="Shipping Policy" description="Configure shipping policies and lead times." icon="local_shipping" /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CMSItem({ title, description, icon }: any) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-[#0B4182]/20 hover:bg-slate-50 transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center group-hover:bg-[#0B4182] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
                    <p className="text-xs text-slate-500">{description}</p>
                </div>
            </div>
            <span className="material-symbols-outlined text-slate-300 group-hover:text-[#0B4182] transition-colors">chevron_right</span>
        </div>
    );
}
