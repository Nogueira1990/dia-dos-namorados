import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Info } from 'lucide-react'
import type { Foto } from '../data/historia'

interface Props {
  foto: Foto
  onInfo: (foto: Foto) => void
}

// Ajuste aqui se a Foto41 ainda cortar cabeça — ex: 'center 15%', 'center 30%'
const HERO_FOCAL_POINT = 'center 20%'

export default function HeroBanner({ foto, onInfo }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false)

  const focalPoint = foto.focalPoint ?? HERO_FOCAL_POINT

  return (
    <div className="relative w-full" style={{ height: '85vh', minHeight: 480 }}>
      {/* Imagem de fundo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: imgLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <img
          src={foto.arquivo}
          alt="Hero"
          className="w-full h-full object-cover"
          style={{ objectPosition: focalPoint }}
          onLoad={() => setImgLoaded(true)}
        />
      </motion.div>

      {/* Gradientes */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent" />

      {/* Conteúdo */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-24 left-4 md:left-16 max-w-xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <span
            className="text-xs tracking-[0.3em] px-3 py-1 rounded font-inter font-semibold uppercase"
            style={{ background: '#E50914', color: 'white' }}
          >
            ORIGINAL NOSSAFLIX
          </span>
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bebas text-white leading-none mb-3 tracking-wide drop-shadow-2xl">
          A Nossa Família
        </h2>

        <p className="text-white/90 text-base md:text-lg font-light leading-relaxed mb-6 drop-shadow-lg max-w-md">
          Dois humanos, dois cachorros, e uma história que nenhuma tela é grande o suficiente pra contar.
          Mas a gente tenta.
        </p>

        {/* Badges de info */}
        <div className="flex items-center gap-3 mb-6 text-xs text-white/60">
          <span className="border border-white/40 px-2 py-0.5 rounded">{foto.local}</span>
          <span>{foto.data}</span>
        </div>

        {/* Botões */}
        <div className="flex gap-3 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onInfo(foto)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded text-sm hover:bg-white/90 transition-colors"
          >
            <Play size={18} fill="black" />
            Assistir
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onInfo(foto)}
            className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded text-sm hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <Info size={18} />
            Mais informações
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
