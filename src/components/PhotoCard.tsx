import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, MapPin, Calendar } from 'lucide-react'
import type { Foto } from '../data/historia'

interface Props {
  foto: Foto
  onClick: (foto: Foto) => void
}

export default function PhotoCard({ foto, onClick }: Props) {
  const [hovered, setHovered] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Prioriza focalPoint definido na foto; fallback para center 25% para não cortar cabeças
  const objectPosition = foto.focalPoint ?? 'center 25%'

  return (
    <motion.div
      className="relative flex-shrink-0 rounded-md overflow-hidden cursor-pointer"
      style={{ width: 200, height: 130 }}
      whileHover={{ scale: 1.08, zIndex: 10 }}
      transition={{ duration: 0.25 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onClick(foto)}
    >
      {/* Imagem */}
      <img
        src={foto.arquivo}
        alt={foto.descricao}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ objectPosition }}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />

      {/* Placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-md" />
      )}

      {/* Overlay no hover */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 flex flex-col justify-end p-2"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <motion.button
              whileHover={{ scale: 1.2 }}
              className="w-7 h-7 rounded-full bg-white flex items-center justify-center"
            >
              <Play size={12} fill="black" className="text-black" />
            </motion.button>
          </div>
          <p className="text-white text-xs font-semibold leading-tight line-clamp-2">
            {foto.descricao.split('.')[0]}
          </p>
          <div className="flex items-center gap-2 mt-1 text-white/60 text-[10px]">
            <span className="flex items-center gap-0.5">
              <MapPin size={9} />{foto.local.split('–')[0].trim()}
            </span>
            <span className="flex items-center gap-0.5">
              <Calendar size={9} />{foto.data}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
