"use client";
import { useState, useEffect } from "react";
import { theme as t } from "./theme";
import useInView from "./useInView";

// ── Nav tabs inside the phone ──────────────────────────
const TABS = [
  { id:"home",    icon:"🏠", label:"Home" },
  { id:"explore", icon:"🔍", label:"Explore" },
  { id:"menu",    icon:"📋", label:"Menu" },
  { id:"reserve", icon:"📅", label:"Reserve" },
];

// ── Left nav dots ──────────────────────────────────────
const NAV_DOTS = [
  { id:"home",    label:"Home" },
  { id:"explore", label:"Explore" },
  { id:"menu",    label:"Menu" },
  { id:"reserve", label:"Reserve" },
];

// ─────────────────────────────────────────────────────
// PHONE SCREENS
// ─────────────────────────────────────────────────────

function HomeScreen() {
  return (
    <div style={{ flex:1, overflowY:"auto", background:"#F7F1E8", padding:"14px 14px 0" }}>
      {/* Search */}
      <div style={{ background:"white", borderRadius:12, padding:"9px 13px", display:"flex", alignItems:"center", gap:8, marginBottom:14, boxShadow:"0 1px 6px rgba(59,36,24,0.09)" }}>
        <span style={{ fontSize:13 }}>🔍</span>
        <span style={{ fontFamily:t.fontBody, fontSize:12, color:"#B0A090" }}>Search cafés, dishes...</span>
      </div>

      {/* Mood filters */}
      <div style={{ display:"flex", gap:7, marginBottom:16, overflowX:"auto", paddingBottom:2 }}>
        {[["☕","Work"],["🌹","Date"],["👨‍👩‍👧","Family"],["⚡","Quick"]].map(([ico,label]) => (
          <div key={label} style={{ flexShrink:0, background:t.chocolateDeep, borderRadius:20, padding:"5px 11px", display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ fontSize:11 }}>{ico}</span>
            <span style={{ fontFamily:t.fontBody, fontSize:11, color:t.cream, whiteSpace:"nowrap" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Section label */}
      <p style={{ fontFamily:t.fontHeading, fontSize:14, color:t.chocolateDeep, fontWeight:600, marginBottom:10 }}>Trending Near You</p>

      {/* Cafe cards */}
      {[
        { name:"Beanstalk Café", rating:"4.8", loc:"Banjara Hills", tags:["Pour Over","WiFi"] },
        { name:"The Dark Roast", rating:"4.5", loc:"Madhapur",      tags:["Live Music","Pets"] },
        { name:"Patio & Press",  rating:"4.6", loc:"Jubilee Hills", tags:["Vegan","Outdoor"] },
      ].map(cafe => (
        <div key={cafe.name} style={{ background:"white", borderRadius:14, padding:"12px 13px", marginBottom:10, boxShadow:"0 1px 8px rgba(59,36,24,0.07)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
            <p style={{ fontFamily:t.fontHeading, fontSize:13, fontWeight:600, color:t.chocolateDeep }}>{cafe.name}</p>
            <span style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateDeep, background:"#F0E6D3", padding:"2px 8px", borderRadius:99 }}>⭐ {cafe.rating}</span>
          </div>
          <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:8 }}>📍 {cafe.loc}</p>
          <div style={{ display:"flex", gap:5 }}>
            {cafe.tags.map(tag => (
              <span key={tag} style={{ fontFamily:t.fontBody, fontSize:10, color:t.chocolateMid, background:"#EDE0CC", padding:"2px 8px", borderRadius:99 }}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExploreScreen() {
  return (
    <div style={{ flex:1, overflowY:"auto", background:"#F7F1E8", padding:"14px 14px 0" }}>
      <p style={{ fontFamily:t.fontHeading, fontSize:15, fontWeight:700, color:t.chocolateDeep, marginBottom:2 }}>Beanstalk Café</p>
      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:12 }}>Banjara Hills · Open until 10 PM</p>

      {/* Open badge */}
      <div style={{ display:"inline-block", background:"#2D5A2D", color:"#F7F1E8", fontFamily:t.fontBody, fontSize:10, padding:"3px 10px", borderRadius:99, marginBottom:14 }}>Open Now</div>

      {/* Ratings */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
        {[["4.9","Food"],["4.6","Service"],["4.8","Ambience"]].map(([val,label]) => (
          <div key={label} style={{ background:"white", borderRadius:12, padding:"10px 6px", textAlign:"center", boxShadow:"0 1px 6px rgba(59,36,24,0.07)" }}>
            <p style={{ fontFamily:t.fontHeading, fontSize:18, fontWeight:700, color:t.chocolateDeep, lineHeight:1 }}>{val}</p>
            <p style={{ fontFamily:t.fontBody, fontSize:10, color:t.chocolateLight, marginTop:2 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Amenities */}
      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:7, letterSpacing:"0.05em", textTransform:"uppercase" }}>Amenities</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:14 }}>
        {["WiFi","Vegan","Outdoor","Outlets","Parking"].map(a => (
          <span key={a} style={{ fontFamily:t.fontBody, fontSize:10, background:"#EDE0CC", color:t.chocolateMid, padding:"3px 9px", borderRadius:99 }}>{a}</span>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <button style={{ flex:1, background:"white", border:`1px solid ${t.chocolateDeep}`, borderRadius:10, padding:"8px 0", fontFamily:t.fontBody, fontSize:11, color:t.chocolateDeep, cursor:"pointer" }}>View Menu</button>
        <button style={{ flex:1, background:t.chocolateDeep, borderRadius:10, padding:"8px 0", fontFamily:t.fontBody, fontSize:11, color:t.cream, border:"none", cursor:"pointer" }}>Reserve Table</button>
      </div>

      {/* Reviews */}
      <p style={{ fontFamily:t.fontHeading, fontSize:13, fontWeight:600, color:t.chocolateDeep, marginBottom:8 }}>Reviews</p>
      {[
        { name:"Priya S.", stars:5, text:"\"The mushroom toast is unbelievable. My Sunday ritual.\"" },
        { name:"Rahul K.", stars:4, text:"\"Moody lighting, great playlist, staff knows their coffee.\"" },
      ].map(r => (
        <div key={r.name} style={{ background:"white", borderRadius:12, padding:"11px 12px", marginBottom:8, boxShadow:"0 1px 6px rgba(59,36,24,0.06)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <p style={{ fontFamily:t.fontBody, fontSize:11, fontWeight:600, color:t.chocolateDeep }}>{r.name}</p>
            <span style={{ fontSize:10 }}>{"⭐".repeat(r.stars)}</span>
          </div>
          <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateMid, lineHeight:1.5 }}>{r.text}</p>
        </div>
      ))}
    </div>
  );
}

function MenuScreen() {
  const [cart, setCart] = useState({});
  const dishes = [
    { name:"Hazelnut Flat White", price:280, qty:4.5, qual:4.8 },
    { name:"Mushroom Toast",      price:320, qty:4.7, qual:4.9 },
    { name:"Cold Brew",           price:240, qty:4.3, qual:4.6 },
    { name:"Avocado Toast",       price:380, qty:4.5, qual:4.7 },
    { name:"Matcha Latte",        price:300, qty:4.4, qual:4.5 },
  ];
  const add = (name) => setCart(p => ({ ...p, [name]:(p[name]||0)+1 }));

  return (
    <div style={{ flex:1, overflowY:"auto", background:"#F7F1E8", padding:"14px 14px 0" }}>
      <p style={{ fontFamily:t.fontHeading, fontSize:15, fontWeight:700, color:t.chocolateDeep, marginBottom:14 }}>Beanstalk Café</p>
      {dishes.map(d => (
        <div key={d.name} style={{ background:"white", borderRadius:12, padding:"11px 12px", marginBottom:9, display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 1px 6px rgba(59,36,24,0.07)" }}>
          <div style={{ flex:1 }}>
            <p style={{ fontFamily:t.fontHeading, fontSize:12, fontWeight:600, color:t.chocolateDeep, marginBottom:3 }}>{d.name}</p>
            <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateMid, marginBottom:3 }}>₹{d.price}</p>
            <div style={{ display:"flex", gap:8 }}>
              <span style={{ fontFamily:t.fontBody, fontSize:10, color:t.chocolateLight }}>Qty {d.qty}</span>
              <span style={{ fontFamily:t.fontBody, fontSize:10, color:t.chocolateLight }}>Qual {d.qual}</span>
            </div>
          </div>
          <button onClick={() => add(d.name)}
            style={{ width:28, height:28, borderRadius:"50%", background: cart[d.name] ? t.chocolateDeep : "#EDE0CC", color: cart[d.name] ? t.cream : t.chocolateMid, border:"none", cursor:"pointer", fontFamily:t.fontBody, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.2s" }}>
            {cart[d.name] ? cart[d.name] : "+"}
          </button>
        </div>
      ))}
    </div>
  );
}

function ReserveScreen() {
  const [day, setDay]      = useState(0);
  const [time, setTime]    = useState(0);
  const [guests, setGuests]= useState(2);
  const [seat, setSeat]    = useState(null);
  const [done, setDone]    = useState(false);

  const days  = [["Mon","14"],["Tue","15"],["Wed","16"],["Thu","17"],["Fri","18"]];
  const times = ["12:00","12:30","1:00","1:30","7:00 PM","7:30 PM","8:00 PM","8:30 PM"];
  const seats = [["🪟","Window"],["🌳","Outdoor"],["🔇","Quiet"]];

  if (done) return (
    <div style={{ flex:1, background:"#F7F1E8", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, textAlign:"center" }}>
      <div style={{ fontSize:36, marginBottom:12 }}>✅</div>
      <p style={{ fontFamily:t.fontHeading, fontSize:18, color:t.chocolateDeep, marginBottom:6 }}>Reserved!</p>
      <p style={{ fontFamily:t.fontBody, fontSize:12, color:t.chocolateMid, marginBottom:20 }}>Beanstalk Café · {days[day][0]} {days[day][1]} · {times[time]} · {guests} guests</p>
      <button onClick={() => setDone(false)} style={{ background:t.chocolateDeep, color:t.cream, border:"none", borderRadius:99, padding:"8px 20px", fontFamily:t.fontBody, fontSize:12, cursor:"pointer" }}>Done</button>
    </div>
  );

  return (
    <div style={{ flex:1, overflowY:"auto", background:"#F7F1E8", padding:"14px 14px 0" }}>
      <p style={{ fontFamily:t.fontHeading, fontSize:15, fontWeight:700, color:t.chocolateDeep, marginBottom:14 }}>Reserve a Table</p>
      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:8, letterSpacing:"0.04em", textTransform:"uppercase" }}>Date</p>
      <div style={{ display:"flex", gap:6, marginBottom:14, overflowX:"auto" }}>
        {days.map(([d,n],i) => (
          <button key={i} onClick={() => setDay(i)}
            style={{ flexShrink:0, width:44, background: day===i ? t.chocolateDeep : "white", borderRadius:10, padding:"7px 0", border: day===i?"none":`1px solid #EDE0CC`, cursor:"pointer", textAlign:"center" }}>
            <p style={{ fontFamily:t.fontBody, fontSize:10, color: day===i ? t.beigeDark : t.chocolateLight }}>{d}</p>
            <p style={{ fontFamily:t.fontHeading, fontSize:15, fontWeight:700, color: day===i ? t.cream : t.chocolateDeep }}>{n}</p>
          </button>
        ))}
      </div>

      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:8, letterSpacing:"0.04em", textTransform:"uppercase" }}>Time</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:14 }}>
        {times.map((ti,i) => (
          <button key={i} onClick={() => setTime(i)}
            style={{ background: time===i ? t.chocolateDeep : "white", border: time===i?"none":`1px solid #EDE0CC`, borderRadius:8, padding:"7px 0", fontFamily:t.fontBody, fontSize:11, color: time===i ? t.cream : t.chocolateDeep, cursor:"pointer" }}>
            {ti}
          </button>
        ))}
      </div>

      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:8, letterSpacing:"0.04em", textTransform:"uppercase" }}>Guests</p>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14, background:"white", borderRadius:10, padding:"10px 14px", width:"fit-content" }}>
        <button onClick={() => setGuests(g => Math.max(1,g-1))} style={{ width:24, height:24, borderRadius:"50%", background:"#EDE0CC", border:"none", cursor:"pointer", fontFamily:t.fontBody, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", color:t.chocolateDeep }}>−</button>
        <span style={{ fontFamily:t.fontHeading, fontSize:15, color:t.chocolateDeep, minWidth:60, textAlign:"center" }}>{guests} Guests</span>
        <button onClick={() => setGuests(g => Math.min(10,g+1))} style={{ width:24, height:24, borderRadius:"50%", background:"#EDE0CC", border:"none", cursor:"pointer", fontFamily:t.fontBody, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", color:t.chocolateDeep }}>+</button>
      </div>

      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:8, letterSpacing:"0.04em", textTransform:"uppercase" }}>Seating Preference</p>
      <div style={{ display:"flex", gap:7, marginBottom:18 }}>
        {seats.map(([ico,label]) => (
          <button key={label} onClick={() => setSeat(label)}
            style={{ flex:1, background: seat===label ? t.chocolateDeep : "white", border: seat===label?"none":`1px solid #EDE0CC`, borderRadius:10, padding:"8px 4px", cursor:"pointer", textAlign:"center" }}>
            <div style={{ fontSize:14, marginBottom:2 }}>{ico}</div>
            <p style={{ fontFamily:t.fontBody, fontSize:10, color: seat===label ? t.cream : t.chocolateMid }}>{label}</p>
          </button>
        ))}
      </div>

      <button onClick={() => setDone(true)}
        style={{ width:"100%", background:t.chocolateDeep, color:t.cream, border:"none", borderRadius:12, padding:"13px 0", fontFamily:t.fontBody, fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:16, letterSpacing:"0.03em" }}>
        Confirm Reservation →
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PHONE FRAME
// ─────────────────────────────────────────────────────
function PhoneFrame({ activeTab, onTab }) {
  const screens = { home:<HomeScreen/>, explore:<ExploreScreen/>, menu:<MenuScreen/>, reserve:<ReserveScreen/> };

  return (
    <div style={{ width:260, height:520, background:"#1A1008", borderRadius:40, padding:"10px 8px 8px", boxShadow:"0 32px 80px rgba(59,36,24,0.45), 0 0 0 1px rgba(255,255,255,0.08)", position:"relative", flexShrink:0 }}>

      {/* Notch */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 16px", marginBottom:6 }}>
        <span style={{ fontFamily:t.fontBody, fontSize:10, color:"#F7F1E8", letterSpacing:"0.05em" }}>9:41</span>
        <div style={{ width:50, height:10, background:"#1A1008", borderRadius:20, border:"1px solid rgba(255,255,255,0.1)" }} />
        <div style={{ display:"flex", gap:4, alignItems:"center" }}>
          <span style={{ fontSize:9 }}>◀</span>
          <span style={{ fontSize:9 }}>▮▮</span>
          <span style={{ fontSize:9 }}>▬</span>
        </div>
      </div>

      {/* Screen */}
      <div style={{ background:"#F7F1E8", borderRadius:30, height:432, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        {/* Screen content */}
        <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          {screens[activeTab]}
        </div>

        {/* Bottom nav */}
        <div style={{ background:"white", borderTop:"1px solid #EDE0CC", display:"flex", padding:"8px 0 6px" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => onTab(tab.id)}
              style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2, background:"transparent", border:"none", cursor:"pointer", padding:"2px 0" }}>
              <span style={{ fontSize:14 }}>{tab.icon}</span>
              <span style={{ fontFamily:t.fontBody, fontSize:9, color: activeTab===tab.id ? t.chocolateDeep : "#C0A880", fontWeight: activeTab===tab.id ? 700 : 400 }}>
                {tab.label}
              </span>
              {activeTab===tab.id && <div style={{ width:16, height:2, background:t.chocolateDeep, borderRadius:99 }} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────
export default function AppSection() {
  const [headRef, headIn] = useInView();
  const [activeTab, setActiveTab] = useState("home");
  const [dotActive, setDotActive] = useState("home");
  const [arrowPulse, setArrowPulse] = useState(false);

  // Arrow pulse every 2s
  useEffect(() => {
    const id = setInterval(() => { setArrowPulse(p => !p); }, 900);
    return () => clearInterval(id);
  }, []);

  const handleDot = (id) => { setDotActive(id); setActiveTab(id); };

  return (
    <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden" }} className="py-24">

      {/* Grainy beige-choco gradient background */}
      <div style={{ position:"absolute", inset:0, zIndex:0,
        background:"radial-gradient(ellipse at 20% 50%, rgba(210,180,140,0.55) 0%, rgba(247,241,232,0.9) 45%, rgba(107,69,48,0.18) 100%)",
        backgroundBlendMode:"multiply" }} />
      {/* Grain overlay */}
      <div style={{ position:"absolute", inset:0, zIndex:1, opacity:0.045,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat:"repeat", backgroundSize:"200px" }} />

      <div className="max-w-7xl mx-auto px-6 w-full relative" style={{ zIndex:2 }}>
        <div style={{ display:"flex", alignItems:"center", gap:60, flexWrap:"wrap", justifyContent:"center" }}>

          {/* ── LEFT SIDE ── */}
          <div style={{ flex:"1 1 320px", maxWidth:460 }}>

            {/* Small label */}
            <div ref={headRef} style={{ opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(20px)", transition:"all 0.6s ease" }}>
              <p style={{ fontFamily:t.fontBody, fontSize:12, color:t.chocolateMid, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:14 }}>
                The App
              </p>
            </div>

            {/* Big heading */}
            <div style={{ opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease 0.08s", marginBottom:12 }}>
              <h2 style={{ fontFamily:t.fontHeading, fontSize:"clamp(30px,4.5vw,52px)", fontWeight:700, color:"#111111", lineHeight:1.1, margin:0 }}>
                Your city's best cafés,<br />curated for you.
              </h2>
            </div>

            {/* Sub text */}
            <div style={{ opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(20px)", transition:"all 0.7s ease 0.16s", marginBottom:44 }}>
              <p style={{ fontFamily:t.fontBody, fontSize:14, color:t.chocolateMid, lineHeight:1.8, margin:0 }}>
                Browse nearby spots, filter by mood, and discover hidden gems you never knew existed.
              </p>
            </div>

            {/* 4 dot nav buttons */}
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {NAV_DOTS.map((dot, i) => {
                const isActive = dotActive === dot.id;
                return (
                  <button key={dot.id} onClick={() => handleDot(dot.id)}
                    style={{ display:"flex", alignItems:"center", gap:14, background:"transparent", border:"none", cursor:"pointer", padding:0, opacity:headIn?1:0, transform:headIn?"translateX(0)":"translateX(-20px)", transition:`all 0.6s ease ${0.2+i*0.08}s` }}>
                    {/* Dot or dash */}
                    <div style={{ width: isActive?28:8, height:8, borderRadius:999, background: isActive?t.chocolateDeep:t.beigeDark, transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)", flexShrink:0 }} />
                    <span style={{ fontFamily:t.fontBody, fontSize: isActive?14:13, color: isActive?t.chocolateDeep:t.chocolateLight, fontWeight: isActive?600:400, transition:"all 0.3s" }}>
                      {dot.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── PHONE ── */}
          <div style={{ display:"flex", alignItems:"center", gap:32, flexShrink:0 }}>
            <PhoneFrame activeTab={activeTab} onTab={(id) => { setActiveTab(id); setDotActive(id); }} />

            {/* Right of phone — Try it out */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, alignItems:"flex-start" }}>
              <h3 style={{ fontFamily:t.fontHeading, fontSize:"clamp(28px,3.5vw,48px)", fontWeight:700, color:"#111111", lineHeight:1.1, margin:0, maxWidth:180 }}>
                Try it<br />out
              </h3>

              {/* Animated arrows */}
              <div style={{ display:"flex", gap:4, marginTop:4 }}>
                {["«","«","«"].map((a,i) => (
                  <span key={i} style={{ fontFamily:t.fontBody, fontSize:22, color:t.chocolateDeep, opacity: arrowPulse ? 0.3+i*0.3 : 1-i*0.3, transition:"opacity 0.4s ease", display:"inline-block", transform: arrowPulse ? `translateX(${i*3}px)` : "translateX(0)", transitionDelay:`${i*0.1}s` }}>
                    {a}
                  </span>
                ))}
              </div>

              <p style={{ fontFamily:t.fontBody, fontSize:12, color:t.chocolateLight, letterSpacing:"0.08em", marginTop:2 }}>
                Tap &amp; explore
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}