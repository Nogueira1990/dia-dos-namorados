import { motion } from 'framer-motion'
import { timeline } from '../data/historia'

export default function Timeline() {
  return (
    <motion.section
      id="timeline"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4 md:px-16"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bebas text-white tracking-wide mb-2">
            O Roteiro da Nossa História
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Cada cena, cada capítulo — em ordem cronológica, como um bom filme deveria ser.
          </p>
        </motion.div>

        {/* Linha vertical */}
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-netflix-red via-white/20 to-transparent" />

          <div className="space-y-10">
            {timeline.map((marco, i) => {
              const isRight = i % 2 === 0
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className={`relative flex items-start gap-4 md:gap-0 ${
                    isRight ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Ponto na linha (mobile: esquerda, desktop: centro) */}
                  <div
                    className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl
                      md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0
                      ${marco.destaque
                        ? 'bg-netflix-red shadow-lg shadow-netflix-red/40'
                        : 'bg-[#222] border border-white/20'
                      }`}
                  >
                    {marco.icone}
                  </div>

                  {/* Conteúdo */}
                  <div
                    className={`flex-1 rounded-xl p-4 md:p-5 md:w-[44%] md:flex-none ml-0 md:ml-0
                      ${isRight ? 'md:mr-[56%]' : 'md:ml-[56%]'}
                      ${marco.destaque
                        ? 'border border-netflix-red/30 bg-netflix-red/5'
                        : 'border border-white/8 bg-white/[0.03]'
                      }`}
                    style={{
                      borderColor: marco.destaque ? 'rgba(229,9,20,0.3)' : 'rgba(255,255,255,0.08)',
                      background: marco.destaque ? 'rgba(229,9,20,0.05)' : 'rgba(255,255,255,0.03)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs tracking-widest uppercase font-semibold"
                        style={{ color: marco.destaque ? '#E50914' : '#808080' }}
                      >
                        {marco.data}
                      </span>
                      {marco.destaque && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full text-netflix-red border border-netflix-red/40 tracking-widest uppercase">
                          marco
                        </span>
                      )}
                    </div>
                    <h4 className="text-white font-semibold text-base md:text-lg mb-2 leading-snug">
                      {marco.titulo}
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed font-light">
                      {marco.descricao}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Fim da timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="w-px h-12 bg-gradient-to-b from-netflix-red to-transparent mx-auto mb-6" />
          <p className="text-2xl md:text-3xl font-bebas text-white tracking-wide mb-2">
            Continua...
          </p>
          <p className="text-white/40 text-sm italic max-w-sm mx-auto">
            "O melhor capítulo da nossa história ainda não foi escrito — estamos escrevendo juntos, agora."
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
