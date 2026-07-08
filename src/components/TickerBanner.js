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

// Repeat 4x so the loop is seamless on all screen widths
const items = [
  ...TICKER_MESSAGES,
  ...TICKER_MESSAGES,
  ...TICKER_MESSAGES,
  ...TICKER_MESSAGES,
];

export default function TickerBanner() {
  return (
    <div style={{ background:t.chocolateDeep, borderBottom:`1px solid rgba(169,130,106,0.25)`, overflow:"hidden", position:"relative", zIndex:60, width:"100%" }}
      className="py-2.5">
      <div style={{ display:"flex", whiteSpace:"nowrap", width:"max-content", animation:"ticker-move 30s linear infinite" }}>
        {items.map((msg, i) => (
          <span key={i} style={{ color:t.cream, fontFamily:t.fontBody, fontSize:12, letterSpacing:"0.14em", textTransform:"uppercase", padding:"0 32px", display:"inline-flex", alignItems:"center", gap:32, flexShrink:0 }}>
            {msg}
            <span style={{ color:t.beigeDark, fontSize:7, lineHeight:1 }}>●</span>
          </span>
        ))}
      </div>
    </div>
  );
}