import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import NossaFlixLogo from './NossaFlixLogo'
import type { ProfileName } from './ProfileSelection'

interface Props {
  profileName: ProfileName
  activeSection: string
  onSectionChange: (s: string) => void
}

const links = [
  { id: 'home',      label: 'Início' },
  { id: 'timeline',  label: 'Nossa História' },
  { id: 'dashboard', label: 'Nossos Números' },
  { id: 'mapa',      label: 'Por onde passamos' },
]

export default function Navbar({ profileName, activeSection, onSectionChange }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    onSectionChange(id)
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-netflix-dark/95 backdrop-blur-sm shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="hover:opacity-80 transition-opacity"
        >
          <NossaFlixLogo size="sm" />
        </button>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm transition-colors hover:text-white ${
                activeSection === link.id ? 'text-white font-semibold' : 'text-netflix-lightgray'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Perfil */}
        <div className="flex items-center gap-3">
          <Heart size={16} className="text-netflix-red fill-netflix-red" />
          <span className="text-sm text-netflix-lightgray hidden md:block">{profileName}</span>

          {/* Menu mobile */}
          <button
            className="md:hidden ml-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-5 space-y-1">
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Menu mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-netflix-dark/97 px-4 pb-4 flex flex-col gap-3"
        >
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left text-base text-netflix-lightgray hover:text-white transition-colors py-1 border-b border-white/10"
            >
              {link.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
