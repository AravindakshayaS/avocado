"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TICKER_ITEMS = [
  "Weekend Brunch Deals",
  "New Cafes This Week",
  "Sakura Season Specials",
  "Book Your Date Night",
  "Hidden Gems Unlocked",
  "Monsoon Menu Launch",
];

function TickerTape() {
  return (
    <div className="overflow-hidden bg-sakura/30 border-y border-sakura/40 py-3">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-0 whitespace-nowrap"
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span
            key={i}
            className="font-body text-xs tracking-[0.2em] uppercase text-chocolate px-8 flex items-center gap-8"
          >
            {item}

            <span className="w-1 h-1 rounded-full bg-mistyrose inline-block" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const EVENTS = [
  {
    date: "Jun 14",
    title: "Sakura Night Market",
    venue: "Indiranagar Strip",
    tag: "Community",
    color: "from-sakura/40 to-mistyrose/20",
    textAccent: "text-mistyrose-dark",
  },
  {
    date: "Jun 21",
    title: "Monsoon Brunch Crawl",
    venue: "Koramangala Cafes",
    tag: "Special Event",
    color: "from-aloe/20 to-milktea/30",
    textAccent: "text-aloe-dark",
  },
  {
    date: "Jul 4",
    title: "Hidden Gems Weekend",
    venue: "Citywide",
    tag: "Discovery",
    color: "from-milktea/40 to-sakura/20",
    textAccent: "text-chocolate-light",
  },
];

export default function EventBanner() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  return (
    <section className="py-0 overflow-hidden">
      <TickerTape />

      <div
        ref={ref}
        className="bg-chocolate py-24 relative overflow-hidden"
      >
        {/* Animated Background Orbs */}
        {[
          {
            color: "bg-sakura/15",
            size: "w-96 h-96",
            pos: "top-0 left-0",
            duration: 8,
          },
          {
            color: "bg-aloe/10",
            size: "w-72 h-72",
            pos: "bottom-0 right-0",
            duration: 10,
          },
          {
            color: "bg-milktea/10",
            size: "w-56 h-56",
            pos: "top-1/2 left-1/2",
            duration: 6,
          },
        ].map((orb, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
            className={`absolute ${orb.pos} ${orb.size} ${orb.color} rounded-full blur-3xl pointer-events-none`}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="font-body text-xs tracking-[0.3em] uppercase text-sakura/70 block mb-4">
              Events and Promotions
            </span>

            <h2
              className="font-heading text-5xl md:text-6xl leading-tight tracking-wide"
              style={{
                background:
                  "linear-gradient(135deg, #FAE0E5 0%, #F2C4CE 30%, #C09090 60%, #7A9E77 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Taste the season.
            </h2>

            <p className="font-body text-milktea/70 text-sm mt-4 max-w-lg mx-auto">
              Curated events, limited-time menus, and dining experiences you
              will not find anywhere else.
            </p>
          </motion.div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {EVENTS.map((ev, i) => (
              <motion.div
                key={ev.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.25 },
                }}
                className={`bg-gradient-to-br ${ev.color} rounded-2xl p-7 border border-white/10 cursor-pointer group`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-body text-xs tracking-widest uppercase text-milktea/60">
                    {ev.tag}
                  </span>

                  <span
                    className={`font-heading text-2xl ${ev.textAccent}`}
                  >
                    {ev.date}
                  </span>
                </div>

                <h3 className="font-heading text-2xl text-cream mb-1 tracking-wide leading-tight">
                  {ev.title}
                </h3>

                <p className="font-body text-xs text-milktea/70 mb-6">
                  {ev.venue}
                </p>

                <motion.button
                  whileHover={{ gap: "10px" }}
                  className="flex items-center gap-2 text-xs font-body text-sakura group-hover:text-sakura-light transition-colors"
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
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{
              delay: 0.6,
              duration: 0.5,
            }}
            className="text-center mt-14"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-sakura text-chocolate px-10 py-4 rounded-2xl font-body font-medium text-sm hover:bg-sakura-light transition-colors shadow-warm"
            >
              View All Events
            </motion.button>
          </motion.div>
        </div>
      </div>

      <TickerTape />
    </section>
  );
}