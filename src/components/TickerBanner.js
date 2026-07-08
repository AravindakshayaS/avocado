"use client";
import { theme as t } from "./theme";

const TICKER_MESSAGES = [
  "Avocado app coming soon",
  "Honest reviews",
  "Real dish ratings",
  "Community voices",
  "Launching soon",
  "Follow for updates",
];

export default function TickerBanner() {
  // Repeat enough times to fill wide screens and loop seamlessly
  const items = [...TICKER_MESSAGES, ...TICKER_MESSAGES, ...TICKER_MESSAGES, ...TICKER_MESSAGES];

  return (
    <div style={{ background:t.chocolateDeep, borderBottom:`1px solid rgba(169,130,106,0.25)`, overflow:"hidden", position:"relative", zIndex:60, width:"100%" }}
      className="py-2">
      <div
        style={{
          display:"flex",
          whiteSpace:"nowrap",
          width:"max-content",
          animation:"ticker-move 25s linear infinite",
        }}
      >
        {items.map((msg, i) => (
          <span key={i} style={{ color:t.cream, fontFamily:t.fontBody, fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", padding:"0 28px", display:"flex", alignItems:"center", gap:28, flexShrink:0 }}>
            {msg}
            <span style={{ color:t.beigeDark, fontSize:8 }}>●</span>
          </span>
        ))}
      </div>
    </div>
  );
}