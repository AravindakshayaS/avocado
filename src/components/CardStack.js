"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { theme as t } from "./theme";

const INITIAL_CARDS = [
  { id:1, name:"Beanstalk Café",    location:"Banjara Hills", tag:"Hidden Gem",    rating:4.8, vibe:"Pour Over · WiFi · Bakery" },
  { id:2, name:"The Dark Roast",    location:"Madhapur",      tag:"Live Music",     rating:4.5, vibe:"Pet Friendly · Moody Vibes" },
  { id:3, name:"Patio & Press",     location:"Jubilee Hills",  tag:"Vegan Friendly", rating:4.6, vibe:"Outdoor · Great Ambience" },
  { id:4, name:"Milk & Timber Co.", location:"Jayanagar",      tag:"Family Brunch",  rating:4.7, vibe:"Spacious · Parking" },
  { id:5, name:"The Aloe Garden",   location:"Koramangala",    tag:"Work Session",   rating:4.9, vibe:"WiFi · Power Outlets · Quiet" },
];

function Card({ card, index, total, onRemove }) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.4, 1, 1, 1, 0.4]);
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const skipOpacity = useTransform(x, [-100, -20], [1, 0]);
  const isTop = index === total - 1;
  const stackOffset = (total - 1 - index) * 10;
  const stackScale  = 1 - (total - 1 - index) * 0.06;

  const handleDragEnd = async (_, info) => {
    if (info.offset.x > 120) {
      await controls.start({ x: 380, opacity: 0, transition:{ duration:0.25 } });
      onRemove(card.id);
    } else if (info.offset.x < -120) {
      await controls.start({ x: -380, opacity: 0, transition:{ duration:0.25 } });
      onRemove(card.id);
    } else {
      controls.start({ x:0, transition:{ type:"spring", stiffness:300, damping:22 } });
    }
  };

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left:0, right:0 }}
      style={{ x: isTop ? x : 0, rotate: isTop ? rotate : 0, opacity: isTop ? opacity : 1, position:"absolute", bottom: stackOffset, scale: stackScale, zIndex: index }}
      animate={controls}
      onDragEnd={isTop ? handleDragEnd : undefined}
      whileDrag={{ scale:1.04, cursor:"grabbing" }}
      transition={{ duration:0.2 }}>
      <div style={{ width:300, minHeight:380, background:"rgba(253,251,247,0.88)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", borderRadius:"1.75rem", boxShadow:`0 20px 60px ${t.chocolateDeep}33`, border:`1px solid rgba(210,180,140,0.4)`, padding:"32px 28px", display:"flex", flexDirection:"column", justifyContent:"space-between", cursor: isTop ? "grab" : "default", position:"relative", overflow:"hidden" }}>
        {isTop && (
          <>
            <motion.div style={{ opacity:likeOpacity, position:"absolute", top:24, left:24, background:"#4A7C59", color:"#fff", padding:"6px 16px", borderRadius:999, fontFamily:t.fontBody, fontSize:12, fontWeight:600, letterSpacing:"0.1em", zIndex:10 }}>SAVE</motion.div>
            <motion.div style={{ opacity:skipOpacity, position:"absolute", top:24, right:24, background:t.chocolateMid, color:"#fff", padding:"6px 16px", borderRadius:999, fontFamily:t.fontBody, fontSize:12, fontWeight:600, letterSpacing:"0.1em", zIndex:10 }}>SKIP</motion.div>
          </>
        )}
        <div>
          <span style={{ background:t.beigeMid, color:t.chocolateMid, fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.08em", padding:"4px 12px", borderRadius:999 }}>{card.tag}</span>
        </div>
        <div>
          <h3 style={{ color:t.chocolateDeep, fontFamily:t.fontHeading, fontSize:28, fontWeight:600, lineHeight:1.2, marginBottom:8 }}>{card.name}</h3>
          <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:13, marginBottom:16, display:"flex", alignItems:"center", gap:5 }}>
            <svg style={{ width:12, height:12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            {card.location}
          </p>
          <p style={{ color:t.chocolateMid, fontFamily:t.fontBody, fontSize:13, lineHeight:1.7, marginBottom:24 }}>{card.vibe}</p>
        </div>
        <div style={{ borderTop:`1px solid ${t.beigeMid}`, paddingTop:16, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <svg style={{ width:14, height:14, color:t.beigeDark }} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <span style={{ color:t.chocolateDeep, fontFamily:t.fontHeading, fontSize:18, fontWeight:600 }}>{card.rating}</span>
          </div>
          {isTop && <span style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:11 }}>← skip · save →</span>}
        </div>
      </div>
    </motion.div>
  );
}

export default function CardStack() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const removeCard = (id) => setCards(prev => prev.filter(c => c.id !== id));

  return (
    // Transparent — mesh shows fully through this section
    <section style={{ background:"transparent", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }} className="py-24">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center">
        <div style={{ textAlign:"center", marginBottom:56, maxWidth:560 }}>
          <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:16 }}>Discover</p>
          <h2 style={{ color:t.chocolateDeep, fontFamily:t.fontHeading, fontSize:"clamp(32px,4vw,52px)", fontWeight:600, lineHeight:1.1, marginBottom:16 }}>Swipe to find your next table.</h2>
          <div style={{ width:40, height:2, background:t.beigeDark, borderRadius:2, margin:"0 auto 16px" }} />
          <p style={{ color:t.chocolateMid, fontFamily:t.fontBody, fontSize:14, lineHeight:1.8 }}>Drag right to save a cafe, left to skip.</p>
        </div>

        <div style={{ position:"relative", height:420, width:300, marginBottom:48 }}>
          {cards.length > 0 ? (
            cards.map((card, i) => <Card key={card.id} card={card} index={i} total={cards.length} onRemove={removeCard} />)
          ) : (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:16 }}>
              <p style={{ color:t.chocolateLight, fontFamily:t.fontHeading, fontSize:22, textAlign:"center" }}>You've seen them all.</p>
              <button onClick={() => setCards(INITIAL_CARDS)} style={{ background:t.chocolateDeep, color:t.cream, borderRadius:999, padding:"12px 28px", fontFamily:t.fontBody, fontSize:13, fontWeight:600, border:"none", cursor:"pointer" }}>Start Over</button>
            </div>
          )}
        </div>

        <div style={{ display:"flex", gap:8 }}>
          {INITIAL_CARDS.map(c => (
            <div key={c.id} style={{ width:8, height:8, borderRadius:"50%", background: cards.find(x => x.id===c.id) ? t.chocolateDeep : t.beigeMid, transition:"background 0.3s" }} />
          ))}
        </div>
      </div>
    </section>
  );
}