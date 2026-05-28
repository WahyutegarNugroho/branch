import type { Metadata } from "next";
import { inter, outfit, jetbrainsMono, spaceGrotesk, righteous, dancingScript } from "@/lib/fonts"
import "./globals.css";

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
import SVGFilters from "@/components/public/SVGFilters"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${righteous.variable} ${dancingScript.variable} h-full antialiased`}
      >
      <body className="min-h-full flex flex-col">
        <SVGFilters />
        {children}
        <Toaster closeButton position="top-center" richColors={false} />
      </body>
    </html>
  );
}
