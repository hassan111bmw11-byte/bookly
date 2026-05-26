"use client";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Subscription from "@/components/landing/Subscription";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import FloatingWhatsapp from "@/components/shared/FloatingWhatsapp";

export default function HomePage() {
  return (
    <main
      className="min-h-screen bg-white text-slate-950 dark:bg-[#070914] dark:text-white"
      dir="rtl"
    >
      <Navbar />
      <Hero />
      <Features />
      <Subscription />
      <Contact />
      <Footer />
      <FloatingWhatsapp />
    </main>
  );
}
