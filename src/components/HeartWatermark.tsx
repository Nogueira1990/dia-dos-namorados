import { motion } from 'framer-motion'

// Posições e tamanhos fixos para evitar layout shift
const HEARTS = [
  { x: '4%',  y: '8%',  size: 110, delay: 0,    dur: 7 },
  { x: '88%', y: '12%', size: 75,  delay: 1.8,  dur: 9 },
  { x: '48%', y: '40%', size: 55,  delay: 0.7,  dur: 11 },
  { x: '76%', y: '65%', size: 95,  delay: 2.5,  dur: 8 },
  { x: '14%', y: '72%', size: 85,  delay: 1.2,  dur: 10 },
  { x: '93%', y: '50%', size: 45,  delay: 0.4,  dur: 13 },
  { x: '32%', y: '88%', size: 65,  delay: 3.1,  dur: 7.5 },
  { x: '62%', y: '22%', size: 50,  delay: 1.5,  dur: 12 },
]

// SVG de coração simples
function HeartSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21.593c-5.63-5.539-11-10.297-11-14.402
           C1 4.199 4.18 2 7.41 2c1.98 0 3.861.897 4.59 2.187
           C12.73 2.897 14.61 2 16.59 2 19.82 2 23 4.199 23 7.191
           c0 4.105-5.37 8.863-11 14.402Z"
        fill="#E50914"
      />
    </svg>
  )
}

export default function HeartWatermark() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {HEARTS.map((h, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: h.x, top: h.y, opacity: 0.05 }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: h.dur,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <HeartSvg size={h.size} />
        </motion.div>
      ))}
    </div>
  )
}
