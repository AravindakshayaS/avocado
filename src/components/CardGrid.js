"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Feature/perk cards
const FEATURES = [
  {
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    label: "Location Filters",
    desc: "Find cafes by neighbourhood, distance, or current location.",
    detail:
      "Powered by Google Maps API with real-time crowd data and estimated walk times.",
  },
  {
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    label: "Verified Reviews",
    desc: "Only dine-in visitors can leave reviews. No fake ratings.",
    detail:
      "Check-in verification tied to your reservation or QR scan at the venue.",
  },
  {
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    label: "Instant Booking",
    desc: "Reserve a table in under 30 seconds. Instant confirmation.",
    detail:
      "Smart seating algorithm picks your preferred spot — window, outdoor, or quiet corner.",
  },
  {
    icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
    label: "Dish Ratings",
    desc: "Rate quality and quantity per dish. Know before you order.",
    detail:
      "Separate scores for food quality, portion size, presentation, and value for money.",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    label: "Follow Foodies",
    desc: "See where your friends ate and what they recommend.",
    detail:
      "A personalised feed of dining activity from people you follow. Real opinions, real people.",
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    label: "Owner Analytics",
    desc: "Restaurants get real-time dashboards of trends and sentiment.",
    detail:
      "Reservation trends, popular dishes, review sentiment, and profile view heatmaps.",
  },
];

function FlipCard({ feature, index }) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative h-52 perspective-1000"
      style={{ perspective: "1000px" }}
    >
      {/* Card wrapper */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-white rounded-2xl p-6 shadow-soft border border-milktea/20 flex flex-col gap-4 cursor-pointer group-hover:opacity-0 group-hover:scale-95 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-parchment flex items-center justify-center">
            <svg
              className="w-5 h-5 text-mistyrose"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d={feature.icon}
              />
            </svg>
          </div>

          <div>
            <h3 className="font-heading text-lg text-chocolate mb-1.5 tracking-wide">
              {feature.label}
            </h3>

            <p className="font-body text-xs text-chocolate-light leading-relaxed">
              {feature.desc}
            </p>
          </div>
        </div>

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-chocolate rounded-2xl p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-sakura/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-sakura"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d={feature.icon}
              />
            </svg>
          </div>

          <div>
            <h3 className="font-heading text-lg text-cream mb-2 tracking-wide">
              {feature.label}
            </h3>

            <p className="font-body text-xs text-milktea leading-relaxed">
              {feature.detail}
            </p>
          </div>

          <motion.button
            whileHover={{ x: 3 }}
            className="text-xs font-body text-sakura flex items-center gap-1.5 w-fit"
          >
            Learn more

            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function CardGrid() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-body text-xs tracking-[0.25em] uppercase text-mistyrose block mb-4">
            Everything you need
          </span>

          <h2 className="font-heading text-4xl md:text-5xl text-chocolate tracking-wide mb-4">
            Built for real diners.
          </h2>

          <p className="font-body text-chocolate-light max-w-xl mx-auto text-sm leading-relaxed">
            Every feature exists because a real person needed it. Hover a card
            to see what is underneath.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <FlipCard key={f.label} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}