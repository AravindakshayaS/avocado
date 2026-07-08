import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import MeshBackground from "@/components/MeshBackground";


const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata = {
  title: "Avocado — Discover Cafes & Restaurants",
  description: "Community-driven reviews, honest dish ratings, and one-tap reservations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jost.variable}`}
        style={{ background: "transparent", margin: 0, padding: 0, minHeight: "100vh" }}>

        {/*
          MeshBackground sits at z-0, fixed to the viewport.
          It stays perfectly behind every page, section, and component.
          All your page content sits above it at z-10 and higher.
        */}
        <MeshBackground />

        {/*
          Everything inside (page.js, sections, navbar etc.)
          renders above the mesh at z-10+.
          Sections that need a solid bg just set their own background color.
          Sections you want to show the mesh through — set background: transparent.
        */}
        <div style={{ position: "relative", zIndex: 10 }}>
          {children}
        </div>

      </body>
    </html>
  );
}