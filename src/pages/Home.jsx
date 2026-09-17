import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { FiArrowRight, FiCoffee, FiAward, FiHome, FiTruck } from 'react-icons/fi'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import PageTransition from '../components/PageTransition'
import ServiceCard from '../components/ServiceCard'
import ProductCard from '../components/ProductCard'
import { menuItems, reviews } from '../data/menu'

const marqueeItems = [
  '☕ СКИДКА 20% НА ПЕРВЫЙ ЗАКАЗ',
  '🚚 БЕСПЛАТНАЯ ДОСТАВКА ОТ 1500 ₽',
  '🎁 КАЖДЫЙ ПЯТЫЙ КРУАССАН В ПОДАРОК',
  '🔥 НОВАЯ ОБЖАРКА КАЖДЫЕ 7 ДНЕЙ',
  '💳 КЭШБЭК 10% БАЛЛАМИ',
]

const services = [
  { icon: FiCoffee, title: 'Своя обжарка', description: 'Зерно обжаривается каждую неделю на нашем ростере. Только specialty grade.' },
  { icon: FiAward, title: 'Свежая выпечка', description: 'Круассаны, десерты и завтраки готовятся каждое утро с нуля.' },
  { icon: FiHome, title: 'Уютный лофт', description: 'Кирпичные стены, медные акценты и винтажный свет — место с характером.' },
  { icon: FiTruck, title: 'Быстрая доставка', description: 'Доставим горячий кофе за 45 минут в термосумке по всему центру.' },
]

export default function Home() {
  const popular = menuItems.filter(i => i.popular).slice(0, 6)

  return (
    <PageTransition>
      {/* HERO — фон: витрина кофейни с вывеской */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden noise">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1920&q=85)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-loft-black/85 via-loft-black/60 to-loft-black" />
        <div className="absolute inset-0 bg-brick opacity-20" />

        {/* Плавный градиент снизу вверх — от низа hero (полосы акций) к подзаголовку */}
        <div
          className="absolute inset-x-0 bottom-0 h-[80%] pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.95) 15%, rgba(10,10,10,0.75) 35%, rgba(10,10,10,0.45) 55%, rgba(10,10,10,0.15) 80%, rgba(10,10,10,0) 100%)',
          }}
        />
        {/* Дополнительный мягкий слой для совсем плавного перехода в верхней части */}
        <div
          className="absolute inset-x-0 bottom-0 h-full pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,0.05) 60%, rgba(10,10,10,0) 85%)',
          }}
        />

        <div className="relative container-loft z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6 px-5 py-2 border border-loft-copper text-loft-copper text-xs uppercase tracking-[0.4em]"
          >
            Specialty кофе · Лофт атмосфера
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-loft-concrete leading-[0.95] mb-6"
          >
            ЧЕРНЫЙ <span className="text-loft-copper">РОАСТ</span>
            <br />
            <span className="text-stroke">КОФЕЙНЯ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-loft-smoke text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
          >
            Уникальное место, где индустриальный шик лофта встречается с ароматом свежеобжаренного specialty кофе.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/menu" className="btn-primary">
              Смотреть меню <FiArrowRight />
            </Link>
            <Link to="/booking" className="btn-outline">
              Забронировать столик
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-7 h-12 border-2 border-loft-copper flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-loft-copper"
            />
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="bg-loft-copper text-loft-black py-5 overflow-hidden border-y-2 border-loft-amber">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex items-center">
              {marqueeItems.map((item, i) => (
                <span key={`${j}-${i}`} className="mx-8 font-display text-2xl md:text-3xl tracking-widest">
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section relative bg-brick">
        <div className="absolute inset-0 bg-loft-black/95" />
        <div className="relative container-loft">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="section-subtitle">Почему мы</div>
            <h2 className="section-title">НАШИ <span className="text-loft-copper">ПРЕИМУЩЕСТВА</span></h2>
            <div className="divider-copper w-32 mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="section bg-loft-black">
        <div className="container-loft">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="section-subtitle">Любимое гостями</div>
              <h2 className="section-title">ПОПУЛЯРНЫЕ <span className="text-loft-copper">ПОЗИЦИИ</span></h2>
            </motion.div>
            <Link to="/menu" className="btn-outline">Всё меню <FiArrowRight /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {popular.map((item, i) => (
              <div key={item.id} className="h-full flex">
                <ProductCard product={item} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section relative bg-brick">
        <div className="absolute inset-0 bg-loft-dark/95" />
        <div className="relative container-loft">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="section-subtitle">Что говорят гости</div>
            <h2 className="section-title">ОТЗЫВЫ</h2>
          </motion.div>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="!pb-14"
          >
            {reviews.map(r => (
              <SwiperSlide key={r.id} className="h-auto">
                <div className="bg-loft-black/70 backdrop-blur-sm border border-loft-steel p-7 h-full flex flex-col">
                  <FaQuoteLeft className="text-loft-copper mb-4" size={28} />
                  <p className="text-loft-concrete leading-relaxed mb-6 flex-1">"{r.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-loft-steel">
                    <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full border-2 border-loft-copper object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold text-loft-concrete">{r.name}</div>
                      <div className="flex gap-0.5">
                        {[...Array(r.rating)].map((_, i) => <FaStar key={i} className="text-loft-amber" size={12} />)}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA — фон: кирпичная стена с лампами, чтобы не дублировать hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1920&q=85)' }}
        />
        <div className="absolute inset-0 bg-loft-black/80" />
        <div className="relative container-loft text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="section-subtitle">Приходите в гости</div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-loft-concrete mb-6 leading-none">
              ЗАБРОНИРОВАТЬ <span className="text-loft-copper">СТОЛИК</span>
            </h2>
            <p className="text-loft-smoke text-lg max-w-2xl mx-auto mb-10">
              Гарантируем уютное место в самом сердце лофта. Просто выберите дату и время — мы позаботимся обо всём остальном.
            </p>
            <Link to="/booking" className="btn-primary text-lg px-10 py-4 animate-glow">
              Забронировать сейчас <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}