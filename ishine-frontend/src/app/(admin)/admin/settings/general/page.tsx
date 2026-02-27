'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';
import { Save, Globe, Mail, Phone, MapPin, Share2, Type } from 'lucide-react';

export default function GeneralSettings() {
    const token = useAuthStore(state => state.token);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<any>({
        siteName: 'iShine Wireless',
        siteLogo: '',
        favicon: '',
        tagline: '',
        contactEmail: '',
        contactPhone: '',
        businessAddress: '',
        facebookUrl: '',
        instagramUrl: '',
        twitterUrl: '',
        linkedinUrl: '',
        copyrightText: ''
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/settings', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                if (Object.keys(data).length > 0) {
                    setSettings((prev: any) => ({ ...prev, ...data }));
                }
            }
        } catch (error) {
            console.error('Fetch settings error:', error);
            toast.error('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            // Save each key-value pair
            const promises = Object.entries(settings).map(([key, value]) =>
                fetch('http://localhost:5000/api/admin/settings', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ key, value })
                })
            );

            await Promise.all(promises);
            toast.success('Settings updated successfully');
        } catch (error) {
            console.error('Save settings error:', error);
            toast.error('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings((prev: any) => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return <div className="p-8 text-center">Loading settings...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">General Settings</h1>
                    <p className="text-slate-500 text-sm">Manage your website's core identification and contact information.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#0B4182] hover:bg-[#083163] text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-[#0B4182]/20"
                >
                    {saving ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Save size={18} />
                    )}
                    Save Changes
                </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Identity Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Globe size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Site Identity</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Site Name</label>
                            <input
                                type="text"
                                name="siteName"
                                value={settings.siteName}
                                onChange={handleChange}
                                placeholder="iShine Wireless"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/10 focus:border-[#0B4182] transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Tagline</label>
                            <input
                                type="text"
                                name="tagline"
                                value={settings.tagline}
                                onChange={handleChange}
                                placeholder="Your Premium Wireless Solution"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/10 focus:border-[#0B4182] transition-all"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-700">Site Logo URL</label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    name="siteLogo"
                                    value={settings.siteLogo}
                                    onChange={handleChange}
                                    placeholder="https://example.com/logo.png"
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/10 focus:border-[#0B4182] transition-all"
                                />
                                {settings.siteLogo && (
                                    <div className="w-20 h-10 bg-slate-100 rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center">
                                        <img src={settings.siteLogo} alt="Logo Preview" className="max-h-full max-w-full object-contain" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-700">Favicon URL</label>
                            <input
                                type="text"
                                name="favicon"
                                value={settings.favicon}
                                onChange={handleChange}
                                placeholder="https://example.com/favicon.ico"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/10 focus:border-[#0B4182] transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <Mail size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Contact Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Mail size={14} className="text-slate-400" /> Support Email
                            </label>
                            <input
                                type="email"
                                name="contactEmail"
                                value={settings.contactEmail}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/10 focus:border-[#0B4182] transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Phone size={14} className="text-slate-400" /> Support Phone
                            </label>
                            <input
                                type="text"
                                name="contactPhone"
                                value={settings.contactPhone}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/10 focus:border-[#0B4182] transition-all"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <MapPin size={14} className="text-slate-400" /> Business Address
                            </label>
                            <textarea
                                name="businessAddress"
                                value={settings.businessAddress}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/10 focus:border-[#0B4182] transition-all"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Share2 size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Social Media Links</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Facebook URL</label>
                            <input
                                type="text"
                                name="facebookUrl"
                                value={settings.facebookUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/10 focus:border-[#0B4182] transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Instagram URL</label>
                            <input
                                type="text"
                                name="instagramUrl"
                                value={settings.instagramUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/10 focus:border-[#0B4182] transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Twitter URL</label>
                            <input
                                type="text"
                                name="twitterUrl"
                                value={settings.twitterUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/10 focus:border-[#0B4182] transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">LinkedIn URL</label>
                            <input
                                type="text"
                                name="linkedinUrl"
                                value={settings.linkedinUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/10 focus:border-[#0B4182] transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <Type size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Footer Settings</h2>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Copyright Text</label>
                        <input
                            type="text"
                            name="copyrightText"
                            value={settings.copyrightText}
                            onChange={handleChange}
                            placeholder="© 2024 iShine Wireless. All rights reserved."
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/10 focus:border-[#0B4182] transition-all"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
