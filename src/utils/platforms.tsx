import { IconType } from 'react-icons'
import { 
  FaInstagram, 
  FaTiktok, 
  FaYoutube, 
  FaTwitter, 
  FaFacebook, 
  FaLinkedin, 
  FaGithub, 
  FaDiscord, 
  FaWhatsapp, 
  FaTelegramPlane, 
  FaTwitch, 
  FaSpotify, 
  FaApple, 
  FaSnapchatGhost, 
  FaRedditAlien, 
  FaPatreon, 
  FaMediumM, 
  FaDribbble, 
  FaBehance, 
  FaFigma,
  FaSoundcloud,
  FaGlobe,
  FaEnvelope,
  FaShoppingCart
} from 'react-icons/fa'
import { 
  SiSubstack, 
  SiKofi, 
  SiBuymeacoffee, 
  SiLine, 
  SiShopee, 
  SiThreads
} from 'react-icons/si'

export interface Platform {
  id: string
  name: string
  icon: IconType
  color: string
  urlPrefix?: string
}

export const PLATFORMS: Platform[] = [
  // Social
  { id: 'instagram', name: 'Instagram', icon: FaInstagram, color: '#E1306C', urlPrefix: 'https://instagram.com/' },
  { id: 'tiktok', name: 'TikTok', icon: FaTiktok, color: '#000000', urlPrefix: 'https://tiktok.com/@' },
  { id: 'youtube', name: 'YouTube', icon: FaYoutube, color: '#FF0000', urlPrefix: 'https://youtube.com/' },
  { id: 'twitter', name: 'Twitter / X', icon: FaTwitter, color: '#1DA1F2', urlPrefix: 'https://twitter.com/' },
  { id: 'threads', name: 'Threads', icon: SiThreads, color: '#000000', urlPrefix: 'https://threads.net/' },
  { id: 'facebook', name: 'Facebook', icon: FaFacebook, color: '#1877F2', urlPrefix: 'https://facebook.com/' },
  { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedin, color: '#0A66C2', urlPrefix: 'https://linkedin.com/in/' },
  { id: 'snapchat', name: 'Snapchat', icon: FaSnapchatGhost, color: '#FFFC00', urlPrefix: 'https://snapchat.com/add/' },
  { id: 'reddit', name: 'Reddit', icon: FaRedditAlien, color: '#FF4500', urlPrefix: 'https://reddit.com/user/' },
  
  // Messaging
  { id: 'whatsapp', name: 'WhatsApp', icon: FaWhatsapp, color: '#25D366', urlPrefix: 'https://wa.me/' },
  { id: 'telegram', name: 'Telegram', icon: FaTelegramPlane, color: '#0088cc', urlPrefix: 'https://t.me/' },
  { id: 'discord', name: 'Discord', icon: FaDiscord, color: '#5865F2', urlPrefix: 'https://discord.gg/' },
  { id: 'line', name: 'Line', icon: SiLine, color: '#00C300', urlPrefix: 'https://line.me/ti/p/' },
  
  // Audio & Media
  { id: 'spotify', name: 'Spotify', icon: FaSpotify, color: '#1DB954', urlPrefix: 'https://open.spotify.com/' },
  { id: 'apple_music', name: 'Apple Music', icon: FaApple, color: '#FA243C', urlPrefix: 'https://music.apple.com/' },
  { id: 'soundcloud', name: 'SoundCloud', icon: FaSoundcloud, color: '#FF3300', urlPrefix: 'https://soundcloud.com/' },
  { id: 'twitch', name: 'Twitch', icon: FaTwitch, color: '#9146FF', urlPrefix: 'https://twitch.tv/' },
  
  // Dev & Design
  { id: 'github', name: 'GitHub', icon: FaGithub, color: '#181717', urlPrefix: 'https://github.com/' },
  { id: 'figma', name: 'Figma', icon: FaFigma, color: '#F24E1E', urlPrefix: 'https://figma.com/@' },
  { id: 'dribbble', name: 'Dribbble', icon: FaDribbble, color: '#EA4C89', urlPrefix: 'https://dribbble.com/' },
  { id: 'behance', name: 'Behance', icon: FaBehance, color: '#1769FF', urlPrefix: 'https://behance.net/' },
  
  // Creator & Business
  { id: 'patreon', name: 'Patreon', icon: FaPatreon, color: '#FF424D', urlPrefix: 'https://patreon.com/' },
  { id: 'substack', name: 'Substack', icon: SiSubstack, color: '#FF6719', urlPrefix: 'https://substack.com/@' },
  { id: 'medium', name: 'Medium', icon: FaMediumM, color: '#000000', urlPrefix: 'https://medium.com/@' },
  { id: 'kofi', name: 'Ko-fi', icon: SiKofi, color: '#FF5E5B', urlPrefix: 'https://ko-fi.com/' },
  { id: 'buymeacoffee', name: 'Buy Me a Coffee', icon: SiBuymeacoffee, color: '#FFDD00', urlPrefix: 'https://buymeacoffee.com/' },
  
  // E-Commerce & Others
  { id: 'shopee', name: 'Shopee', icon: SiShopee, color: '#EE4D2D', urlPrefix: 'https://shopee.co.id/' },
  { id: 'tokopedia', name: 'Tokopedia', icon: FaShoppingCart, color: '#42B549', urlPrefix: 'https://tokopedia.com/' },
  { id: 'email', name: 'Email', icon: FaEnvelope, color: '#EA4335', urlPrefix: 'mailto:' },
  { id: 'website', name: 'Website', icon: FaGlobe, color: '#555555', urlPrefix: 'https://' },
]

export function getPlatformByName(name: string): Platform | undefined {
  if (!name) return undefined
  const searchName = name.toLowerCase()
  return PLATFORMS.find(p => p.name.toLowerCase() === searchName || p.id === searchName)
}
