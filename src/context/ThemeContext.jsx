import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext()

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

export const themes = [
  { id: 'system', name: 'System', dot: '🖥️', isSystem: true },
  { id: 'warm-dark', name: 'Warm Dark', dot: '#d97706', isDark: true },
  { id: 'warm-light', name: 'Warm Light', dot: '#d97706', isDark: false },
  { id: 'dracula', name: 'Dracula', dot: '#bd93f9', isDark: true },
  { id: 'nord', name: 'Nord', dot: '#88c0d0', isDark: true },
  { id: 'monokai', name: 'Monokai', dot: '#a6e22e', isDark: true },
  { id: 'tokyo-night', name: 'Tokyo Night', dot: '#7aa2f7', isDark: true },
  { id: 'catppuccin-mocha', name: 'Catppuccin Mocha', dot: '#cba6f7', isDark: true },
  { id: 'one-dark', name: 'One Dark', dot: '#61afef', isDark: true },
  { id: 'github-light', name: 'GitHub Light', dot: '#0969da', isDark: false },
  { id: 'solarized-light', name: 'Solarized Light', dot: '#268bd2', isDark: false },
  { id: 'catppuccin-latte', name: 'Catppuccin Latte', dot: '#7287fd', isDark: false },
]

export function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem('theme') || 'system'
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const resolveTheme = (theme) => {
    if (theme === 'system') {
      return getSystemTheme() === 'dark' ? 'warm-dark' : 'warm-light'
    }
    return theme
  }

  useEffect(() => {
    localStorage.setItem('theme', selectedTheme)
    const resolved = resolveTheme(selectedTheme)
    document.documentElement.setAttribute('data-theme', resolved)
  }, [selectedTheme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (selectedTheme === 'system') {
        const resolved = getSystemTheme() === 'dark' ? 'warm-dark' : 'warm-light'
        document.documentElement.setAttribute('data-theme', resolved)
      }
    }
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [selectedTheme])

  const setTheme = useCallback((themeId) => {
    setIsTransitioning(true)
    setIsOpen(false)
    setTimeout(() => {
      setSelectedTheme(themeId)
    }, 150)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 400)
  }, [])

  return (
    <ThemeContext.Provider value={{ selectedTheme, setTheme, isOpen, setIsOpen, themes, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  )
}
