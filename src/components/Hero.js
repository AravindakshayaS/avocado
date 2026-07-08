"use client";
import { useState, useEffect } from "react";
import { theme as t } from "./theme";

const HEADLINES = ["MOCHA","COFFEE","BRUNCH","RESERVE"];
const SUBTITLES = ["Rich & Velvety","Slow & Steady","Every Morning","Your Table"];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(p => (p+1)%HEADLINES.length); setVisible(true); }, 400);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ position:"relative", width:"100%", height:"100vh", minHeight:560, overflow:"hidden" }}>
      <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=85" alt="Hero cafe" loading="eager"
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", zIndex:0 }} />
      <div style={{ position:"absolute", inset:0, zIndex:1, background:`linear-gradient(180deg, ${t.chocolateDeep}99 0%, ${t.chocolateDeep}33 45%, ${t.chocolateDeep}B3 100%)` }} />
      <div style={{ position:"absolute", inset:0, zIndex:1, background:`${t.chocolateMid}26` }} />

      <div style={{ position:"relative", zIndex:2, height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
        <div style={{ paddingTop:128, textAlign:"center" }}>
          <p style={{ color:`${t.cream}B3`, fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.35em", textTransform:"uppercase" }}>
            Open Every Day &nbsp;·&nbsp; 8AM – 10PM
          </p>
        </div>

        <div style={{ textAlign:"center", padding:"0 24px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16 }}>
            <div style={{ height:3, width:"clamp(24px,3vw,48px)", background:`${t.cream}73`, borderRadius:2 }} />
            <h1 style={{ fontFamily:t.fontHeading, fontSize:"clamp(58px,11vw,136px)", fontWeight:700, color:t.cream, lineHeight:1, letterSpacing:"0.04em", textTransform:"uppercase", margin:0, opacity:visible?1:0, transition:"opacity 0.35s ease" }}>
              {HEADLINES[idx]}
            </h1>
            <div style={{ height:3, width:"clamp(24px,3vw,48px)", background:`${t.cream}73`, borderRadius:2 }} />
          </div>
          <p style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:"clamp(20px,3.5vw,40px)", color:t.beigeDark, marginTop:-6, marginBottom:32, opacity:visible?1:0, transition:"opacity 0.35s ease" }}>
            {SUBTITLES[idx]}
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button style={{ background:`${t.cream}F2`, color:t.chocolateDeep, border:"none", borderRadius:999, padding:"14px 36px", fontFamily:t.fontBody, fontSize:14, fontWeight:600, cursor:"pointer", letterSpacing:"0.04em", boxShadow:"0 4px 20px rgba(0,0,0,0.2)", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.transform="scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.background=`${t.cream}F2`; e.currentTarget.style.transform="scale(1)"; }}>
              Order Now
            </button>
            <button style={{ background:`${t.cream}1F`, color:t.cream, border:`1.5px solid ${t.cream}8C`, borderRadius:999, padding:"14px 36px", fontFamily:t.fontBody, fontSize:14, fontWeight:500, cursor:"pointer", letterSpacing:"0.04em", backdropFilter:"blur(8px)", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background=`${t.cream}40`; e.currentTarget.style.transform="scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.background=`${t.cream}1F`; e.currentTarget.style.transform="scale(1)"; }}>
              See More
            </button>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", padding:"0 40px 40px", flexWrap:"wrap", gap:12 }}>
          <div>
            <p style={{ fontFamily:t.fontHeading, fontSize:20, fontWeight:600, color:t.cream, marginBottom:4 }}>100% Community Driven</p>
            <p style={{ fontFamily:t.fontBody, fontSize:12, color:`${t.cream}8C`, maxWidth:260, lineHeight:1.6 }}>
              Verified reviews from real diners. Discover cafes that feel like home.
            </p>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ display:"flex", gap:8, marginBottom:8, justifyContent:"flex-end" }}>
              {[["2,400+","Cafes"],["18k+","Reviews"]].map(([n,l]) => (
                <div key={l} style={{ background:`${t.cream}1A`, border:`1px solid ${t.cream}33`, borderRadius:999, padding:"6px 14px", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ color:t.cream, fontFamily:t.fontHeading, fontSize:16, fontWeight:600 }}>{n}</span>
                  <span style={{ color:`${t.cream}8C`, fontFamily:t.fontBody, fontSize:11 }}>{l}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily:t.fontHeading, fontSize:13, color:`${t.cream}66`, letterSpacing:"0.05em" }}>&copy;2025</p>
          </div>
        </div>
      </div>

      <div style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, zIndex:3 }}>
        <div style={{ width:26, height:42, border:`1.5px solid ${t.cream}59`, borderRadius:999, display:"flex", alignItems:"flex-start", justifyContent:"center", padding:5 }}>
          <div style={{ width:4, height:8, background:`${t.cream}A6`, borderRadius:999, animation:"scrollDot 1.6s ease-in-out infinite" }} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scrollDot { 0% { transform:translateY(0); opacity:1; } 100% { transform:translateY(14px); opacity:0; } }
      `}</style>
    </section>
  );
}