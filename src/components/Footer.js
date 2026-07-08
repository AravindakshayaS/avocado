"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const LINKS = {
  Discover: [
    "Cafes Near Me",
    "Hidden Gems",
    "New Openings",
    "By Mood",
  ],

  Reserve: [
    "Book a Table",
    "Waitlist",
    "Pre-order",
    "Group Dining",
  ],

  Community: [
    "Reviews",
    "Curated Lists",
    "Follow Foodies",
    "Photo Gallery",
  ],

  Company: [
    "About Us",
    "For Owners",
    "Press Kit",
    "Contact",
  ],
};

export default function Footer() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer
      ref={ref}
      className="bg-cream border-t border-milktea/30 pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <span className="font-heading text-3xl text-chocolate tracking-wide block mb-4">
              Avocado
            </span>

            <p className="font-body text-sm text-chocolate-light leading-relaxed mb-8 max-w-xs">
              A community-driven platform for discovering cafes, leaving honest
              reviews, and reserving the table that feels like home.
            </p>

            {/* Newsletter */}
            <div>
              <p className="font-body text-xs font-medium text-chocolate tracking-wide uppercase mb-3">
                Stay in the loop
              </p>

              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-body text-aloe-dark"
                >
                  You are on the list. Welcome.
                </motion.p>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-parchment border border-milktea/40 rounded-xl px-4 py-2.5 text-sm font-body text-chocolate placeholder-milktea outline-none focus:border-aloe transition-colors"
                  />

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      if (email) setSubscribed(true);
                    }}
                    className="btn-primary whitespace-nowrap text-sm"
                  >
                    Subscribe
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(LINKS).map(([heading, links], i) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.07,
              }}
            >
              <p className="font-body text-xs font-medium text-chocolate tracking-widest uppercase mb-4">
                {heading}
              </p>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3 }}
                      className="font-body text-sm text-chocolate-light hover:text-chocolate transition-colors inline-block"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
          className="border-t border-milktea/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="font-body text-xs text-chocolate-light">
            2025 Avocado. Built with care for food lovers everywhere.
          </p>

          <div className="flex gap-6 text-xs font-body text-chocolate-light">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Settings",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-chocolate transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}