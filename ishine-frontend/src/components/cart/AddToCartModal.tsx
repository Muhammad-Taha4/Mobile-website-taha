'use client';

import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import Image from 'next/image';

export default function AddToCartModal() {
    const { isModalOpen, modalItem, closeModal } = useCartStore();

    if (!isModalOpen || !modalItem) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Dimmed Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={closeModal}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-500">check_circle</span>
                        Product is added to cart
                    </h3>
                    <button
                        onClick={closeModal}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 p-1.5 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 flex items-start gap-6">
                    {/* Image Left */}
                    <div className="w-24 h-24 shrink-0 rounded-xl border border-slate-100 bg-slate-50 overflow-hidden flex items-center justify-center relative p-2">
                        <Image
                            src={modalItem.image || '/placeholder-image.png'}
                            alt={modalItem.name}
                            fill
                            className="object-contain p-2 mix-blend-multiply"
                        />
                    </div>

                    {/* Meta Right */}
                    <div className="flex-1 min-w-0 pt-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{modalItem.sku}</p>
                        <h4 className="text-lg font-extrabold text-[#2ea4d5] leading-tight mb-2 pr-4">{modalItem.name}</h4>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-500">Qty: {modalItem.quantity}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span className="text-xl font-black text-rose-500 tracking-tight">${modalItem.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 pt-2 flex flex-col sm:flex-row gap-3">
                    <Link
                        href="/cart"
                        onClick={closeModal}
                        className="flex-1 flex justify-center items-center py-3.5 px-4 rounded-xl font-bold text-[#2ea4d5] bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100/50 text-sm"
                    >
                        VIEW CART
                    </Link>
                    <Link
                        href="/checkout"
                        onClick={closeModal}
                        className="flex-1 flex justify-center items-center py-3.5 px-4 rounded-xl font-bold text-white bg-[#2ea4d5] hover:bg-[#2389b3] transition-colors shadow-md shadow-[#2ea4d5]/20 text-sm gap-2"
                    >
                        CHECKOUT
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
