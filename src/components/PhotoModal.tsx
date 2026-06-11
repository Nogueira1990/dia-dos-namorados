import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, Heart } from 'lucide-react'
import type { Foto } from '../data/historia'

interface Props {
  foto: Foto | null
  onClose: () => void
}

export default function PhotoModal({ foto, onClose }: Props) {
  useEffect(() => {
    if (!foto) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [foto, onClose])

  return (
    <AnimatePresence>
      {foto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl"
            style={{ background: '#181818' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Área da imagem — letterbox com blur no fundo */}
            <div
              className="relative overflow-hidden"
              style={{ maxHeight: '65vh', minHeight: 240 }}
            >
              {/* Fundo borrado (preenche borda preta de fotos verticais) */}
              <img
                src={foto.arquivo}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-110"
                style={{ filter: 'blur(28px) brightness(0.45)', zIndex: 0 }}
              />

              {/* Foto real — sem corte, object-contain */}
              <img
                src={foto.arquivo}
                alt={foto.descricao}
                className="relative block mx-auto"
                style={{
                  maxHeight: '65vh',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  zIndex: 1,
                }}
              />

              {/* Gradiente sutil na base para o texto sobrepor melhor */}
              <div
                className="absolute bottom-0 left-0 right-0 h-20"
                style={{
                  background: 'linear-gradient(to top, #181818 0%, transparent 100%)',
                  zIndex: 2,
                }}
              />

              {/* Botão fechar */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                style={{ zIndex: 3 }}
              >
                <X size={18} className="text-white" />
              </button>

              {/* Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2" style={{ zIndex: 3 }}>
                <Heart size={14} className="text-netflix-red fill-netflix-red" />
                <span className="text-white/70 text-xs tracking-widest uppercase font-inter">NossaFlix Original</span>
              </div>
            </div>

            {/* Info */}
            <div className="px-5 pb-6 pt-4">
              <div className="flex items-center gap-3 text-sm text-white/60 mb-3">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-netflix-red" />
                  {foto.local}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-netflix-red" />
                  {foto.data}
                </span>
              </div>

              <p className="text-white/90 text-sm md:text-base leading-relaxed font-light">
                {foto.descricao}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {foto.categorias.map(cat => (
                  <span
                    key={cat}
                    className="text-[11px] px-2.5 py-0.5 rounded-full text-white/50 border border-white/20"
                  >
                    {cat.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
