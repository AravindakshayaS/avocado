"use client";
import { useState } from "react";
import { theme as t } from "./theme";
import useInView from "./useInView";

const REVIEWS = [
  { initial:"P", name:"Priya S.",  badge:"Top Contributor",     text:"The mushroom toast at Beanstalk is unreal. Portion is generous, quality is consistent every time.", helpful:32 },
  { initial:"R", name:"Rahul K.",  badge:"Local Explorer",      text:"Ambience at Dark Roast is absolutely stunning — moody lighting, great playlist, staff knows their coffee.", helpful:18 },
  { initial:"A", name:"Ananya T.", badge:"Vegan Foodie",        text:"Best outdoor seating in the city. The vegan menu is thoughtful, not an afterthought.", helpful:41 },
  { initial:"D", name:"Dev M.",    badge:"Hidden Gem Hunter",   text:"Found this place through Avocado's hidden gems feature. Completely blown away.", helpful:27 },
  { initial:"S", name:"Sneha R.",  badge:"Top Contributor",     text:"Live music on Fridays at Dark Roast is worth every minute. Stunning vibe.", helpful:35 },
  { initial:"K", name:"Kiran P.",  badge:"Food Critic",         text:"Patio & Press has the best cold brew in Hyderabad. Period.", helpful:22 },
];

const AVATAR_COLORS = [t.chocolateMid, t.beigeDark, t.chocolateLight, t.chocolateDeep, "#B08968", "#8A5A3C"];

function ReviewCard({ rev, index }) {
  const [ref, inView] = useInView();
  const [liked, setLiked] = useState(false);

  return (
    <div ref={ref}
      style={{ opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(30px)", transition:`all 0.55s ease ${(index%3)*0.1}s`, background:t.cream, borderRadius:"1.5rem", padding:24, boxShadow:`0 2px 20px ${t.chocolateDeep}12`, display:"flex", flexDirection:"column" }}>

      <div className="flex items-center gap-3 mb-4">
        <div style={{ width:42, height:42, borderRadius:"50%", background:AVATAR_COLORS[index%AVATAR_COLORS.length], display:"flex", alignItems:"center", justifyContent:"center", color:t.cream, fontFamily:t.fontHeading, fontSize:18, fontWeight:600 }}>
          {rev.initial}
        </div>
        <div>
          <p style={{ color:t.chocolateDeep }} className="font-body text-sm font-semibold">{rev.name}</p>
          <p style={{ color:t.chocolateLight }} className="font-body text-xs">{rev.badge}</p>
        </div>
      </div>

      <p style={{ color:t.chocolateMid, fontFamily:t.fontBody, fontSize:14, lineHeight:1.7, flex:1, marginBottom:20 }}>
        "{rev.text}"
      </p>

      <div style={{ borderTop:`1px solid ${t.beigeMid}`, paddingTop:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ color:t.chocolateLight }} className="font-body text-xs">{rev.helpful} found helpful</span>
        <button onClick={() => setLiked(!liked)}
          style={{ background: liked ? t.chocolateDeep : t.beigeMid, color: liked ? t.cream : t.chocolateMid, borderRadius:999, padding:"6px 16px", fontFamily:t.fontBody, fontSize:12, fontWeight:500, border:"none", cursor:"pointer", transition:"all 0.2s" }}>
          {liked ? "Helpful ✓" : "Helpful"}
        </button>
      </div>
    </div>
  );
}

export default function FoodiesSection() {
  const [headRef, headIn] = useInView();
  return (
    <section style={{ background:t.beigeWarm, minHeight:"100vh" }} className="flex items-center py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">

        <div ref={headRef} style={{ opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(30px)", transition:"all 0.7s ease", maxWidth:680, marginBottom:56 }}>
          <p style={{ color:t.chocolateLight }} className="font-body text-xs tracking-[0.3em] uppercase mb-4">Foodies</p>
          <h2 style={{ color:t.chocolateDeep }} className="font-heading text-5xl md:text-6xl tracking-wide mb-6">
            Dining is better together.
          </h2>
          <p style={{ color:t.chocolateMid }} className="font-body text-base leading-relaxed">
            Join local groups, share your dining moments, post photos and videos.
            Connect with fellow food lovers who care as much about a great meal as you do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((rev, i) => <ReviewCard key={rev.name} rev={rev} index={i} />)}
        </div>
      </div>
    </section>
  );
}