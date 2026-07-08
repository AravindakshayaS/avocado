"use client";
import { useState, useEffect } from "react";
import { theme as t } from "./theme";

export default function SplashScreen({ onDone }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1800);
    const t2 = setTimeout(() => onDone(), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div style={{ background:t.chocolateDeep, position:"fixed", inset:0, zIndex:100, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", opacity: fade?0:1, pointerEvents: fade?"none":"auto", transition:"opacity 0.7s" }}>
      <div style={{ background:t.chocolateLight, opacity:0.1, position:"absolute", top:"25%", left:"25%", width:300, height:300, borderRadius:"50%", filter:"blur(60px)" }} />
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 style={{ color:t.cream, fontFamily:t.fontHeading, fontSize:"5rem", letterSpacing:"0.15em", lineHeight:1 }}>Avocado</h1>
        <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.4em", textTransform:"uppercase" }}>Discover · Reserve · Savour</p>
        <div className="mt-8 flex gap-2.5">
          {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background:t.chocolateLight, animationDelay:`${i*0.18}s` }} />)}
        </div>
      </div>
    </div>
  );
}