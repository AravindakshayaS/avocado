"use client";
import { useState, useEffect } from "react";

import Navbar          from "@/components/Navbar";
import Hero            from "@/components/Hero";
import DiscoverSection from "@/components/DiscoverSection";
import DishSection     from "@/components/DishSection";
import FoodiesSection  from "@/components/FoodiesSection";
import SplashScreen from "@/components/SplashScreen";
import TickerBanner from "@/components/TickerBanner";






export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      <main style={{ background:"#FDFBF7", opacity: showSplash?0:1, transition:"opacity 0.7s" }}>
        <TickerBanner />
        <Navbar scrolled={scrolled} />
        <Hero />
        <DiscoverSection />
        <DishSection />
        <FoodiesSection />
        {/* More sections will be added here as we build them */}
      </main>
    </>
  );
}