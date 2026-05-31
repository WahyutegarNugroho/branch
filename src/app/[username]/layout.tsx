import { caveat, comicNeue, playfairDisplay, pressStart2p, spaceGrotesk, oswald, righteous, dancingScript } from "@/lib/fonts"

export default function UsernameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${caveat.variable} ${comicNeue.variable} ${playfairDisplay.variable} ${pressStart2p.variable} ${spaceGrotesk.variable} ${oswald.variable} ${righteous.variable} ${dancingScript.variable}`}>
      {children}
    </div>
  )
}
