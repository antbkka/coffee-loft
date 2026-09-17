import { motion } from 'framer-motion'
import { FiPlus, FiCheck } from 'react-icons/fi'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  // Сам toast показывается внутри CartContext.addItem — здесь только визуальная обратная связь на кнопке
  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group relative bg-loft-dark border border-loft-steel hover:border-loft-copper overflow-hidden transition-all duration-500 flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-loft-black shrink-0">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-loft-black via-transparent to-transparent opacity-60" />
        {product.popular && (
          <div className="absolute top-3 left-3 bg-loft-copper text-loft-black text-[10px] font-bold uppercase tracking-widest px-3 py-1">
            Хит
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-2xl text-loft-concrete mb-2 tracking-wide">{product.name}</h3>
        <p className="text-loft-smoke text-sm leading-relaxed mb-5 line-clamp-3 flex-1">{product.description}</p>

        <div className="flex items-center justify-between gap-4 mt-auto pt-4 border-t border-loft-steel">
          <span className="text-loft-copper font-display text-2xl whitespace-nowrap">
            {product.price} <span className="text-base text-loft-smoke">₽</span>
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 text-sm uppercase tracking-widest font-semibold transition-all duration-300 ${
              added
                ? 'bg-green-700 text-white'
                : 'bg-loft-copper text-loft-black hover:bg-loft-amber hover:shadow-[0_0_25px_rgba(232,154,74,0.4)]'
            }`}
          >
            {added ? <><FiCheck size={16} /> Добавлено</> : <><FiPlus size={16} /> В корзину</>}
          </button>
        </div>
      </div>
    </motion.article>
  )
}