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

      {/* BG Image */}
      <img
        src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=85"
        alt="Hero cafe"
        loading="eager"
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", zIndex:0 }}
      />

      {/* Dark overlay */}
      <div style={{ position:"absolute", inset:0, zIndex:1, background:`linear-gradient(180deg, ${t.chocolateDeep}99 0%, ${t.chocolateDeep}33 45%, ${t.chocolateDeep}B3 100%)` }} />
      <div style={{ position:"absolute", inset:0, zIndex:1, background:`${t.chocolateMid}26` }} />

      {/* Content — vertically centered */}
      <div style={{ position:"relative", zIndex:2, height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 24px" }}>

        {/* Rotating headline */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, marginBottom:0 }}>
          <div style={{ height:3, width:"clamp(24px,3vw,48px)", background:`${t.cream}73`, borderRadius:2 }} />
          <h1 style={{
            fontFamily: t.fontHeading,
            fontSize: "clamp(58px,11vw,136px)",
            fontWeight: 700,
            color: t.cream,
            lineHeight: 1,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            margin: 0,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}>
            {HEADLINES[idx]}
          </h1>
          <div style={{ height:3, width:"clamp(24px,3vw,48px)", background:`${t.cream}73`, borderRadius:2 }} />
        </div>

        {/* Italic subtitle */}
        <p style={{
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontSize: "clamp(20px,3.5vw,40px)",
          color: t.beigeDark,
          marginTop: -6,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}>
          {SUBTITLES[idx]}
        </p>
      </div>

    </section>
  );
}