import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiInstagram, FiTwitter, FiNavigation } from 'react-icons/fi'
import { FaTelegram, FaVk } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import PageTransition from '../components/PageTransition'
import MapStub from '../components/MapStub'

// === Zod-схема для формы обратной связи ===
const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Введите корректный email'),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
})

// Ссылка на Яндекс.Карты (текстовый поиск по адресу — работает без ключа API)
const YANDEX_MAPS_URL = 'https://yandex.ru/maps/?text=' + encodeURIComponent('г. Ростов-на-Дону, ул. Примерная, 1')

export default function Contacts() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  const onSubmit = async () => {
    // Имитация отправки
    await new Promise(r => setTimeout(r, 600))
    toast.success('Сообщение отправлено!', { iconTheme: { primary: '#b87333', secondary: '#0d0d0d' } })
    reset()
  }

  return (
    <PageTransition>
      <section className="pt-32 pb-12 bg-brick relative">
        <div className="absolute inset-0 bg-loft-black/95" />
        <div className="relative container-loft text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-subtitle">Приходите в гости</div>
            <h1 className="font-display text-6xl md:text-8xl text-loft-concrete leading-none mb-4">
              <span className="text-loft-copper">КОНТАКТЫ</span>
            </h1>
            <p className="text-loft-smoke max-w-2xl mx-auto">
              Мы всегда рады видеть вас в самом сердце лофта.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-loft-black">
        <div className="container-loft">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* === Карта-заглушка (вместо Leaflet) === */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[450px]"
            >
              <MapStub
                address="г. Ростов-на-Дону, ул. Примерная, 1"
                hint="5 минут от остановки «Центральная»"
                yandexUrl={YANDEX_MAPS_URL}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
              {[
                { Icon: FiMapPin, title: 'Адрес', text: 'г. Ростов-на-Дону, ул. Примерная, 1', sub: '2 этаж, вход с улицы' },
                { Icon: FiPhone, title: 'Телефон', text: '+7 (863) 777-88-99', sub: 'Ежедневно с 8:00 до 23:00' },
                { Icon: FiMail, title: 'Email', text: 'hello@blackroast.ru', sub: 'Для заявок и предложений' },
                { Icon: FiClock, title: 'Часы работы', text: 'Пн-Пт: 8:00 — 23:00', sub: 'Сб-Вс: 9:00 — 00:00' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-5 bg-loft-dark border border-loft-steel hover:border-loft-copper transition-colors group"
                >
                  <div className="w-12 h-12 border border-loft-copper text-loft-copper flex items-center justify-center group-hover:bg-loft-copper group-hover:text-loft-black transition-colors shrink-0">
                    <item.Icon size={20} />
                  </div>
                  <div>
                    <div className="text-loft-smoke text-xs uppercase tracking-widest">{item.title}</div>
                    <div className="text-loft-concrete font-semibold mt-1">{item.text}</div>
                    <div className="text-loft-smoke text-xs mt-1">{item.sub}</div>
                  </div>
                </motion.div>
              ))}

              <div className="p-5 bg-loft-dark border border-loft-steel">
                <div className="text-loft-smoke text-xs uppercase tracking-widest mb-3">Соцсети</div>
                <div className="flex gap-2">
                  {[
                    { Icon: FiInstagram, label: 'IG' },
                    { Icon: FaTelegram, label: 'TG' },
                    { Icon: FaVk, label: 'VK' },
                    { Icon: FiTwitter, label: 'TW' },
                  ].map(({ Icon, label }) => (
                    <a key={label} href="#" aria-label={label} className="w-11 h-11 border border-loft-gray hover:border-loft-copper hover:bg-loft-copper hover:text-loft-black flex items-center justify-center text-loft-concrete transition-all">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* === Форма обратной связи с react-hook-form + zod === */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-loft-dark border border-loft-steel p-8 md:p-12 max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl text-loft-concrete mb-2">НАПИШИТЕ <span className="text-loft-copper">НАМ</span></h2>
            <p className="text-loft-smoke mb-8">Ответим в течение часа в рабочее время.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label-loft">Имя</label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`input-loft ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Ваше имя"
                  />
                  {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>}
                </div>
                <div>
                  <label className="label-loft">Email</label>
                  <input
                    type="email"
                    {...register('email')}
                    className={`input-loft ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="email@example.com"
                  />
                  {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
                </div>
              </div>
              <div>
                <label className="label-loft">Сообщение</label>
                <textarea
                  rows={5}
                  {...register('message')}
                  className={`input-loft resize-none ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="Ваше сообщение..."
                />
                {errors.message && <span className="text-red-400 text-xs mt-1 block">{errors.message.message}</span>}
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Отправляем...' : <><FiSend /> Отправить</>}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}