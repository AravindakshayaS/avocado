"use client";
import { useState } from "react";
import { theme as t } from "./theme";
import useInView from "./useInView";

const REVIEWS = [
  { initial:"P", name:"Priya S.",  badge:"Top Contributor",   text:"The mushroom toast at Beanstalk is unreal. Portion is generous, quality is consistent every time.", helpful:32 },
  { initial:"R", name:"Rahul K.",  badge:"Local Explorer",    text:"Ambience at Dark Roast is absolutely stunning — moody lighting, great playlist, staff knows their coffee.", helpful:18 },
  { initial:"A", name:"Ananya T.", badge:"Vegan Foodie",      text:"Best outdoor seating in the city. The vegan menu is thoughtful, not an afterthought.", helpful:41 },
  { initial:"D", name:"Dev M.",    badge:"Hidden Gem Hunter", text:"Found this place through Avocado's hidden gems feature. Completely blown away.", helpful:27 },
  { initial:"S", name:"Sneha R.",  badge:"Top Contributor",   text:"Live music on Fridays at Dark Roast is worth every minute. Stunning vibe.", helpful:35 },
  { initial:"K", name:"Kiran P.",  badge:"Food Critic",       text:"Patio & Press has the best cold brew in Hyderabad. Period.", helpful:22 },
];

const AVATAR_COLORS = [
  t.chocolateMid,
  t.beigeDark,
  t.chocolateLight,
  "#8A5A3C",
  "#B08968",
  "#6B4530",
];

function ReviewCard({ rev, index }) {
  const [ref, inView] = useInView();
  const [liked, setLiked] = useState(false);

  return (
    <div ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.55s ease ${(index % 3) * 0.1}s`,
        background: t.cream,
        borderRadius: "1.5rem",
        padding: "28px 24px",
        border: `1px solid ${t.beigeMid}`,
        boxShadow: `0 2px 20px ${t.chocolateDeep}0D`,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}>

      {/* Avatar + name row */}
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
        <div style={{ width:44, height:44, borderRadius:"50%", background:AVATAR_COLORS[index % AVATAR_COLORS.length], display:"flex", alignItems:"center", justifyContent:"center", color:t.cream, fontFamily:t.fontHeading, fontSize:20, fontWeight:600, flexShrink:0 }}>
          {rev.initial}
        </div>
        <div>
          <p style={{ color:t.chocolateDeep, fontFamily:t.fontBody, fontSize:14, fontWeight:600, marginBottom:2 }}>{rev.name}</p>
          <span style={{ background:t.beigeMid, color:t.chocolateMid, fontFamily:t.fontBody, fontSize:10, letterSpacing:"0.06em", padding:"3px 10px", borderRadius:999 }}>
            {rev.badge}
          </span>
        </div>
      </div>

      {/* Review text */}
      <p style={{ color:t.chocolateMid, fontFamily:t.fontBody, fontSize:14, lineHeight:1.8, flex:1, marginBottom:22 }}>
        "{rev.text}"
      </p>

      {/* Bottom row */}
      <div style={{ borderTop:`1px solid ${t.beigeMid}`, paddingTop:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:12 }}>
          {liked ? rev.helpful + 1 : rev.helpful} found helpful
        </span>
        <button onClick={() => setLiked(!liked)}
          style={{ background: liked ? t.chocolateDeep : t.beigeMid, color: liked ? t.cream : t.chocolateMid, borderRadius:999, padding:"7px 18px", fontFamily:t.fontBody, fontSize:12, fontWeight:500, border:"none", cursor:"pointer", transition:"all 0.25s" }}
          onMouseEnter={e => { if (!liked) e.currentTarget.style.background = t.beigeDark; }}
          onMouseLeave={e => { if (!liked) e.currentTarget.style.background = t.beigeMid; }}>
          {liked ? "Helpful ✓" : "Helpful"}
        </button>
      </div>
    </div>
  );
}

export default function FoodiesSection() {
  const [headRef, headIn] = useInView();

  return (
    <section id="foodies" style={{ background:t.chocolateDeep, minHeight:"100vh", display:"flex", alignItems:"center" }} className="py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Centered heading block */}
        <div ref={headRef} style={{ textAlign:"center", maxWidth:700, margin:"0 auto 64px", opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(30px)", transition:"all 0.7s ease" }}>
          <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:20 }}>
            Foodies
          </p>
          <h2 style={{ color:t.cream, fontFamily:t.fontDisplay, fontSize:"clamp(36px,5vw,60px)", fontWeight:600, letterSpacing:"0.02em", lineHeight:1.1, marginBottom:24 }}>
            Dining is better<br />together.
          </h2>
          <div style={{ width:48, height:2, background:t.beigeDark, borderRadius:2, margin:"0 auto 24px" }} />
          <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:16, lineHeight:1.8 }}>
            Join local groups, share your dining moments, post photos and videos.
            Connect with fellow food lovers who care as much about a great meal as you do.
          </p>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((rev, i) => <ReviewCard key={rev.name} rev={rev} index={i} />)}
        </div>
      </div>
    </section>
  );
}