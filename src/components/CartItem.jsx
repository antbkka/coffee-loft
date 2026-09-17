import { motion } from 'framer-motion'
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

/**
 * Элемент корзины — вынесен из Cart.jsx для переиспользования.
 */
export default function CartItem({ item, index = 0 }) {
  const { updateQty, removeItem } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.05 }}
      className="flex gap-4 p-4 bg-loft-dark border border-loft-steel"
    >
      <img src={item.image} alt={item.name} className="w-20 h-20 md:w-28 md:h-28 object-cover" />
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-xl text-loft-concrete truncate">{item.name}</h3>
        <p className="text-loft-smoke text-xs line-clamp-2 mb-3 hidden md:block">{item.description}</p>
        <div className="text-loft-copper font-bold">{item.price} ₽</div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(item.id)}
          className="text-loft-smoke hover:text-red-500 transition-colors"
          aria-label="Удалить"
        >
          <FiTrash2 size={18} />
        </button>
        <div className="flex items-center border border-loft-gray">
          <button
            onClick={() => updateQty(item.id, item.qty - 1)}
            className="w-8 h-8 flex items-center justify-center text-loft-concrete hover:bg-loft-copper hover:text-loft-black transition-colors"
          >
            <FiMinus size={14} />
          </button>
          <span className="w-10 text-center text-loft-concrete font-semibold">{item.qty}</span>
          <button
            onClick={() => updateQty(item.id, item.qty + 1)}
            className="w-8 h-8 flex items-center justify-center text-loft-concrete hover:bg-loft-copper hover:text-loft-black transition-colors"
          >
            <FiPlus size={14} />
          </button>
        </div>
        <div className="text-loft-concrete font-bold">{item.price * item.qty} ₽</div>
      </div>
    </motion.div>
  )
}