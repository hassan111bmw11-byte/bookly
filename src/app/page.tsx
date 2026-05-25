"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Subscription from "@/components/landing/Subscription";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import WhatsappFloat from "@/components/landing/WhatsappFloat";

export default function HomePage() {
  const [dark, setDark] = useState(true);

  return (
    <main
      dir="rtl"
      className={dark ? "dark bg-[#070914] text-white" : "bg-white text-slate-950"}
    >
      <Navbar dark={dark} setDark={setDark} />
      <Hero />
      <Features />
      <Subscription />
      <Contact />
      <Footer />
      <WhatsappFloat />
    </main>
  );
}