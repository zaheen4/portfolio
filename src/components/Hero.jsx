import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-accent-light text-lg mb-4 tracking-wide"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="gradient-text">Mir Zaheen Waseet</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xl sm:text-2xl max-w-2xl mx-auto mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          Building tools that automate the boring stuff
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg transition-colors duration-200 font-medium text-white"
            style={{ backgroundColor: 'var(--accent)' }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = 'var(--accent-light)')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--accent)')}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border rounded-lg transition-colors duration-200 font-medium"
            style={{ borderColor: 'var(--bg-border)', color: 'var(--text-primary)' }}
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: 'var(--text-muted)' }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.a>
    </section>
  )
}
