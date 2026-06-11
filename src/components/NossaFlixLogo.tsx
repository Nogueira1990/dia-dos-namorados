interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  sm:  { fontSize: '1.6rem',  shadowBlur: 16 },
  md:  { fontSize: '2.4rem',  shadowBlur: 24 },
  lg:  { fontSize: '5rem',    shadowBlur: 48 },
  xl:  { fontSize: '8rem',    shadowBlur: 80 },
}

export default function NossaFlixLogo({ size = 'md', className = '' }: Props) {
  const { fontSize, shadowBlur } = sizes[size]

  return (
    <span
      className={`select-none inline-block ${className}`}
      style={{
        fontFamily: 'Anton, sans-serif',
        fontSize,
        color: '#E50914',
        letterSpacing: '-0.02em',
        lineHeight: 1,
        textTransform: 'uppercase',
        // Sombra projetada + brilho vermelho característico
        textShadow: [
          `0 2px 4px rgba(0,0,0,0.9)`,
          `0 0 ${shadowBlur}px rgba(229,9,20,0.45)`,
          `0 4px ${shadowBlur * 0.8}px rgba(229,9,20,0.2)`,
        ].join(', '),
        // Leve perspectiva para simular o ângulo do logo Netflix
        transform: 'perspective(300px) rotateX(2deg)',
        transformOrigin: 'center bottom',
      }}
    >
      NossaFlix
    </span>
  )
}
