"use client";
import { useState } from "react";
import { theme as t } from "./theme";
import useInView from "./useInView";

const DISHES = [
  { name:"Hazelnut Flat White", price:280, rating:4.8, desc:"Nutty, smooth, perfectly balanced microfoam.", quality:4.7, quantity:4.2 },
  { name:"Mushroom Toast",      price:320, rating:4.9, desc:"Wild mushrooms on toasted sourdough with herb oil.", quality:4.9, quantity:4.5 },
  { name:"Cold Brew",           price:240, rating:4.6, desc:"Slow-steeped for 18 hours. Clean, bold, no bitterness.", quality:4.6, quantity:4.3 },
  { name:"Avocado Toast",       price:380, rating:4.7, desc:"Smashed avocado, chilli flakes, lemon zest on sourdough.", quality:4.6, quantity:4.4 },
];

export default function DishSection() {
  const [headRef, headIn] = useInView();
  const [active, setActive] = useState(2);

  return (
    <section style={{ background:t.beigeMid, minHeight:"100vh", display:"flex", alignItems:"center" }} className="py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Centered heading block */}
        <div ref={headRef} style={{ textAlign:"center", maxWidth:700, margin:"0 auto 64px", opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(30px)", transition:"all 0.7s ease" }}>
          <p style={{ color:t.chocolateMid, fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:20 }}>
            Dish Ratings
          </p>
          <h2 style={{ color:t.chocolateDeep, fontFamily:t.fontHeading, fontSize:"clamp(36px,5vw,60px)", fontWeight:600, letterSpacing:"0.02em", lineHeight:1.1, marginBottom:24 }}>
            Know exactly what<br />you're ordering.
          </h2>
          <div style={{ width:48, height:2, background:t.chocolateDeep, borderRadius:2, margin:"0 auto 24px" }} />
          <p style={{ color:t.chocolateMid, fontFamily:t.fontBody, fontSize:16, lineHeight:1.8 }}>
            Every dish on Avocado is rated for quality and quantity by verified diners.
            No more disappointment. No more overpriced portions.
          </p>
        </div>

        {/* Dish cards + detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left — dish list, no images */}
          <div className="grid grid-cols-2 gap-4">
            {DISHES.map((dish, i) => (
              <button key={dish.name} onClick={() => setActive(i)}
                style={{
                  background: active===i ? t.chocolateDeep : t.cream,
                  borderRadius:"1.25rem",
                  padding:"22px 20px",
                  cursor:"pointer",
                  transition:"all 0.3s",
                  border: active===i ? "none" : `1px solid ${t.beigeDark}50`,
                  boxShadow: active===i ? `0 12px 32px ${t.chocolateDeep}40` : `0 2px 12px ${t.chocolateDeep}0A`,
                  textAlign:"left",
                  width:"100%",
                }}>
                {/* Dish name */}
                <p style={{ color: active===i ? t.cream : t.chocolateDeep, fontFamily:t.fontHeading, fontSize:18, fontWeight:600, marginBottom:8, lineHeight:1.3 }}>
                  {dish.name}
                </p>

                {/* Price + rating row */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <span style={{ color: active===i ? t.beigeDark : t.chocolateLight, fontFamily:t.fontBody, fontSize:13, fontWeight:600 }}>
                    ₹{dish.price}
                  </span>
                  <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                    <svg style={{ width:12, height:12, color: active===i ? t.beigeDark : t.chocolateMid }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span style={{ color: active===i ? t.cream : t.chocolateDeep, fontFamily:t.fontHeading, fontSize:14, fontWeight:600 }}>
                      {dish.rating}
                    </span>
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right — detail panel, no image */}
          <div style={{ background:t.chocolateDeep, borderRadius:"1.75rem", padding:"40px 36px", position:"relative", overflow:"hidden" }}>
            {/* Decorative rings */}
            <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", border:`1px solid ${t.chocolateLight}20` }} />
            <div style={{ position:"absolute", top:-30, right:-30, width:130, height:130, borderRadius:"50%", border:`1px solid ${t.chocolateLight}15` }} />

            {/* Dish name + price */}
            <div style={{ marginBottom:10, position:"relative", zIndex:2 }}>
              <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:10 }}>
                Selected Dish
              </p>
              <h3 style={{ color:t.cream, fontFamily:t.fontHeading, fontSize:32, fontWeight:600, marginBottom:6 }}>
                {DISHES[active].name}
              </h3>
              <p style={{ color:t.beigeDark, fontFamily:t.fontHeading, fontSize:24 }}>
                ₹{DISHES[active].price}
              </p>
            </div>

            {/* Divider */}
            <div style={{ width:"100%", height:1, background:`${t.chocolateLight}30`, margin:"24px 0", position:"relative", zIndex:2 }} />

            {/* Description */}
            <p style={{ color:t.chocolateLight, fontFamily:t.fontBody, fontSize:14, lineHeight:1.8, marginBottom:28, position:"relative", zIndex:2, maxWidth:320 }}>
              {DISHES[active].desc}
            </p>

            {/* Quality + Quantity bars */}
            <div style={{ display:"flex", flexDirection:"column", gap:20, position:"relative", zIndex:2 }}>
              {[["Quality", DISHES[active].quality], ["Quantity", DISHES[active].quantity]].map(([label, val]) => (
                <div key={label}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                    <span style={{ color:t.cream, fontFamily:t.fontBody, fontSize:13, letterSpacing:"0.05em" }}>{label}</span>
                    <span style={{ color:t.beigeDark, fontFamily:t.fontHeading, fontSize:14 }}>{val} / 5</span>
                  </div>
                  <div style={{ background:`${t.chocolateLight}30`, height:5, borderRadius:999 }}>
                    <div style={{ background:t.beigeDark, height:5, borderRadius:999, width:`${(val/5)*100}%`, transition:"width 0.6s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}