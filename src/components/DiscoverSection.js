"use client";
import { theme as t } from "./theme";
import useInView from "./useInView";

const DISCOVER_CAFES = [
  { name:"Beanstalk Café",  rating:4.8, location:"Banjara Hills", tags:["Pour Over","WiFi","Bakery"],   food:4.9, service:4.6, ambience:4.8 },
  { name:"The Dark Roast",  rating:4.5, location:"Madhapur",      tags:["Live Music","Pet Friendly"],   food:4.4, service:4.5, ambience:4.7 },
  { name:"Patio & Press",   rating:4.6, location:"Jubilee Hills", tags:["Vegan","Outdoor"],             food:4.7, service:4.3, ambience:4.9 },
];

function CafeCard({ cafe, index }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.6s ease ${index * 0.13}s`,
        background: t.cream,
        borderRadius: "1.5rem",
        padding: "28px 24px",
        boxShadow: `0 2px 20px ${t.chocolateDeep}12`,
        cursor: "pointer",
        border: `1px solid ${t.beigeMid}`,
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${t.chocolateDeep}22`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 2px 20px ${t.chocolateDeep}12`; }}>

      {/* Top row — name + rating */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
        <h3 style={{ color:t.chocolateDeep, fontFamily:t.fontHeading, fontSize:22, fontWeight:600, letterSpacing:"0.02em", lineHeight:1.2 }}>
          {cafe.name}
        </h3>
        <span style={{ background:t.chocolateDeep, color:t.cream, fontFamily:t.fontHeading, fontSize:15, fontWeight:600, padding:"4px 12px", borderRadius:999, whiteSpace:"nowrap", marginLeft:12 }}>
          {cafe.rating}
        </span>
      </div>

      {/* Location */}
      <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:12, marginBottom:14, display:"flex", alignItems:"center", gap:5 }}>
        <svg style={{ width:12, height:12, flexShrink:0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        {cafe.location}
      </p>

      {/* Tags */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
        {cafe.tags.map(tag => (
          <span key={tag} style={{ background:t.beigeMid, color:t.chocolateMid, fontSize:11, padding:"4px 12px", borderRadius:999, fontFamily:t.fontBody, letterSpacing:"0.03em" }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Ratings row */}
      <div style={{ borderTop:`1px solid ${t.beigeMid}`, paddingTop:16, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
        {[["Food", cafe.food], ["Service", cafe.service], ["Ambience", cafe.ambience]].map(([label, val]) => (
          <div key={label} style={{ textAlign:"center" }}>
            <p style={{ color:t.chocolateDeep, fontFamily:t.fontHeading, fontSize:20, fontWeight:600, marginBottom:2 }}>{val}</p>
            <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DiscoverSection() {
  const [headRef, headIn] = useInView();
  return (
    <section id="discover" style={{ background:t.chocolateDeep, minHeight:"100vh", display:"flex", alignItems:"center" }} className="py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Centered heading block */}
        <div ref={headRef} style={{ textAlign:"center", maxWidth:700, margin:"0 auto 64px", opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(30px)", transition:"all 0.7s ease" }}>
          <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:20 }}>
            About Discover
          </p>
          <h2 style={{ color:t.cream, fontFamily:t.fontDisplay, fontSize:"clamp(36px,5vw,60px)", fontWeight:600, letterSpacing:"0.02em", lineHeight:1.1, marginBottom:24 }}>
            Find your next favourite spot.
          </h2>
          <div style={{ width:48, height:2, background:t.beigeDark, borderRadius:2, margin:"0 auto 24px" }} />
          <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:16, lineHeight:1.8 }}>
            Search by name, location, cuisine, or vibe. Filter by mood — solo work, date night, family brunch.
            Discover hidden gems you never knew existed.
          </p>
        </div>

        {/* Cafe cards — no images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DISCOVER_CAFES.map((cafe, i) => <CafeCard key={cafe.name} cafe={cafe} index={i} />)}
        </div>
      </div>
    </section>
  );
}