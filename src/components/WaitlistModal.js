"use client";
import { useState, useEffect } from "react";
import { theme as t } from "./theme";

export default function WaitlistModal({ isOpen, onClose }) {
  const [form, setForm]       = useState({ name:"", phone:"", email:"" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.email) return;
    setSubmitted(true);
  };

  const handleChange = (field, val) => setForm(p => ({ ...p, [field]: val }));

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(20,10,5,0.65)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px",
        }}>

        {/* ── Modal box ── */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: 400,
            borderRadius: "1.75rem",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(20,10,5,0.6)",
          }}>

          {/* ── Grainy gradient background ── */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            background: "linear-gradient(145deg, #3B2418 0%, #5C3317 25%, #6B4530 50%, #4A2810 75%, #2A1508 100%)",
          }} />

          {/* Noise grain overlay */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1, opacity: 0.18, pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px 160px",
          }} />

          {/* Blob accents */}
          <div style={{ position:"absolute", top:-60, right:-40, width:200, height:200, borderRadius:"50%", background:"rgba(169,130,106,0.2)", filter:"blur(50px)", zIndex:1, pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-40, left:-30, width:160, height:160, borderRadius:"50%", background:"rgba(210,180,140,0.15)", filter:"blur(40px)", zIndex:1, pointerEvents:"none" }} />

          {/* ── Content ── */}
          <div style={{ position:"relative", zIndex:2, padding:"40px 36px 36px" }}>

            {/* Close button */}
            <button
              onClick={onClose}
              style={{ position:"absolute", top:18, right:18, width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.7)", fontFamily:t.fontBody, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
              ✕
            </button>

            {!submitted ? (
              <>
                {/* Heading */}
                <p style={{ fontFamily:t.fontBody, fontSize:11, color:"rgba(210,180,140,0.7)", letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:14 }}>
                  Early Access
                </p>
                <h2 style={{ fontFamily:t.fontHeading, fontSize:"clamp(26px,4vw,36px)", fontWeight:700, color:"#FDFBF7", lineHeight:1.1, marginBottom:10 }}>
                  Join the Waitlist!
                </h2>
                <p style={{ fontFamily:t.fontBody, fontSize:14, color:"rgba(253,251,247,0.6)", lineHeight:1.7, marginBottom:32 }}>
                  Be the first to know when <span style={{ color:"#D2B48C", fontWeight:600 }}>Avocado</span> launches.
                </p>

                {/* ── Fields ── */}
                <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

                  {/* Full Name */}
                  <div>
                    <p style={{ fontFamily:t.fontBody, fontSize:12, color:"rgba(210,180,140,0.9)", letterSpacing:"0.08em", marginBottom:8, fontWeight:500 }}>
                      Full Name
                    </p>
                    <div style={{
                      background: focused==="name" ? "rgba(253,251,247,0.14)" : "rgba(253,251,247,0.08)",
                      border: `1px solid ${focused==="name" ? "rgba(210,180,140,0.6)" : "rgba(255,255,255,0.12)"}`,
                      borderRadius: "0.875rem",
                      padding: "13px 16px",
                      transition: "all 0.2s",
                    }}>
                      <input
                        type="text"
                        placeholder="Aravindakshaya"
                        value={form.name}
                        onChange={e => handleChange("name", e.target.value)}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={{ width:"100%", background:"transparent", border:"none", outline:"none", fontFamily:t.fontBody, fontSize:14, color:"#FDFBF7" }}
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <p style={{ fontFamily:t.fontBody, fontSize:12, color:"rgba(210,180,140,0.9)", letterSpacing:"0.08em", marginBottom:8, fontWeight:500 }}>
                      Phone Number
                    </p>
                    <div style={{
                      background: focused==="phone" ? "rgba(253,251,247,0.14)" : "rgba(253,251,247,0.08)",
                      border: `1px solid ${focused==="phone" ? "rgba(210,180,140,0.6)" : "rgba(255,255,255,0.12)"}`,
                      borderRadius: "0.875rem",
                      padding: "13px 16px",
                      transition: "all 0.2s",
                    }}>
                      <input
                        type="tel"
                        placeholder="+91 76097 89090"
                        value={form.phone}
                        onChange={e => handleChange("phone", e.target.value)}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        style={{ width:"100%", background:"transparent", border:"none", outline:"none", fontFamily:t.fontBody, fontSize:14, color:"#FDFBF7" }}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <p style={{ fontFamily:t.fontBody, fontSize:12, color:"rgba(210,180,140,0.9)", letterSpacing:"0.08em", marginBottom:8, fontWeight:500 }}>
                      Email Address
                    </p>
                    <div style={{
                      background: focused==="email" ? "rgba(253,251,247,0.14)" : "rgba(253,251,247,0.08)",
                      border: `1px solid ${focused==="email" ? "rgba(210,180,140,0.6)" : "rgba(255,255,255,0.12)"}`,
                      borderRadius: "0.875rem",
                      padding: "13px 16px",
                      transition: "all 0.2s",
                    }}>
                      <input
                        type="email"
                        placeholder="akashaya@gmail.com"
                        value={form.email}
                        onChange={e => handleChange("email", e.target.value)}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={{ width:"100%", background:"transparent", border:"none", outline:"none", fontFamily:t.fontBody, fontSize:14, color:"#FDFBF7" }}
                      />
                    </div>
                  </div>

                </div>

                {/* ── Submit button ── */}
                <button
                  onClick={handleSubmit}
                  style={{
                    marginTop: 28,
                    width: "100%",
                    background: "#F7F1E8",
                    color: t.chocolateDeep,
                    border: "none",
                    borderRadius: "0.875rem",
                    padding: "15px 24px",
                    fontFamily: t.fontBody,
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    transition: "all 0.22s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background="#FFFFFF"; e.currentTarget.style.transform="scale(1.02)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="#F7F1E8"; e.currentTarget.style.transform="scale(1)"; }}>
                  Request Early Access
                  <span style={{ fontSize:16 }}>→</span>
                </button>

                <p style={{ fontFamily:t.fontBody, fontSize:11, color:"rgba(253,251,247,0.35)", textAlign:"center", marginTop:16 }}>
                  No spam. Ever. We'll only reach out when it matters.
                </p>
              </>
            ) : (
              /* ── Success state ── */
              <div style={{ textAlign:"center", padding:"20px 0 12px" }}>
                <div style={{ fontSize:52, marginBottom:20 }}>🥑</div>
                <h2 style={{ fontFamily:t.fontHeading, fontSize:30, fontWeight:700, color:"#FDFBF7", marginBottom:12 }}>
                  You're on the list!
                </h2>
                <p style={{ fontFamily:t.fontBody, fontSize:14, color:"rgba(253,251,247,0.6)", lineHeight:1.8, marginBottom:28 }}>
                  Thanks, <span style={{ color:"#D2B48C", fontWeight:600 }}>{form.name.split(" ")[0]}</span>. We'll
                  reach out to <span style={{ color:"#D2B48C" }}>{form.email}</span> when
                  Avocado is ready for you.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:"", phone:"", email:"" }); onClose(); }}
                  style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"#FDFBF7", borderRadius:"0.875rem", padding:"12px 28px", fontFamily:t.fontBody, fontSize:13, cursor:"pointer", transition:"all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.18)"}
                  onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}