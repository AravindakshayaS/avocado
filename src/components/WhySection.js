"use client";
import { theme as t } from "./theme";
import useInView from "./useInView";

export default function WhySection() {
  const [ref1, in1] = useInView();
  const [ref2, in2] = useInView();
  const [ref3, in3] = useInView();
  const [ref4, in4] = useInView();
  const [ref5, in5] = useInView();

  return (
    <section
      style={{
        background: "rgba(253,251,247,0.72)",
        backdropFilter: "blur(4px)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="py-28"
    >
      <div
        style={{
          maxWidth: 720,
          width: "100%",
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >

        {/* Capsule label */}
        <div ref={ref1} style={{ opacity:in1?1:0, transform:in1?"translateY(0)":"translateY(20px)", transition:"all 0.6s ease", marginBottom:40 }}>
          <span style={{
            display: "inline-block",
            background: t.chocolateDeep,
            color: t.cream,
            fontFamily: t.fontBody,
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "7px 20px",
            borderRadius: 999,
          }}>
            Why we're building this
          </span>
        </div>

        {/* Big headline line 1 — deep black */}
        <div ref={ref2} style={{ opacity:in2?1:0, transform:in2?"translateY(0)":"translateY(28px)", transition:"all 0.7s ease 0.1s", marginBottom: 0 }}>
          <h2 style={{
            fontFamily: t.fontHeading,
            fontSize: "clamp(44px, 7vw, 88px)",
            fontWeight: 700,
            color: "#111111",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            margin: 0,
          }}>
            Dining deserves better
          </h2>
        </div>

        {/* Big headline line 2 — burgundy */}
        <div style={{ opacity:in2?1:0, transform:in2?"translateY(0)":"translateY(28px)", transition:"all 0.7s ease 0.18s", marginBottom: 52 }}>
          <h2 style={{
            fontFamily: t.fontHeading,
            fontSize: "clamp(44px, 7vw, 88px)",
            fontWeight: 700,
            color: "#6B1E2E",
            fontStyle: "italic",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            margin: 0,
          }}>
            than a number out of five.
          </h2>
        </div>

        {/* Divider */}
        <div style={{ width: 48, height: 2, background: t.beigeDark, borderRadius: 2, margin: "0 auto 48px" }} />

        {/* Body paragraphs */}
        <div ref={ref3} style={{ opacity:in3?1:0, transform:in3?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease 0.05s", marginBottom: 24 }}>
          <p style={{
            fontFamily: t.fontBody,
            fontSize: "clamp(15px, 1.6vw, 18px)",
            color: t.chocolateMid,
            lineHeight: 1.9,
          }}>
            We've all been there — you pick a highly rated spot, show up excited,
            and leave disappointed. The ratings were inflated. The photos were filtered.
            The reviews were written by bots.
          </p>
        </div>

        <div ref={ref4} style={{ opacity:in4?1:0, transform:in4?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease 0.1s", marginBottom: 24 }}>
          <p style={{
            fontFamily: t.fontBody,
            fontSize: "clamp(15px, 1.6vw, 18px)",
            color: t.chocolateMid,
            lineHeight: 1.9,
          }}>
            Avocado is being built to fix that. A platform where every review is
            verified, every dish rating is honest, and every recommendation comes
            from someone who actually sat at that table.
          </p>
        </div>

        <div style={{ opacity:in4?1:0, transform:in4?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease 0.16s", marginBottom: 56 }}>
          <p style={{
            fontFamily: t.fontBody,
            fontSize: "clamp(15px, 1.6vw, 18px)",
            color: t.chocolateDeep,
            lineHeight: 1.9,
            fontWeight: 500,
          }}>
            This isn't just a review app. It's the dining companion we always wanted.
            We're building it right now. And we want you here from{" "}
            <span style={{ color: "#6B1E2E", fontWeight: 700, fontStyle:"italic" }}>DAY ONE.</span>
          </p>
        </div>

        {/* Avocado emoji */}
        <div ref={ref5} style={{ opacity:in5?1:0, transform:in5?"scale(0.7)":"scale(0.7)", transition:"all 0.6s ease 0.1s" }}
          onLoad={e => e.currentTarget.style.transform = "scale(1)"}>
          <div style={{
            fontSize: 56,
            lineHeight: 1,
            marginBottom: 48,
            opacity: in5 ? 1 : 0,
            transform: in5 ? "scale(1)" : "scale(0.6)",
            transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s",
          }}>
            🥑
          </div>
        </div>

        {/* CTA */}
        <div style={{ opacity:in5?1:0, transform:in5?"translateY(0)":"translateY(20px)", transition:"all 0.6s ease 0.3s", display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button
            style={{ background:t.chocolateDeep, color:t.cream, border:"none", borderRadius:999, padding:"15px 38px", fontFamily:t.fontBody, fontSize:14, fontWeight:600, letterSpacing:"0.05em", cursor:"pointer", transition:"all 0.22s", boxShadow:`0 4px 24px ${t.chocolateDeep}30` }}
            onMouseEnter={e => { e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.opacity="0.9"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="scale(1)";    e.currentTarget.style.opacity="1"; }}>
            Join the Waitlist
          </button>
          <button
            style={{ background:"transparent", color:t.chocolateDeep, border:`1.5px solid ${t.chocolateDeep}`, borderRadius:999, padding:"15px 38px", fontFamily:t.fontBody, fontSize:14, fontWeight:500, letterSpacing:"0.04em", cursor:"pointer", transition:"all 0.22s" }}
            onMouseEnter={e => { e.currentTarget.style.background=t.chocolateDeep; e.currentTarget.style.color=t.cream; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent";  e.currentTarget.style.color=t.chocolateDeep; }}>
            Follow for Updates
          </button>
        </div>

      </div>
    </section>
  );
}