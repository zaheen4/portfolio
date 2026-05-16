import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-48 h-48 rounded-full overflow-hidden border-2 glow-card"
              style={{ borderColor: 'var(--accent)' }}
            >
              <img
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXd6eWowY3IxYmo1ejFjbWtocDQyNG50N3NiOG1waWd5cTR4MG12ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tIeCLkB8geYtW/giphy.gif"
                alt="Mir Zaheen Waseet"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              I'm a developer who loves building practical tools and automations.
              From GUI applications that streamline workflows to web scrapers that
              fetch data efficiently, I enjoy turning repetitive tasks into elegant
              solutions. Based in Bangladesh, I'm always exploring new technologies
              and finding creative ways to solve problems with code.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start" style={{ color: 'var(--text-muted)' }}>
              <div className="flex items-center gap-2">
                <MapPin size={18} style={{ color: 'var(--accent)' }} />
                <span>Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} style={{ color: 'var(--accent)' }} />
                <span>UTC +6:00</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
