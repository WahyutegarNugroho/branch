'use client'

interface LinkHeaderProps {
  title: string
  textColor?: string | null
}

export function LinkHeader({ title, textColor }: LinkHeaderProps) {
  return (
    <div className="w-full text-center py-5 mt-6 first:mt-2 select-none">
      <h2 
        style={{ color: textColor || undefined }} 
        className="text-base sm:text-lg font-extrabold tracking-wider uppercase text-white/95 drop-shadow-md cursor-default px-4"
      >
        {title}
      </h2>
      <div className="h-[2px] w-12 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2.5" />
    </div>
  )
}
