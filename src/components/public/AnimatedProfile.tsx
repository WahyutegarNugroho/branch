'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import AuroraBackground from '@/components/backgrounds/AuroraBackground'
import SnowfallBackground from '@/components/backgrounds/SnowfallBackground'
import MatrixBackground from '@/components/backgrounds/MatrixBackground'
import StarsBackground from '@/components/backgrounds/StarsBackground'
import ConfettiBackground from '@/components/backgrounds/ConfettiBackground'
import ParticlesBackground from '@/components/backgrounds/ParticlesBackground'
import { LinkButton } from '@/components/public/LinkButton'
import { PageTracker } from '@/components/public/PageTracker'
import { SocialIconsRow } from '@/components/shared/SocialIconsRow'
import { Zap, Share2 } from 'lucide-react'
import { useState } from 'react'
import { SocialShareModal } from './SocialShareModal'

import { Profile, Link } from '@/types'

export function AnimatedProfile({ profile, links, bgClass: defaultBgClass, bgStyle: defaultBgStyle }: { profile: Profile, links: Link[], bgClass: string, bgStyle: React.CSSProperties }) {
  const currentTextColor = profile?.text_color || '#ffffff'
  const bgStyle = { ...defaultBgStyle }
  const [isShareOpen, setIsShareOpen] = useState(false)

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
    <div className="h-dvh sm:h-auto sm:min-h-screen w-full flex items-center justify-center bg-[#1c1c1e] sm:py-8 sm:px-4 overflow-hidden">
      <div 
        className={`h-dvh sm:h-auto sm:min-h-[820px] sm:max-h-[880px] w-full sm:w-[480px] sm:rounded-[40px] sm:shadow-[0_24px_70px_rgba(0,0,0,0.85)] sm:border sm:border-white/10 relative flex flex-col py-16 px-6 overflow-y-auto overflow-x-hidden no-scrollbar ${profile?.font_family || 'font-sans-theme'} ${
          profile?.profile_align === 'left' ? 'items-start text-left' : 
          profile?.profile_align === 'right' ? 'items-end text-right' : 'items-center text-center'
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

        {/* Live Background Animations */}
        {profile?.bg_animation === 'aurora' && <AuroraBackground config={profile?.bg_animation_config} />}
        {profile?.bg_animation === 'particles' && <ParticlesBackground config={profile?.bg_animation_config} />}
        {profile?.bg_animation === 'snowfall' && <SnowfallBackground config={profile?.bg_animation_config} />}
        {profile?.bg_animation === 'stars' && <StarsBackground config={profile?.bg_animation_config} />}
        {profile?.bg_animation === 'matrix' && <MatrixBackground config={profile?.bg_animation_config} />}
        {profile?.bg_animation === 'confetti' && <ConfettiBackground config={profile?.bg_animation_config} />}
        {profile?.bg_animation === 'bokeh' && <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen blur-[8px]" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(236,72,153,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 60%, rgba(249,115,22,0.4) 0%, transparent 40%)', animation: 'pulseSlow 5s infinite alternate, bgMove 20s ease-in-out infinite' }} />}

        {/* Hero Banner header overlay */}
        {profile?.banner_url && (
          <div className="absolute top-0 inset-x-0 h-32 w-full overflow-hidden border-b border-white/10 z-0">
            <Image src={profile.banner_url} alt="Banner" fill className="object-cover" sizes="480px" />
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
          <div className="flex gap-2">
            <button 
              onClick={() => setIsShareOpen(true)}
            className="w-9 h-9 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white border border-white/20 transition-all active:scale-95 shadow-sm"
          >
            <Share2 className="w-4 h-4" />
          </button>
          </div>
        </div>

        {/* Analytics Tracking */}
        <PageTracker profileId={profile.id} />

        <SocialShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          url={typeof window !== 'undefined' ? window.location.href : ''}
          title={profile.full_name || `@${profile.username}`}
          description={profile.bio || undefined}
        />

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
          {(() => {
            const avatarShapeClass = profile?.avatar_shape === 'rounded' ? 'rounded-2xl' : profile?.avatar_shape === 'hexagon' ? '' : 'rounded-full'
            const avatarClipPath = profile?.avatar_shape === 'hexagon' ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' : undefined
            
            const frameColor1 = profile?.avatar_frame_config?.color1 || (profile?.avatar_frame === 'gradient-ring' ? '#ec4899' : '#22d3ee')
            const frameColor2 = profile?.avatar_frame_config?.color2 || '#f97316'
            
            let frameClass = ''
            let frameStyle: React.CSSProperties = { clipPath: avatarClipPath }
            
            if (profile?.avatar_frame === 'gradient-ring') {
              frameClass = 'p-1.5'
              frameStyle.background = `linear-gradient(to top right, ${frameColor1}, ${frameColor2})`
              frameStyle.boxShadow = `0 0 20px ${frameColor1}80`
            } else if (profile?.avatar_frame === 'neon-glow') {
              frameClass = 'p-1'
              frameStyle.backgroundColor = frameColor1
              frameStyle.boxShadow = `0 0 25px ${frameColor1}cc`
            }
            
            return (
              <div 
                className={`relative flex justify-center ${frameClass} mb-6 ${profile?.banner_url ? 'mt-6 border-4 border-zinc-950 bg-zinc-950' : ''} ${avatarShapeClass}`}
                style={frameStyle}
              >
                <motion.div 
                  variants={avatarVariants} 
                  className={`relative overflow-hidden shadow-2xl backdrop-blur-sm border-4 ${
                  profile.avatar_url ? 'border-white/20' : 'border-white/10'
                } ${avatarShapeClass} ${
                  profile?.avatar_size === 'small' ? 'w-20 h-20' : 
                  profile?.avatar_size === 'large' ? 'w-36 h-36' : 'w-28 h-28'
                } ${profile?.banner_url ? 'mt-6 border-zinc-900 shadow-xl' : ''}`}
                style={{ clipPath: avatarClipPath }}
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
            )
          })()}

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

          {/* Social Icons Row */}
          {profile.social_links && typeof profile.social_links === 'object' && Object.keys(profile.social_links).length > 0 && (
            <SocialIconsRow
              socialLinks={profile.social_links as Record<string, string>}
              socialStyle={profile?.social_style}
              placement={(profile?.social_placement as 'top' | 'bottom') || 'top'}
              align={(profile?.profile_align as 'center' | 'left' | 'right') || 'center'}
              textColor={currentTextColor}
            />
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
                  <LinkButton link={link} profileId={profile.id} profile={{...profile, text_color: currentTextColor}} />
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
                          <LinkButton link={link} profileId={profile.id} profile={{...profile, text_color: currentTextColor}} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )
            })()}
          </motion.div>



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
