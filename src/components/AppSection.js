"use client";
import { useState, useEffect } from "react";
import { theme as t } from "./theme";
import useInView from "./useInView";

// ── Data ────────────────────────────────────────────────
const NAV_ITEMS = [
  { id:"home",    icon:"🏠", label:"Home" },
  { id:"explore", icon:"🔍", label:"Explore" },
  { id:"menu",    icon:"📋", label:"Menu" },
  { id:"reserve", icon:"📅", label:"Reserve" },
];

const CAFES = [
  { name:"Beanstalk Café", rating:4.8, location:"Banjara Hills", tags:["Pour Over","WiFi"] },
  { name:"The Dark Roast", rating:4.5, location:"Madhapur",      tags:["Live Music","Pets"] },
  { name:"Patio & Press",  rating:4.6, location:"Jubilee Hills", tags:["Vegan","Outdoor"] },
];

const MENU_ITEMS = [
  { name:"Hazelnut Flat White", price:280, qty:4.5, qual:4.8 },
  { name:"Mushroom Toast",      price:320, qty:4.7, qual:4.9 },
  { name:"Cold Brew",           price:240, qty:4.3, qual:4.6 },
  { name:"Avocado Toast",       price:380, qty:4.5, qual:4.7 },
  { name:"Matcha Latte",        price:300, qty:4.4, qual:4.5 },
];

const DATE_SLOTS = [
  { day:"Mon", date:14 }, { day:"Tue", date:15 },
  { day:"Wed", date:16 }, { day:"Thu", date:17 }, { day:"Fri", date:18 },
];

const TIME_SLOTS = ["12:00 PM","12:30 PM","1:00 PM","1:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM"];

const SEATING = [
  { icon:"🪟", label:"Window" },
  { icon:"🌳", label:"Outdoor" },
  { icon:"🔇", label:"Quiet" },
];

// ── Shared phone chrome ──────────────────────────────────
function PhoneShell({ children }) {
  return (
    <div style={{
      width: 320,
      height: 650,
      background: "#1A1A1A",
      borderRadius: 48,
      padding: "10px",
      boxShadow: "0 40px 100px rgba(59,36,24,0.45), inset 0 0 0 1px rgba(255,255,255,0.12)",
      flexShrink: 0,
      position: "relative",
    }}>
      {/* Inner screen */}
      <div style={{
        width: "100%",
        height: "100%",
        background: "#FDFBF7",
        borderRadius: 40,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}>
        {/* Status bar */}
        <div style={{ background:"#FDFBF7", padding:"14px 20px 6px", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
          <span style={{ fontFamily:t.fontBody, fontSize:12, fontWeight:700, color:t.chocolateDeep }}>9:41</span>
          <div style={{ width:80, height:22, background:t.chocolateDeep, borderRadius:12, position:"absolute", left:"50%", transform:"translateX(-50%)", top:10 }} />
          <div style={{ display:"flex", gap:5, alignItems:"center" }}>
            <span style={{ fontSize:10 }}>◀</span>
            <span style={{ fontSize:10 }}>▮▮</span>
            <span style={{ fontSize:10 }}>▬</span>
          </div>
        </div>
        {/* Scrollable content */}
        <div style={{ flex:1, overflowY:"auto", overflowX:"hidden" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Screen: Home ─────────────────────────────────────────
function HomeScreen() {
  return (
    <div style={{ padding:"12px 16px 8px", display:"flex", flexDirection:"column", gap:14 }}>
      {/* Search */}
      <div style={{ background:t.beigeMid, borderRadius:14, padding:"10px 14px", display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:14 }}>🔍</span>
        <span style={{ fontFamily:t.fontBody, fontSize:12, color:t.chocolateLight }}>Search cafés, dishes...</span>
      </div>
      {/* Mood pills */}
      <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4 }}>
        {[["☕","Work"],["🌹","Date"],["👨‍👩‍👧","Family"],["⚡","Quick"]].map(([ic,lb]) => (
          <div key={lb} style={{ background:t.chocolateDeep, color:t.cream, borderRadius:20, padding:"6px 12px", fontFamily:t.fontBody, fontSize:11, display:"flex", alignItems:"center", gap:5, flexShrink:0 }}>
            <span style={{ fontSize:12 }}>{ic}</span>{lb}
          </div>
        ))}
      </div>
      {/* Trending */}
      <p style={{ fontFamily:t.fontHeading, fontSize:14, fontWeight:600, color:t.chocolateDeep, marginBottom:0 }}>Trending Near You</p>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {CAFES.map(c => (
          <div key={c.name} style={{ background:"white", borderRadius:16, padding:"12px 14px", boxShadow:`0 2px 12px ${t.chocolateDeep}0E` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
              <div>
                <p style={{ fontFamily:t.fontHeading, fontSize:13, fontWeight:600, color:t.chocolateDeep, marginBottom:2 }}>{c.name}</p>
                <p style={{ fontFamily:t.fontBody, fontSize:10, color:t.chocolateLight, display:"flex", alignItems:"center", gap:3 }}>
                  <span>📍</span>{c.location}
                </p>
              </div>
              <span style={{ fontFamily:t.fontHeading, fontSize:13, color:t.chocolateDeep, fontWeight:700 }}>⭐ {c.rating}</span>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {c.tags.map(tag => (
                <span key={tag} style={{ background:t.beigeMid, color:t.chocolateMid, fontSize:10, padding:"3px 8px", borderRadius:10, fontFamily:t.fontBody }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Screen: Explore ───────────────────────────────────────
function ExploreScreen() {
  return (
    <div style={{ padding:"12px 16px 8px", display:"flex", flexDirection:"column", gap:14 }}>
      <p style={{ fontFamily:t.fontHeading, fontSize:16, fontWeight:700, color:t.chocolateDeep }}>Beanstalk Café</p>
      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginTop:-10 }}>Banjara Hills · Open until 10 PM</p>
      <span style={{ background:"#2D6A4F", color:"white", fontFamily:t.fontBody, fontSize:10, padding:"4px 10px", borderRadius:20, width:"fit-content" }}>Open Now</span>

      {/* Ratings */}
      <div style={{ display:"flex", gap:8 }}>
        {[["4.9","Food"],["4.6","Service"],["4.8","Ambience"]].map(([val,lb]) => (
          <div key={lb} style={{ flex:1, background:"white", borderRadius:14, padding:"10px 8px", textAlign:"center", boxShadow:`0 2px 8px ${t.chocolateDeep}0E` }}>
            <p style={{ fontFamily:t.fontHeading, fontSize:16, fontWeight:700, color:t.chocolateDeep, marginBottom:2 }}>{val}</p>
            <p style={{ fontFamily:t.fontBody, fontSize:10, color:t.chocolateLight }}>{lb}</p>
          </div>
        ))}
      </div>

      {/* Amenities */}
      <div>
        <p style={{ fontFamily:t.fontHeading, fontSize:12, fontWeight:600, color:t.chocolateDeep, marginBottom:8 }}>Amenities</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {["WiFi","Vegan","Outdoor","Outlets","Parking"].map(a => (
            <span key={a} style={{ background:t.beigeMid, color:t.chocolateMid, fontSize:10, padding:"4px 10px", borderRadius:10, fontFamily:t.fontBody }}>{a}</span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display:"flex", gap:8 }}>
        <button style={{ flex:1, background:"white", border:`1.5px solid ${t.chocolateDeep}`, color:t.chocolateDeep, borderRadius:14, padding:"10px 0", fontFamily:t.fontBody, fontSize:11, fontWeight:600, cursor:"pointer" }}>View Menu</button>
        <button style={{ flex:1, background:t.chocolateDeep, color:t.cream, borderRadius:14, padding:"10px 0", fontFamily:t.fontBody, fontSize:11, fontWeight:600, border:"none", cursor:"pointer" }}>Reserve Table</button>
      </div>

      {/* Reviews */}
      <p style={{ fontFamily:t.fontHeading, fontSize:13, fontWeight:600, color:t.chocolateDeep }}>Reviews</p>
      {[{ name:"Priya S.", stars:5, text:"The mushroom toast is unbelievable. My Sunday ritual." },{ name:"Rahul K.", stars:4, text:"Moody lighting, great playlist, staff knows their coffee." }].map(r => (
        <div key={r.name} style={{ background:"white", borderRadius:14, padding:"12px 14px", boxShadow:`0 2px 8px ${t.chocolateDeep}0E`, marginBottom:8 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
            <p style={{ fontFamily:t.fontBody, fontSize:12, fontWeight:600, color:t.chocolateDeep }}>{r.name}</p>
            <span style={{ fontSize:11 }}>{"⭐".repeat(r.stars)}</span>
          </div>
          <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateMid, lineHeight:1.6 }}>"{r.text}"</p>
        </div>
      ))}
    </div>
  );
}

// ── Screen: Menu ─────────────────────────────────────────
function MenuScreen() {
  const [cart, setCart] = useState({});
  const add = (name) => setCart(p => ({ ...p, [name]:(p[name]||0)+1 }));
  return (
    <div style={{ padding:"12px 16px 8px" }}>
      <p style={{ fontFamily:t.fontHeading, fontSize:16, fontWeight:700, color:t.chocolateDeep, marginBottom:4 }}>Menu</p>
      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:14 }}>Beanstalk Café</p>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {MENU_ITEMS.map(item => (
          <div key={item.name} style={{ background:"white", borderRadius:14, padding:"12px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:`0 2px 8px ${t.chocolateDeep}0E` }}>
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:t.fontHeading, fontSize:13, fontWeight:600, color:t.chocolateDeep, marginBottom:4 }}>{item.name}</p>
              <p style={{ fontFamily:t.fontHeading, fontSize:13, color:t.chocolateMid, marginBottom:4 }}>₹{item.price}</p>
              <div style={{ display:"flex", gap:10 }}>
                <span style={{ fontFamily:t.fontBody, fontSize:10, color:t.chocolateLight }}>Qty {item.qty}</span>
                <span style={{ fontFamily:t.fontBody, fontSize:10, color:t.chocolateLight }}>Qual {item.qual}</span>
              </div>
            </div>
            <button onClick={() => add(item.name)}
              style={{ width:32, height:32, borderRadius:10, background: cart[item.name] ? t.chocolateDeep : t.beigeMid, color: cart[item.name] ? t.cream : t.chocolateDeep, border:"none", cursor:"pointer", fontFamily:t.fontBody, fontSize:16, fontWeight:700, flexShrink:0, transition:"all 0.2s" }}>
              {cart[item.name] ? cart[item.name] : "+"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Screen: Reserve ───────────────────────────────────────
function ReserveScreen() {
  const [selDate, setSelDate]     = useState(14);
  const [selTime, setSelTime]     = useState("7:00 PM");
  const [guests, setGuests]       = useState(2);
  const [seating, setSeating]     = useState("Window");
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, gap:16, textAlign:"center" }}>
      <div style={{ fontSize:40 }}>🥑</div>
      <p style={{ fontFamily:t.fontHeading, fontSize:20, fontWeight:700, color:t.chocolateDeep }}>You're booked!</p>
      <p style={{ fontFamily:t.fontBody, fontSize:13, color:t.chocolateMid, lineHeight:1.7 }}>
        Beanstalk Café<br />
        {DATE_SLOTS.find(d=>d.date===selDate)?.day} {selDate} · {selTime}<br />
        {guests} Guests · {seating} Seat
      </p>
      <button onClick={() => setConfirmed(false)} style={{ background:t.beigeMid, color:t.chocolateDeep, border:"none", borderRadius:14, padding:"10px 24px", fontFamily:t.fontBody, fontSize:12, cursor:"pointer", marginTop:8 }}>
        Back
      </button>
    </div>
  );

  return (
    <div style={{ padding:"12px 16px 8px", display:"flex", flexDirection:"column", gap:14 }}>
      <p style={{ fontFamily:t.fontHeading, fontSize:15, fontWeight:700, color:t.chocolateDeep }}>Reserve a Table</p>
      <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginTop:-10 }}>Beanstalk Café</p>

      {/* Date */}
      <div>
        <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:8, letterSpacing:"0.08em", textTransform:"uppercase" }}>Date</p>
        <div style={{ display:"flex", gap:8, overflowX:"auto" }}>
          {DATE_SLOTS.map(d => (
            <button key={d.date} onClick={() => setSelDate(d.date)}
              style={{ flexShrink:0, width:44, padding:"8px 0", borderRadius:12, border:"none", cursor:"pointer", background: selDate===d.date ? t.chocolateDeep : t.beigeMid, color: selDate===d.date ? t.cream : t.chocolateMid, fontFamily:t.fontBody, fontSize:10, transition:"all 0.2s", textAlign:"center" }}>
              <div style={{ fontSize:9, marginBottom:3 }}>{d.day}</div>
              <div style={{ fontWeight:700, fontSize:14 }}>{d.date}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time */}
      <div>
        <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:8, letterSpacing:"0.08em", textTransform:"uppercase" }}>Time</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
          {TIME_SLOTS.map(slot => (
            <button key={slot} onClick={() => setSelTime(slot)}
              style={{ padding:"7px 12px", borderRadius:10, border:"none", cursor:"pointer", background: selTime===slot ? t.chocolateDeep : t.beigeMid, color: selTime===slot ? t.cream : t.chocolateMid, fontFamily:t.fontBody, fontSize:10, transition:"all 0.2s" }}>
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Guests */}
      <div>
        <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:8, letterSpacing:"0.08em", textTransform:"uppercase" }}>Guests</p>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <button onClick={() => setGuests(g => Math.max(1,g-1))} style={{ width:32, height:32, borderRadius:10, background:t.beigeMid, border:"none", cursor:"pointer", fontFamily:t.fontBody, fontSize:18, color:t.chocolateDeep }}>−</button>
          <span style={{ fontFamily:t.fontHeading, fontSize:15, color:t.chocolateDeep, fontWeight:600, minWidth:70, textAlign:"center" }}>{guests} {guests===1?"Guest":"Guests"}</span>
          <button onClick={() => setGuests(g => Math.min(10,g+1))} style={{ width:32, height:32, borderRadius:10, background:t.beigeMid, border:"none", cursor:"pointer", fontFamily:t.fontBody, fontSize:18, color:t.chocolateDeep }}>+</button>
        </div>
      </div>

      {/* Seating */}
      <div>
        <p style={{ fontFamily:t.fontBody, fontSize:11, color:t.chocolateLight, marginBottom:8, letterSpacing:"0.08em", textTransform:"uppercase" }}>Seating Preference</p>
        <div style={{ display:"flex", gap:8 }}>
          {SEATING.map(s => (
            <button key={s.label} onClick={() => setSeating(s.label)}
              style={{ flex:1, padding:"10px 0", borderRadius:12, border:"none", cursor:"pointer", background: seating===s.label ? t.chocolateDeep : t.beigeMid, color: seating===s.label ? t.cream : t.chocolateMid, fontFamily:t.fontBody, fontSize:10, transition:"all 0.2s", textAlign:"center" }}>
              <div style={{ fontSize:16, marginBottom:3 }}>{s.icon}</div>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Confirm */}
      <button onClick={() => setConfirmed(true)}
        style={{ background:t.chocolateDeep, color:t.cream, border:"none", borderRadius:16, padding:"14px 0", fontFamily:t.fontBody, fontSize:13, fontWeight:600, cursor:"pointer", width:"100%", marginTop:4 }}>
        Confirm Reservation →
      </button>
    </div>
  );
}

// ── Full AppSection ───────────────────────────────────────
export default function AppSection() {
  const [screen, setScreen]       = useState("home");
  const [leftRef, leftIn]         = useInView();
  const [rightRef, rightIn]       = useInView();
  const [arrowAnim, setArrowAnim] = useState(false);

  // Animate arrows periodically
  useEffect(() => {
    const id = setInterval(() => {
      setArrowAnim(true);
      setTimeout(() => setArrowAnim(false), 600);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const screenMap = {
    home:    <HomeScreen />,
    explore: <ExploreScreen />,
    menu:    <MenuScreen />,
    reserve: <ReserveScreen />,
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        // Grainy beige-chocolate gradient background
        background: "linear-gradient(135deg, #F7F1E8 0%, #EDE0CC 35%, #DDD0B8 60%, #C8B49A 85%, #B8965A22 100%)",
      }}
      className="py-24">

      {/* Grain texture overlay */}
      <div style={{ position:"absolute", inset:0, zIndex:0, opacity:0.35, pointerEvents:"none",
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat:"repeat", backgroundSize:"200px 200px" }} />

      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:48, flexWrap:"wrap", justifyContent:"center" }}>

          {/* ── LEFT: text + nav dots ── */}
          <div ref={leftRef}
            style={{ flex:"1 1 320px", maxWidth:460, opacity:leftIn?1:0, transform:leftIn?"translateX(0)":"translateX(-40px)", transition:"all 0.8s ease" }}>

            {/* Small label */}
            <p style={{ fontFamily:t.fontBody, fontSize:12, letterSpacing:"0.2em", textTransform:"uppercase", color:t.chocolateMid, marginBottom:16 }}>
              The App
            </p>
            <p style={{ fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:t.chocolateLight, marginBottom:12 }}>
              Home
            </p>

            {/* Big heading */}
            <h2 style={{ fontFamily:t.fontHeading, fontSize:"clamp(32px,4.5vw,58px)", fontWeight:700, color:t.chocolateDeep, lineHeight:1.1, marginBottom:20 }}>
              Your city's best cafés,<br />curated for you.
            </h2>

            {/* Sub */}
            <p style={{ fontFamily:t.fontBody, fontSize:15, color:t.chocolateMid, lineHeight:1.8, marginBottom:44 }}>
              Browse nearby spots, filter by mood, and discover hidden gems you never knew existed.
            </p>

            {/* Nav dot buttons */}
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              {NAV_ITEMS.map(nav => {
                const isActive = screen === nav.id;
                return (
                  <button key={nav.id} onClick={() => setScreen(nav.id)}
                    style={{ display:"flex", alignItems:"center", gap:14, background:"none", border:"none", cursor:"pointer", padding:0, textAlign:"left" }}>
                    {/* Dot / dash indicator */}
                    <div style={{ width: isActive ? 28 : 8, height:8, borderRadius:999, background: isActive ? t.chocolateDeep : t.beigeDark, transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)", flexShrink:0 }} />
                    <span style={{ fontFamily:t.fontBody, fontSize:13, fontWeight: isActive ? 600 : 400, color: isActive ? t.chocolateDeep : t.chocolateLight, transition:"all 0.3s", letterSpacing:"0.03em" }}>
                      {nav.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── PHONE ── */}
          <div ref={rightRef}
            style={{ opacity:rightIn?1:0, transform:rightIn?"translateY(0)":"translateY(40px)", transition:"all 0.8s ease 0.15s", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <PhoneShell>
              {/* Screen content */}
              <div style={{ flex:1 }}>
                {screenMap[screen]}
              </div>

              {/* Bottom tab bar */}
              <div style={{ background:"rgba(253,251,247,0.97)", backdropFilter:"blur(12px)", borderTop:`1px solid ${t.beigeMid}`, padding:"10px 0 16px", display:"flex", justifyContent:"space-around", flexShrink:0 }}>
                {NAV_ITEMS.map(nav => {
                  const isActive = screen === nav.id;
                  return (
                    <button key={nav.id} onClick={() => setScreen(nav.id)}
                      style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, background:"none", border:"none", cursor:"pointer", padding:"4px 10px", borderRadius:10, transition:"all 0.2s" }}>
                      <span style={{ fontSize:18, filter: isActive ? "none" : "grayscale(1) opacity(0.5)" }}>{nav.icon}</span>
                      <span style={{ fontFamily:t.fontBody, fontSize:9, color: isActive ? t.chocolateDeep : t.chocolateLight, fontWeight: isActive ? 600 : 400 }}>
                        {nav.label}
                      </span>
                      {isActive && <div style={{ width:18, height:2.5, borderRadius:999, background:t.chocolateDeep }} />}
                    </button>
                  );
                })}
              </div>
            </PhoneShell>
          </div>

          {/* ── RIGHT: Try it out ── */}
          <div style={{ flex:"1 1 180px", maxWidth:220, opacity:rightIn?1:0, transform:rightIn?"translateX(0)":"translateX(40px)", transition:"all 0.8s ease 0.25s", display:"flex", flexDirection:"column", alignItems:"flex-start", gap:12 }}>
            <h3 style={{ fontFamily:t.fontHeading, fontSize:"clamp(32px,4vw,52px)", fontWeight:700, color:t.chocolateDeep, lineHeight:1.1, margin:0 }}>
              Try it<br />out
            </h3>

            {/* Animated arrows */}
            <div style={{ display:"flex", gap:6, marginTop:4 }}>
              {["‹‹", "‹‹"].map((ch, i) => (
                <span key={i} style={{ fontFamily:t.fontHeading, fontSize:28, color:t.chocolateMid, opacity: arrowAnim ? 1 : 0.35, transform: arrowAnim ? "translateX(-6px)" : "translateX(0)", transition:`all 0.3s ease ${i*0.1}s`, display:"block" }}>
                  {ch}
                </span>
              ))}
            </div>

            <p style={{ fontFamily:t.fontBody, fontSize:12, color:t.chocolateLight, letterSpacing:"0.12em", textTransform:"uppercase", marginTop:4 }}>
              Tap &amp; explore
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}