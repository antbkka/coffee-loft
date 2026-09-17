import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'
import { galleryImages } from '../data/menu'

export default function Gallery() {
  const [active, setActive] = useState(null)

  const next = () => setActive(i => (i + 1) % galleryImages.length)
  const prev = () => setActive(i => (i - 1 + galleryImages.length) % galleryImages.length)

  return (
    <PageTransition>
      <section className="pt-32 pb-12 bg-brick relative">
        <div className="absolute inset-0 bg-loft-black/95" />
        <div className="relative container-loft text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-subtitle">Атмосфера в деталях</div>
            <h1 className="font-display text-6xl md:text-8xl text-loft-concrete leading-none mb-4">
              <span className="text-loft-copper">ГАЛЕРЕЯ</span>
            </h1>
            <p className="text-loft-smoke max-w-2xl mx-auto">
              Интерьер, кофе, латте-арт и эмоции гостей — в одном месте.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-loft-black">
        <div className="container-loft">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.5 }}
                onClick={() => setActive(i)}
                className={`group relative overflow-hidden cursor-pointer ${
                  i === 0 || i === 7 ? 'sm:col-span-2 lg:row-span-2 aspect-square' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-loft-black/40 group-hover:bg-loft-black/10 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-14 h-14 border-2 border-loft-concrete flex items-center justify-center text-loft-concrete text-xl">+</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 bg-loft-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <button onClick={() => setActive(null)} className="absolute top-5 right-5 text-loft-concrete hover:text-loft-copper transition-colors z-10">
              <FiX size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 md:left-8 text-loft-concrete hover:text-loft-copper transition-colors z-10"
            >
              <FiChevronLeft size={48} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 md:right-8 text-loft-concrete hover:text-loft-copper transition-colors z-10"
            >
              <FiChevronRight size={48} />
            </button>
            <motion.img
              key={active}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={galleryImages[active].src}
              alt={galleryImages[active].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[85vh] object-contain border-2 border-loft-copper"
            />
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-loft-smoke uppercase tracking-widest text-sm">
              {active + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}