'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';

export default function CartPage() {
    const cartItems = useCartStore((state) => state.items);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const clearCart = useCartStore((state) => state.clearCart);
    const getTotalPrice = useCartStore((state) => state.getTotalPrice);
    const getTotalItems = useCartStore((state) => state.getTotalItems);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-slate-50"></div>; // Prevents hydration mismatch
    }

    const isEmpty = cartItems.length === 0;

    if (isEmpty) {
        return (
            <main className="flex-1 w-full bg-slate-50 min-h-[70vh] flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
                <span className="material-symbols-outlined text-slate-300 text-[100px] mb-6">shopping_cart</span>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Your cart is empty</h1>
                <p className="text-slate-500 max-w-sm text-center mb-8">Looks like you haven't added any professional repair parts to your cart yet.</p>
                <Link href="/shop" className="bg-[#2ea4d5] hover:bg-[#2389b3] text-white font-bold py-4 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    Continue Shopping
                </Link>
            </main>
        );
    }

    const subtotal = getTotalPrice();
    const discount = subtotal > 500 ? subtotal * 0.05 : 0; // Example volume discount
    const shipping = subtotal > 383 ? 0 : 15;
    const finalTotal = subtotal - discount + shipping;

    return (
        <main className="flex-1 w-full bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-12">

                <div className="flex flex-col gap-1 mb-8">
                    <h1 className="text-slate-900 text-3xl font-bold tracking-tight">Your Shopping Cart</h1>
                    <p className="text-slate-500 text-sm">
                        Total Items: {getTotalItems()} • <Link className="text-[#2ea4d5] hover:underline" href="/shop">Continue Shopping</Link>
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Left Column: Cart Items (66%) */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-6">

                        {/* Table Header (Desktop) */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-white rounded-lg border border-gray-200 text-xs font-semibold uppercase tracking-wider text-slate-500 shadow-sm">
                            <div className="col-span-6">Product Details</div>
                            <div className="col-span-2 text-center">Unit Price</div>
                            <div className="col-span-2 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>

                        {/* Cart Items List */}
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-6">

                                    {/* Product Info */}
                                    <div className="w-full sm:w-1/2 flex items-center gap-4">
                                        <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-md p-2 flex items-center justify-center border border-gray-200">
                                            <img
                                                alt={item.name}
                                                className="w-full h-full object-contain mix-blend-multiply"
                                                src={item.image}
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center gap-1">
                                            <Link className="text-slate-900 text-base font-semibold leading-tight hover:text-[#2ea4d5] transition-colors line-clamp-2" href={`/shop/${item.id}`}>
                                                {item.name}
                                            </Link>
                                            <div className="flex flex-wrap gap-2 text-xs mt-1">
                                                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-gray-200">SKU: {item.sku}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shared container for Price, Quantity, Total to align them on desktop */}
                                    <div className="w-full sm:w-1/2 flex items-center justify-between sm:justify-end gap-4 sm:gap-8 border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">

                                        {/* Unit Price */}
                                        <div className="flex flex-col items-center">
                                            <span className="sm:hidden text-xs text-slate-500 mb-1">Price</span>
                                            <p className="text-slate-600 font-medium">${item.price.toFixed(2)}</p>
                                        </div>

                                        {/* Quantity */}
                                        <div className="flex flex-col items-center">
                                            <span className="sm:hidden text-xs text-slate-500 mb-1">Qty</span>
                                            <div className="flex items-center rounded-lg border border-gray-200 bg-slate-50 overflow-hidden">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-[#2ea4d5] hover:bg-gray-200 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">remove</span>
                                                </button>
                                                <div className="w-10 text-center text-sm font-semibold text-slate-900 border-x border-gray-200 flex items-center justify-center h-8 bg-white">
                                                    {item.quantity}
                                                </div>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-[#2ea4d5] hover:bg-gray-200 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Total & Actions */}
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <span className="sm:hidden text-xs text-slate-500 block mb-1">Total</span>
                                                <p className="text-slate-900 text-lg font-bold min-w-[80px]">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-red-50 focus:outline-none"
                                                title="Remove Item"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}

                        {/* Back / Clear actions */}
                        <div className="flex justify-between items-center mt-2">
                            <Link href="/shop" className="flex items-center gap-2 text-slate-500 hover:text-[#2ea4d5] text-sm font-medium transition-colors">
                                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                                Back to Shop
                            </Link>
                            <button
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to clear your entire cart?')) {
                                        clearCart();
                                    }
                                }}
                                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-[18px]">remove_shopping_cart</span>
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Order Summary (33%) */}
                    <div className="w-full lg:w-1/3 sticky top-24 space-y-4">

                        {/* Summary Card */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h2 className="text-slate-900 text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm">Subtotal ({getTotalItems()} items)</span>
                                    <span className="text-slate-900 font-semibold">${subtotal.toFixed(2)}</span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between items-center gap-2">
                                        <span className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px]">verified</span>
                                            Volume Discount (5%)
                                        </span>
                                        <span className="text-emerald-600 font-semibold">-${discount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm">Est. Shipping</span>
                                    <span className="text-slate-900 font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm">Tax</span>
                                    <span className="text-slate-400 italic text-sm">Calculated at checkout</span>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gray-100 my-4"></div>

                                <div className="flex justify-between items-end">
                                    <span className="text-slate-900 text-lg font-bold">Total</span>
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-slate-900">${finalTotal.toFixed(2)}</span>
                                        <p className="text-xs text-slate-500 mt-1">USD</p>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Link href="/checkout" className="w-full mt-6 bg-[#2ea4d5] hover:bg-[#2389b3] text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                                    <span>Proceed to Secure Checkout</span>
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>

                                <div className="text-center mt-3">
                                    <p className="text-xs text-slate-400">
                                        30-Day Money Back Guarantee
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col items-center justify-center gap-1 p-2">
                                <span className="material-symbols-outlined text-slate-400 text-[24px]">lock</span>
                                <span className="text-[10px] text-slate-500 font-medium text-center leading-tight">Secure<br />SSL</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 p-2">
                                <span className="material-symbols-outlined text-slate-400 text-[24px]">history</span>
                                <span className="text-[10px] text-slate-500 font-medium text-center leading-tight">30-Day<br />Returns</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 p-2">
                                <span className="material-symbols-outlined text-slate-400 text-[24px]">shield</span>
                                <span className="text-[10px] text-slate-500 font-medium text-center leading-tight">Wholesale<br />Protection</span>
                            </div>
                        </div>

                        {/* Shipping Estimator Mini */}
                        {subtotal < 383 && (
                            <div className="bg-slate-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-[#2ea4d5] text-[20px] mt-0.5">local_shipping</span>
                                    <div className="w-full">
                                        <p className="text-xs font-bold text-slate-900">Free Shipping Eligible</p>
                                        <p className="text-xs text-slate-500 mt-0.5">Add <span className="font-bold text-slate-700">${(383 - subtotal).toFixed(2)}</span> more to qualify for free FedEx Ground.</p>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                            <div className="bg-[#2ea4d5] h-1.5 rounded-full" style={{ width: `${Math.min(100, (subtotal / 383) * 100)}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </main>
    );
}
