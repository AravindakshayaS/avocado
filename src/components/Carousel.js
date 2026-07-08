"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SPLITS = [
  {
    tag: "Discovery",
    heading: "Find your\nperfect table.",
    body: "Filter by mood, amenities, and location. From solo work sessions to date nights — Avocado surfaces the right spot for every occasion, not just the most popular one.",
    cta: "Start Exploring",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    accent: "bg-sakura/20",
    imageLeft: false,
  },
  {
    tag: "Reservations",
    heading: "Reserve\nin seconds.",
    body: "Select your date, time, guests, and seating preference. Pre-order dishes, join waitlists, and notify the restaurant if you're running late — all from one screen.",
    cta: "Book a Table",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    accent: "bg-aloe/10",
    imageLeft: true,
  },
  {
    tag: "Community",
    heading: "Honest reviews,\nnot just stars.",
    body: "Every review is tied to a verified visit. Rate food quality, quantity, service, and ambience separately — so the next person knows exactly what to order and where to sit.",
    cta: "Read Reviews",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80",
    accent: "bg-milktea/30",
    imageLeft: false,
  },
];

function SplitItem({ item, index }) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const textVariants = {
    hidden: {
      opacity: 0,
      x: item.imageLeft ? 40 : -40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: item.imageLeft ? -40 : 40,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1,
      },
    },
  };

  return (
    <div
      ref={ref}
      className={`flex flex-col ${
        item.imageLeft ? "lg:flex-row-reverse" : "lg:flex-row"
      } gap-12 lg:gap-20 items-center py-20 border-b border-milktea/20 last:border-0`}
    >
      {/* Text Side */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex-1 max-w-xl"
      >
        <span className="inline-block font-body text-xs tracking-[0.25em] uppercase text-mistyrose mb-5 border border-mistyrose/30 px-3 py-1 rounded-full">
          {item.tag}
        </span>

        <h2 className="font-heading text-4xl md:text-5xl text-chocolate leading-tight mb-6 whitespace-pre-line tracking-wide">
          {item.heading}
        </h2>

        <p className="font-body text-chocolate-light text-base leading-relaxed mb-8">
          {item.body}
        </p>

        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary inline-flex items-center gap-2 group"
        >
          {item.cta}

          <motion.svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ x: [0, 3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </motion.svg>
        </motion.button>
      </motion.div>

      {/* Image Side */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex-1 relative w-full max-w-xl"
      >
        <div
          className={`absolute inset-0 ${item.accent} rounded-3xl translate-x-4 translate-y-4`}
        />

        <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-warm group">
          <img
            src={item.image}
            alt={item.heading}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-chocolate/50 backdrop-blur-sm flex items-center justify-center rounded-3xl"
          >
            <div className="text-center">
              <p className="font-heading text-3xl text-cream mb-2 tracking-wide">
                {item.tag}
              </p>

              <p className="font-body text-milktea text-sm">
                Click to explore
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SplitSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {SPLITS.map((item, i) => (
        <SplitItem key={item.tag} item={item} index={i} />
      ))}
    </section>
  );
}