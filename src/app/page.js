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
import WhySection      from "@/components/WhySection";
import HowItWorks  from "@/components/HowItWorks";
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
      <main style={{ background:"transparent", opacity:showSplash?0:1, transition:"opacity 0.7s" }}>

        {/* Fixed ticker — always on top */}
        <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:70 }}>
          <TickerBanner />
        </div>
        <div style={{ height:36 }} />

        <Navbar scrolled={scrolled} />

        {/* Page 1 */}
        <Hero />

        {/* Page 2 */}
        <DiscoverSection />

        {/* Page 3 */}
        <DishSection />

        {/* Page 4 */}
        <FoodiesSection />

        {/* Page 5 */}
        <WhySection />

        {/* Page 6+ coming soon */}
        <HowItWorks /> 

      </main>
    </>
  );
}