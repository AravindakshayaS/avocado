"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { theme as t } from "./theme";

const NAV_PANELS = {
  Discover:  ["Cafes Near Me","Hidden Gems","New Openings","By Mood","Top Rated","City Map"],
  Menu:      ["All Dishes","Dish Ratings","Vegan Options","Seasonal Specials","Allergen Guide","Today's Specials"],
  Community: ["Reviews","Curated Lists","Follow Foodies","Check-in Stories","Milestones","For Owners"],
};

export default function Navbar({ scrolled }) {
  const [activePanel, setActivePanel] = useState(null);
  const [mobile, setMobile] = useState(false);
  const timeout = useRef(null);
  const navRef = useRef(null);

  const open  = (k) => { clearTimeout(timeout.current); setActivePanel(k); };
  const close = ()  => { timeout.current = setTimeout(() => setActivePanel(null), 180); };

  useEffect(() => {
    const h = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setActivePanel(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const isScrolled = scrolled || activePanel;

  return (
    <nav ref={navRef}
      style={{ background: isScrolled ? "rgba(253,251,247,0.88)" : "transparent", borderBottom: isScrolled ? `1px solid ${t.beigeDark}40` : "none", backdropFilter: isScrolled ? "blur(16px)" : "none", transition:"all 0.4s", top:36 }}
      className="fixed left-0 right-0 z-50">

      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" style={{ color: isScrolled ? t.chocolateDeep : t.cream, transition:"color 0.3s" }} className="font-heading text-xl tracking-widest">
          Avocado
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {Object.keys(NAV_PANELS).map(key => (
            <li key={key} className="relative" onMouseEnter={() => open(key)} onMouseLeave={close}>
              <button
                style={{ color: activePanel===key ? t.chocolateDeep : isScrolled ? t.chocolateMid : t.cream, background: activePanel===key ? t.beigeMid : "transparent", transition:"all 0.2s" }}
                className="px-4 py-1.5 rounded-lg text-sm font-body font-medium tracking-wider">
                {key}
              </button>
            </li>
          ))}
        </ul>

        <button
          style={{ background:t.beigeDark, color:t.chocolateDeep, borderRadius:999, padding:"9px 22px", fontFamily:t.fontBody, fontSize:13, fontWeight:600, border:"none", cursor:"pointer", transition:"all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background="#C19A6B"; e.currentTarget.style.transform="scale(1.03)"; }}
          onMouseLeave={e => { e.currentTarget.style.background=t.beigeDark; e.currentTarget.style.transform="scale(1)"; }}>
          Join Waitlist
        </button>

        <button onClick={() => setMobile(!mobile)} className="md:hidden p-2">
          <div className="space-y-1.5">
            {[0,1,2].map(i => <span key={i} style={{ background: isScrolled ? t.chocolateDeep : t.cream, transition:"background 0.3s" }} className="block w-5 h-0.5 rounded" />)}
          </div>
        </button>
      </div>

      {activePanel && (
        <div onMouseEnter={() => open(activePanel)} onMouseLeave={close}
          style={{ background:t.chocolateDeep, borderRadius:"1.25rem", boxShadow:`0 24px 60px ${t.chocolateDeep}66`, border:`1px solid ${t.chocolateMid}50`, position:"absolute", top:60, left:"50%", transform:"translateX(-50%)", width:560, padding:20, zIndex:50 }}>
          <p style={{ color:t.chocolateLight }} className="font-body text-xs tracking-[0.25em] uppercase mb-4">{activePanel}</p>
          <div className="grid grid-cols-3 gap-2">
            {NAV_PANELS[activePanel].map(item => (
              <a key={item} href="#"
                style={{ background:`${t.chocolateMid}30`, border:`1px solid ${t.chocolateLight}25`, borderRadius:"0.75rem", color:t.cream, padding:"12px 16px", fontFamily:t.fontBody, fontSize:13, display:"block", transition:"background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background=`${t.chocolateMid}55`}
                onMouseLeave={e => e.currentTarget.style.background=`${t.chocolateMid}30`}>
                {item}
              </a>
            ))}
          </div>
        </div>
      )}

      {mobile && (
        <div style={{ background:t.cream, borderTop:`1px solid ${t.beigeDark}40` }} className="md:hidden px-6 py-4 space-y-1">
          {Object.keys(NAV_PANELS).map(key => (
            <a key={key} href="#" style={{ color:t.chocolateDeep }} className="block px-3 py-2.5 font-body text-sm rounded-xl hover:opacity-70">{key}</a>
          ))}
        </div>
      )}
    </nav>
  );
}