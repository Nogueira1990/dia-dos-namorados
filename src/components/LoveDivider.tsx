import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface Props {
  frase: string
}

export default function LoveDivider({ frase }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex items-center justify-center gap-4 py-6 px-4"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-white/10 max-w-xs" />
      <div className="flex items-center gap-3 text-center">
        <Heart size={14} className="text-netflix-red fill-netflix-red flex-shrink-0" />
        <p className="text-white/40 text-xs md:text-sm italic tracking-wide max-w-sm">{frase}</p>
        <Heart size={14} className="text-netflix-red fill-netflix-red flex-shrink-0" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/10 to-white/10 max-w-xs" />
    </motion.div>
  )
}
