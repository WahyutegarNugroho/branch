import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono, Caveat, Comic_Neue, Playfair_Display, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  variable: "--font-comic",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-elegant",
  subsets: ["latin"],
});

const pressStart2p = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Branch - One Link to Power Your Entire Digital Presence",
    template: "%s | Branch"
  },
  description: "Create a beautifully crafted, highly convertible link-in-bio page in seconds. Manage your links, embed videos, and track your audience with powerful analytics.",
  keywords: ["link in bio", "linktree clone", "digital presence", "bio link", "creators", "branch link", "portfolio website"],
  authors: [{ name: "Branch Team" }],
  openGraph: {
    title: "Branch - One Link to Power Your Entire Digital Presence",
    description: "Create a beautifully crafted, highly convertible link-in-bio page in seconds.",
    type: "website",
    locale: "id_ID"
  },
  twitter: {
    card: "summary_large_image",
    title: "Branch - One Link to Power Your Entire Digital Presence",
    description: "Create a beautifully crafted, highly convertible link-in-bio page in seconds."
  }
};

import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} ${caveat.variable} ${comicNeue.variable} ${playfairDisplay.variable} ${pressStart2p.variable} h-full antialiased`}
      >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster closeButton position="top-center" richColors={false} />
      </body>
    </html>
  );
}
