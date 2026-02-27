'use client';

import React, { useState } from 'react';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            category: 'Shipping',
            question: 'What is the cutoff for same-day shipping?',
            answer: 'All orders placed before 3:00 PM CST (Central Standard Time) Monday through Friday are processed and dispatched on the same day from our Dallas, TX warehouse.'
        },
        {
            category: 'Shipping',
            question: 'Do you offer free shipping for wholesale orders?',
            answer: 'Yes! We offer complimentary standard ground shipping on all domestic wholesale orders exceeding $500. Expedited options are available at checkout.'
        },
        {
            category: 'Wholesale/Pricing',
            question: 'How do I apply for a tax-exempt account?',
            answer: 'After registering for a standard account, please email sales@ishinewireless.com with a valid copy of your Resale Certificate or Tax Exemption form. Our team will verify and convert your account within 24 hours.'
        },
        {
            category: 'Wholesale/Pricing',
            question: 'Are there volume discounts available?',
            answer: 'Absolutely. We offer tiered pricing automatically applied at checkout based on volume. For dedicated blanket orders or massive bulk purchases, please contact your account manager for customized quoting.'
        },
        {
            category: 'Returns/RMA',
            question: 'What is your warranty policy on LCDs and parts?',
            answer: 'We provide a lifetime warranty against manufacturer defects on our premium LCDs and OLEDs, provided they are uninstalled and retain the original iShine stamps. Parts with torn flex cables or physical damage are strictly exempt.'
        },
        {
            category: 'Returns/RMA',
            question: 'How do I initiate an RMA request?',
            answer: 'You can initiate an RMA directly from your Account Dashboard under the "RMA & Returns" section. Simply select the order, check the defective parts, and print your prepaid return label.'
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="bg-slate-50 min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-slate-500">Find quick answers to common B2B and wholesale inquiries.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
                    {['Shipping', 'Wholesale/Pricing', 'Returns/RMA'].map((cat) => (
                        <div key={cat} className="mb-10 last:mb-0">
                            <h2 className="text-xl font-bold text-[#0B4182] mb-6 border-b border-slate-100 pb-2">{cat}</h2>
                            <div className="space-y-4">
                                {faqs.filter(f => f.category === cat).map((faq, i) => {
                                    const actualIndex = faqs.indexOf(faq);
                                    const isOpen = openIndex === actualIndex;
                                    return (
                                        <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
                                            <button
                                                onClick={() => toggleFAQ(actualIndex)}
                                                className="w-full text-left px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
                                            >
                                                <span className="font-bold text-slate-900 pr-4">{faq.question}</span>
                                                <span className="material-symbols-outlined text-[#0B4182] transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                                    expand_more
                                                </span>
                                            </button>
                                            <div
                                                className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                                            >
                                                <p className="text-slate-600 leading-relaxed text-sm">{faq.answer}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
