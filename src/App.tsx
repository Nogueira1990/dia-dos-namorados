import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

import IntroAnimation from './components/IntroAnimation'
import ProfileSelection, { type ProfileName } from './components/ProfileSelection'
import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import Carousel from './components/Carousel'
import PhotoModal from './components/PhotoModal'
import Dashboard from './components/Dashboard'
import MapSection from './components/MapSection'
import Timeline from './components/Timeline'
import WelcomeBanner from './components/WelcomeBanner'
import LoveDivider from './components/LoveDivider'
import HeartWatermark from './components/HeartWatermark'
import NossaFlixLogo from './components/NossaFlixLogo'

import { fotos, categorias } from './data/historia'
import type { Foto } from './data/historia'

type AppPhase = 'intro' | 'profiles' | 'home'

// 8 frases originais — tom de tagline de filme, elegante, sem meloso demais
const FRASES_AMOR = [
  'Cada foto guarda uma história. Cada história traz um motivo a mais para sorrir.',
  'Nem dois anos de distância foram capazes de diminuir o que construímos.',
  'De Campo Mourão a Bady Bassitt — todo caminho valeu a pena.',
  'Thor já sabia desde o início. Cachorros têm esse faro.',
  'Você não é apenas a mulher da minha vida. É a razão de eu querer fazer dela algo ainda melhor.',
  'A saudade foi cruel. Mas voltamos mais fortes toda vez.',
  'Trinta anos seus — e o melhor capítulo ainda está sendo escrito.',
  'A próxima cena: Maragogi, e o céu pela primeira vez.',
]

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('intro')
  const [profileName, setProfileName] = useState<ProfileName>('Viviane')
  const [saudacao, setSaudacao] = useState('')
  const [showWelcome, setShowWelcome] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<Foto | null>(null)
  const [activeSection, setActiveSection] = useState('home')

  const heroFoto = fotos.find(f => f.id === 41) ?? fotos[0]
  const fotosPorCategoria = (catId: string) =>
    fotos.filter(f => f.categorias.includes(catId))

  const handleProfileSelect = (name: ProfileName, msg: string) => {
    setProfileName(name)
    setSaudacao(msg)
    setPhase('home')
    setShowWelcome(true)
    setTimeout(() => setShowWelcome(false), 4500)
  }

  useEffect(() => {
    const sections = ['home', 'timeline', 'dashboard', 'mapa']
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [phase])

  return (
    <div className="min-h-screen bg-netflix-dark font-inter">
      {phase === 'intro' && (
        <IntroAnimation onComplete={() => setPhase('profiles')} />
      )}

      <AnimatePresence>
        {phase === 'profiles' && (
          <motion.div
            key="profiles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
          >
            <ProfileSelection onSelect={handleProfileSelect} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {showWelcome && (
              <WelcomeBanner
                profileName={profileName}
                saudacao={saudacao}
                onDismiss={() => setShowWelcome(false)}
              />
            )}

            <Navbar
              profileName={profileName}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />

            {/* HERO */}
            <section id="home">
              <HeroBanner foto={heroFoto} onInfo={setSelectedPhoto} />
            </section>

            {/* CARROSSÉIS com frases intercaladas */}
            <div className="relative mt-2 pb-4">
              {/* Corações marca d'água na seção dos carrosséis */}
              <div className="relative">
                <HeartWatermark />
                <div className="relative" style={{ zIndex: 1 }}>
                  <LoveDivider frase={FRASES_AMOR[0]} />

                  <Carousel
                    titulo={categorias[0].titulo}
                    fotos={fotosPorCategoria(categorias[0].id)}
                    onPhotoClick={setSelectedPhoto}
                  />

                  <LoveDivider frase={FRASES_AMOR[1]} />

                  <Carousel
                    titulo={categorias[1].titulo}
                    fotos={fotosPorCategoria(categorias[1].id)}
                    onPhotoClick={setSelectedPhoto}
                  />

                  <LoveDivider frase={FRASES_AMOR[2]} />

                  <Carousel
                    titulo={categorias[2].titulo}
                    fotos={fotosPorCategoria(categorias[2].id)}
                    onPhotoClick={setSelectedPhoto}
                  />

                  <LoveDivider frase={FRASES_AMOR[3]} />

                  <Carousel
                    titulo={categorias[3].titulo}
                    fotos={fotosPorCategoria(categorias[3].id)}
                    onPhotoClick={setSelectedPhoto}
                  />

                  <LoveDivider frase={FRASES_AMOR[4]} />

                  <Carousel
                    titulo={categorias[4].titulo}
                    fotos={fotosPorCategoria(categorias[4].id)}
                    onPhotoClick={setSelectedPhoto}
                  />

                  <LoveDivider frase={FRASES_AMOR[5]} />

                  <Carousel
                    titulo={categorias[5].titulo}
                    fotos={fotosPorCategoria(categorias[5].id)}
                    onPhotoClick={setSelectedPhoto}
                  />

                  <LoveDivider frase={FRASES_AMOR[6]} />
                </div>
              </div>
            </div>

            {/* TIMELINE */}
            <section id="timeline" className="relative">
              <HeartWatermark />
              <div className="relative" style={{ zIndex: 1 }}>
                <Timeline />
              </div>
            </section>

            <LoveDivider frase="Cada número abaixo representa um dia, uma hora, um minuto ao seu lado." />

            {/* DASHBOARD */}
            <section id="dashboard">
              <Dashboard />
            </section>

            <LoveDivider frase={FRASES_AMOR[7]} />

            {/* MAPA */}
            <section id="mapa">
              <MapSection />
            </section>

            {/* RODAPÉ */}
            <footer className="relative py-14 px-4 text-center border-t border-white/5 overflow-hidden">
              <HeartWatermark />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
                style={{ zIndex: 1 }}
              >
                <NossaFlixLogo size="lg" className="mb-4" />
                <div className="flex items-center justify-center gap-2 mb-5">
                  <Heart size={14} className="text-netflix-red fill-netflix-red" />
                  <p className="text-white/70 text-sm">
                    Para a mulher que eu escolhi viver e conviver — com todo o amor! ❤️
                  </p>
                  <Heart size={14} className="text-netflix-red fill-netflix-red" />
                </div>
                <p className="text-white/30 text-xs max-w-md mx-auto leading-relaxed">
                  "Você é uma das maiores certezas da minha vida. Admiro sua força, 
                  sua inteligência, sua dedicação e a forma como você torna tudo ao seu redor melhor. 
                  Entre todos os sonhos que tenho para o futuro, o mais importante é simples: viver cada 
                  etapa ao seu lado, construir nossa família, criar nossos filhos juntos e envelhecer 
                  tendo você como minha companheira de vida."
                </p>
                <p className="text-white/18 text-xs mt-8">
                  Feito com ❤️ por Alexandre · Dia dos Namorados 2026
                </p>
              </motion.div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <PhotoModal foto={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  )
}
