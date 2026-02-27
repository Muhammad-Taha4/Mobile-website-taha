"use client";
import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
    id?: string;
    title?: string;
    brand?: string;
    price?: number;
    badge?: string;
    badgeColor?: "purple" | "green" | "blue" | "red";
    imageSrc?: string;
    sku?: string;
    stockStatus?: string;
    stockCount?: string;
    isSelected?: boolean;
    onSelectChange?: (id: string, selected: boolean) => void;
}

const ProductCard = React.memo(({
    id = "1",
    title = "iPhone 14 Pro Max OLED Assembly Replacement",
    brand = "Apple - iPhone 14 Pro Max",
    price = 210.00,
    badge = "OEM Refurb",
    badgeColor = "purple", // 'purple', 'green', 'blue', 'red'
    imageSrc = "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800&q=80",
    sku = "IP14PM-OLED",
    stockStatus = "In Stock",
    stockCount = "120+ units",
    isSelected = false,
    onSelectChange,
}: ProductCardProps) => {
    const [quantity, setQuantity] = useState(1);
    const addToCart = useCartStore(state => state.addToCart);

    const badgeColors = useMemo(() => ({
        purple: "bg-purple-100 text-purple-700 ring-purple-700/10",
        green: "bg-green-100 text-green-700 ring-green-700/10",
        blue: "bg-blue-100 text-blue-700 ring-blue-700/10",
        red: "bg-red-100 text-red-700 ring-red-700/10",
    }), []);

    const getDiscountedPrice = useCallback((qty: number) => {
        if (qty >= 20) return price * 0.87;
        if (qty >= 5) return price * 0.95;
        return price;
    }, [price]);

    const handleAddToCart = useCallback(() => {
        addToCart({
            id,
            name: title,
            price: getDiscountedPrice(quantity),
            image: imageSrc,
            quantity,
            sku
        });
        toast.success(`${quantity}x ${title} added to cart!`);
    }, [addToCart, id, title, getDiscountedPrice, quantity, imageSrc, sku]);

    const incrementQuantity = useCallback(() => setQuantity(prev => prev + 1), []);
    const decrementQuantity = useCallback(() => setQuantity(prev => Math.max(1, prev - 1)), []);
    const handleQuantityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Math.max(1, parseInt(e.target.value) || 1));
    }, []);

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border-light bg-surface-light shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg hover:border-primary/30">
            <Link href={`/shop/${id}`} className="relative aspect-[4/3] w-full bg-[#f1f5f9] p-6 overflow-hidden block">
                {badge && (
                    <div className="absolute right-3 top-3 z-10">
                        <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeColors[badgeColor]}`}
                        >
                            {badge}
                        </span>
                    </div>
                )}
                <div className="relative h-full w-full transition-transform duration-700 group-hover:scale-105">
                    <Image
                        className="object-contain mix-blend-multiply"
                        alt={title}
                        src={imageSrc}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                    />
                </div>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <button className="bg-white/90 backdrop-blur text-primary px-4 py-2 rounded-full font-bold shadow-lg text-xs flex items-center gap-1 hover:bg-white hover:scale-105 transition-all pointer-events-auto">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        Quick View
                    </button>
                </div>
            </Link>

            <div className="flex flex-1 flex-col p-4">
                {/* Checkbox for Bulk Add */}
                <div className="absolute top-4 left-4 z-20">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => onSelectChange?.(id, e.target.checked)}
                        className="size-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer shadow-sm hover:scale-110 transition-transform bg-white"
                        title="Select for Bulk Action"
                    />
                </div>

                <div className="mb-2">
                    <p className="text-sm font-medium text-text-secondary">{brand}</p>
                    <Link href={`/shop/${id}`}>
                        <h3 className="text-lg font-bold text-text-main line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                    </Link>
                </div>
                <div className="mt-auto space-y-3">
                    {/* Compare Checkbox */}
                    <div className="flex items-center gap-2 mb-2 mt-1">
                        <input type="checkbox" id={`compare-${id}`} className="size-3.5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
                        <label htmlFor={`compare-${id}`} className="text-xs text-text-secondary cursor-pointer hover:text-primary transition-colors">Compare Specs</label>
                    </div>

                    <div className="flex items-center justify-between border-t border-border-light pt-3">
                        <div>
                            <span className="block text-sm text-text-secondary">
                                Wholesale Price
                            </span>
                            <span className="text-2xl font-extrabold text-primary">${price.toFixed(2)}</span>
                        </div>
                        <div className="text-right">
                            <span
                                className={`block text-xs font-medium ${stockStatus === "Low Stock"
                                    ? "text-amber-600"
                                    : "text-green-600"
                                    } flex items-center justify-end gap-1`}
                            >
                                <span
                                    className={`size-1.5 rounded-full ${stockStatus === "Low Stock"
                                        ? "bg-amber-600"
                                        : "bg-green-600"
                                        }`}
                                ></span>{" "}
                                {stockStatus}
                            </span>
                            <span className="text-xs text-text-secondary">{stockCount}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-lg border border-border-light bg-background-light">
                            <button
                                onClick={decrementQuantity}
                                className="px-2 py-1 text-text-secondary hover:text-primary hover:bg-gray-100 rounded-l-lg transition-colors"
                            >
                                <span className="material-symbols-outlined text-[16px]">-</span>
                            </button>
                            <input
                                className="w-10 border-none bg-transparent py-1 text-center text-sm font-semibold text-text-main focus:ring-0"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                            />
                            <button
                                onClick={incrementQuantity}
                                className="px-2 py-1 text-text-secondary hover:text-primary hover:bg-gray-100 rounded-r-lg transition-colors"
                            >
                                <span className="material-symbols-outlined text-[16px]">+</span>
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 rounded-lg bg-primary py-2 text-sm font-bold text-white shadow-sm hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
