import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PhotoCard from './PhotoCard'
import type { Foto } from '../data/historia'

interface Props {
  titulo: string
  fotos: Foto[]
  onPhotoClick: (foto: Foto) => void
}

export default function Carousel({ titulo, fotos, onPhotoClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)

  if (fotos.length === 0) return null

  const scroll = (dir: 'left' | 'right') => {
    if (!ref.current) return
    const amount = 420
    ref.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const onScroll = () => {
    if (!ref.current) return
    setShowLeft(ref.current.scrollLeft > 20)
    setShowRight(ref.current.scrollLeft < ref.current.scrollWidth - ref.current.clientWidth - 20)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="relative mb-8 md:mb-10"
    >
      <h3 className="text-white text-lg md:text-xl font-semibold mb-3 px-4 md:px-16 hover:text-white/80 transition-colors cursor-default">
        {titulo}
      </h3>

      <div className="relative group">
        {/* Seta esquerda */}
        {showLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-black/70 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="text-white" size={28} />
          </button>
        )}

        {/* Carrossel */}
        <div
          ref={ref}
          onScroll={onScroll}
          className="flex gap-2 overflow-x-auto carousel-container px-4 md:px-16 pb-2"
        >
          {fotos.map(foto => (
            <PhotoCard key={foto.id} foto={foto} onClick={onPhotoClick} />
          ))}
        </div>

        {/* Seta direita */}
        {showRight && fotos.length > 4 && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-black/70 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="text-white" size={28} />
          </button>
        )}
      </div>
    </motion.div>
  )
}
