'use client'

import { motion } from 'framer-motion'
import { LinkButton } from '@/components/public/LinkButton'
import { PageTracker } from '@/components/public/PageTracker'
import { 
  FaInstagram, 
  FaYoutube, 
  FaGithub, 
  FaLinkedin, 
  FaWhatsapp, 
  FaTiktok, 
  FaEnvelope 
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Zap } from 'lucide-react'

const socialsIconMap: Record<string, any> = {
  instagram: FaInstagram,
  twitter: FaXTwitter,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  github: FaGithub,
  linkedin: FaLinkedin,
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
}

import { Profile, Link } from '@/types'

export function AnimatedProfile({ profile, links, bgClass, bgStyle }: { profile: Profile, links: Link[], bgClass: string, bgStyle: React.CSSProperties }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.6, y: -50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: 'spring' as const,
        stiffness: 100,
        damping: 14,
        duration: 0.8
      } 
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      } 
    }
  }

  const socialRowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  }

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0.4, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: 'spring' as const,
        stiffness: 160,
        damping: 12
      } 
    }
  }

  const linkWrapperVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      }
    }
  }

  const linkVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring' as const,
        stiffness: 120,
        damping: 13
      } 
    }
  }

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: 'easeOut' as const
      } 
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1c1c1e] sm:py-8 sm:px-4">
      <div 
        className={`min-h-screen sm:min-h-[820px] sm:max-h-[880px] w-full sm:w-[480px] sm:rounded-[40px] sm:shadow-[0_24px_70px_rgba(0,0,0,0.85)] sm:border sm:border-white/10 relative flex flex-col py-16 px-6 overflow-y-auto no-scrollbar ${profile?.font_family || 'font-sans-theme'} ${
          profile?.profile_align === 'left' ? 'items-start text-left' : 'items-center text-center'
        }`}
        style={bgStyle}
      >
        {/* Background Video loop (Muted, AutoPlay) */}
        {profile?.bg_type === 'video' && profile?.bg_video_url && (
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <video 
              src={profile.bg_video_url} 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Hero Banner header overlay */}
        {profile?.banner_url && (
          <div className="absolute top-0 inset-x-0 h-32 w-full overflow-hidden border-b border-white/10 z-0">
            <img src={profile.banner_url} alt="Banner" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Dark Overlay */}
        {profile.bg_overlay_opacity > 0 && (
          <div 
            className="absolute inset-0 bg-black pointer-events-none z-0" 
            style={{ opacity: profile.bg_overlay_opacity / 100 }}
          />
        )}

        {/* Mockup Header Row */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
          <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/90 border border-white/10">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: profile.full_name || `@${profile.username}`,
                  text: profile.bio || '',
                  url: window.location.href
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Tautan profil disalin!');
              }
            }}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white border border-white/10 transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
          </button>
        </div>

        {/* Analytics Tracking */}
        <PageTracker profileId={profile.id} />

        {/* Profile Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`relative z-10 w-full flex flex-col ${
            profile?.profile_align === 'left' ? 'items-start text-left animate-in fade-in duration-500' : 'items-center text-center animate-in fade-in duration-500'
          } ${profile?.banner_url ? 'pt-12' : ''}`}
          style={{ color: profile?.text_color || '#ffffff' }}
        >
          {/* Avatar */}
          <motion.div 
            variants={avatarVariants} 
            className={`overflow-hidden mb-6 shadow-2xl backdrop-blur-sm border-4 ${
              profile.avatar_url ? 'border-white/20' : 'border-white/10'
            } ${
              profile?.avatar_shape === 'rounded' ? 'rounded-2xl' : 
              profile?.avatar_shape === 'hexagon' ? '' : 'rounded-full'
            } ${
              profile?.avatar_size === 'small' ? 'w-20 h-20' : 
              profile?.avatar_size === 'large' ? 'w-36 h-36' : 'w-28 h-28'
            } ${profile?.banner_url ? 'mt-6 border-zinc-900 shadow-xl' : ''}`}
            style={{ clipPath: profile?.avatar_shape === 'hexagon' ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' : undefined }}
          >
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.full_name ?? undefined} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center text-white text-4xl font-extrabold">
                {profile.username.charAt(0).toUpperCase()}
              </div>
            )}
          </motion.div>

          {/* Profile Info */}
          <motion.h1 
            variants={titleVariants} 
            style={{ color: profile?.text_color || '#ffffff' }}
            className={`text-3xl font-extrabold mb-2 drop-shadow-md w-full ${profile?.profile_align === 'left' ? 'text-left' : 'text-center'}`}
          >
            {profile.full_name || `@${profile.username}`}
          </motion.h1>
          {profile.bio && (
            <motion.p 
              variants={titleVariants} 
              style={{ color: (profile?.text_color || '#ffffff') + 'cc' }}
              className={`mb-10 max-w-md drop-shadow-sm text-lg w-full ${profile?.profile_align === 'left' ? 'text-left' : 'text-center'}`}
            >
              {profile.bio}
            </motion.p>
          )}

          {/* Social Icons Row */}
          {profile.social_links && typeof profile.social_links === 'object' && Object.keys(profile.social_links).length > 0 && (
            <motion.div 
              variants={socialRowVariants} 
              className={`flex flex-wrap gap-4 mb-8 z-10 w-full ${profile?.profile_align === 'left' ? 'justify-start' : 'justify-center'}`}
            >
              {Object.keys(profile.social_links).map((key) => {
                const socialLinksRecord = profile.social_links as Record<string, string>
                const url = socialLinksRecord[key]
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
                    className={`w-10 h-10 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm backdrop-blur-md ${
                      profile?.social_style === 'outline' ? 'bg-transparent border border-white/30 text-white' :
                      profile?.social_style === 'square' ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl' :
                      profile?.social_style === 'minimal' ? 'bg-transparent border-0 text-white shadow-none' :
                      'rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white'
                    }`}
                    style={{ color: profile?.text_color || '#ffffff' }}
                  >
                    <IconComponent size={20} />
                  </motion.a>
                )
              })}
            </motion.div>
          )}

          {/* Links */}
          <motion.div 
            variants={linkWrapperVariants} 
            className={`w-full max-w-md ${
              profile?.link_spacing === 'compact' ? 'space-y-2.5' : 
              profile?.link_spacing === 'relaxed' ? 'space-y-5.5' : 'space-y-4'
            }`}
          >
            {links?.map((link) => (
              <motion.div key={link.id} variants={linkVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <LinkButton link={link} profileId={profile.id} profile={profile} />
              </motion.div>
            ))}
          </motion.div>

          {/* Footer branding */}
          {profile.show_branding !== false && (
            <motion.div 
              variants={footerVariants}
              className="mt-16 mb-8 z-10"
            >
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/50 hover:text-white transition-all text-xs font-semibold shadow-sm backdrop-blur-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Powered by</span>
                <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center shadow-inner">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span className="font-bold text-white/90">Branch</span>
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
