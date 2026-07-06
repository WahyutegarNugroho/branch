'use client'

import { motion } from 'framer-motion'
import { 
  FaInstagram, FaYoutube, FaGithub, FaLinkedin, FaWhatsapp, FaTiktok, FaEnvelope 
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const socialsIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  instagram: FaInstagram,
  twitter: FaXTwitter,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  github: FaGithub,
  linkedin: FaLinkedin,
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
}

const socialRowVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0.4, y: 10 },
  visible: { 
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring' as const, stiffness: 160, damping: 12 },
  },
}

interface SocialIconsRowProps {
  socialLinks: Record<string, string>
  socialStyle?: string | null
  placement: 'top' | 'bottom'
  align: 'center' | 'left' | 'right'
  textColor: string
}

export function SocialIconsRow({ socialLinks, socialStyle, placement, align, textColor }: SocialIconsRowProps) {
  const isBottom = placement === 'bottom'

  return (
    <motion.div 
      variants={socialRowVariants} 
      className={`flex flex-wrap gap-4 z-10 w-full ${
        align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'
      } ${isBottom ? 'mt-8 mb-4' : 'mb-8'}`}
    >
      {Object.keys(socialLinks).map((key) => {
        const url = socialLinks[key]
        if (!url) return null
        const IconComponent = socialsIconMap[key]
        if (!IconComponent) return null

        return (
          <motion.a
            key={key}
            variants={socialIconVariants}
            href={url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:') ? url : `https://${url}`}
            target="_blank"
            rel="noopener noreferrer"
            {...(isBottom ? { whileHover: { scale: 1.15, rotate: 5 }, whileTap: { scale: 0.9 } } : {})}
            className={`flex items-center justify-center backdrop-blur-md transition-all ${
              isBottom ? 'w-12 h-12 shadow-lg' : 'w-10 h-10 shadow-sm'
            } ${
              socialStyle === 'outline'
                ? isBottom 
                  ? 'bg-transparent border-2 border-white/30 text-white hover:border-white hover:text-white'
                  : 'bg-transparent border border-white/30 text-white'
                : socialStyle === 'square'
                  ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl'
                  : socialStyle === 'minimal'
                    ? 'bg-transparent border-0 text-white shadow-none'
                    : 'rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white'
            }`}
            style={{ color: textColor, borderColor: isBottom ? undefined : `${textColor}33` }}
          >
            <IconComponent size={isBottom ? 22 : 20} />
          </motion.a>
        )
      })}
    </motion.div>
  )
}
