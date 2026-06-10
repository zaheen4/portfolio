import { useState, useEffect, useCallback, useRef, useMemo } from 'react'

const themes = [
  { id: 'system', name: 'System' },
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

function isBrowser() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

function resolveTheme(theme) {
  if (theme === 'system') {
    if (!isBrowser()) return 'warm-dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'warm-dark' : 'warm-light'
  }
  return theme
}

export default function ThemePicker() {
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(function () {
    try {
      var stored = localStorage.getItem('theme')
      return stored || 'system'
    } catch {
      return 'system'
    }
  })

  const closeTimeoutRef = useRef(null)

  const openDropdown = useCallback(function () {
    clearTimeout(closeTimeoutRef.current)
    setIsOpen(true)
    setVisible(true)
  }, [])

  const closeDropdown = useCallback(function () {
    setIsOpen(false)
    closeTimeoutRef.current = setTimeout(function () { setVisible(false) }, 150)
  }, [])

  const themeTimeoutRef = useRef(null)
  const overlayTimeoutRef = useRef(null)

  const setTheme = useCallback((themeId) => {
    clearTimeout(themeTimeoutRef.current)
    clearTimeout(overlayTimeoutRef.current)
    window.dispatchEvent(new CustomEvent('theme-transition-start'))
    closeDropdown()
    themeTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('theme', themeId)
      setSelectedTheme(themeId)
      const resolved = resolveTheme(themeId)
      document.documentElement.setAttribute('data-theme', resolved)
    }, 150)
    overlayTimeoutRef.current = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('theme-transition-end'))
    }, 400)
  }, [closeDropdown])

  useEffect(function () {
    if (!isBrowser()) return
    var theme = localStorage.getItem('theme') || 'system'
    var resolved = resolveTheme(theme)
    document.documentElement.setAttribute('data-theme', resolved)
  }, [])

  useEffect(function () {
    if (!isBrowser()) return
    var media = window.matchMedia('(prefers-color-scheme: dark)')
    var handler = function () {
      var theme = localStorage.getItem('theme') || 'system'
      if (theme === 'system') {
        document.documentElement.setAttribute('data-theme', media.matches ? 'warm-dark' : 'warm-light')
      }
    }
    media.addEventListener('change', handler)
    return function () { media.removeEventListener('change', handler) }
  }, [])

  const darkThemes = themes.filter((t) => t.isDark === true)
  const lightThemes = themes.filter((t) => t.isDark === false)
  const darkIds = new Set(darkThemes.map((t) => t.id))
  const resolved = resolveTheme(selectedTheme)
  const isDark = darkIds.has(resolved)
  const dropdownRef = useRef(null)
  const toggleRef = useRef(null)
  const optionRefs = useRef({})
  const [activeIndex, setActiveIndex] = useState(-1)
  const allOptions = useMemo(() => {
    var darks = themes.filter((t) => t.isDark === true).map((t) => t.id)
    var lights = themes.filter((t) => t.isDark === false).map((t) => t.id)
    return ['system', ...darks, ...lights]
  }, [])

  useEffect(function () {
    if (!isOpen) return
    var idx = allOptions.indexOf(selectedTheme)
    if (idx < 0) idx = 0
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(idx)
    var el = optionRefs.current[allOptions[idx]]
    if (el) { el.focus({ preventScroll: true }); el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }) }
  }, [isOpen, allOptions, selectedTheme])

  useEffect(function () {
    if (!isOpen) return
    function onMouseDown(e) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        toggleRef.current && !toggleRef.current.contains(e.target)
      ) {
        closeDropdown()
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return function () { document.removeEventListener('mousedown', onMouseDown) }
  }, [isOpen, closeDropdown])

  useEffect(function () {
    if (!isOpen && !visible && toggleRef.current) {
      toggleRef.current.focus()
    }
  }, [isOpen, visible])

  function handleListKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      closeDropdown()
      return
    }
    var dir, nextIdx, el
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      dir = e.key === 'ArrowDown' ? 1 : -1
      nextIdx = (activeIndex + dir + allOptions.length) % allOptions.length
      setActiveIndex(nextIdx)
      el = optionRefs.current[allOptions[nextIdx]]
      if (el) { el.focus({ preventScroll: true }); el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }) }
      return
    }
    if (e.key === 'Home') {
      e.preventDefault()
      setActiveIndex(0)
      el = optionRefs.current[allOptions[0]]
      if (el) { el.focus({ preventScroll: true }); el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }) }
      return
    }
    if (e.key === 'End') {
      e.preventDefault()
      nextIdx = allOptions.length - 1
      setActiveIndex(nextIdx)
      el = optionRefs.current[allOptions[nextIdx]]
      if (el) { el.focus({ preventScroll: true }); el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }) }
      return
    }
  }

  return (
    <div className="relative">
      <button
        ref={toggleRef}
        onClick={() => isOpen ? closeDropdown() : openDropdown()}
        className="p-2 rounded-lg transition-colors duration-200 hover:bg-card"
        style={{ color: 'var(--text-secondary)' }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Switch theme"
      >
        {isDark ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </button>

      {visible && (
        <>
          <div className={`fixed inset-0 z-40 transition-opacity duration-150 ${isOpen ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
          <div
            ref={dropdownRef}
            className={`absolute right-0 top-full mt-2 z-50 w-72 rounded-xl border shadow-2xl overflow-hidden theme-dropdown${isOpen ? ' open' : ''}`}
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--bg-border)' }}
          >
            <div className="p-4 border-b" style={{ borderColor: 'var(--bg-border)' }}>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                Choose Theme
              </h3>
            </div>

            <div className="theme-scroll p-3 pb-6" role="listbox" aria-label="Choose a theme" onKeyDown={handleListKeyDown}>
              <div className="mb-2">
                <button
                  ref={function (el) { optionRefs.current['system'] = el }}
                  onClick={() => setTheme('system')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg theme-option${selectedTheme === 'system' ? ' active' : ''}`}
                  role="option"
                  aria-selected={selectedTheme === 'system'}
                  tabIndex={activeIndex === 0 ? 0 : -1}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                  </svg>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    System Default
                  </span>
                  {selectedTheme === 'system' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-auto flex-shrink-0">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-3 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
                Dark
              </p>
              <div className="space-y-1 mb-4">
                {darkThemes.map((theme, i) => (
                  <button
                    key={theme.id}
                    ref={function (el) { optionRefs.current[theme.id] = el }}
                    onClick={() => setTheme(theme.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg theme-option${selectedTheme === theme.id ? ' active' : ''}`}
                    role="option"
                    aria-selected={selectedTheme === theme.id}
                    tabIndex={activeIndex === i + 1 ? 0 : -1}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex-shrink-0 dot"
                      style={{ backgroundColor: theme.dot }}
                    />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {theme.name}
                    </span>
                    {selectedTheme === theme.id && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-auto flex-shrink-0">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-3 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
                Light
              </p>
              <div className="space-y-1">
                {lightThemes.map((theme, i) => (
                  <button
                    key={theme.id}
                    ref={function (el) { optionRefs.current[theme.id] = el }}
                    onClick={() => setTheme(theme.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg theme-option${selectedTheme === theme.id ? ' active' : ''}`}
                    role="option"
                    aria-selected={selectedTheme === theme.id}
                    tabIndex={activeIndex === i + darkThemes.length + 1 ? 0 : -1}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex-shrink-0 dot"
                      style={{ backgroundColor: theme.dot }}
                    />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {theme.name}
                    </span>
                    {selectedTheme === theme.id && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-auto flex-shrink-0">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
