import { motion } from 'framer-motion'
import { FiCoffee, FiHeart, FiAward, FiUsers } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'
import { team } from '../data/menu'

const values = [
  { icon: FiCoffee, title: 'Качество зерна', text: 'Только specialty grade 80+ баллов. Прямые контракты с фермами Эфиопии, Колумбии и Бразилии.' },
  { icon: FiHeart, title: 'Ручная работа', text: 'Каждая чашка — результат мастерства бариста. Латте-арт в подарок каждому гостю.' },
  { icon: FiAward, title: 'Локальные продукты', text: 'Выпечка и десерты от фермерских хозяйств Подмосковья. Без полуфабрикатов.' },
  { icon: FiUsers, title: 'Сообщество', text: 'Дегустации, мастер-классы, встречи кофейного клуба каждую неделю.' },
]

const milestones = [
  { year: '2018', title: 'Основание', text: 'Артём и Мария открыли первую кофейню на 12 квадратных метрах в старом заводском здании.' },
  { year: '2020', title: 'Своя обжарка', text: 'Установили первый ростер Probat и начали обжаривать зерно самостоятельно.' },
  { year: '2022', title: 'Расширение', text: 'Открыли второй зал на 80 мест, запустили кондитерский цех и доставку.' },
  { year: '2026', title: 'Сегодня', text: 'Лучшая кофейня города по версии TimeOut. Более 50 000 гостей в месяц.' },
]

export default function About() {
  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-brick relative">
        <div className="absolute inset-0 bg-loft-black/95" />
        <div className="relative container-loft">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <div className="section-subtitle">Наша история</div>
            <h1 className="font-display text-6xl md:text-8xl text-loft-concrete leading-none mb-6">
              О <span className="text-loft-copper">НАС</span>
            </h1>
            <p className="text-loft-concrete text-lg leading-relaxed">
              Black Roast — это место, где рождается кофе. Мы превратили заброшенный заводской цех в пространство, где индустриальная история встречается с современной кофейной культурой.
            </p>
          </motion.div>
        </div>
      </section>

      {/* History split */}
      <section className="section bg-loft-black">
        <div className="container-loft">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="section-subtitle">Концепция</div>
              <h2 className="section-title">ЛОФТ, КОФЕ И <span className="text-loft-copper">ДУША</span></h2>
              <div className="space-y-4 text-loft-concrete leading-relaxed">
                <p>
                  Когда в 2018 году мы нашли это помещение — бывший механический цех — мы увидели в нём не голые стены, а потенциал. Кирпичная кладка 1950-х, бетонные перекрытия, огромные окна.
                </p>
                <p>
                  Мы сохранили всё, что можно было сохранить: чугунные радиаторы, металлические балки, деревянный пол. Добавили медь, тёплый свет и, конечно, наш ростер.
                </p>
                <p>
                  Сегодня Black Roast — это не просто кофейня. Это место силы для тех, кто ценит настоящий вкус, характерный интерьер и тёплую атмосферу.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=85" alt="Интерьер" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-loft-black via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-loft-copper text-loft-black p-6 max-w-[200px]">
                <div className="font-display text-5xl">8</div>
                <div className="text-sm font-semibold uppercase tracking-wider">ЛЕТ В ДЕЛЕ</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section bg-brick relative">
        <div className="absolute inset-0 bg-loft-dark/95" />
        <div className="relative container-loft">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="section-subtitle">Путь</div>
            <h2 className="section-title">КЛЮЧЕВЫЕ <span className="text-loft-copper">ВЕХИ</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-loft-black/60 backdrop-blur-sm border border-loft-steel p-6 hover:border-loft-copper transition-colors"
              >
                <div className="font-display text-5xl text-loft-copper mb-2">{m.year}</div>
                <h3 className="font-display text-2xl text-loft-concrete mb-3 tracking-wide">{m.title}</h3>
                <p className="text-loft-smoke text-sm leading-relaxed">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-loft-black">
        <div className="container-loft">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="section-subtitle">Кто стоит за каждым стаканом</div>
            <h2 className="section-title">НАША <span className="text-loft-copper">КОМАНДА</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden bg-loft-dark border border-loft-steel hover:border-loft-copper transition-all"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-loft-black via-loft-black/90 to-transparent p-5">
                  <h3 className="font-display text-2xl text-loft-concrete tracking-wide">{member.name}</h3>
                  <div className="text-loft-copper text-xs uppercase tracking-widest mb-2">{member.role}</div>
                  <p className="text-loft-smoke text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-brick relative">
        <div className="absolute inset-0 bg-loft-dark/95" />
        <div className="relative container-loft">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="section-subtitle">Во что мы верим</div>
            <h2 className="section-title">НАШИ <span className="text-loft-copper">ЦЕННОСТИ</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 bg-loft-black/60 border border-loft-steel hover:border-loft-copper group transition-all"
              >
                <v.icon className="text-loft-copper mb-5 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="font-display text-2xl text-loft-concrete mb-3 tracking-wide">{v.title}</h3>
                <p className="text-loft-smoke text-sm leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}