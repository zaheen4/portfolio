import { useTheme } from '../context/ThemeContext'

export default function ThemeTransition() {
  const { isTransitioning } = useTheme()

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        backgroundColor: 'var(--bg-primary)',
        opacity: isTransitioning ? 0.6 : 0,
        transition: 'opacity 0.15s ease',
      }}
    />
  )
}
