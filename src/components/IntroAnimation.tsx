import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onComplete: () => void
}

export default function IntroAnimation({ onComplete }: Props) {
  const [phase, setPhase] = useState<'logo' | 'tagline' | 'fade'>('logo')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('tagline'), 1400)
    const t2 = setTimeout(() => setPhase('fade'), 3200)
    const t3 = setTimeout(() => onComplete(), 4000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'fade' && (
        <motion.div
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo com animação de expansão horizontal (igual Netflix) */}
          <motion.div
            initial={{ scaleX: 0.04, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden', maxWidth: '100vw', width: '100%', textAlign: 'center' }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.25 }}
            >
              <span
                style={{
                  fontFamily: 'Anton, sans-serif',
                  fontSize: 'clamp(2.5rem, 16vw, 8rem)',
                  color: '#E50914',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  textShadow: [
                    '0 2px 4px rgba(0,0,0,0.9)',
                    '0 0 80px rgba(229,9,20,0.45)',
                    '0 4px 64px rgba(229,9,20,0.2)',
                  ].join(', '),
                  transform: 'perspective(300px) rotateX(2deg)',
                  transformOrigin: 'center bottom',
                }}
              >
                NossaFlix
              </span>
            </motion.div>
          </motion.div>

          {/* Linha vermelha */}
          <motion.div
            className="h-0.5 bg-netflix-red rounded-full mt-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: phase === 'tagline' ? '72%' : 0,
              opacity: phase === 'tagline' ? 1 : 0,
            }}
            transition={{ duration: 0.45 }}
            style={{ maxWidth: 480 }}
          />

          {/* Tagline */}
          <AnimatePresence>
            {phase === 'tagline' && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-5 text-white/65 text-sm md:text-base tracking-[0.35em] uppercase font-inter font-light"
              >
                A nossa história, em tela cheia
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
