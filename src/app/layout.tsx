import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Space_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} ${playfair.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster closeButton position="top-center" richColors={false} />
      </body>
    </html>
  );
}
