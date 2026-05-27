'use client'

import Image from 'next/image'
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
import { Zap, Sun, Moon } from 'lucide-react'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'

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

export function AnimatedProfile({ profile, links, bgClass: defaultBgClass, bgStyle: defaultBgStyle }: { profile: Profile, links: Link[], bgClass: string, bgStyle: React.CSSProperties }) {
  const [visitorTheme, setVisitorTheme] = useState<'system' | 'light' | 'dark'>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('branch_visitor_theme')
    if (saved === 'light' || saved === 'dark') {
      setVisitorTheme(saved)
    }
  }, [])

  const toggleTheme = () => {
    let newTheme: 'light' | 'dark' = 'dark'
    if (visitorTheme === 'dark') newTheme = 'light'
    else if (visitorTheme === 'light') newTheme = 'dark'
    else {
      // If system, switch to the opposite of current system preference
      const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      newTheme = isSystemDark ? 'light' : 'dark'
    }
    
    setVisitorTheme(newTheme)
    localStorage.setItem('branch_visitor_theme', newTheme)
  }

  let bgStyle = { ...defaultBgStyle }
  let currentTextColor = profile?.text_color || '#ffffff'

  if (mounted && visitorTheme !== 'system') {
    if (visitorTheme === 'light') {
      bgStyle = { backgroundColor: '#f4f4f5' } // zinc-100
      currentTextColor = '#18181b' // zinc-900
    } else if (visitorTheme === 'dark') {
      bgStyle = { backgroundColor: '#09090b' } // zinc-950
      currentTextColor = '#ffffff'
    }
  }

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
          profile?.profile_align === 'left' ? 'items-start text-left' : 
          profile?.profile_align === 'right' ? 'items-end text-right' : 'items-center text-center'
        }`}
        style={bgStyle}
      >
        {/* Background Video loop (Muted, AutoPlay) */}
        {profile?.bg_type === 'video' && profile?.bg_video_url && mounted && visitorTheme === 'system' && (
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

        {/* Live Background Animations */}
        {profile?.bg_animation === 'aurora' && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-pink/20 via-transparent to-transparent pointer-events-none z-0 animate-pulse" />}
        {profile?.bg_animation === 'particles' && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.3 }} />}
        {profile?.bg_animation === 'snowfall' && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 pointer-events-none z-0 mix-blend-screen animate-pulse-slow" />}
        {profile?.bg_animation === 'stars' && <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-50" style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0))', backgroundSize: '200px 200px', animation: 'pulseSlow 4s infinite alternate' }} />}
        {profile?.bg_animation === 'matrix' && <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.2) 1px, transparent 1px, transparent 2px)', backgroundSize: '100% 4px' }} />}
        {profile?.bg_animation === 'confetti' && <div className="absolute inset-0 pointer-events-none z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(4px 4px at 10% 20%, #ff0055, rgba(0,0,0,0)), radial-gradient(4px 4px at 30% 60%, #00ffaa, rgba(0,0,0,0)), radial-gradient(4px 4px at 50% 40%, #ffaa00, rgba(0,0,0,0)), radial-gradient(4px 4px at 80% 80%, #00aaff, rgba(0,0,0,0))', backgroundSize: '100px 100px', animation: 'bounceSlow 3s infinite alternate' }} />}
        {profile?.bg_animation === 'bokeh' && <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen blur-[8px]" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(236,72,153,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 60%, rgba(249,115,22,0.4) 0%, transparent 40%)', animation: 'pulseSlow 5s infinite alternate' }} />}

        {/* Hero Banner header overlay */}
        {profile?.banner_url && (
          <div className="absolute top-0 inset-x-0 h-32 w-full overflow-hidden border-b border-white/10 z-0">
            <Image src={profile.banner_url} alt="Banner" fill className="object-cover" sizes="480px" />
          </div>
        )}

        {/* Dark Overlay */}
        {profile.bg_overlay_opacity > 0 && mounted && visitorTheme === 'system' && (
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
          <div className="flex gap-2">
            {mounted && !profile.theme_lock && (
              <button 
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white border border-white/20 transition-all active:scale-95 shadow-sm"
                title="Toggle Theme"
              >
                {visitorTheme === 'dark' || (visitorTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4 text-white" />
                )}
              </button>
            )}
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
                toast.success('Profile link copied!');
              }
            }}
            className="w-9 h-9 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white border border-white/20 transition-all active:scale-95 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
          </button>
          </div>
        </div>

        {/* Analytics Tracking */}
        <PageTracker profileId={profile.id} />

        {/* Profile Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`relative z-10 w-full flex flex-col ${
            profile?.profile_align === 'left' ? 'items-start text-left animate-in fade-in duration-500' : 
            profile?.profile_align === 'right' ? 'items-end text-right animate-in fade-in duration-500' : 'items-center text-center animate-in fade-in duration-500'
          } ${
            profile?.theme_style === 'glass' ? 'p-6 sm:p-10 rounded-3xl border border-white/20 shadow-2xl max-w-lg mx-auto' : ''
          } ${profile?.banner_url && profile?.theme_style !== 'glass' ? 'pt-12' : ''}`}
          style={{ 
            color: currentTextColor,
            ...(profile?.theme_style === 'glass' ? {
              backdropFilter: `blur(${profile?.glass_blur ?? 10}px)`,
              backgroundColor: `rgba(255,255,255,${(profile?.glass_opacity ?? 20) / 100})`
            } : {})
          }}
        >
          {/* Avatar */}
          <div className={`relative flex justify-center ${profile?.avatar_frame === 'gradient-ring' ? 'p-1.5 rounded-full bg-gradient-to-tr from-brand-pink to-brand-orange shadow-[0_0_20px_rgba(236,72,153,0.5)]' : profile?.avatar_frame === 'neon-glow' ? 'p-1 rounded-full bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)]' : ''} mb-6 ${profile?.banner_url ? 'mt-6 border-4 border-zinc-950 rounded-full bg-zinc-950' : ''}`}>
            <motion.div 
              variants={avatarVariants} 
              className={`relative overflow-hidden shadow-2xl backdrop-blur-sm border-4 ${
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
              <Image src={profile.avatar_url} alt={profile.full_name ?? ''} fill className="object-cover" sizes="144px" />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center text-white text-4xl font-extrabold">
                {profile.username.charAt(0).toUpperCase()}
              </div>
            )}
            </motion.div>
          </div>

          {/* Profile Info */}
          <motion.h1 
            variants={titleVariants} 
            style={{ color: currentTextColor }}
            className={`text-3xl font-extrabold mb-2 drop-shadow-md w-full ${
              profile?.profile_align === 'left' ? 'text-left' : 
              profile?.profile_align === 'right' ? 'text-right' : 'text-center'
            }`}
          >
            {profile.full_name || `@${profile.username}`}
          </motion.h1>
          {profile.bio && (
            <motion.p 
              variants={titleVariants} 
              style={{ color: currentTextColor + 'cc' }}
              className={`mb-10 max-w-md drop-shadow-sm text-lg w-full ${
                profile?.profile_align === 'left' ? 'text-left' : 
                profile?.profile_align === 'right' ? 'text-right' : 'text-center'
              }`}
            >
              {profile.bio}
            </motion.p>
          )}

          {/* Social Icons Row (Top Placement) */}
          {(!profile?.social_placement || profile?.social_placement === 'top') && profile.social_links && typeof profile.social_links === 'object' && Object.keys(profile.social_links).length > 0 && (
            <motion.div 
              variants={socialRowVariants} 
              className={`flex flex-wrap gap-4 mb-8 z-10 w-full ${
                profile?.profile_align === 'left' ? 'justify-start' : 
                profile?.profile_align === 'right' ? 'justify-end' : 'justify-center'
              }`}
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
                    style={{ color: currentTextColor, borderColor: `${currentTextColor}33` }}
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
            className={`w-full max-w-md pb-24 ${
              profile?.layout_type === 'grid' 
                ? 'grid grid-cols-2 gap-4' 
                : profile?.link_spacing === 'compact' ? 'space-y-2.5' : 
                  profile?.link_spacing === 'relaxed' ? 'space-y-5.5' : 'space-y-4'
            }`}
          >
            {(() => {
              const normalLinks = links?.filter(l => !(l.is_sticky_cta && l.link_type === 'link')) || []
              const stickyLinks = links?.filter(l => l.is_sticky_cta && l.link_type === 'link') || []
              
              const renderLink = (link: Link) => (
                <motion.div 
                  key={link.id} 
                  variants={linkVariants} 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  className={profile?.layout_type === 'grid' && (link.link_type === 'header' || link.link_type === 'carousel' || link.is_embed) ? 'col-span-2' : ''}
                >
                  <LinkButton link={link} profileId={profile.id} profile={{...profile, text_color: currentTextColor}} visitorTheme={visitorTheme} />
                </motion.div>
              )

              return (
                <>
                  {normalLinks.map(renderLink)}
                  
                  {/* Sticky CTA container */}
                  {stickyLinks.length > 0 && (
                    <div className="fixed bottom-6 left-0 right-0 px-4 z-50 flex flex-col gap-3 max-w-md mx-auto pointer-events-none">
                      {stickyLinks.map(link => (
                        <div key={link.id} className="pointer-events-auto shadow-2xl">
                          <LinkButton link={link} profileId={profile.id} profile={{...profile, text_color: currentTextColor}} visitorTheme={visitorTheme} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )
            })()}
          </motion.div>

          {/* Social Icons Row (Bottom Placement) */}
          {profile?.social_placement === 'bottom' && profile.social_links && typeof profile.social_links === 'object' && Object.keys(profile.social_links).length > 0 && (
            <motion.div 
              variants={socialRowVariants} 
              className={`flex flex-wrap gap-4 mt-8 mb-4 z-10 w-full ${
                profile?.profile_align === 'left' ? 'justify-start' : 
                profile?.profile_align === 'right' ? 'justify-end' : 'justify-center'
              }`}
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
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 flex items-center justify-center shadow-lg backdrop-blur-md transition-all ${
                      profile?.social_style === 'outline' ? 'bg-transparent border-2 border-white/30 text-white hover:border-brand-pink hover:text-brand-pink' :
                      profile?.social_style === 'square' ? 'bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10' :
                      profile?.social_style === 'minimal' ? 'bg-transparent border-0 text-white shadow-none hover:text-brand-pink hover:scale-125' :
                      'rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10'
                    }`}
                    style={{ color: currentTextColor }}
                  >
                    <IconComponent size={22} className={profile?.social_style === 'minimal' ? 'drop-shadow-none' : 'drop-shadow-sm'} />
                  </motion.a>
                )
              })}
            </motion.div>
          )}

          {/* Footer branding */}
          {profile.show_branding !== false && (
            <motion.div 
              variants={footerVariants}
              className="mt-8 mb-8 z-10"
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
