"use client";
import { motion } from "framer-motion";

// ─── Reusable scroll reveal wrapper ───────────────────────
// Wrap ANY element with <ScrollReveal> and it will fade + slide up
// when it enters the viewport. Use delay prop to stagger children.

export default function ScrollReveal({ children, delay = 0, className = "", style = {} }) {
  return (
    <motion.div
      initial={{ opacity:0, y:44 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-80px" }}
      transition={{ duration:0.8, ease:[0.16, 1, 0.3, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}