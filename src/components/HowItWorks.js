"use client";
import { useState, useEffect } from "react";
import { theme as t } from "./theme";
import useInView from "./useInView";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    short: "Find your spot",
    body: "Search by name, location, cuisine, or vibe. Filter by mood — solo work session, date night, family brunch. Our hidden gems algorithm surfaces places the crowd hasn't found yet.",
  },
  {
    num: "02",
    title: "Explore Menus",
    short: "Know before you go",
    body: "Every dish has its own rating for quality and quantity. Browse full digital menus, check allergen tags, see what's seasonal, new, or sold out — before you even walk in.",
  },
  {
    num: "03",
    title: "Read Real Reviews",
    short: "Only verified voices",
    body: "Every review is tied to a verified visit. No bots, no incentivised posts. Just honest opinions from people who actually sat at that table and ordered that dish.",
  },
  {
    num: "04",
    title: "Reserve a Table",
    short: "Book in seconds",
    body: "Select your date, time, guests, and seating preference. Pre-order dishes ahead, join the waitlist for fully booked slots, and notify the restaurant if you're running late.",
  },
  {
    num: "05",
    title: "Share & Contribute",
    short: "Pay it forward",
    body: "Post photos, rate dishes, write reviews, and build curated lists. The more you contribute, the better Avocado gets for everyone. Earn badges. Become a local food authority.",
  },
];

// Auto-rotate interval in ms
const AUTO_MS = 5000;

export default function HowItWorks() {
  const [headRef, headIn] = useInView();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  // ── Auto-rotate through steps ──────────────────────────
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % STEPS.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [paused]);

  // ── Fade animation on step change ─────────────────────
  useEffect(() => {
    setAnimating(true);
    const id = setTimeout(() => setAnimating(false), 300);
    return () => clearTimeout(id);
  }, [active]);

  // ── Manual click — pause for 8 s then resume ──────────
  const handleClick = (i) => {
    setActive(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };

  return (
    <section
      style={{ background:"rgba(247,241,232,0.82)", backdropFilter:"blur(3px)", minHeight:"100vh", display:"flex", alignItems:"center" }}
      className="py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* ── Heading block — centred ── */}
        <div ref={headRef}
          style={{ textAlign:"center", maxWidth:640, margin:"0 auto 72px", opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(28px)", transition:"all 0.7s ease" }}>

          {/* Small capsule */}
          <span style={{ display:"inline-block", background:"#11111115", color:"#111111", fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.22em", textTransform:"uppercase", padding:"6px 18px", borderRadius:999, marginBottom:22 }}>
            Experience
          </span>

          {/* Big heading */}
          <h2 style={{ color:"#111111", fontFamily:t.fontHeading, fontSize:"clamp(38px,6vw,72px)", fontWeight:700, lineHeight:1.05, letterSpacing:"-0.01em", margin:0 }}>
            How Avocado works
          </h2>
        </div>

        {/* ── Desktop: horizontal row ── */}
        {/* ── Mobile: vertical stack ── */}
        <div style={{ display:"flex", flexDirection:"row", gap:12, alignItems:"stretch", overflowX:"auto", paddingBottom:8 }}
          className="flex-col md:flex-row">

          {STEPS.map((step, i) => {
            const isActive = active === i;
            return (
              <button
                key={step.num}
                onClick={() => handleClick(i)}
                style={{
                  // Inactive cards are narrow; active card expands
                  flex: isActive ? "3 1 0" : "1 1 0",
                  minWidth: isActive ? 260 : 72,
                  maxWidth: isActive ? 480 : 140,
                  background: isActive ? t.chocolateDeep : `${t.chocolateDeep}CC`,
                  borderRadius: "1.5rem",
                  padding: isActive ? "36px 32px" : "36px 20px",
                  border: isActive ? `1.5px solid ${t.beigeDark}` : `1px solid ${t.chocolateMid}40`,
                  cursor: "pointer",
                  transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 340,
                  boxShadow: isActive ? `0 20px 50px ${t.chocolateDeep}50` : `0 4px 16px ${t.chocolateDeep}20`,
                  position: "relative",
                  overflow: "hidden",
                }}>

                {/* Decorative ring — only on active */}
                {isActive && (
                  <div style={{ position:"absolute", top:-50, right:-50, width:160, height:160, borderRadius:"50%", border:`1px solid ${t.beigeDark}25`, pointerEvents:"none" }} />
                )}

                {/* ── TOP: number + short title ── */}
                <div>
                  {/* Step number — always visible */}
                  <p style={{ fontFamily:t.fontHeading, fontSize:isActive?48:36, fontWeight:700, color: isActive ? t.beigeDark : `${t.beigeDark}80`, lineHeight:1, marginBottom:isActive?14:8, transition:"all 0.4s" }}>
                    {step.num}
                  </p>

                  {/* Title */}
                  <p style={{ fontFamily:t.fontHeading, fontSize:isActive?22:14, fontWeight:600, color:t.cream, lineHeight:1.2, marginBottom:isActive?6:0, transition:"all 0.4s", whiteSpace: isActive?"normal":"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                    {step.title}
                  </p>

                  {/* Short label — only when collapsed */}
                  {!isActive && (
                    <p style={{ fontFamily:t.fontBody, fontSize:11, color:`${t.cream}70`, marginTop:6, letterSpacing:"0.04em" }}>
                      {step.short}
                    </p>
                  )}
                </div>

                {/* ── EXPANDED CONTENT — fades in when active ── */}
                {isActive && (
                  <div style={{ opacity:animating?0:1, transform:animating?"translateY(8px)":"translateY(0)", transition:"all 0.35s ease" }}>

                    {/* Divider */}
                    <div style={{ width:32, height:2, background:t.beigeDark, borderRadius:2, margin:"18px 0" }} />

                    {/* Body text */}
                    <p style={{ fontFamily:t.fontBody, fontSize:14, color:`${t.cream}CC`, lineHeight:1.85, marginBottom:24 }}>
                      {step.body}
                    </p>

                    {/* Progress dots */}
                    <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                      {STEPS.map((_, di) => (
                        <div key={di} style={{ width: di===active?20:6, height:6, borderRadius:999, background: di===active ? t.beigeDark : `${t.beigeDark}40`, transition:"all 0.3s" }} />
                      ))}
                      <span style={{ marginLeft:8, fontFamily:t.fontBody, fontSize:11, color:`${t.cream}60`, letterSpacing:"0.05em" }}>
                        {active+1} / {STEPS.length}
                      </span>
                    </div>
                  </div>
                )}

                {/* ── BOTTOM: vertical label when collapsed ── */}
                {!isActive && (
                  <div style={{ display:"flex", justifyContent:"center" }}>
                    <p style={{ fontFamily:t.fontBody, fontSize:10, color:`${t.cream}50`, letterSpacing:"0.15em", textTransform:"uppercase", writingMode:"vertical-rl", transform:"rotate(180deg)" }}>
                      {step.short}
                    </p>
                  </div>
                )}

                {/* Progress bar on active card */}
                {isActive && !paused && (
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:`${t.beigeDark}30`, borderRadius:"0 0 1.5rem 1.5rem" }}>
                    <div style={{ height:"100%", background:t.beigeDark, borderRadius:"inherit", animation:`stepProgress ${AUTO_MS}ms linear forwards` }} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Mobile dots (visible below md) ── */}
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:28 }} className="md:hidden">
          {STEPS.map((_, i) => (
            <button key={i} onClick={() => handleClick(i)}
              style={{ width:i===active?22:8, height:8, borderRadius:999, background:i===active?t.chocolateDeep:t.beigeDark, border:"none", cursor:"pointer", padding:0, transition:"all 0.3s" }} />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes stepProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @media (max-width: 768px) {
          .how-row { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}