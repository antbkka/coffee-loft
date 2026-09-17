import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ProductCard from '../components/ProductCard'
import { menuItems, categories } from '../data/menu'
import { FiSearch } from 'react-icons/fi'

export default function Menu() {
  const [active, setActive] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return menuItems.filter(item => {
      const matchCat = active === 'all' || item.category === active
      const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [active, search])

  return (
    <PageTransition>
      <section className="pt-32 pb-12 bg-brick relative">
        <div className="absolute inset-0 bg-loft-black/95" />
        <div className="relative container-loft text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-subtitle">Что мы готовим</div>
            <h1 className="font-display text-6xl md:text-8xl text-loft-concrete leading-none mb-4">
              НАШЕ <span className="text-loft-copper">МЕНЮ</span>
            </h1>
            <p className="text-loft-smoke max-w-2xl mx-auto">
              Specialty кофе, авторский чай, домашние десерты и завтраки из локальных продуктов.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-20 z-30 bg-loft-black/95 backdrop-blur-md border-y border-loft-steel py-5">
        <div className="container-loft flex flex-col md:flex-row gap-5 items-center justify-between">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`relative px-5 py-2 text-sm uppercase tracking-wider font-semibold transition-colors ${
                  active === cat.id ? 'text-loft-black' : 'text-loft-concrete hover:text-loft-copper'
                }`}
              >
                {active === cat.id && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 bg-loft-copper"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{cat.name}</span>
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <FiSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-loft-smoke" />
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-loft pl-10 py-2 text-sm"
            />
          </div>
        </div>
      </section>

      <section className="relative bg-loft-black pb-0">
        <div className="container-loft section">
          <AnimatePresence mode="wait">
            <motion.div
              key={active + search}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            >
              {filtered.length === 0 ? (
                <div className="col-span-full text-center py-20 text-loft-smoke">
                  Ничего не найдено. Попробуйте другой запрос.
                </div>
              ) : (
                filtered.map((item, i) => (
                  <div key={item.id} className="h-full flex">
                    <ProductCard product={item} index={i} />
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Плавный градиент от прозрачного к чёрному — мягкий переход к футеру */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-loft-black"
        />
      </section>
    </PageTransition>
  )
}