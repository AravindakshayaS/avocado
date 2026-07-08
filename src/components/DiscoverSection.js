"use client";
import { theme as t } from "./theme";
import useInView from "./useInView";

const DISCOVER_CAFES = [
  { name:"Beanstalk Café",  rating:4.8, location:"Banjara Hills", tags:["Pour Over","WiFi","Bakery"],  food:4.9, service:4.6, ambience:4.8 },
  { name:"The Dark Roast",  rating:4.5, location:"Madhapur",      tags:["Live Music","Pet Friendly"],  food:4.4, service:4.5, ambience:4.7 },
  { name:"Patio & Press",   rating:4.6, location:"Jubilee Hills", tags:["Vegan","Outdoor"],            food:4.7, service:4.3, ambience:4.9 },
];

function CafeCard({ cafe, index }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease ${index * 0.12}s`,
        background: t.chocolateMid,
        borderRadius: "1.25rem",
        padding: "28px 24px",
        cursor: "pointer",
        border: `1px solid ${t.chocolateLight}40`,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = t.chocolateLight; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = t.chocolateMid; e.currentTarget.style.transform = "translateY(0)"; }}>

      {/* Top row — name + rating */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <h3 style={{ color:t.cream, fontFamily:t.fontHeading, fontSize:22, fontWeight:600, marginBottom:4, letterSpacing:"0.02em" }}>{cafe.name}</h3>
          <p style={{ color:t.beigeDark, fontFamily:t.fontBody, fontSize:12, display:"flex", alignItems:"center", gap:5 }}>
            <svg style={{ width:12, height:12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {cafe.location}
          </p>
        </div>
        <div style={{ background:`${t.cream}15`, borderRadius:999, padding:"6px 14px", display:"flex", alignItems:"center", gap:5 }}>
          <svg style={{ width:13, height:13, color:t.beigeDark }} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span style={{ color:t.cream, fontFamily:t.fontHeading, fontSize:15, fontWeight:600 }}>{cafe.rating}</span>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
        {cafe.tags.map(tag => (
          <span key={tag} style={{ background:`${t.cream}15`, color:t.beigeMid, fontSize:11, padding:"4px 12px", borderRadius:999, fontFamily:t.fontBody, letterSpacing:"0.04em" }}>{tag}</span>
        ))}
      </div>

      {/* Ratings row */}
      <div style={{ display:"flex", justifyContent:"space-between", borderTop:`1px solid ${t.cream}15`, paddingTop:16 }}>
        {[["Food", cafe.food], ["Service", cafe.service], ["Ambience", cafe.ambience]].map(([label, val]) => (
          <div key={label} style={{ textAlign:"center" }}>
            <p style={{ color:t.cream, fontFamily:t.fontHeading, fontSize:20, fontWeight:600 }}>{val}</p>
            <p style={{ color:t.beigeDark, fontFamily:t.fontBody, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DiscoverSection() {
  const [headRef, headIn] = useInView();

  return (
    <section style={{ background:t.chocolateDeep, minHeight:"100vh", display:"flex", alignItems:"center" }} className="py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Centered heading block */}
        <div ref={headRef}
          style={{ textAlign:"center", maxWidth:720, margin:"0 auto 64px", opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(30px)", transition:"all 0.7s ease" }}>
          <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:16 }}>Discover</p>
          <h2 style={{ color:t.cream, fontFamily:t.fontHeading, fontSize:"clamp(36px,5vw,60px)", lineHeight:1.1, letterSpacing:"0.02em", marginBottom:24 }}>
            Find your next<br />favourite spot.
          </h2>
          <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:16, lineHeight:1.8, maxWidth:560, margin:"0 auto" }}>
            Search by name, location, cuisine, or vibe. Filter by mood — solo work, date night, family brunch.
            Discover hidden gems you never knew existed.
          </p>
        </div>

        {/* Cards — no images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DISCOVER_CAFES.map((cafe, i) => <CafeCard key={cafe.name} cafe={cafe} index={i} />)}
        </div>

      </div>
    </section>
  );
}