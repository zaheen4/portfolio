import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemePicker from './ThemePicker'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
      style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--bg-border)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="text-2xl font-bold gradient-text">
            Z
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-accent transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.name}
              </a>
            ))}
            <ThemePicker />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemePicker />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              style={{ color: 'var(--text-primary)' }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--bg-border)' }}
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-accent transition-colors duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
