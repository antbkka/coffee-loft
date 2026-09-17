import { Link } from 'react-router-dom'
import { FaInstagram, FaTelegram, FaVk, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative bg-loft-dark border-t-2 border-loft-brick bg-brick overflow-hidden">
      <div className="absolute inset-0 bg-loft-black/85" />
      <div className="relative container-loft py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 border-2 border-loft-copper flex items-center justify-center text-loft-copper font-display text-3xl">B</div>
              <div className="leading-none">
                <div className="font-display text-3xl text-loft-concrete tracking-widest">BLACK ROAST</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-loft-copper mt-1">Лофт кофейня</div>
              </div>
            </div>
            <p className="text-loft-smoke text-sm leading-relaxed">
              Specialty кофе в самом сердце города. Своя обжарка, авторские десерты и атмосфера настоящего индустриального лофта.
            </p>
          </div>

          <div>
            <h4 className="font-display text-2xl text-loft-concrete mb-5">Навигация</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Главная' },
                { to: '/menu', label: 'Меню' },
                { to: '/about', label: 'О нас' },
                { to: '/gallery', label: 'Галерея' },
                { to: '/booking', label: 'Бронирование' },
                { to: '/contacts', label: 'Контакты' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-loft-smoke hover:text-loft-copper transition-colors text-sm uppercase tracking-wider">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-2xl text-loft-concrete mb-5">Контакты</h4>
            <ul className="space-y-3 text-sm text-loft-smoke">
              <li>📍 г. Ростов-на-Дону, ул. Примерная, 1</li>
              <li>📞 +7 (863) 777-88-99</li>
              <li>✉️ hello@blackroast.ru</li>
              <li>🕐 Ежедневно 8:00 — 23:00</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-2xl text-loft-concrete mb-5">Соцсети</h4>
            <div className="flex gap-3 mb-6">
              {[
                { Icon: FaInstagram, label: 'IG' },
                { Icon: FaTelegram, label: 'TG' },
                { Icon: FaVk, label: 'VK' },
                { Icon: FaWhatsapp, label: 'WA' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-11 h-11 border border-loft-gray hover:border-loft-copper hover:bg-loft-copper hover:text-loft-black flex items-center justify-center text-loft-concrete transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <Link to="/booking" className="btn-primary w-full">
              Забронировать
            </Link>
          </div>
        </div>

        <div className="divider-copper mt-12 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-loft-smoke uppercase tracking-wider">
          <span>© 2026 BLACK ROAST. Все права защищены.</span>
          <span>Сделано с <span className="text-loft-copper">♥</span> в стиле лофт</span>
        </div>
      </div>
    </footer>
  )
}