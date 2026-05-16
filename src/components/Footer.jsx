export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t" style={{ borderColor: 'var(--bg-border)', color: 'var(--text-muted)' }}>
      <div className="max-w-6xl mx-auto text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Mir Zaheen Waseet. Built with React + Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}
