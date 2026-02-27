export default function ContactPage() {
    return (
        <main className="bg-slate-50 min-h-screen py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Get in Touch</h1>
                    <p className="text-lg text-slate-500">
                        Need assistance with a wholesale order, RMA request, or product inquiry? Our dedicated B2B support team is ready to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left Column: Contact Info */}
                    <div className="flex flex-col gap-6">
                        {/* Company Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">iShine Wireless Inc.</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-[#0B4182] rounded-xl flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">Headquarters</p>
                                        <p className="text-slate-600 mt-1">11311 Harry Hines Blvd #503<br />Dallas, TX 75229</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-[#0B4182] rounded-xl flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined">call</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">Phone</p>
                                        <p className="text-slate-600 mt-1 hover:text-[#0B4182] transition"><a href="tel:469-260-2475">(469) 260-2475</a></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-[#0B4182] rounded-xl flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">Email</p>
                                        <p className="text-slate-600 mt-1 hover:text-[#0B4182] transition"><a href="mailto:sales@ishinewireless.com">sales@ishinewireless.com</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours Card */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-md border border-slate-700 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined">schedule</span>
                                    Business Hours
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                                        <span className="text-slate-300">Monday - Saturday</span>
                                        <span className="font-semibold">8:00 AM - 7:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3">
                                        <span className="text-slate-300">Sunday</span>
                                        <span className="font-semibold text-red-400">Closed</span>
                                    </div>
                                </div>
                            </div>
                            <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-9xl text-white/5 pointer-events-none">warehouse</span>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Send a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                    <input type="text" id="name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0B4182] focus:border-[#0B4182] focus:bg-white transition-all outline-none" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
                                    <input type="text" id="company" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0B4182] focus:border-[#0B4182] focus:bg-white transition-all outline-none" placeholder="iRepair LLC" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                    <input type="email" id="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0B4182] focus:border-[#0B4182] focus:bg-white transition-all outline-none" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label htmlFor="orderNum" className="block text-sm font-semibold text-slate-700 mb-2">Order Number (Optional)</label>
                                    <input type="text" id="orderNum" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0B4182] focus:border-[#0B4182] focus:bg-white transition-all outline-none" placeholder="#ORD-12345" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                                <textarea id="message" rows={5} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0B4182] focus:border-[#0B4182] focus:bg-white transition-all outline-none resize-none" placeholder="How can we help you today?"></textarea>
                            </div>

                            <button type="button" className="w-full bg-[#0B4182] hover:bg-[#082f5e] text-white font-bold py-4 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2">
                                Send Message
                                <span className="material-symbols-outlined text-sm">send</span>
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </main>
    );
}
