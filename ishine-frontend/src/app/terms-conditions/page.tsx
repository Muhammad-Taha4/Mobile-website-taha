export default function TermsAndConditionsPage() {
    return (
        <main className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">Terms and Conditions</h1>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                By accessing or using the iShine Wireless website ("the Site" or "iShine Wireless B2B Portal") to purchase mobile accessories, LCDs, repair parts, tools, or any other products, you agree to be bound by these Terms and Conditions. This is a B2B (Business-to-Business) platform intended for authorized repair shops, retailers, and wholesalers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Wholesale Accounts</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Registration is restricted to verified businesses. iShine Wireless reserves the right to approve, reject, or terminate wholesale accounts at our discretion. You are responsible for maintaining the confidentiality of your account login information. Any activity occurring under your account is your sole responsibility.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Orders and Pricing</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                All prices displayed are wholesale and subject to change without prior notice. We make every effort to display accurate product information and pricing; however, errors may occur. In the event of a pricing error, we reserve the right to cancel any orders placed for that item. All orders are subject to availability and formal acceptance by iShine Wireless.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. RMA (Return Merchandise Authorization)</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Defective products must be returned following our strict RMA policy.
                            </p>
                            <ul className="list-disc pl-5 text-slate-600 space-y-2 leading-relaxed">
                                <li>All returns require a pre-approved RMA number provided by your account manager.</li>
                                <li>Defective screens/LCDs must have the original iShine stamps and must not have physical damage (e.g., cracked glass, torn flex cables).</li>
                                <li>Parts that have been installed, glued, or physically altered are strictly non-refundable.</li>
                                <li>Returns are accepted for store credit or exact item replacement only.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Shipping and Liability</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Shipping costs and delivery times vary based on the carrier and destination. iShine Wireless is not liable for delays, losses, or damages incurred during transit once the package has been handed over to the carrier. It is the buyer's responsibility to inspect goods immediately upon receipt and report any shipping damage within 48 hours.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                iShine Wireless shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the products purchased from us. This includes, but is not limited to, damage caused to customer devices during repair using our parts. All parts should be installed by qualified technicians.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-slate-100">
                            <p className="text-sm font-medium text-slate-500">
                                Last updated: October 2026. For detailed questions regarding our terms or your wholesale agreement, contact us at <a href="mailto:sales@ishinewireless.com" className="text-[#0B4182] hover:underline">sales@ishinewireless.com</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
