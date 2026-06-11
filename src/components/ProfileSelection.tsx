import { motion } from 'framer-motion'
import NossaFlixLogo from './NossaFlixLogo'

export type ProfileName = 'Alexandre' | 'Viviane' | 'Thor' | 'Baunilha'

interface Profile {
  name: ProfileName
  emoji: string
  color: string
  saudacao: string
}

const profiles: Profile[] = [
  {
    name: 'Alexandre',
    emoji: '👨',
    color: '#2563EB',
    saudacao: 'Bem-vindo, Alexandre ❤️',
  },
  {
    name: 'Viviane',
    emoji: '👩',
    color: '#E50914',
    saudacao: 'Bem-vinda, Viviane ❤️\nEssa história é toda sua.',
  },
  {
    name: 'Thor',
    emoji: '🐕',
    color: '#D97706',
    saudacao: 'Oi, Thor! Bom garoto 🐾',
  },
  {
    name: 'Baunilha',
    emoji: '🐶',
    color: '#7C3AED',
    saudacao: 'Oi, Baunilha! Você é uma princesa 🐾',
  },
]

interface Props {
  onSelect: (name: ProfileName, saudacao: string) => void
}

export default function ProfileSelection({ onSelect }: Props) {
  return (
    <div className="min-h-screen bg-netflix-dark flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <NossaFlixLogo size="lg" className="mb-2" />
        <p className="text-white text-xl md:text-2xl font-light">
          Quem está assistindo?
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {profiles.map((profile, i) => (
          <motion.button
            key={profile.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(profile.name, profile.saudacao)}
            className="flex flex-col items-center gap-3 group cursor-pointer"
          >
            <div
              className="w-24 h-24 md:w-28 md:h-28 rounded-lg flex items-center justify-center text-5xl md:text-6xl transition-all duration-200 group-hover:ring-4 ring-white"
              style={{ background: `${profile.color}33`, border: `2px solid ${profile.color}66` }}
            >
              {profile.emoji}
            </div>
            <span className="text-netflix-lightgray text-sm md:text-base group-hover:text-white transition-colors font-inter">
              {profile.name}
            </span>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-white/30 text-xs tracking-widest uppercase"
      >
        Para Viviane, com todo o amor do mundo ❤️
      </motion.p>
    </div>
  )
}
