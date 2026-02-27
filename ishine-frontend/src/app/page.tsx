"use client";

import Link from "next/link";
import dynamic from 'next/dynamic';
import Hero from "@/components/home/Hero";
import BrandsMarquee from "@/components/home/BrandsMarquee";
import ErrorBoundary from "@/components/layout/ErrorBoundary";

const ShopByCategory = dynamic(() => import("@/components/home/ShopByCategory"), {
  loading: () => <div className="h-40 animate-pulse bg-gray-100 rounded-xl" />
});
const TopSelling = dynamic(() => import("@/components/home/TopSelling"));
const WeeklyBestSellers = dynamic(() => import("@/components/home/WeeklyBestSellers"));
const DiscountedProducts = dynamic(() => import("@/components/home/DiscountedProducts"));
const DarkPromoBanner = dynamic(() => import("@/components/home/DarkPromoBanner"));
const ScrollReveal = dynamic(() => import("@/components/layout/ScrollReveal"), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background-light">
      <ErrorBoundary>
        <Hero />

        <div className="space-y-12 mt-8 md:space-y-16 md:mt-12">
          {/* Infinite Brand Marquee */}
          <ScrollReveal delay={100}>
            <BrandsMarquee />
          </ScrollReveal>

          {/* Top Selling Mobile Parts */}
          <ScrollReveal delay={100}>
            <TopSelling />
          </ScrollReveal>

          {/* Promo Banners as Main Categories Navigation */}
          <ScrollReveal delay={100}>
            <ShopByCategory />
          </ScrollReveal>

          {/* Products With Discounts */}
          <ScrollReveal delay={100}>
            <DiscountedProducts />
          </ScrollReveal>

          {/* Dark Promo Banner */}
          <ScrollReveal delay={100}>
            <DarkPromoBanner />
          </ScrollReveal>

          {/* Weekly Best Sellers */}
          <ScrollReveal delay={100}>
            <WeeklyBestSellers />
          </ScrollReveal>
        </div>
      </ErrorBoundary>
    </main>
  );
}
