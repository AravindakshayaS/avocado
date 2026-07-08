"use client";
import { useState, useEffect } from "react";
import SplashScreen    from "@/components/SplashScreen";
import TickerBanner    from "@/components/TickerBanner";
import Navbar          from "@/components/Navbar";
import Hero            from "@/components/Hero";
import DiscoverSection from "@/components/DiscoverSection";
import DishSection     from "@/components/DishSection";
import FoodiesSection  from "@/components/FoodiesSection";
import CardStack       from "@/components/CardStack";
import MeshBackground from "@/components/MeshBackground";



// ScrollReveal is exported from its file and can be used
// inside any component like: <ScrollReveal delay={0.1}>...</ScrollReveal>
// It's already being used inside DiscoverSection, DishSection, FoodiesSection
// via the useInView hook — CardStack uses Framer Motion directly

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}

      <main style={{ background:"#FDFBF7", opacity:showSplash?0:1, transition:"opacity 0.7s" }}>

        {/* Fixed top ticker — always visible */}
        <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:70 }}>
          <TickerBanner />
        </div>

        {/* Spacer so content doesn't hide behind fixed ticker */}
        <div style={{ height:36 }} />

        <Navbar scrolled={scrolled} />

        {/* ── Section 1: Hero ── */}
        <Hero />

        {/* ── Section 2: Discover ── */}
        <DiscoverSection />

        {/* ── Section 3: Dish Ratings ── */}
        <DishSection />

        {/* ── Section 4: Foodies / Reviews ── */}
        <FoodiesSection />

        {/* ── Section 5: Swipeable Card Stack ── */}
        <CardStack />

        {/* More sections coming — add them here */}

      </main>
    </>
  );
}