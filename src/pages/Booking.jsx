import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCalendar, FiClock, FiUser, FiPhone, FiMessageSquare, FiCheck, FiUsers } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format, isBefore, startOfDay } from 'date-fns'
import { ru } from 'date-fns/locale'
import toast from 'react-hot-toast'
import PageTransition from '../components/PageTransition'

// === Zod-схема для формы бронирования ===
const bookingSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z
    .string()
    .min(1, 'Введите телефон')
    .regex(/^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/, 'Формат: +7 (XXX) XXX-XX-XX'),
  date: z
    .string()
    .min(1, 'Выберите дату')
    .refine((val) => !isBefore(new Date(val), startOfDay(new Date())), 'Дата не может быть в прошлом'),
  time: z.string().min(1, 'Выберите время'),
  guests: z
    .number({ invalid_type_error: 'Укажите количество гостей' })
    .int('Должно быть целым числом')
    .min(1, 'Минимум 1 гость')
    .max(10, 'Максимум 10 гостей'),
  comment: z.string().optional(),
})

// Маска ввода телефона: +7 (XXX) XXX-XX-XX
const formatPhone = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  // всегда начинаем с 7
  const d = digits.startsWith('7') ? digits : '7' + digits.replace(/^7/, '')
  let out = '+7'
  if (d.length > 1) out += ' (' + d.slice(1, 4)
  if (d.length >= 5) out += ') ' + d.slice(4, 7)
  if (d.length >= 8) out += '-' + d.slice(7, 9)
  if (d.length >= 10) out += '-' + d.slice(9, 11)
  return out
}

export default function Booking() {
  const [submitted, setSubmitted] = useState(false)
  const [lastBooking, setLastBooking] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: '', phone: '', date: '', time: '', guests: 2, comment: '' },
  })

  const phoneValue = watch('phone')

  // Минимальная дата = сегодня (для input min)
  const today = format(startOfDay(new Date()), 'yyyy-MM-dd')

  const onSubmit = async (data) => {
    // Имитация отправки на сервер
    await new Promise(r => setTimeout(r, 600))
    setLastBooking(data)
    setSubmitted(true)
    toast.success('Столик забронирован!', {
      iconTheme: { primary: '#b87333', secondary: '#0d0d0d' },
      duration: 3500,
    })
  }

  const handleReset = () => {
    reset({ name: '', phone: '', date: '', time: '', guests: 2, comment: '' })
    setSubmitted(false)
    setLastBooking(null)
  }

  // Форматируем дату для подтверждения через date-fns
  const formattedDate = lastBooking?.date
    ? format(new Date(lastBooking.date), 'd MMMM yyyy', { locale: ru })
    : ''

  return (
    <PageTransition>
      <section className="pt-32 pb-12 bg-brick relative">
        <div className="absolute inset-0 bg-loft-black/95" />
        <div className="relative container-loft text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-subtitle">Столик в лофте</div>
            <h1 className="font-display text-6xl md:text-8xl text-loft-concrete leading-none mb-4">
              <span className="text-loft-copper">БРОНИРОВАНИЕ</span>
            </h1>
            <p className="text-loft-smoke max-w-2xl mx-auto">
              Забронируйте столик заранее и наслаждайтесь кофе без ожидания.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-loft-black">
        <div className="container-loft">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 hidden lg:block">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-full min-h-[500px]">
                <img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=85" alt="Интерьер" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-loft-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="font-display text-4xl text-loft-concrete mb-3">ВАШ ВЕЧЕР В BLACK ROAST</div>
                  <p className="text-loft-smoke text-sm">Уютная атмосфера, тёплый свет и лучший кофе — для встреч, работы и свиданий.</p>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {submitted && lastBooking ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-loft-dark border-2 border-loft-copper p-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-20 h-20 mx-auto mb-6 bg-loft-copper text-loft-black flex items-center justify-center rounded-full"
                    >
                      <FiCheck size={40} />
                    </motion.div>
                    <h2 className="font-display text-4xl text-loft-concrete mb-4">СТОЛИК ЗАБРОНИРОВАН!</h2>
                    <p className="text-loft-smoke mb-2">
                      {lastBooking.name}, мы ждём вас <span className="text-loft-copper">{formattedDate}</span> в <span className="text-loft-copper">{lastBooking.time}</span>
                    </p>
                    <p className="text-loft-smoke mb-6">
                      на <span className="text-loft-copper">{lastBooking.guests}</span> {lastBooking.guests === 1 ? 'гостя' : lastBooking.guests < 5 ? 'гостей' : 'гостей'}.
                    </p>
                    <p className="text-loft-smoke text-sm mb-8">
                      Подтверждение отправлено на номер <span className="text-loft-copper">{lastBooking.phone}</span>
                    </p>
                    <button onClick={handleReset} className="btn-outline">Новое бронирование</button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-loft-dark border border-loft-steel p-7 md:p-10"
                    noValidate
                  >
                    <h2 className="font-display text-3xl text-loft-concrete mb-6">Заполните форму</h2>

                    {/* Ряд 1: Имя + Телефон */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="label-loft flex items-center gap-2"><FiUser size={14} /> Имя</label>
                        <input
                          type="text"
                          {...register('name')}
                          className={`input-loft h-12 ${errors.name ? 'border-red-500' : ''}`}
                          placeholder="Иван Петров"
                        />
                        {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>}
                      </div>
                      <div>
                        <label className="label-loft flex items-center gap-2"><FiPhone size={14} /> Телефон</label>
                        <input
                          type="tel"
                          value={phoneValue}
                          onChange={(e) => setValue('phone', formatPhone(e.target.value), { shouldValidate: true })}
                          className={`input-loft h-12 ${errors.phone ? 'border-red-500' : ''}`}
                          placeholder="+7 (___) ___-__-__"
                        />
                        {errors.phone && <span className="text-red-400 text-xs mt-1 block">{errors.phone.message}</span>}
                      </div>
                    </div>

                    {/* Ряд 2: Дата + Время + Гости */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="label-loft flex items-center gap-2"><FiCalendar size={14} /> Дата</label>
                        <input
                          type="date"
                          min={today}
                          {...register('date')}
                          className={`input-loft h-12 ${errors.date ? 'border-red-500' : ''}`}
                        />
                        {errors.date && <span className="text-red-400 text-xs mt-1 block">{errors.date.message}</span>}
                      </div>
                      <div>
                        <label className="label-loft flex items-center gap-2"><FiClock size={14} /> Время</label>
                        <select
                          {...register('time')}
                          className={`input-loft h-12 ${errors.time ? 'border-red-500' : ''}`}
                        >
                          <option value="">Выберите</option>
                          {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        {errors.time && <span className="text-red-400 text-xs mt-1 block">{errors.time.message}</span>}
                      </div>
                      <div>
                        <label className="label-loft flex items-center gap-2"><FiUsers size={14} /> Гости</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          {...register('guests', { valueAsNumber: true })}
                          className={`input-loft h-12 ${errors.guests ? 'border-red-500' : ''}`}
                        />
                        {errors.guests && <span className="text-red-400 text-xs mt-1 block">{errors.guests.message}</span>}
                      </div>
                    </div>

                    {/* Ряд 3: Комментарий на всю ширину */}
                    <div className="mb-6">
                      <label className="label-loft flex items-center gap-2"><FiMessageSquare size={14} /> Комментарий</label>
                      <textarea
                        rows={4}
                        {...register('comment')}
                        className="input-loft resize-none"
                        placeholder="Детский стул, особые пожелания..."
                      />
                    </div>

                    {/* Кнопка на всю ширину */}
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-lg py-4 mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Отправляем...' : 'Подтвердить бронирование'}
                    </button>

                    <p className="text-loft-smoke text-xs mt-4 text-center">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}