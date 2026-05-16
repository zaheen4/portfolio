import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function ThemePicker() {
  const { selectedTheme, setTheme, isOpen, setIsOpen, themes } = useTheme()

  const darkThemes = themes.filter((t) => t.isDark)
  const lightThemes = themes.filter((t) => !t.isDark)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg transition-colors duration-200 hover:bg-card"
        style={{ color: 'var(--text-secondary)' }}
        aria-label="Open theme picker"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="10.5" r="2.5" />
          <circle cx="8.5" cy="7.5" r="2.5" />
          <circle cx="6.5" cy="12.5" r="2.5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 w-72 rounded-xl border shadow-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--bg-border)' }}
            >
              <div className="p-4 border-b" style={{ borderColor: 'var(--bg-border)' }}>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  Choose Theme
                </h3>
              </div>

              <div className="p-3 max-h-80 overflow-y-auto">
                <div className="mb-2">
                  <button
                    onClick={() => setTheme('system')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${
                      selectedTheme === 'system' ? '' : 'hover:opacity-80'
                    }`}
                    style={{
                      backgroundColor: selectedTheme === 'system' ? 'var(--accent-glow)' : 'transparent',
                    }}
                  >
                    <span className="text-lg">🖥️</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      System Default
                    </span>
                    {selectedTheme === 'system' && (
                      <span className="ml-auto text-accent text-sm">✓</span>
                    )}
                  </button>
                </div>

                <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-3" style={{ color: 'var(--text-muted)' }}>
                  Dark
                </p>
                <div className="space-y-1 mb-4">
                  {darkThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${
                        selectedTheme === theme.id ? '' : 'hover:opacity-80'
                      }`}
                      style={{
                        backgroundColor: selectedTheme === theme.id ? 'var(--accent-glow)' : 'transparent',
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                        style={{
                          backgroundColor: theme.dot,
                          borderColor: 'var(--bg-border)',
                        }}
                      />
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {theme.name}
                      </span>
                      {selectedTheme === theme.id && (
                        <span className="ml-auto text-accent text-sm">✓</span>
                      )}
                    </button>
                  ))}
                </div>

                <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-3" style={{ color: 'var(--text-muted)' }}>
                  Light
                </p>
                <div className="space-y-1">
                  {lightThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${
                        selectedTheme === theme.id ? '' : 'hover:opacity-80'
                      }`}
                      style={{
                        backgroundColor: selectedTheme === theme.id ? 'var(--accent-glow)' : 'transparent',
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                        style={{
                          backgroundColor: theme.dot,
                          borderColor: 'var(--bg-border)',
                        }}
                      />
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {theme.name}
                      </span>
                      {selectedTheme === theme.id && (
                        <span className="ml-auto text-accent text-sm">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
