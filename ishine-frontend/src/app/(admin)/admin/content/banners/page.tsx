'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Link as LinkIcon, Calendar, Upload } from 'lucide-react';

const API = 'http://localhost:5000';

export default function BannerManagement() {
    const token = useAuthStore(state => state.token);
    const [loading, setLoading] = useState(true);
    const [banners, setBanners] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingBanner, setEditingBanner] = useState<any>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        link: '',
        buttonText: '',
        position: 'hero',
        sortOrder: 0,
        isActive: true,
        startDate: '',
        endDate: ''
    });

    useEffect(() => { fetchBanners(); }, []);

    const fetchBanners = async () => {
        try {
            const res = await fetch(`${API}/api/admin/banners`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setBanners(await res.json());
        } catch { toast.error('Failed to load banners'); }
        finally { setLoading(false); }
    };

    const handleImageFile = (file: File) => {
        if (!file.type.startsWith('image/')) { toast.error('Please upload an image file'); return; }
        if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return; }
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleImageFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile && !editingBanner?.image) {
            toast.error('Please upload a banner image');
            return;
        }
        setIsSaving(true);
        const url = editingBanner
            ? `${API}/api/admin/banners/${editingBanner.id}`
            : `${API}/api/admin/banners`;
        const method = editingBanner ? 'PUT' : 'POST';

        const fd = new FormData();
        Object.entries(formData).forEach(([k, v]) => fd.append(k, String(v)));
        if (imageFile) fd.append('image', imageFile);

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: fd
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message || (editingBanner ? 'Banner updated!' : 'Banner created!'));
                resetForm();
                fetchBanners();
            } else {
                toast.error(data.message || 'Failed to save banner');
            }
        } catch { toast.error('Network error. Please try again.'); }
        finally { setIsSaving(false); }
    };

    const resetForm = () => {
        setIsAdding(false);
        setEditingBanner(null);
        setImageFile(null);
        setImagePreview('');
        setFormData({
            title: '', subtitle: '', link: '', buttonText: '',
            position: 'hero', sortOrder: 0, isActive: true, startDate: '', endDate: ''
        });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this banner permanently?')) return;
        try {
            const res = await fetch(`${API}/api/admin/banners/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) { toast.success('Banner deleted'); fetchBanners(); }
        } catch { toast.error('Failed to delete banner'); }
    };

    const startEditing = (banner: any) => {
        setEditingBanner(banner);
        const imgSrc = banner.image?.startsWith('/') ? `${API}${banner.image}` : banner.image;
        setImagePreview(imgSrc || '');
        setFormData({
            title: banner.title || '',
            subtitle: banner.subtitle || '',
            link: banner.link || '',
            buttonText: banner.buttonText || '',
            position: banner.position || 'hero',
            sortOrder: banner.sortOrder || 0,
            isActive: banner.isActive,
            startDate: banner.startDate ? new Date(banner.startDate).toISOString().split('T')[0] : '',
            endDate: banner.endDate ? new Date(banner.endDate).toISOString().split('T')[0] : ''
        });
        setIsAdding(true);
    };

    const getBannerImageSrc = (banner: any) =>
        banner.image?.startsWith('/') ? `${API}${banner.image}` : banner.image;

    if (loading) return (
        <div className="flex items-center justify-center py-32">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0B4182] border-t-transparent" />
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Banner Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Create and manage homepage sliders and promotional banners.</p>
                </div>
                {!isAdding ? (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 bg-[#0B4182] hover:bg-[#083163] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#0B4182]/20"
                    >
                        <Plus size={18} /> Add New Banner
                    </button>
                ) : (
                    <button
                        onClick={resetForm}
                        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-bold transition-all"
                    >
                        <X size={18} /> Cancel
                    </button>
                )}
            </div>

            {isAdding ? (
                /* ── Add / Edit Form ── */
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="text-lg font-bold text-slate-800">
                            {editingBanner ? '✏️ Edit Banner' : '➕ Create New Banner'}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">

                        {/* Image Upload Zone */}
                        <div>
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
                                <ImageIcon size={15} /> Banner Image {!editingBanner && <span className="text-red-500">*</span>}
                            </label>
                            <div
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative flex flex-col items-center justify-center gap-3 w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all py-10 ${isDragging
                                        ? 'border-[#0B4182] bg-blue-50 scale-[1.01]'
                                        : 'border-slate-200 hover:border-[#0B4182]/50 hover:bg-slate-50/80'
                                    }`}
                            >
                                {imagePreview ? (
                                    <div className="w-full px-6 space-y-2">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="max-h-48 w-full object-cover rounded-xl border border-slate-200 shadow-sm"
                                        />
                                        <p className="text-center text-xs text-slate-400 font-medium">
                                            ✓ Image selected — click or drag to replace
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Upload size={26} className="text-slate-400" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-slate-700">Drop image here or click to upload</p>
                                            <p className="text-xs text-slate-400 mt-1">JPG, PNG, WebP or GIF — Max 5MB</p>
                                        </div>
                                    </>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => { if (e.target.files?.[0]) handleImageFile(e.target.files[0]); }}
                                />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Banner Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text" required value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/20 focus:border-[#0B4182]/40"
                                    placeholder="e.g. Premium iPhone Parts"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Subtitle</label>
                                <input
                                    type="text" value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/20 focus:border-[#0B4182]/40"
                                    placeholder="e.g. Save up to 40% on bulk orders"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Button Text</label>
                                <input
                                    type="text" value={formData.buttonText}
                                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/20 focus:border-[#0B4182]/40"
                                    placeholder="e.g. Shop Now"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                    <LinkIcon size={13} /> Button Link
                                </label>
                                <input
                                    type="text" value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/20 focus:border-[#0B4182]/40"
                                    placeholder="e.g. /shop?brand=apple"
                                />
                            </div>
                        </div>

                        {/* Settings Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-slate-100">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Position</label>
                                <select
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/20 bg-white"
                                >
                                    <option value="hero">Hero Slider (Home Top)</option>
                                    <option value="promo1">Promo Section 1</option>
                                    <option value="promo2">Promo Section 2</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Sort Order</label>
                                <input
                                    type="number" value={formData.sortOrder}
                                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/20"
                                />
                            </div>
                            <div className="flex items-center pt-7">
                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox" checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B4182]" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">Active</span>
                                </label>
                            </div>
                        </div>

                        {/* Schedule */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                    <Calendar size={13} /> Start Date (Optional)
                                </label>
                                <input
                                    type="date" value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                    <Calendar size={13} /> End Date (Optional)
                                </label>
                                <input
                                    type="date" value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B4182]/20"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 flex justify-end gap-3">
                            <button type="button" onClick={resetForm} className="px-8 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all border border-slate-200">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-12 py-3 bg-[#0B4182] hover:bg-[#083163] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-lg shadow-[#0B4182]/20 flex items-center gap-2"
                            >
                                {isSaving ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                                ) : (
                                    editingBanner ? 'Update Banner' : 'Create Banner'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                /* ── Banner List ── */
                <div className="grid grid-cols-1 gap-4">
                    {banners.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                            <ImageIcon size={48} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-600 font-bold text-lg">No banners yet</p>
                            <p className="text-slate-400 text-sm mt-1">Click "Add New Banner" to get started</p>
                        </div>
                    ) : banners.map((banner) => (
                        <div key={banner.id} className="group bg-white rounded-2xl border border-slate-100 p-4 flex flex-col md:flex-row gap-5 items-center hover:shadow-md hover:border-slate-200 transition-all">
                            {/* Thumbnail */}
                            <div className="w-full md:w-64 aspect-[3/1] rounded-xl overflow-hidden bg-slate-100 relative shrink-0">
                                <img
                                    src={getBannerImageSrc(banner)}
                                    alt={banner.title}
                                    className="w-full h-full object-cover"
                                    onError={(e: any) => { e.target.src = 'https://placehold.co/400x133/e2e8f0/94a3b8?text=No+Image'; }}
                                />
                                {!banner.isActive && (
                                    <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center backdrop-blur-[2px]">
                                        <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-black text-slate-700 uppercase tracking-wider">Inactive</span>
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 py-1">
                                <div className="flex items-center gap-2.5 mb-1.5">
                                    <h3 className="text-lg font-bold text-slate-800 truncate">{banner.title}</h3>
                                    <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] uppercase font-black ${banner.position === 'hero' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-500'
                                        }`}>{banner.position}</span>
                                    <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] uppercase font-black ${banner.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                                        }`}>{banner.isActive ? 'Live' : 'Off'}</span>
                                </div>
                                <p className="text-sm text-slate-500 line-clamp-1 mb-2.5">{banner.subtitle || 'No subtitle'}</p>
                                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                                    <span className="flex items-center gap-1"><LinkIcon size={11} /> {banner.link || 'No link'}</span>
                                    <span>Sort: {banner.sortOrder}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                    onClick={() => startEditing(banner)}
                                    className="p-2.5 text-slate-400 hover:text-[#0B4182] hover:bg-blue-50 rounded-xl transition-all"
                                    title="Edit Banner"
                                >
                                    <Edit2 size={17} />
                                </button>
                                <button
                                    onClick={() => handleDelete(banner.id)}
                                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    title="Delete Banner"
                                >
                                    <Trash2 size={17} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
