import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

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
      <body className={`${cormorant.variable} ${jost.variable} font-body bg-cream text-chocolate antialiased`}>
        {children}
      </body>
    </html>
  );
}