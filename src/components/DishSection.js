"use client";
import { useState } from "react";
import { theme as t } from "./theme";
import useInView from "./useInView";

const DISHES = [
  { name:"Hazelnut Flat White", price:280, rating:4.8, image:"https://images.unsplash.com/photo-1561882468-9110d70d2a78?w=300&q=70", desc:"Nutty, smooth, perfectly balanced microfoam.", quality:4.7, quantity:4.2 },
  { name:"Mushroom Toast",      price:320, rating:4.9, image:"https://images.unsplash.com/photo-1603046891744-1f4b04a6dd41?w=300&q=70", desc:"Wild mushrooms on toasted sourdough with herb oil.", quality:4.9, quantity:4.5 },
  { name:"Cold Brew",           price:240, rating:4.6, image:"https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300&q=70", desc:"Slow-steeped for 18 hours. Clean, bold, no bitterness.", quality:4.6, quantity:4.3 },
  { name:"Avocado Toast",       price:380, rating:4.7, image:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&q=70", desc:"Smashed avocado, chilli flakes, lemon zest on sourdough.", quality:4.6, quantity:4.4 },
];

export default function DishSection() {
  const [headRef, headIn] = useInView();
  const [active, setActive] = useState(2); // Cold Brew default

  return (
    <section style={{ background:t.beigeMid, minHeight:"100vh" }} className="flex items-center py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">

        <div ref={headRef} style={{ opacity:headIn?1:0, transform:headIn?"translateY(0)":"translateY(30px)", transition:"all 0.7s ease", maxWidth:680, marginBottom:56 }}>
          <p style={{ color:t.chocolateLight }} className="font-body text-xs tracking-[0.3em] uppercase mb-4">Dish Ratings</p>
          <h2 style={{ color:t.chocolateDeep }} className="font-heading text-5xl md:text-6xl tracking-wide mb-6">
            Know exactly what you're ordering.
          </h2>
          <p style={{ color:t.chocolateMid }} className="font-body text-base leading-relaxed">
            Every dish on Avocado is rated for quality and quantity by verified diners.
            No more disappointment. No more overpriced portions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — dish list */}
          <div className="grid grid-cols-2 gap-4">
            {DISHES.map((dish, i) => (
              <div key={dish.name} onClick={() => setActive(i)}
                style={{ background: active===i ? t.chocolateDeep : t.cream, borderRadius:"1.25rem", padding:18, cursor:"pointer", transition:"all 0.3s", boxShadow: active===i ? `0 12px 32px ${t.chocolateDeep}40` : `0 2px 16px ${t.chocolateDeep}10` }}>
                <div style={{ height:90, borderRadius:"0.875rem", overflow:"hidden", marginBottom:12 }}>
                  <img src={dish.image} alt={dish.name} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                <p style={{ color: active===i ? t.cream : t.chocolateDeep, fontFamily:t.fontHeading, fontSize:16, fontWeight:600, marginBottom:6 }}>{dish.name}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ color: active===i ? t.beigeDark : t.chocolateLight, fontFamily:t.fontBody, fontSize:13, fontWeight:600 }}>₹{dish.price}</span>
                  <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                    <svg style={{ width:13, height:13, color: active===i ? t.beigeDark : t.chocolateMid }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span style={{ color: active===i ? t.cream : t.chocolateDeep, fontFamily:t.fontHeading, fontSize:14, fontWeight:600 }}>{dish.rating}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right — detail panel */}
          <div style={{ background:t.chocolateDeep, borderRadius:"1.75rem", padding:40, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-50, right:-50, width:180, height:180, borderRadius:"50%", border:`1px solid ${t.chocolateLight}26` }} />

            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <h3 style={{ color:t.cream }} className="font-heading text-3xl mb-1">{DISHES[active].name}</h3>
                <p style={{ color:t.beigeDark }} className="font-heading text-2xl">₹{DISHES[active].price}</p>
              </div>
              <img src={DISHES[active].image} alt={DISHES[active].name} loading="lazy"
                style={{ width:80, height:80, borderRadius:"1rem", objectFit:"cover" }} />
            </div>

            <p style={{ color:t.chocolateLight }} className="font-body text-sm leading-relaxed mb-8 relative z-10 max-w-sm">
              {DISHES[active].desc}
            </p>

            <div className="space-y-4 relative z-10">
              {[["Quality", DISHES[active].quality], ["Quantity", DISHES[active].quantity]].map(([label, val]) => (
                <div key={label}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ color:t.cream }} className="font-body text-sm">{label}</span>
                    <span style={{ color:t.beigeDark }} className="font-heading text-sm">{val} / 5</span>
                  </div>
                  <div style={{ background:`${t.chocolateLight}33`, height:6, borderRadius:999 }}>
                    <div style={{ background:t.beigeDark, height:6, borderRadius:999, width:`${(val/5)*100}%`, transition:"width 0.6s ease" }} />
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