"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { theme as t } from "./theme";
import WaitlistModal from "./WaitlistModal";

const NAV_ITEMS = [
  { label:"Discover", sectionId:"discover" },
  { label:"Dish",     sectionId:"dish" },
  { label:"Foodies",  sectionId:"foodies" },
];

const NAV_PANELS = {
  Discover: ["Cafes Near Me","Hidden Gems","New Openings","By Mood","Top Rated","City Map"],
  Dish:     ["All Dishes","Dish Ratings","Vegan Options","Seasonal Specials","Allergen Guide","Today's Specials"],
  Foodies:  ["Reviews","Curated Lists","Follow Foodies","Check-in Stories","Milestones","For Owners"],
};

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
}

export default function Navbar({ scrolled }) {
  const [activePanel, setActivePanel] = useState(null);
  const [mobile, setMobile]           = useState(false);
  const [activeNav, setActiveNav]     = useState(null);
  const [modalOpen, setModalOpen]     = useState(false); // ← controls the modal
  const timeout = useRef(null);
  const navRef  = useRef(null);

  const openPanel  = (k) => { clearTimeout(timeout.current); setActivePanel(k); };
  const closePanel = ()  => { timeout.current = setTimeout(() => setActivePanel(null), 180); };

  useEffect(() => {
    const h = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setActivePanel(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    const ids = ["discover","dish","foodies"];
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          const match = NAV_ITEMS.find(n => n.sectionId === id);
          if (match) setActiveNav(match.label);
        }
      }, { threshold: 0.4 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const isScrolled = scrolled || activePanel;

  return (
    <>
      {/* ── Waitlist modal — rendered here, toggled by modalOpen ── */}
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <nav ref={navRef}
        style={{
          background: isScrolled ? "rgba(253,251,247,0.97)" : "transparent",
          borderBottom: isScrolled ? `1px solid ${t.beigeDark}40` : "none",
          backdropFilter: isScrolled ? "blur(16px)" : "none",
          transition: "all 0.4s",
          top: 36,
        }}
        className="fixed left-0 right-0 z-50">

        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link href="/"
            style={{ color: isScrolled ? t.chocolateDeep : t.cream, fontFamily:t.fontHeading, fontSize:"1.5rem", letterSpacing:"0.1em", transition:"color 0.3s", textDecoration:"none" }}>
            Avocado
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map(nav => {
              const isActive = activeNav === nav.label;
              const hasPanel = NAV_PANELS[nav.label]?.length > 0;
              return (
                <li key={nav.label} className="relative"
                  onMouseEnter={() => hasPanel && openPanel(nav.label)}
                  onMouseLeave={closePanel}>
                  <button
                    onClick={() => { setActiveNav(nav.label); scrollToSection(nav.sectionId); setActivePanel(null); }}
                    style={{
                      background: "#111111",
                      color: "#FFFFFF",
                      borderRadius: 999,
                      padding: "8px 20px",
                      fontFamily: t.fontBody,
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      boxShadow: isActive ? "0 0 0 2px #111111, 0 0 0 4px rgba(255,255,255,0.4)" : "none",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity="0.8"; e.currentTarget.style.transform="scale(1.04)"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity="1";   e.currentTarget.style.transform="scale(1)"; }}>
                    {nav.label}
                  </button>

                  {activePanel === nav.label && NAV_PANELS[nav.label] && (
                    <div
                      onMouseEnter={() => openPanel(nav.label)}
                      onMouseLeave={closePanel}
                      style={{ background:t.chocolateDeep, borderRadius:"1.25rem", boxShadow:`0 24px 60px ${t.chocolateDeep}66`, border:`1px solid ${t.chocolateMid}50`, position:"absolute", top:48, left:"50%", transform:"translateX(-50%)", width:360, padding:16, zIndex:50 }}>
                      <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:10, letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:12 }}>{nav.label}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {NAV_PANELS[nav.label].map(item => (
                          <a key={item} href="#"
                            onClick={e => { e.preventDefault(); scrollToSection(nav.sectionId); setActivePanel(null); }}
                            style={{ background:`${t.chocolateMid}30`, border:`1px solid ${t.chocolateLight}25`, borderRadius:"0.75rem", color:t.cream, padding:"10px 14px", fontFamily:t.fontBody, fontSize:12, display:"block", transition:"background 0.15s" }}
                            onMouseEnter={e => e.currentTarget.style.background=`${t.chocolateMid}55`}
                            onMouseLeave={e => e.currentTarget.style.background=`${t.chocolateMid}30`}>
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* ── Join Waitlist button — opens modal ── */}
          <button
            onClick={() => setModalOpen(true)}
            style={{ background:t.beigeDark, color:t.chocolateDeep, borderRadius:999, padding:"9px 22px", fontFamily:t.fontBody, fontSize:13, fontWeight:600, border:"none", cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#C19A6B"; e.currentTarget.style.transform="scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.background=t.beigeDark; e.currentTarget.style.transform="scale(1)"; }}>
            Join Waitlist
          </button>

          {/* Hamburger */}
          <button onClick={() => setMobile(!mobile)} className="md:hidden p-2">
            <div className="space-y-1.5">
              {[0,1,2].map(i => (
                <span key={i} style={{ background: isScrolled ? t.chocolateDeep : t.cream, transition:"background 0.3s" }} className="block w-5 h-0.5 rounded" />
              ))}
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobile && (
          <div style={{ background:t.cream, borderTop:`1px solid ${t.beigeDark}40` }} className="md:hidden px-6 py-4 space-y-2">
            {NAV_ITEMS.map(nav => (
              <button key={nav.label}
                onClick={() => { scrollToSection(nav.sectionId); setMobile(false); setActiveNav(nav.label); }}
                style={{ display:"block", width:"100%", textAlign:"left", background:"#111111", color:"#FFFFFF", border:"none", borderRadius:12, padding:"12px 16px", fontFamily:t.fontBody, fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:6 }}>
                {nav.label}
              </button>
            ))}
            {/* Mobile waitlist button */}
            <button
              onClick={() => { setMobile(false); setModalOpen(true); }}
              style={{ display:"block", width:"100%", background:t.beigeDark, color:t.chocolateDeep, border:"none", borderRadius:12, padding:"12px 16px", fontFamily:t.fontBody, fontSize:13, fontWeight:600, cursor:"pointer", marginTop:8 }}>
              Join Waitlist
            </button>
          </div>
        )}
      </nav>
    </>
  );
}