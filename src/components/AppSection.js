"use client";
import { useState, useEffect } from "react";
import { theme as t } from "./theme";
import useInView from "./useInView";

const TABS = [
  { id:"home",    icon:"🏠", label:"Home" },
  { id:"explore", icon:"🔍", label:"Explore" },
  { id:"menu",    icon:"📋", label:"Menu" },
  { id:"reserve", icon:"📅", label:"Reserve" },
];

const NAV_DOTS = [
  { id:"home",    label:"Home" },
  { id:"explore", label:"Explore" },
  { id:"menu",    label:"Menu" },
  { id:"reserve", label:"Reserve" },
];

// ─── SCREENS ─────────────────────────────────────────

function HomeScreen() {
  return (
    <div style={{ flex:1, overflowY:"auto", background:"#FAF6F0", padding:"18px 16px 0" }}>
      {/* Search */}
      <div style={{ background:"white", borderRadius:16, padding:"12px 16px", display:"flex", alignItems:"center", gap:10, marginBottom:18, boxShadow:"0 2px 12px rgba(59,36,24,0.08)" }}>
        <span style={{ fontSize:15 }}>🔍</span>
        <span style={{ fontFamily:t.fontBody, fontSize:13, color:"#B8A898" }}>Search cafés, dishes...</span>
      </div>

      {/* Mood filters */}
      <div style={{ display:"flex", gap:8, marginBottom:20, overflowX:"auto", paddingBottom:2 }}>
        {[["☕","Work"],["🌹","Date"],["👨‍👩‍👧","Family"],["⚡","Quick"]].map(([ico,label],i) => (
          <div key={label} style={{ flexShrink:0, background: i===0 ? t.chocolateDeep : "white", borderRadius:24, padding:"7px 14px", display:"flex", alignItems:"center", gap:6, border: i===0 ? "none" : `1px solid #EDE0CC` }}>
            <span style={{ fontSize:13 }}>{ico}</span>
            <span style={{ fontFamily:t.fontBody, fontSize:12, color: i===0 ? t.cream : t.chocolateMid, whiteSpace:"nowrap" }}>{label}</span>
          </div>
        ))}
      </div>

      <p style={{ fontFamily:t.fontHeading, fontSize:16, color:t.chocolateDeep, fontWeight:600, marginBottom:12 }}>Trending Near You</p>

      {[
        { name:"Beanstalk Café", rating:"4.8", loc:"Banjara Hills", tags:["Pour Over","WiFi"] },
        { name:"The Dark Roast", rating:"4.5", loc:"Madhapur",      tags:["Live Music","Pets"] },
        { name:"Patio & Press",  rating:"4.6", loc:"Jubilee Hills", tags:["Vegan","Outdoor"] },
      ].map(cafe => (
        <div key={cafe.name} style={{ background:"white", borderRadius:18, padding:"14px 15px", marginBottom:12, boxShadow:"0 2px 10px rgba(59,36,24,0.07)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
            <p style={{ fontFamily:t.fontHeading, fontSize:15, fontWeight:600, color:t.chocolateDeep }}>{cafe.name}</p>
            <span style={{ fontFamily:t.fontBody, fontSize:12, color:t.chocolateDeep, background:"#F0E6D3", padding:"3px 10px", borderRadius:99 }}>⭐ {cafe.rating}</span>
          </div>
          <p style={{ fontFamily:t.fontBody, fontSize:12, color:t.chocolateLight, marginBottom:10 }}>📍 {cafe.loc}</p>
          <div style={{ display:"flex", gap:6 }}>
            {cafe.tags.map(tag => (
              <span key={tag} style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateMid, background:"#EDE0CC", padding:"3px 10px", borderRadius:99 }}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExploreScreen() {
  return (
    <div style={{ flex:1, overflowY:"auto", background:"#FAF6F0", padding:"18px 16px 0" }}>
      <p style={{ fontFamily:t.fontHeading, fontSize:18, fontWeight:700, color:t.chocolateDeep, marginBottom:3 }}>Beanstalk Café</p>
      <p style={{ fontFamily:t.fontBody, fontSize:12, color:t.chocolateLight, marginBottom:14 }}>Banjara Hills · Open until 10 PM</p>
      <div style={{ display:"inline-block", background:"#2D5A2D", color:"#F7F1E8", fontFamily:t.fontBody, fontSize:11, padding:"4px 12px", borderRadius:99, marginBottom:16 }}>● Open Now</div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:18 }}>
        {[["4.9","Food"],["4.6","Service"],["4.8","Ambience"]].map(([val,label]) => (
          <div key={label} style={{ background:"white", borderRadius:14, padding:"12px 8px", textAlign:"center", boxShadow:"0 2px 8px rgba(59,36,24,0.07)" }}>
            <p style={{ fontFamily:t.fontHeading, fontSize:22, fontWeight:700, color:t.chocolateDeep, lineHeight:1 }}>{val}</p>
            <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginTop:3 }}>{label}</p>
          </div>
        ))}
      </div>

      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:8, letterSpacing:"0.06em", textTransform:"uppercase" }}>Amenities</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
        {["WiFi","Vegan","Outdoor","Outlets","Parking"].map(a => (
          <span key={a} style={{ fontFamily:t.fontBody, fontSize:11, background:"#EDE0CC", color:t.chocolateMid, padding:"4px 11px", borderRadius:99 }}>{a}</span>
        ))}
      </div>

      <div style={{ display:"flex", gap:10, marginBottom:18 }}>
        <button style={{ flex:1, background:"white", border:`1.5px solid ${t.chocolateDeep}`, borderRadius:12, padding:"11px 0", fontFamily:t.fontBody, fontSize:12, color:t.chocolateDeep, cursor:"pointer", fontWeight:500 }}>View Menu</button>
        <button style={{ flex:1, background:t.chocolateDeep, borderRadius:12, padding:"11px 0", fontFamily:t.fontBody, fontSize:12, color:t.cream, border:"none", cursor:"pointer", fontWeight:500 }}>Reserve Table</button>
      </div>

      <p style={{ fontFamily:t.fontHeading, fontSize:15, fontWeight:600, color:t.chocolateDeep, marginBottom:10 }}>Reviews</p>
      {[
        { name:"Priya S.", stars:5, text:"\"The mushroom toast is unbelievable. My Sunday ritual.\"" },
        { name:"Rahul K.", stars:4, text:"\"Moody lighting, great playlist, staff knows their coffee.\"" },
      ].map(r => (
        <div key={r.name} style={{ background:"white", borderRadius:14, padding:"13px 14px", marginBottom:10, boxShadow:"0 2px 8px rgba(59,36,24,0.06)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <p style={{ fontFamily:t.fontBody, fontSize:12, fontWeight:600, color:t.chocolateDeep }}>{r.name}</p>
            <span style={{ fontSize:11 }}>{"⭐".repeat(r.stars)}</span>
          </div>
          <p style={{ fontFamily:t.fontBody, fontSize:12, color:t.chocolateMid, lineHeight:1.6 }}>{r.text}</p>
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
  const total = Object.values(cart).reduce((a,b)=>a+b,0);

  return (
    <div style={{ flex:1, overflowY:"auto", background:"#FAF6F0", padding:"18px 16px 0" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
        <p style={{ fontFamily:t.fontHeading, fontSize:18, fontWeight:700, color:t.chocolateDeep }}>Beanstalk Café</p>
        {total > 0 && (
          <span style={{ background:t.chocolateDeep, color:t.cream, fontFamily:t.fontBody, fontSize:11, padding:"4px 12px", borderRadius:99 }}>{total} in cart</span>
        )}
      </div>
      {dishes.map(d => (
        <div key={d.name} style={{ background:"white", borderRadius:16, padding:"13px 14px", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 2px 8px rgba(59,36,24,0.07)" }}>
          <div style={{ flex:1 }}>
            <p style={{ fontFamily:t.fontHeading, fontSize:14, fontWeight:600, color:t.chocolateDeep, marginBottom:4 }}>{d.name}</p>
            <p style={{ fontFamily:t.fontBody, fontSize:13, color:t.chocolateMid, marginBottom:4, fontWeight:600 }}>₹{d.price}</p>
            <div style={{ display:"flex", gap:10 }}>
              <span style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight }}>Qty {d.qty}</span>
              <span style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight }}>Qual {d.qual}</span>
            </div>
          </div>
          <button onClick={() => add(d.name)}
            style={{ width:34, height:34, borderRadius:"50%", background: cart[d.name] ? t.chocolateDeep : "#EDE0CC", color: cart[d.name] ? t.cream : t.chocolateMid, border:"none", cursor:"pointer", fontFamily:t.fontBody, fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.2s", fontWeight:600 }}>
            {cart[d.name] || "+"}
          </button>
        </div>
      ))}
    </div>
  );
}

function ReserveScreen() {
  const [day, setDay]      = useState(0);
  const [time, setTime]    = useState(4);
  const [guests, setGuests]= useState(2);
  const [seat, setSeat]    = useState("Window");
  const [done, setDone]    = useState(false);

  const days  = [["Mon","14"],["Tue","15"],["Wed","16"],["Thu","17"],["Fri","18"]];
  const times = ["12:00","12:30","1:00","1:30","7:00 PM","7:30 PM","8:00 PM","8:30 PM"];
  const seats = [["🪟","Window"],["🌳","Outdoor"],["🔇","Quiet"]];

  if (done) return (
    <div style={{ flex:1, background:"#FAF6F0", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:28, textAlign:"center" }}>
      <div style={{ fontSize:48, marginBottom:14 }}>✅</div>
      <p style={{ fontFamily:t.fontHeading, fontSize:22, color:t.chocolateDeep, marginBottom:8 }}>Reserved!</p>
      <p style={{ fontFamily:t.fontBody, fontSize:13, color:t.chocolateMid, marginBottom:6 }}>Beanstalk Café</p>
      <p style={{ fontFamily:t.fontBody, fontSize:12, color:t.chocolateLight, marginBottom:24, lineHeight:1.7 }}>{days[day][0]} {days[day][1]} · {times[time]}<br/>{guests} guests · {seat} seat</p>
      <button onClick={() => setDone(false)} style={{ background:t.chocolateDeep, color:t.cream, border:"none", borderRadius:99, padding:"11px 28px", fontFamily:t.fontBody, fontSize:13, cursor:"pointer", fontWeight:600 }}>Done</button>
    </div>
  );

  return (
    <div style={{ flex:1, overflowY:"auto", background:"#FAF6F0", padding:"18px 16px 0" }}>
      <p style={{ fontFamily:t.fontHeading, fontSize:18, fontWeight:700, color:t.chocolateDeep, marginBottom:18 }}>Reserve a Table</p>

      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:10, letterSpacing:"0.06em", textTransform:"uppercase" }}>Date</p>
      <div style={{ display:"flex", gap:7, marginBottom:18, overflowX:"auto" }}>
        {days.map(([d,n],i) => (
          <button key={i} onClick={() => setDay(i)}
            style={{ flexShrink:0, width:52, background: day===i ? t.chocolateDeep : "white", borderRadius:14, padding:"9px 0", border: day===i?"none":`1px solid #EDE0CC`, cursor:"pointer", textAlign:"center", boxShadow: day===i ? `0 4px 16px ${t.chocolateDeep}35` : "none", transition:"all 0.25s" }}>
            <p style={{ fontFamily:t.fontBody, fontSize:11, color: day===i ? t.beigeDark : t.chocolateLight, marginBottom:2 }}>{d}</p>
            <p style={{ fontFamily:t.fontHeading, fontSize:18, fontWeight:700, color: day===i ? t.cream : t.chocolateDeep }}>{n}</p>
          </button>
        ))}
      </div>

      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:10, letterSpacing:"0.06em", textTransform:"uppercase" }}>Time</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7, marginBottom:18 }}>
        {times.map((ti,i) => (
          <button key={i} onClick={() => setTime(i)}
            style={{ background: time===i ? t.chocolateDeep : "white", border: time===i ? "none" : `1px solid #EDE0CC`, borderRadius:10, padding:"9px 0", fontFamily:t.fontBody, fontSize:12, color: time===i ? t.cream : t.chocolateDeep, cursor:"pointer", transition:"all 0.22s", fontWeight: time===i ? 600 : 400 }}>
            {ti}
          </button>
        ))}
      </div>

      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:10, letterSpacing:"0.06em", textTransform:"uppercase" }}>Guests</p>
      <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:18, background:"white", borderRadius:14, padding:"12px 18px", width:"fit-content", boxShadow:"0 2px 8px rgba(59,36,24,0.06)" }}>
        <button onClick={() => setGuests(g => Math.max(1,g-1))} style={{ width:30, height:30, borderRadius:"50%", background:"#EDE0CC", border:"none", cursor:"pointer", fontFamily:t.fontBody, fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", color:t.chocolateDeep, fontWeight:600 }}>−</button>
        <span style={{ fontFamily:t.fontHeading, fontSize:17, color:t.chocolateDeep, minWidth:72, textAlign:"center" }}>{guests} Guests</span>
        <button onClick={() => setGuests(g => Math.min(10,g+1))} style={{ width:30, height:30, borderRadius:"50%", background:"#EDE0CC", border:"none", cursor:"pointer", fontFamily:t.fontBody, fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", color:t.chocolateDeep, fontWeight:600 }}>+</button>
      </div>

      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:10, letterSpacing:"0.06em", textTransform:"uppercase" }}>Seating</p>
      <div style={{ display:"flex", gap:8, marginBottom:22 }}>
        {seats.map(([ico,label]) => (
          <button key={label} onClick={() => setSeat(label)}
            style={{ flex:1, background: seat===label ? t.chocolateDeep : "white", border: seat===label ? "none" : `1px solid #EDE0CC`, borderRadius:14, padding:"10px 4px", cursor:"pointer", textAlign:"center", transition:"all 0.22s", boxShadow: seat===label ? `0 4px 14px ${t.chocolateDeep}30` : "none" }}>
            <div style={{ fontSize:17, marginBottom:4 }}>{ico}</div>
            <p style={{ fontFamily:t.fontBody, fontSize:11, color: seat===label ? t.cream : t.chocolateMid, fontWeight: seat===label?600:400 }}>{label}</p>
          </button>
        ))}
      </div>

      <button onClick={() => setDone(true)}
        style={{ width:"100%", background:t.chocolateDeep, color:t.cream, border:"none", borderRadius:16, padding:"16px 0", fontFamily:t.fontBody, fontSize:14, fontWeight:700, cursor:"pointer", marginBottom:20, letterSpacing:"0.04em", boxShadow:`0 6px 24px ${t.chocolateDeep}40` }}>
        Confirm Reservation →
      </button>
    </div>
  );
}

// ─── iPHONE 16 FRAME ─────────────────────────────────
function PhoneFrame({ activeTab, onTab }) {
  const screens = {
    home:    <HomeScreen />,
    explore: <ExploreScreen />,
    menu:    <MenuScreen />,
    reserve: <ReserveScreen />,
  };

  return (
    // iPhone 16 proportions: ~393 × 852 logical px → we scale to 340 × 736
    <div style={{
      width: 340,
      height: 736,
      background: "linear-gradient(145deg, #2A2118 0%, #1A1008 40%, #0E0906 100%)",
      borderRadius: 54,
      padding: "14px 10px 10px",
      boxShadow: `
        0 0 0 1px rgba(255,255,255,0.10),
        0 0 0 2px rgba(0,0,0,0.5),
        0 40px 100px rgba(59,36,24,0.55),
        0 8px 30px rgba(0,0,0,0.6),
        inset 0 1px 0 rgba(255,255,255,0.06)
      `,
      position: "relative",
      flexShrink: 0,
    }}>

      {/* Side buttons — left volume */}
      <div style={{ position:"absolute", left:-3, top:110, width:3, height:36, background:"#2A2118", borderRadius:"2px 0 0 2px" }} />
      <div style={{ position:"absolute", left:-3, top:156, width:3, height:36, background:"#2A2118", borderRadius:"2px 0 0 2px" }} />
      {/* Side button — right power */}
      <div style={{ position:"absolute", right:-3, top:140, width:3, height:60, background:"#2A2118", borderRadius:"0 2px 2px 0" }} />

      {/* Status bar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"4px 20px 8px", position:"relative" }}>
        {/* Dynamic Island */}
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:110, height:32, background:"#0E0906", borderRadius:20, zIndex:10, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          <div style={{ width:10, height:10, borderRadius:"50%", background:"#1A1008", border:"1.5px solid #2A2118" }} />
          <div style={{ width:14, height:14, borderRadius:"50%", background:"#1A1008", border:"1.5px solid #2A2118" }} />
        </div>
        <span style={{ fontFamily:t.fontBody, fontSize:13, color:"#F7F1E8", fontWeight:600, letterSpacing:"0.02em" }}>9:41</span>
        <div style={{ display:"flex", gap:5, alignItems:"center" }}>
          {/* Signal bars */}
          <div style={{ display:"flex", gap:2, alignItems:"flex-end" }}>
            {[8,11,14,17].map((h,i) => <div key={i} style={{ width:3, height:h, background:"#F7F1E8", borderRadius:2 }} />)}
          </div>
          {/* WiFi */}
          <span style={{ color:"#F7F1E8", fontSize:12 }}>▲</span>
          {/* Battery */}
          <div style={{ width:22, height:12, border:"1.5px solid #F7F1E8", borderRadius:3, padding:2, display:"flex", alignItems:"center", position:"relative" }}>
            <div style={{ position:"absolute", right:-5, top:"50%", transform:"translateY(-50%)", width:3, height:6, background:"#F7F1E8", borderRadius:"0 2px 2px 0" }} />
            <div style={{ height:"100%", width:"75%", background:"#F7F1E8", borderRadius:1 }} />
          </div>
        </div>
      </div>

      {/* Screen */}
      <div style={{
        background: "#FAF6F0",
        borderRadius: 44,
        height: "calc(100% - 46px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
      }}>
        {/* Content area */}
        <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column", paddingTop:8 }}>
          {screens[activeTab]}
        </div>

        {/* Bottom nav bar */}
        <div style={{ background:"rgba(255,255,255,0.95)", backdropFilter:"blur(12px)", borderTop:"1px solid #EDE0CC", display:"flex", padding:"10px 0 18px" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => onTab(tab.id)}
              style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, background:"transparent", border:"none", cursor:"pointer", padding:"2px 0", transition:"all 0.2s" }}>
              <div style={{ width:38, height:38, borderRadius:12, background: activeTab===tab.id ? t.chocolateDeep : "transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.25s", boxShadow: activeTab===tab.id ? `0 4px 12px ${t.chocolateDeep}40` : "none" }}>
                <span style={{ fontSize:16 }}>{tab.icon}</span>
              </div>
              <span style={{ fontFamily:t.fontBody, fontSize:10, color: activeTab===tab.id ? t.chocolateDeep : "#C0A880", fontWeight: activeTab===tab.id ? 700 : 400, letterSpacing:"0.02em" }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Home indicator */}
        <div style={{ display:"flex", justifyContent:"center", paddingBottom:6 }}>
          <div style={{ width:120, height:4, background:t.chocolateDeep, borderRadius:99, opacity:0.25 }} />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────
export default function AppSection() {
  const [headRef, headIn] = useInView();
  const [activeTab, setActiveTab]   = useState("home");
  const [dotActive, setDotActive]   = useState("home");
  const [arrowPhase, setArrowPhase] = useState(0);

  // Animated arrows
  useEffect(() => {
    const id = setInterval(() => setArrowPhase(p => (p+1)%3), 500);
    return () => clearInterval(id);
  }, []);

  const handleDot = (id) => { setDotActive(id); setActiveTab(id); };
  const handleTab = (id) => { setActiveTab(id); setDotActive(id); };

  return (
    <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden" }} className="py-20">

      {/* Grainy beige-choco gradient background */}
      <div style={{ position:"absolute", inset:0, zIndex:0 }}>
        {/* Base gradient */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, #F5EBD8 0%, #EFE3CC 30%, #F7F1E8 55%, #E8D8C0 80%, #DDD0B5 100%)" }} />
        {/* Choco blobs */}
        <div style={{ position:"absolute", top:"-10%", right:"10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(107,69,48,0.22) 0%, transparent 70%)", filter:"blur(60px)" }} />
        <div style={{ position:"absolute", bottom:"5%", left:"5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(169,130,106,0.18) 0%, transparent 70%)", filter:"blur(50px)" }} />
        {/* Grain texture */}
        <div style={{ position:"absolute", inset:0, opacity:0.06,
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat:"repeat", backgroundSize:"256px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative" style={{ zIndex:2 }}>
        <div style={{ display:"flex", alignItems:"center", gap:64, flexWrap:"wrap", justifyContent:"center" }}>

          {/* ── LEFT ── */}
          <div style={{ flex:"0 1 340px" }}>
            <div ref={headRef}>
              <p style={{ opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(16px)", transition:"all 0.5s ease", fontFamily:t.fontBody, fontSize:12, color:t.chocolateMid, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:18 }}>
                The App
              </p>

              <h2 style={{ opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(22px)", transition:"all 0.65s ease 0.08s", fontFamily:t.fontHeading, fontSize:"clamp(32px,4vw,52px)", fontWeight:700, color:"#111111", lineHeight:1.1, marginBottom:14 }}>
                Your city's best cafés,<br />curated for you.
              </h2>

              <p style={{ opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(18px)", transition:"all 0.65s ease 0.16s", fontFamily:t.fontBody, fontSize:14, color:t.chocolateMid, lineHeight:1.85, marginBottom:44 }}>
                Browse nearby spots, filter by mood, and discover hidden gems you never knew existed.
              </p>
            </div>

            {/* Nav dots */}
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              {NAV_DOTS.map((dot,i) => {
                const isActive = dotActive === dot.id;
                return (
                  <button key={dot.id} onClick={() => handleDot(dot.id)}
                    style={{ display:"flex", alignItems:"center", gap:16, background:"transparent", border:"none", cursor:"pointer", padding:0, opacity:headIn?1:0, transform:headIn?"translateX(0)":"translateX(-16px)", transition:`all 0.6s ease ${0.22+i*0.09}s` }}>
                    <div style={{ width: isActive?32:10, height:10, borderRadius:999, background: isActive?t.chocolateDeep:"#C8B89A", transition:"all 0.38s cubic-bezier(0.4,0,0.2,1)", flexShrink:0 }} />
                    <span style={{ fontFamily:t.fontBody, fontSize: isActive?15:13, color: isActive?t.chocolateDeep:"#A89070", fontWeight: isActive?600:400, transition:"all 0.3s", letterSpacing:isActive?"0.02em":"0" }}>
                      {dot.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── PHONE ── */}
          <PhoneFrame activeTab={activeTab} onTab={handleTab} />

          {/* ── RIGHT ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:12, alignItems:"flex-start", flex:"0 1 160px" }}>
            <h3 style={{ fontFamily:t.fontHeading, fontSize:"clamp(36px,4vw,58px)", fontWeight:700, color:"#111111", lineHeight:1.05, margin:0 }}>
              Try it<br />out
            </h3>

            {/* Animated arrows */}
            <div style={{ display:"flex", gap:2, marginTop:8 }}>
              {[0,1,2].map(i => (
                <span key={i} style={{ fontFamily:t.fontBody, fontSize:28, color:t.chocolateDeep, opacity: arrowPhase===i ? 1 : 0.25, transition:"opacity 0.35s ease", display:"inline-block", transform: arrowPhase===i ? "translateX(-4px)" : "translateX(0)", }}>
                  ‹
                </span>
              ))}
            </div>

            <p style={{ fontFamily:t.fontBody, fontSize:13, color:t.chocolateLight, letterSpacing:"0.1em", textTransform:"uppercase", marginTop:4 }}>
              Tap &amp; explore
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}