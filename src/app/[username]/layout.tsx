import { profileFontVariables } from "@/lib/fonts"

export default function UsernameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={profileFontVariables}>
      {children}
    </div>
  )
}
