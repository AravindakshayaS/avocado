"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { theme as t } from "./theme";
import useInView from "./useInView";

const DISHES = [
  { name:"Hazelnut Flat White", price:280, rating:4.8, desc:"Nutty, smooth, perfectly balanced microfoam. A morning ritual worth every sip.", quality:4.7, quantity:4.2, tag:"Bestseller" },
  { name:"Mushroom Toast",      price:320, rating:4.9, desc:"Wild mushrooms on toasted sourdough with herb oil. Earthy, generous, unforgettable.", quality:4.9, quantity:4.5, tag:"Top Rated" },
  { name:"Cold Brew",           price:240, rating:4.6, desc:"Slow-steeped for 18 hours. Clean, bold, no bitterness. Worth the wait.", quality:4.6, quantity:4.3, tag:"Popular" },
  { name:"Avocado Toast",       price:380, rating:4.7, desc:"Smashed avocado, chilli flakes, lemon zest on sourdough. The classic done right.", quality:4.6, quantity:4.4, tag:"Classic" },
];

const AUTO_INTERVAL = 2000; // ms between auto-rotations

export default function DishSection() {
  const [headRef, headIn] = useInView();
  const [active, setActive]       = useState(0);
  const [paused, setPaused]       = useState(false);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef(null);

  // ── Start / restart the auto-rotation interval ──────────
  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % DISHES.length);
    }, AUTO_INTERVAL);
  }, []);

  // ── Boot interval on mount; clear on unmount ─────────────
  useEffect(() => {
    if (!paused) startInterval();
    return () => clearInterval(intervalRef.current);
  }, [paused, startInterval]);

  // ── Animate content swap on active change ───────────────
  useEffect(() => {
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 350);
    return () => clearTimeout(t);
  }, [active]);

  // ── Manual click — clear auto timer for 6 s then resume ─
  const handleManualSelect = (i) => {
    clearInterval(intervalRef.current);
    setActive(i);
    setPaused(true);
    setTimeout(() => {
      setPaused(false);         // triggers useEffect → restarts interval
    }, 6000);
  };

  const dish = DISHES[active];

  return (
    <section
      style={{ background:"rgba(237,224,204,0.70)", backdropFilter:"blur(2px)", minHeight:"100vh", display:"flex", alignItems:"center" }}
      className="py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* ── Centered heading ── */}
        <div ref={headRef} style={{ textAlign:"center", maxWidth:700, margin:"0 auto 64px", opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(30px)", transition:"all 0.7s ease" }}>
          <p style={{ color:t.chocolateMid, fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:20 }}>
            Dish Ratings
          </p>
          <h2 style={{
            fontFamily: t.fontHeading,
            fontSize: "clamp(44px, 7vw, 88px)",
            fontWeight: 700,
            color: "#111111",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            margin: 0,
          }}>
            Know exactly what
          </h2>
          
          <h2 style={{
            fontFamily: t.fontHeading,
            fontSize: "clamp(44px, 7vw, 88px)",
            fontWeight: 700,
            color: "#6B1E2E",
            fontStyle: "italic",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            margin: 0,
          }}>
            you're ordering.
          </h2>
        
          
          <div style={{ width:48, height:2, background:t.chocolateDeep, borderRadius:2, margin:"0 auto 24px" }} />
          <p style={{ color:t.chocolateMid, fontFamily:t.fontBody, fontSize:16, lineHeight:1.8 }}>
            Every dish on Avocado is rated for quality and quantity by verified diners.
            No more disappointment. No more overpriced portions.
          </p>
        </div>

        {/* ── Main layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── LEFT: clickable dish cards ── */}
          <div className="grid grid-cols-2 gap-4">
            {DISHES.map((dish, i) => {
              const isActive = active === i;
              return (
                <button key={dish.name}
                  onClick={() => handleManualSelect(i)}
                  style={{
                    background: isActive ? t.chocolateDeep : "rgba(253,251,247,0.85)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    borderRadius: "1.25rem",
                    padding: "22px 20px",
                    cursor: "pointer",
                    border: isActive ? "none" : `1px solid ${t.beigeDark}50`,
                    boxShadow: isActive ? `0 12px 32px ${t.chocolateDeep}40` : `0 2px 12px ${t.chocolateDeep}0A`,
                    textAlign: "left",
                    width: "100%",
                    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                    position: "relative",
                    overflow: "hidden",
                  }}>

                  {/* Auto-progress bar — only on active card */}
                  {isActive && !paused && (
                    <div style={{ position:"absolute", bottom:0, left:0, height:3, background:t.beigeDark, borderRadius:"0 0 1.25rem 1.25rem", animation:`progressBar ${AUTO_INTERVAL}ms linear infinite`, transformOrigin:"left" }} />
                  )}
                  {/* Paused indicator */}
                  {isActive && paused && (
                    <div style={{ position:"absolute", top:10, right:14, width:6, height:6, borderRadius:"50%", background:t.beigeDark, opacity:0.7 }} />
                  )}

                  {/* Tag pill */}
                  <span style={{ display:"inline-block", background: isActive ? "rgba(255,255,255,0.15)" : t.beigeMid, color: isActive ? t.cream : t.chocolateMid, fontFamily:t.fontBody, fontSize:10, letterSpacing:"0.08em", padding:"3px 10px", borderRadius:999, marginBottom:12 }}>
                    {dish.tag}
                  </span>

                  <p style={{ color: isActive ? t.cream : t.chocolateDeep, fontFamily:t.fontHeading, fontSize:18, fontWeight:600, marginBottom:8, lineHeight:1.3 }}>
                    {dish.name}
                  </p>

                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ color: isActive ? t.beigeDark : t.chocolateLight, fontFamily:t.fontBody, fontSize:13, fontWeight:600 }}>
                      ₹{dish.price}
                    </span>
                    <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <svg style={{ width:12, height:12, color: isActive ? t.beigeDark : t.chocolateMid }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span style={{ color: isActive ? t.cream : t.chocolateDeep, fontFamily:t.fontHeading, fontSize:14, fontWeight:600 }}>
                        {dish.rating}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Dot indicators */}
            <div style={{ gridColumn:"span 2", display:"flex", justifyContent:"center", gap:8, paddingTop:8 }}>
              {DISHES.map((_, i) => (
                <button key={i} onClick={() => handleManualSelect(i)}
                  style={{ width: active===i ? 24 : 8, height:8, borderRadius:999, background: active===i ? t.chocolateDeep : t.beigeDark, border:"none", cursor:"pointer", transition:"all 0.3s", padding:0 }} />
              ))}
            </div>
          </div>

          {/* ── RIGHT: animated detail panel ── */}
          <div style={{ background:t.chocolateDeep, borderRadius:"1.75rem", padding:"40px 36px", position:"relative", overflow:"hidden", minHeight:340 }}>

            {/* Decorative rings */}
            <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", border:`1px solid ${t.chocolateLight}20`, pointerEvents:"none" }} />
            <div style={{ position:"absolute", top:-30, right:-30, width:130, height:130, borderRadius:"50%", border:`1px solid ${t.chocolateLight}15`, pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:-40, left:-40, width:160, height:160, borderRadius:"50%", border:`1px solid ${t.chocolateLight}10`, pointerEvents:"none" }} />

            {/* Content — fades on each transition */}
            <div style={{ position:"relative", zIndex:2, opacity: animating?0:1, transform: animating?"translateY(8px)":"translateY(0)", transition:"all 0.35s ease" }}>

              {/* Label + name + price */}
              <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:10 }}>
                Selected Dish
              </p>
              <h3 style={{ color:t.cream, fontFamily:t.fontHeading, fontSize:32, fontWeight:600, marginBottom:6, lineHeight:1.2 }}>
                {dish.name}
              </h3>
              <p style={{ color:t.beigeDark, fontFamily:t.fontHeading, fontSize:24, marginBottom:0 }}>
                ₹{dish.price}
              </p>

              {/* Divider */}
              <div style={{ width:"100%", height:1, background:`${t.chocolateLight}30`, margin:"22px 0" }} />

              {/* Description */}
              <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:14, lineHeight:1.85, marginBottom:28, maxWidth:320 }}>
                {dish.desc}
              </p>

              {/* Quality + Quantity bars */}
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {[["Quality", dish.quality], ["Quantity", dish.quantity]].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                      <span style={{ color:t.cream, fontFamily:t.fontBody, fontSize:13, letterSpacing:"0.05em" }}>{label}</span>
                      <span style={{ color:t.beigeDark, fontFamily:t.fontHeading, fontSize:14 }}>{val} / 5</span>
                    </div>
                    <div style={{ background:`${t.chocolateLight}30`, height:5, borderRadius:999 }}>
                      <div style={{ background:t.beigeDark, height:5, borderRadius:999, width:`${(val/5)*100}%`, transition:"width 0.55s ease" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Auto/paused status indicator */}
              <div style={{ marginTop:24, display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background: paused ? t.beigeDark : "#7FAF7F", transition:"background 0.3s" }} />
                <span style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.08em" }}>
                  {paused ? "Paused — resuming shortly" : "Auto-rotating every 2s"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar animation */}
      <style>{`
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}