"use client";

// ─────────────────────────────────────────────────────────
// MeshBackground — fixed full-bleed animated gradient
// Place this once in layout.js and it covers every page.
// ─────────────────────────────────────────────────────────

export default function MeshBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          // Base cream background — shows through where blobs don't reach
          background: "#FDFBF7",
          pointerEvents: "none",
        }}
      >
        {/* ── Blob 1 — warm beige/tan, top-left, slow drift ── */}
        <div style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "55vw",
          height: "55vw",
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, #D2B48C 0%, #C4A882 60%, transparent 100%)",
          filter: "blur(72px)",
          opacity: 0.45,
          mixBlendMode: "multiply",
          animation: "blobOne 18s ease-in-out infinite alternate",
          willChange: "transform",
        }} />

        {/* ── Blob 2 — chocolate mid, bottom-right, medium speed ── */}
        <div style={{
          position: "absolute",
          bottom: "-15%",
          right: "-8%",
          width: "60vw",
          height: "60vw",
          maxWidth: 760,
          maxHeight: 760,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, #A9826A 0%, #8B6347 55%, transparent 100%)",
          filter: "blur(80px)",
          opacity: 0.3,
          mixBlendMode: "multiply",
          animation: "blobTwo 22s ease-in-out infinite alternate",
          animationDelay: "3s",
          willChange: "transform",
        }} />

        {/* ── Blob 3 — soft avocado/sage, center-right, fast ── */}
        <div style={{
          position: "absolute",
          top: "30%",
          right: "15%",
          width: "40vw",
          height: "40vw",
          maxWidth: 520,
          maxHeight: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, #C8D5B9 0%, #B5C4A0 60%, transparent 100%)",
          filter: "blur(64px)",
          opacity: 0.35,
          mixBlendMode: "multiply",
          animation: "blobThree 14s ease-in-out infinite alternate",
          animationDelay: "1.5s",
          willChange: "transform",
        }} />

        {/* ── Blob 4 — deep warm cream, bottom-left, slowest ── */}
        <div style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "45vw",
          height: "45vw",
          maxWidth: 580,
          maxHeight: 580,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, #EDE0CC 0%, #DDD0B8 55%, transparent 100%)",
          filter: "blur(68px)",
          opacity: 0.5,
          mixBlendMode: "multiply",
          animation: "blobFour 26s ease-in-out infinite alternate",
          animationDelay: "5s",
          willChange: "transform",
        }} />

        {/* ── Blur overlay — blends blobs together organically ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 1,
        }} />
      </div>

      {/* ── Keyframe animations injected once globally ── */}
      <style>{`
        @keyframes blobOne {
          0%   { transform: translate(0px,   0px)   scale(1);    }
          25%  { transform: translate(40px,  -60px) scale(1.08); }
          50%  { transform: translate(-20px, -30px) scale(0.96); }
          75%  { transform: translate(60px,   30px) scale(1.06); }
          100% { transform: translate(20px,  -50px) scale(1.02); }
        }
        @keyframes blobTwo {
          0%   { transform: translate(0px,   0px)   scale(1);    }
          30%  { transform: translate(-50px,  40px) scale(1.1);  }
          60%  { transform: translate(30px,  -20px) scale(0.94); }
          100% { transform: translate(-30px,  50px) scale(1.04); }
        }
        @keyframes blobThree {
          0%   { transform: translate(0px,   0px)   scale(1);    }
          40%  { transform: translate(-40px, -50px) scale(1.12); }
          70%  { transform: translate(20px,   30px) scale(0.92); }
          100% { transform: translate(40px,  -20px) scale(1.06); }
        }
        @keyframes blobFour {
          0%   { transform: translate(0px,  0px)   scale(1);    }
          35%  { transform: translate(50px, -40px) scale(0.97); }
          65%  { transform: translate(-30px, 50px) scale(1.08); }
          100% { transform: translate(20px,  20px) scale(0.99); }
        }
      `}</style>
    </>
  );
}