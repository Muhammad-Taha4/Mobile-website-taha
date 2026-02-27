"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
    const router = useRouter();
    const { user } = useAuthStore();
    const cartItems = useCartStore((state) => state.items);

    useEffect(() => {
        if (!user) {
            toast.error("Please login to proceed to checkout");
            router.push('/login?callback=/checkout');
        }
    }, [user, router]);

    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const clearCart = useCartStore((state) => state.clearCart);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    // Assuming 5% volume discount if total items > 5 for simplicity (or base it off what's in cart)
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const discount = totalItems >= 5 ? subtotal * 0.05 : 0;

    const [currentStep, setCurrentStep] = useState(1);

    // Shipping State
    const [shipping, setShipping] = useState({
        businessName: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        method: 'standard', // 'standard' (145), 'express' (280)
        cost: 145
    });

    // Payment State
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'net30', 'wire'

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    const handleShippingMethodChange = (method: string, cost: number) => {
        setShipping({ ...shipping, method, cost });
    };

    const finalTotal = subtotal - discount + shipping.cost;

    const handleCompletePurchase = () => {
        clearCart();
        router.push('/order-success');
    };

    const steps = [
        { id: 1, name: 'Cart Review' },
        { id: 2, name: 'Shipping' },
        { id: 3, name: 'Payment' },
        { id: 4, name: 'Review' }
    ];

    const canProceedToNext = () => {
        if (currentStep === 1 && cartItems.length === 0) return false;
        if (currentStep === 2 && (!shipping.firstName || !shipping.lastName || !shipping.address || !shipping.city || !shipping.state || !shipping.zip)) return false;
        return true;
    };

    return (
        <main className="flex-grow max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-background-light min-h-screen animate-in fade-in duration-500">
            {/* Progress Stepper */}
            <div className="mb-10 max-w-3xl mx-auto">
                <nav aria-label="Progress">
                    <ol className="flex items-center" role="list">
                        {steps.map((step, index) => (
                            <li key={step.id} className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                                {index !== steps.length - 1 && (
                                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                        <div className={`h-0.5 w-full transition-all duration-500 ${currentStep > step.id ? 'bg-primary' : 'bg-gray-200'}`}></div>
                                    </div>
                                )}
                                <button
                                    disabled={currentStep < step.id}
                                    onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                                    className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${currentStep >= step.id
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white border-2 border-gray-200 text-gray-400'
                                        } ${currentStep === step.id ? 'ring-4 ring-primary/20' : ''}`}
                                >
                                    {currentStep > step.id ? <span className="material-symbols-outlined text-sm">check</span> : <span className="text-sm font-bold">{step.id}</span>}
                                </button>
                                <span className={`absolute top-10 left-1/2 -translate-x-1/2 text-xs font-bold ${currentStep >= step.id ? 'text-primary' : 'text-gray-400'}`}>
                                    {step.name}
                                </span>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
                {/* Left Column: Workflow */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-10">

                    {/* STEP 1: CART REVIEW */}
                    {currentStep === 1 && (
                        <section className="bg-white rounded-xl shadow-lg shadow-gray-200/40 border border-gray-100 p-8">
                            <h2 className="text-xl font-bold text-text-main flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
                                Cart Review
                            </h2>
                            {cartItems.length === 0 ? (
                                <div className="text-center py-10">
                                    <span className="material-symbols-outlined text-gray-300 text-6xl">shopping_cart</span>
                                    <h3 className="text-xl font-bold text-slate-700 mt-4">Your cart is empty</h3>
                                    <Link href="/shop" className="mt-4 inline-block text-primary font-bold hover:underline">Return to Shop</Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                                            <div className="h-20 w-20 flex-shrink-0 bg-gray-50 rounded-lg border p-1 border-gray-100">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between">
                                                <div className="flex justify-between font-bold text-text-main">
                                                    <h3>{item.name}</h3>
                                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <p className="text-xs text-gray-500">Unit Price: ${item.price.toFixed(2)}</p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center border rounded-lg overflow-hidden">
                                                        <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-3 hover:bg-gray-100 font-bold">-</button>
                                                        <input
                                                            type="number" className="w-12 text-center border-none p-1 text-sm font-bold"
                                                            value={item.quantity}
                                                            onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                                                        />
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 hover:bg-gray-100 font-bold">+</button>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm hover:underline">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pt-4 flex justify-end">
                                        <button
                                            onClick={() => setCurrentStep(2)}
                                            className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-hover transition-colors shadow-md"
                                        >
                                            Continue to Shipping
                                        </button>
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {/* STEP 2: SHIPPING ADDRESS */}
                    {currentStep === 2 && (
                        <section className="bg-white rounded-xl shadow-lg shadow-gray-200/40 border border-gray-100 p-8">
                            <h2 className="text-xl font-bold text-text-main flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
                                Shipping Address
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold mb-1">Business Name</label>
                                    <input name="businessName" value={shipping.businessName} onChange={handleShippingChange} className="w-full rounded-lg border border-gray-300 focus:border-primary h-12 px-4 shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">First Name *</label>
                                    <input name="firstName" value={shipping.firstName} onChange={handleShippingChange} className="w-full rounded-lg border border-gray-300 focus:border-primary h-12 px-4 shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Last Name *</label>
                                    <input name="lastName" value={shipping.lastName} onChange={handleShippingChange} className="w-full rounded-lg border border-gray-300 focus:border-primary h-12 px-4 shadow-sm" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold mb-1">Street Address *</label>
                                    <input name="address" value={shipping.address} onChange={handleShippingChange} className="w-full rounded-lg border border-gray-300 focus:border-primary h-12 px-4 shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">City *</label>
                                    <input name="city" value={shipping.city} onChange={handleShippingChange} className="w-full rounded-lg border border-gray-300 focus:border-primary h-12 px-4 shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">State *</label>
                                    <input name="state" value={shipping.state} onChange={handleShippingChange} className="w-full rounded-lg border border-gray-300 focus:border-primary h-12 px-4 shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">ZIP / Postal Code *</label>
                                    <input name="zip" value={shipping.zip} onChange={handleShippingChange} className="w-full rounded-lg border border-gray-300 focus:border-primary h-12 px-4 shadow-sm" />
                                </div>
                            </div>

                            <h3 className="font-bold text-lg mt-8 mb-4">Shipping Method</h3>
                            <div className="space-y-3">
                                <label className={`flex cursor-pointer rounded-xl border-2 p-5 ${shipping.method === 'standard' ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-gray-200 bg-white'}`}>
                                    <input type="radio" name="method" checked={shipping.method === 'standard'} onChange={() => handleShippingMethodChange('standard', 145)} className="sr-only" />
                                    <div className="flex flex-1 justify-between">
                                        <div>
                                            <p className="font-bold">Standard Ground (LTL)</p>
                                            <p className="text-sm text-gray-500">3-5 Business Days • Palletized</p>
                                        </div>
                                        <p className="font-bold">$145.00</p>
                                    </div>
                                </label>
                                <label className={`flex cursor-pointer rounded-xl border-2 p-5 ${shipping.method === 'express' ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-gray-200 bg-white'}`}>
                                    <input type="radio" name="method" checked={shipping.method === 'express'} onChange={() => handleShippingMethodChange('express', 280)} className="sr-only" />
                                    <div className="flex flex-1 justify-between">
                                        <div>
                                            <p className="font-bold">Expedited Freight</p>
                                            <p className="text-sm text-gray-500">2 Business Days • Priority Handling</p>
                                        </div>
                                        <p className="font-bold">$280.00</p>
                                    </div>
                                </label>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button onClick={() => setCurrentStep(1)} className="text-gray-500 font-bold hover:text-black">Back to Cart</button>
                                <button
                                    disabled={!canProceedToNext()}
                                    onClick={() => setCurrentStep(3)}
                                    className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-hover transition-colors shadow-md disabled:opacity-50"
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </section>
                    )}

                    {/* STEP 3: PAYMENT */}
                    {currentStep === 3 && (
                        <section className="bg-white rounded-xl shadow-lg shadow-gray-200/40 border border-gray-100 p-8">
                            <h2 className="text-xl font-bold text-text-main flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
                                Payment Method
                            </h2>

                            <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                                <button onClick={() => setPaymentMethod('card')} className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 font-bold ${paymentMethod === 'card' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200'}`}>Credit Card</button>
                                <button onClick={() => setPaymentMethod('net30')} className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 font-bold ${paymentMethod === 'net30' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200'}`}>Net-30 Terms</button>
                                <button onClick={() => setPaymentMethod('wire')} className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 font-bold ${paymentMethod === 'wire' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200'}`}>Wire Transfer</button>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="space-y-4 bg-gray-50 p-6 rounded-xl border">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Card Number *</label>
                                        <input className="w-full rounded-lg border-gray-300 h-12 px-4 shadow-sm" placeholder="XXXX XXXX XXXX XXXX" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold mb-1">MM/YY *</label>
                                            <input className="w-full rounded-lg border-gray-300 h-12 px-4 shadow-sm" placeholder="MM / YY" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-1">CVC *</label>
                                            <input type="password" maxLength={4} className="w-full rounded-lg border-gray-300 h-12 px-4 shadow-sm" placeholder="123" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'net30' && (
                                <div className="space-y-4 bg-gray-50 p-6 rounded-xl border text-center">
                                    <span className="material-symbols-outlined text-4xl text-primary mb-2">calendar_month</span>
                                    <h3 className="font-bold">Net-30 Financing Required</h3>
                                    <p className="text-gray-500 text-sm">Your order will be submitted for approval against your current credit limit. Net-30 accounts are subject to periodic review.</p>
                                    <input className="max-w-xs mt-4 mx-auto block w-full rounded-lg border border-gray-300 h-12 px-4 shadow-sm" placeholder="Enter Internal PO# (Optional)" />
                                </div>
                            )}

                            {paymentMethod === 'wire' && (
                                <div className="space-y-4 bg-gray-50 p-6 rounded-xl border">
                                    <h3 className="font-bold text-center">Wire Transfer Details</h3>
                                    <div className="bg-white p-4 border rounded text-sm space-y-2">
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="font-semibold text-gray-500">Bank Name</span>
                                            <span className="font-bold">Chase Business Banking</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="font-semibold text-gray-500">Routing Number</span>
                                            <span className="font-bold text-blue-600">021000021</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="font-semibold text-gray-500">Account Number</span>
                                            <span className="font-bold text-blue-600">89021487210</span>
                                        </div>
                                        <p className="text-xs text-center text-gray-400 mt-2">Include your Order # in the wire memo.</p>
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 flex justify-between">
                                <button onClick={() => setCurrentStep(2)} className="text-gray-500 font-bold hover:text-black">Back to Shipping</button>
                                <button
                                    onClick={() => setCurrentStep(4)}
                                    className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-hover transition-colors shadow-md"
                                >
                                    Review Order
                                </button>
                            </div>
                        </section>
                    )}

                    {/* STEP 4: REVIEW */}
                    {currentStep === 4 && (
                        <section className="bg-white rounded-xl shadow-lg shadow-gray-200/40 border border-gray-100 p-8">
                            <h2 className="text-xl font-bold text-text-main flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
                                Review & Confirm
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold text-gray-700 uppercase text-xs tracking-wider">Shipping Details</h3>
                                        <button onClick={() => setCurrentStep(2)} className="text-primary text-xs font-bold underline">Edit</button>
                                    </div>
                                    <p className="font-bold text-sm">{shipping.firstName} {shipping.lastName}</p>
                                    {shipping.businessName && <p className="text-sm">{shipping.businessName}</p>}
                                    <p className="text-sm">{shipping.address}</p>
                                    <p className="text-sm">{shipping.city}, {shipping.state} {shipping.zip}</p>
                                    <div className="mt-3 pt-3 border-t border-gray-200 text-sm">
                                        <span className="font-bold text-gray-700">Method: </span>
                                        {shipping.method === 'express' ? 'Expedited Freight ($280)' : 'Standard Ground ($145)'}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold text-gray-700 uppercase text-xs tracking-wider">Payment Details</h3>
                                        <button onClick={() => setCurrentStep(3)} className="text-primary text-xs font-bold underline">Edit</button>
                                    </div>
                                    <div className="flex items-center gap-3 mt-4">
                                        <span className="material-symbols-outlined text-3xl text-gray-400">
                                            {paymentMethod === 'card' ? 'credit_card' : paymentMethod === 'wire' ? 'account_balance' : 'calendar_month'}
                                        </span>
                                        <div>
                                            <p className="font-bold text-sm capitalize">{paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'net30' ? 'Net-30 Terms' : 'Wire Transfer'}</p>
                                            <p className="text-xs text-gray-500">Secure Payment Gateway</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button onClick={() => setCurrentStep(3)} className="text-gray-500 font-bold hover:text-black">Back to Payment</button>
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column: Dynamic Order Summary */}
                <div className="lg:col-span-5 xl:col-span-4">
                    <div className="sticky top-24">
                        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                            <div className="p-6 bg-gray-50/80 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-text-main">Order Summary</h2>
                            </div>

                            <div className="max-h-[300px] overflow-y-auto p-6 space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <div className="flex gap-2">
                                            <span className="font-bold text-gray-500">{item.quantity}x</span>
                                            <span className="line-clamp-1 truncate block max-w-[150px]">{item.name}</span>
                                        </div>
                                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                {cartItems.length === 0 && <p className="text-xs text-gray-400 italic">No items</p>}
                            </div>

                            <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                                <div className="flex justify-between text-sm font-medium text-text-secondary mb-3">
                                    <p>Subtotal ({totalItems} items)</p>
                                    <p className="text-text-main font-bold">${subtotal.toFixed(2)}</p>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm font-bold text-emerald-600 mb-3">
                                        <p>Volume Discount</p>
                                        <p>-${discount.toFixed(2)}</p>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm font-medium text-text-secondary mb-3">
                                    <p>Shipping</p>
                                    <p className="text-text-main font-bold">${shipping.cost.toFixed(2)}</p>
                                </div>

                                <div className="relative overflow-hidden rounded-xl bg-slate-900 text-white p-4 mt-4 mb-6 shadow-md border border-slate-700">
                                    <div className="flex justify-between text-base font-bold relative z-10">
                                        <p className="text-gray-300">Total</p>
                                        <p className="text-2xl">${finalTotal.toFixed(2)}</p>
                                    </div>
                                </div>

                                {currentStep === 4 && (
                                    <button
                                        onClick={handleCompletePurchase}
                                        className="w-full flex items-center justify-center rounded-xl bg-[#2ea4d5] hover:bg-[#2389b3] text-white px-6 py-4 text-base font-bold shadow-lg transition-transform hover:-translate-y-0.5"
                                    >
                                        Complete Purchase
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
