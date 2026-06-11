import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Map, PawPrint, Plane } from 'lucide-react'

const INICIO = new Date('2022-06-16T00:00:00')
const PROXIMA_VIAGEM = new Date('2026-08-14T00:00:00')

function calcular() {
  const agora = new Date()
  const diff = agora.getTime() - INICIO.getTime()
  const totalDias = diff / (1000 * 60 * 60 * 24)
  const anos = totalDias / 365.25
  const anosInteiros = Math.floor(anos)
  const mesesResto = Math.floor((anos - anosInteiros) * 12)
  const dias = Math.floor(totalDias)
  const horas = Math.floor(diff / (1000 * 60 * 60))
  const minutos = Math.floor(diff / (1000 * 60))

  const diffViagem = PROXIMA_VIAGEM.getTime() - agora.getTime()
  const diasViagem = Math.max(0, Math.floor(diffViagem / (1000 * 60 * 60 * 24)))
  const horasViagem = Math.max(0, Math.floor((diffViagem % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
  const minutosViagem = Math.max(0, Math.floor((diffViagem % (1000 * 60 * 60)) / (1000 * 60)))
  const segundosViagem = Math.max(0, Math.floor((diffViagem % (1000 * 60)) / 1000))

  return { anos, anosInteiros, mesesResto, dias, horas, minutos, diasViagem, horasViagem, minutosViagem, segundosViagem }
}

// Contador animado que sobe de 0 até o valor
function Counter({ value, label, color = '#E50914', large = false }: {
  value: number; label: string; color?: string; large?: boolean
}) {
  const [displayed, setDisplayed] = useState(0)
  const prevValue = useRef(0)

  useEffect(() => {
    const start = prevValue.current
    const end = value
    prevValue.current = value
    if (start === end) return

    const duration = 900
    const startTime = performance.now()
    const raf = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplayed(Math.floor(start + (end - start) * eased))
      if (progress < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [value])

  return (
    <div className="text-center">
      <div
        className="font-anton leading-none"
        style={{
          color,
          fontSize: large ? 'clamp(1.6rem, 7vw, 4.5rem)' : 'clamp(1.4rem, 6vw, 3rem)',
          textShadow: `0 0 20px ${color}55, 0 0 40px ${color}25`,
          letterSpacing: '-0.02em',
        }}
      >
        {displayed.toLocaleString('pt-BR')}
      </div>
      <div className="text-white/55 text-xs md:text-sm mt-2 font-inter tracking-wide">{label}</div>
    </div>
  )
}

// Card especial para "Anos juntos" com decimais e texto "X anos e Y meses"
function AnosCounter({ anos, anosInteiros, mesesResto }: { anos: number; anosInteiros: number; mesesResto: number }) {
  const [displayed, setDisplayed] = useState(0)
  const prevRef = useRef(0)

  useEffect(() => {
    const start = prevRef.current
    const end = Math.floor(anos * 100) / 100
    prevRef.current = end
    if (start === end) return

    const duration = 1200
    const startTime = performance.now()
    const raf = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplayed(Math.floor((start + (end - start) * eased) * 100) / 100)
      if (progress < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [anos])

  return (
    <div className="text-center">
      <div
        className="font-anton leading-none"
        style={{
          color: '#E50914',
          fontSize: 'clamp(1.6rem, 7vw, 4.5rem)',
          textShadow: '0 0 24px rgba(229,9,20,0.5), 0 0 48px rgba(229,9,20,0.2)',
          letterSpacing: '-0.02em',
        }}
      >
        {displayed.toFixed(2).replace('.', ',')}
      </div>
      <div className="text-netflix-red/80 text-xs md:text-sm mt-2 font-inter font-medium tracking-wide">
        Anos juntos
      </div>
      <div className="text-white/40 text-[11px] mt-1 font-inter">
        {anosInteiros} {anosInteiros === 1 ? 'ano' : 'anos'} e {mesesResto} {mesesResto === 1 ? 'mês' : 'meses'}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState(calcular())

  // Atualiza a cada segundo para os segundos/minutos subirem em tempo real
  useEffect(() => {
    const interval = setInterval(() => setStats(calcular()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      id="dashboard"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative py-20 px-4 md:px-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #141414 0%, #0a0a0a 100%)' }}
    >
      {/* Glow vermelho de fundo decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(229,9,20,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2
            className="font-anton text-4xl md:text-5xl text-white mb-2"
            style={{ letterSpacing: '-0.02em' }}
          >
            Nossos Números
          </h2>
          <p className="text-white/45 text-sm">
            Desde <span className="text-netflix-red font-semibold">16/06/2022</span> — e contando.
          </p>
        </motion.div>

        {/* Linha 1: contadores de tempo grandes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mb-8">
          {[
            { node: <AnosCounter anos={stats.anos} anosInteiros={stats.anosInteiros} mesesResto={stats.mesesResto} />, delay: 0 },
            { node: <Counter value={stats.dias}    label="Dias juntos"    color="#E50914" large />, delay: 0.08 },
            { node: <Counter value={stats.horas}   label="Horas juntos"   color="#FACC15" large />, delay: 0.16 },
            { node: <Counter value={stats.minutos} label="Minutos juntos" color="#60A5FA" large />, delay: 0.24 },
          ].map(({ node, delay }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay }}
              className="rounded-2xl p-5 md:p-7 flex flex-col items-center justify-center gap-1"
              style={{
                background: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(4px)',
              }}
            >
              {node}
            </motion.div>
          ))}
        </div>

        {/* Linha 2: stats fixas menores */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: <Plane size={20} className="text-blue-400" />, value: 2,   label: 'Viagens juntos',    color: '#60A5FA' },
            { icon: <Map  size={20} className="text-green-400" />, value: 9,   label: 'Cidades visitadas', color: '#4ADE80' },
            { icon: <PawPrint size={20} className="text-amber-400" />, value: 2, label: 'Filhotes na família', color: '#FBBF24' },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="rounded-xl p-4 flex flex-col items-center gap-2"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {card.icon}
              <Counter value={card.value} label={card.label} color={card.color} />
            </motion.div>
          ))}
        </div>

        {/* Coração no centro */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={28} className="text-netflix-red fill-netflix-red" style={{ filter: 'drop-shadow(0 0 8px rgba(229,9,20,0.6))' }} />
          </motion.div>
        </div>

        {/* Contagem regressiva para Maragogi */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 md:p-10 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(229,9,20,0.1) 0%, rgba(229,9,20,0.03) 100%)',
            border: '1px solid rgba(229,9,20,0.25)',
          }}
        >
          <div className="text-5xl mb-3">✈️</div>
          <h3
            className="font-anton text-3xl md:text-4xl text-white mb-1"
            style={{ letterSpacing: '-0.02em' }}
          >
            Próxima Parada: Maragogi – AL
          </h3>
          <p className="text-white/45 text-sm mb-8">
            14/08/2026 — Nossa primeira viagem de avião juntos
          </p>

          <div className="flex justify-center gap-6 md:gap-16">
            {[
              { v: stats.diasViagem,    l: 'Dias' },
              { v: stats.horasViagem,   l: 'Horas' },
              { v: stats.minutosViagem, l: 'Minutos' },
              { v: stats.segundosViagem, l: 'Segundos' },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div
                  className="font-anton text-4xl md:text-6xl"
                  style={{
                    color: '#E50914',
                    letterSpacing: '-0.02em',
                    textShadow: '0 0 20px rgba(229,9,20,0.4)',
                  }}
                >
                  {String(v).padStart(2, '0')}
                </div>
                <div className="text-white/45 text-xs uppercase tracking-widest mt-2">{l}</div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-white/35 text-xs italic">
            "O melhor ainda está por vir."
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
