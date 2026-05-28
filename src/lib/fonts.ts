import { Inter, Outfit, JetBrains_Mono, Caveat, Comic_Neue, Playfair_Display, Press_Start_2P, Space_Grotesk, Bebas_Neue, Righteous, Dancing_Script } from "next/font/google"

export const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
})

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
})

const comicNeue = Comic_Neue({
  variable: "--font-comic",
  weight: ["400", "700"],
  subsets: ["latin"],
})

const playfairDisplay = Playfair_Display({
  variable: "--font-elegant",
  subsets: ["latin"],
})

const pressStart2p = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
})

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
})

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
})

export const righteous = Righteous({
  variable: "--font-righteous",
  weight: "400",
  subsets: ["latin"],
})

export const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
})

export const profileFontVariables = `${caveat.variable} ${comicNeue.variable} ${playfairDisplay.variable} ${pressStart2p.variable} ${spaceGrotesk.variable} ${bebasNeue.variable} ${righteous.variable} ${dancingScript.variable}`
