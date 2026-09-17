import { motion } from 'framer-motion'

export default function ServiceCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative p-7 bg-loft-dark/70 backdrop-blur-sm border border-loft-steel hover:border-loft-copper transition-all duration-500 overflow-hidden"
    >
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-loft-copper/5 rounded-full group-hover:bg-loft-copper/10 transition-colors duration-500" />
      <div className="relative">
        <div className="w-14 h-14 mb-5 flex items-center justify-center border border-loft-copper text-loft-copper group-hover:bg-loft-copper group-hover:text-loft-black transition-all duration-500">
          <Icon size={26} />
        </div>
        <h3 className="font-display text-2xl text-loft-concrete mb-3 tracking-wide">{title}</h3>
        <p className="text-loft-smoke text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}