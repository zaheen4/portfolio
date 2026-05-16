export default function ProjectSkeleton() {
  return (
    <div className="glow-card p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="h-6 rounded-lg w-3/4" style={{ backgroundColor: 'var(--bg-border)' }} />
        <div className="h-5 w-5 rounded" style={{ backgroundColor: 'var(--bg-border)' }} />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 rounded w-full" style={{ backgroundColor: 'var(--bg-border)' }} />
        <div className="h-4 rounded w-5/6" style={{ backgroundColor: 'var(--bg-border)' }} />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-4 w-16 rounded-full" style={{ backgroundColor: 'var(--bg-border)' }} />
        <div className="h-4 w-10 rounded-full" style={{ backgroundColor: 'var(--bg-border)' }} />
        <div className="h-4 w-10 rounded-full" style={{ backgroundColor: 'var(--bg-border)' }} />
      </div>
    </div>
  )
}
