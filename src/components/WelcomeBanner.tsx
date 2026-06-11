import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import type { ProfileName } from './ProfileSelection'

interface Props {
  profileName: ProfileName
  saudacao: string
  onDismiss: () => void
}

export default function WelcomeBanner({ saudacao, onDismiss }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -60 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl cursor-pointer"
        style={{
          background: 'rgba(20,20,20,0.96)',
          border: '1px solid rgba(229,9,20,0.4)',
          backdropFilter: 'blur(12px)',
          maxWidth: 360,
        }}
        onClick={onDismiss}
      >
        <Heart size={18} className="text-netflix-red fill-netflix-red flex-shrink-0" />
        <p className="text-white text-sm whitespace-pre-line leading-snug">{saudacao}</p>
      </motion.div>
    </AnimatePresence>
  )
}
