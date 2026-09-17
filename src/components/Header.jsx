import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingBag, FiMenu, FiX } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const nav = [
  { to: '/', label: 'Главная' },
  { to: '/menu', label: 'Меню' },
  { to: '/about', label: 'О нас' },
  { to: '/gallery', label: 'Галерея' },
  { to: '/booking', label: 'Бронирование' },
  { to: '/contacts', label: 'Контакты' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { totalCount } = useCart()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-loft-black/95 backdrop-blur-md border-b border-loft-steel' : 'bg-transparent'}`}>
      <div className="container-loft flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 border-2 border-loft-copper flex items-center justify-center text-loft-copper font-display text-2xl group-hover:bg-loft-copper group-hover:text-loft-black transition-all duration-300">B</div>
          <div className="leading-none">
            <div className="font-display text-2xl text-loft-concrete tracking-widest">BLACK ROAST</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-loft-copper">Лофт кофейня</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `relative px-4 py-2 text-sm uppercase tracking-wider transition-colors ${isActive ? 'text-loft-copper' : 'text-loft-concrete hover:text-loft-copper'}`}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span layoutId="nav-underline" className="absolute bottom-0 left-4 right-4 h-0.5 bg-loft-copper" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-3 text-loft-concrete hover:text-loft-copper transition-colors">
            <FiShoppingBag size={22} />
            {totalCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 bg-loft-copper text-loft-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {totalCount}
              </motion.span>
            )}
          </Link>

          <button onClick={() => setOpen(true)} className="lg:hidden p-3 text-loft-concrete">
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 bg-loft-black z-50 flex flex-col"
          >
            <div className="container-loft flex items-center justify-between h-20">
              <span className="font-display text-2xl text-loft-concrete">МЕНЮ</span>
              <button onClick={() => setOpen(false)} className="p-3 text-loft-concrete">
                <FiX size={28} />
              </button>
            </div>
            <div className="divider-copper mx-8" />
            <nav className="flex flex-col container-loft py-8 gap-2">
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `block py-4 font-display text-4xl border-b border-loft-steel ${isActive ? 'text-loft-copper' : 'text-loft-concrete'}`}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}