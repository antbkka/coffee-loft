import { motion } from 'framer-motion'
import { FiMapPin, FiNavigation } from 'react-icons/fi'

/**
 * Заглушка карты вместо Leaflet.
 * Показывает фоновое изображение (стилизованная карта/вид города),
 * маркер по центру с адресом и кнопкой «Открыть в Яндекс.Картах».
 */
export default function MapStub({ address, hint, yandexUrl }) {
  return (
    <div className="relative h-full w-full overflow-hidden border-2 border-loft-steel group">
      {/* Фоновое изображение — стилизованный «вид сверху» */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80)',
        }}
      />
      {/* Затемнение для контраста */}
      <div className="absolute inset-0 bg-loft-black/55" />
      <div className="absolute inset-0 bg-brick opacity-30" />

      {/* Маркер + пульсация */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <span className="absolute inset-0 -m-6 rounded-full bg-loft-copper/30 animate-ping" />
          <span className="absolute inset-0 -m-3 rounded-full bg-loft-copper/40 animate-ping" style={{ animationDelay: '0.4s' }} />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            className="relative w-14 h-14 rounded-full bg-loft-copper text-loft-black flex items-center justify-center shadow-[0_0_30px_rgba(232,154,74,0.6)]"
          >
            <FiMapPin size={28} />
          </motion.div>
        </div>
      </div>

      {/* Плашка с адресом */}
      <div className="absolute top-5 left-5 right-5 sm:right-auto sm:max-w-sm bg-loft-black/90 backdrop-blur-sm border border-loft-copper p-4">
        <div className="flex items-center gap-2 text-loft-copper text-xs uppercase tracking-widest mb-2">
          <FiMapPin /> Локация
        </div>
        <div className="text-loft-concrete font-display text-xl">{address}</div>
        {hint && <div className="text-loft-smoke text-xs mt-1">{hint}</div>}
      </div>

      {/* Кнопка «Открыть в Яндекс.Картах» */}
      <a
        href={yandexUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-5 right-5 inline-flex items-center gap-2 bg-loft-copper text-loft-black px-5 py-3 text-xs uppercase tracking-widest font-bold hover:bg-loft-amber transition-colors shadow-lg"
      >
        <FiNavigation size={16} /> Открыть в Яндекс.Картах
      </a>
    </div>
  )
}