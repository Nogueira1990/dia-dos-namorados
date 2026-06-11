import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import { lugares } from '../data/historia'

// Corrige bug do leaflet com bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const criarIcone = (cor: string, size = 30) =>
  L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px; height:${size}px; border-radius:50%;
      background:${cor}; border:3px solid white;
      box-shadow:0 0 12px ${cor}99;
      display:flex; align-items:center; justify-content:center;
      font-size:${size * 0.45}px;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  })

const icones: Record<string, ReturnType<typeof criarIcone>> = {
  origem:   criarIcone('#E50914', 34),
  viagem:   criarIcone('#4ADE80', 28),
  especial: criarIcone('#60A5FA', 28),
  futuro:   criarIcone('#FBBF24', 36),
}

const emojis: Record<string, string> = {
  origem: '❤️',
  viagem: '🗺️',
  especial: '⭐',
  futuro: '✈️',
}

export default function MapSection() {
  useEffect(() => {}, [])

  const polylinePoints = lugares
    .filter(l => l.tipo !== 'futuro')
    .map(l => [l.lat, l.lng] as [number, number])

  return (
    <motion.section
      id="mapa"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4 md:px-16 bg-[#0a0a0a]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bebas text-white tracking-wide mb-2">
            Por Onde Passamos
          </h2>
          <p className="text-white/50 text-sm">
            Cada ponto marcado é um pedaço da nossa história.
          </p>
        </motion.div>

        {/* Legenda */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {[
            { cor: '#E50914', label: 'Onde tudo começou' },
            { cor: '#4ADE80', label: 'Viagens' },
            { cor: '#60A5FA', label: 'Momentos especiais' },
            { cor: '#FBBF24', label: 'Próxima aventura' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: item.cor }} />
              <span className="text-white/60 text-xs">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Mapa */}
        <div className="rounded-xl overflow-hidden border border-white/10" style={{ height: 460 }}>
          <MapContainer
            center={[-18, -47]}
            zoom={4}
            style={{ height: '100%', width: '100%', background: '#1a1a2e' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />

            {/* Linha conectando os pontos visitados */}
            <Polyline
              positions={polylinePoints}
              pathOptions={{ color: '#E50914', weight: 1.5, opacity: 0.4, dashArray: '6 4' }}
            />

            {/* Markers */}
            {lugares.map(lugar => (
              <Marker
                key={lugar.nome}
                position={[lugar.lat, lugar.lng]}
                icon={icones[lugar.tipo]}
              >
                <Popup className="nossaflix-popup">
                  <div style={{ minWidth: 200, fontFamily: 'Inter, sans-serif' }}>
                    <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>
                      {emojis[lugar.tipo]} {lugar.nome}
                    </div>
                    <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.5 }}>
                      {lugar.descricao}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <p className="text-center text-white/30 text-xs mt-4 italic">
          "Cada cidade que visitamos juntos ficou marcada em nós para sempre."
        </p>
      </div>
    </motion.section>
  )
}
