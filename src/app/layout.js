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
    <html lang="en" style={{ background: "transparent" }}>
      <body
        className={`${cormorant.variable} ${jost.variable} antialiased`}
        style={{ background: "transparent", margin: 0, padding: 0, minHeight: "100vh" }}
      >
        {/* z-0: fixed mesh background — always behind everything */}
        <MeshBackground />

        {/* z-10: all page content renders above the mesh */}
        <div style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}>
          {children}
        </div>
      </body>
    </html>
  );
}