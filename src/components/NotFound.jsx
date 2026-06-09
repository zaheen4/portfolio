import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <section
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
          className="text-lg mb-2 tracking-wide"
          style={{ color: 'var(--text-secondary)' }}
        >
          Error 404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-8xl sm:text-9xl font-bold mb-6"
        >
          <span className="gradient-text">404</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xl sm:text-2xl max-w-xl mx-auto mb-3"
          style={{ color: 'var(--text-secondary)' }}
        >
          This page got lost in the void
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-10"
          style={{ color: 'var(--text-muted)' }}
        >
          The link you followed probably expired or moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <a
            href="/portfolio/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors duration-200 font-medium text-white"
            style={{ backgroundColor: 'var(--accent)' }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = 'var(--accent-light)')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--accent)')}
          >
            <Home size={18} />
            Go Home
          </a>
        </motion.div>
      </div>
    </section>
  )
}
