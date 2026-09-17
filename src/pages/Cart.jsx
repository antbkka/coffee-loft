import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiTruck, FiHome, FiArrowLeft } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import PageTransition from '../components/PageTransition'
import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'

// === Zod-схема для оформления заказа ===
const checkoutSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z
    .string()
    .min(1, 'Введите телефон')
    .regex(/^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/, 'Формат: +7 (XXX) XXX-XX-XX'),
  address: z.string().optional(),
})

const formatPhone = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  const d = digits.startsWith('7') ? digits : '7' + digits.replace(/^7/, '')
  let out = '+7'
  if (d.length > 1) out += ' (' + d.slice(1, 4)
  if (d.length >= 5) out += ') ' + d.slice(4, 7)
  if (d.length >= 8) out += '-' + d.slice(7, 9)
  if (d.length >= 10) out += '-' + d.slice(9, 11)
  return out
}

export default function Cart() {
  const { items, clearCart, totalPrice, totalCount } = useCart()
  const [step, setStep] = useState('cart') // cart | checkout | done
  const [delivery, setDelivery] = useState('pickup')
  const [order, setOrder] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      checkoutSchema.superRefine((data, ctx) => {
        // Кастомная проверка: адрес обязателен только при доставке
        if (delivery === 'delivery' && (!data.address || data.address.trim().length < 5)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['address'],
            message: 'Введите адрес доставки (минимум 5 символов)',
          })
        }
      })
    ),
    defaultValues: { name: '', phone: '', address: '' },
  })

  const phoneValue = watch('phone')

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 600))
    setOrder({ ...data, delivery, totalPrice: totalPrice + (delivery === 'delivery' ? 250 : 0) })
    setStep('done')
    setTimeout(() => clearCart(), 300)
    toast.success('Заказ оформлен!', {
      iconTheme: { primary: '#b87333', secondary: '#0d0d0d' },
      duration: 3500,
    })
  }

  if (step === 'done' && order) {
    return (
      <PageTransition>
        <section className="min-h-[80vh] flex items-center justify-center bg-loft-black py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-loft-dark border-2 border-loft-copper p-10 md:p-14 text-center max-w-xl mx-5"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-6 bg-loft-copper text-loft-black flex items-center justify-center rounded-full"
            >
              <FiCheck size={48} />
            </motion.div>
            <h1 className="font-display text-5xl text-loft-concrete mb-4">ЗАКАЗ <span className="text-loft-copper">ОФОРМЛЕН</span></h1>
            <p className="text-loft-smoke mb-2">Спасибо, {order.name}!</p>
            <p className="text-loft-smoke mb-8 text-sm">
              {order.delivery === 'pickup' ? 'Заберите заказ через 30 минут по адресу ул. Лофт-стилей, 14.' : `Доставим по адресу: ${order.address} в течение 60 минут.`}
            </p>
            <div className="bg-loft-black/50 p-4 mb-8 text-sm">
              <div className="flex justify-between mb-2"><span className="text-loft-smoke">Сумма заказа:</span><span className="text-loft-copper font-bold">{order.totalPrice} ₽</span></div>
              <div className="flex justify-between"><span className="text-loft-smoke">Тип:</span><span className="text-loft-copper">{order.delivery === 'pickup' ? 'Самовывоз' : 'Доставка'}</span></div>
            </div>
            <Link to="/" onClick={() => setStep('cart')} className="btn-primary">На главную</Link>
          </motion.div>
        </section>
      </PageTransition>
    )
  }

  if (items.length === 0) {
    return (
      <PageTransition>
        <section className="min-h-[70vh] flex items-center justify-center bg-loft-black py-20">
          <div className="text-center px-5">
            <div className="font-display text-8xl text-loft-copper mb-6 opacity-50">∅</div>
            <h1 className="font-display text-5xl text-loft-concrete mb-4">КОРЗИНА <span className="text-loft-copper">ПУСТА</span></h1>
            <p className="text-loft-smoke mb-8 max-w-md mx-auto">Добавьте кофе, десерт или завтрак из нашего меню.</p>
            <Link to="/menu" className="btn-primary">Перейти в меню</Link>
          </div>
        </section>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <section className="pt-32 pb-12 bg-brick relative">
        <div className="absolute inset-0 bg-loft-black/95" />
        <div className="relative container-loft">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-subtitle">Ваш заказ</div>
            <h1 className="font-display text-6xl md:text-8xl text-loft-concrete leading-none">
              <span className="text-loft-copper">КОРЗИНА</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section bg-loft-black">
        <div className="container-loft">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {step === 'cart' && (
                <>
                  <AnimatePresence>
                    {items.map((item, i) => <CartItem key={item.id} item={item} index={i} />)}
                  </AnimatePresence>

                  <div className="flex justify-between items-center pt-4">
                    <Link to="/menu" className="text-loft-copper hover:text-loft-amber transition-colors flex items-center gap-2 text-sm uppercase tracking-wider">
                      <FiArrowLeft /> В меню
                    </Link>
                    <button onClick={clearCart} className="text-loft-smoke hover:text-red-500 text-sm uppercase tracking-wider transition-colors">
                      Очистить всё
                    </button>
                  </div>
                </>
              )}

              {step === 'checkout' && (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-loft-dark border border-loft-steel p-7 md:p-9"
                  noValidate
                >
                  <h2 className="font-display text-3xl text-loft-concrete mb-6">ОФОРМЛЕНИЕ</h2>

                  <div className="mb-6">
                    <div className="label-loft">Способ получения</div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'pickup', Icon: FiHome, label: 'Самовывоз', sub: 'Готов через 30 мин' },
                        { id: 'delivery', Icon: FiTruck, label: 'Доставка', sub: '60 минут · от 250 ₽' },
                      ].map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDelivery(opt.id)}
                          className={`p-4 border-2 text-left transition-all ${
                            delivery === opt.id ? 'border-loft-copper bg-loft-copper/10' : 'border-loft-gray hover:border-loft-concrete'
                          }`}
                        >
                          <opt.Icon className={`mb-2 ${delivery === opt.id ? 'text-loft-copper' : 'text-loft-concrete'}`} size={22} />
                          <div className="text-loft-concrete font-semibold uppercase tracking-wider text-sm">{opt.label}</div>
                          <div className="text-loft-smoke text-xs">{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="label-loft">Имя</label>
                      <input
                        type="text"
                        {...register('name')}
                        className={`input-loft ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Иван Петров"
                      />
                      {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>}
                    </div>
                    <div>
                      <label className="label-loft">Телефон</label>
                      <input
                        type="tel"
                        value={phoneValue}
                        onChange={(e) => setValue('phone', formatPhone(e.target.value), { shouldValidate: true })}
                        className={`input-loft ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="+7 (___) ___-__-__"
                      />
                      {errors.phone && <span className="text-red-400 text-xs mt-1 block">{errors.phone.message}</span>}
                    </div>
                  </div>

                  {delivery === 'delivery' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <label className="label-loft">Адрес доставки</label>
                      <input
                        type="text"
                        {...register('address')}
                        className={`input-loft ${errors.address ? 'border-red-500' : ''}`}
                        placeholder="ул. Лермонтова, 5, кв. 12"
                      />
                      {errors.address && <span className="text-red-400 text-xs mt-1 block">{errors.address.message}</span>}
                    </motion.div>
                  )}

                  <div className="flex gap-3 mt-7">
                    <button type="button" onClick={() => setStep('cart')} className="btn-outline flex-1">
                      <FiArrowLeft /> Назад
                    </button>
                    <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Оформляем...' : 'Подтвердить заказ'}
                    </button>
                  </div>
                </motion.form>
              )}
            </div>

            {/* Summary */}
            <aside className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-loft-dark border border-loft-steel p-6 lg:sticky lg:top-28"
              >
                <h3 className="font-display text-2xl text-loft-concrete mb-5">ИТОГО</h3>
                <div className="space-y-3 mb-5 text-sm">
                  <div className="flex justify-between text-loft-smoke">
                    <span>Позиций:</span><span className="text-loft-concrete">{totalCount}</span>
                  </div>
                  <div className="flex justify-between text-loft-smoke">
                    <span>Товары:</span><span className="text-loft-concrete">{totalPrice} ₽</span>
                  </div>
                  {delivery === 'delivery' && (
                    <div className="flex justify-between text-loft-smoke">
                      <span>Доставка:</span><span className="text-loft-concrete">250 ₽</span>
                    </div>
                  )}
                  <div className="divider-copper" />
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span className="text-loft-concrete">К оплате:</span>
                    <span className="text-loft-copper">
                      {delivery === 'delivery' ? totalPrice + 250 : totalPrice} ₽
                    </span>
                  </div>
                </div>

                {step === 'cart' && (
                  <button onClick={() => setStep('checkout')} className="btn-primary w-full">
                    Оформить заказ
                  </button>
                )}

                <p className="text-loft-smoke text-xs mt-4 text-center leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
                </p>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}