import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star, GitFork } from 'lucide-react'
import ProjectSkeleton from './ProjectSkeleton'

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Lua: '#000080',
  Vue: '#41b883',
  Svelte: '#ff3e00',
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/users/zaheen4/repos?sort=updated&per_page=100')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch repos')
        return res.json()
      })
      .then((data) => {
        const filtered = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
          .slice(0, 4)
          .map((repo) => ({
            name: repo.name,
            description: repo.description || 'No description provided.',
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
            color: repo.language ? languageColors[repo.language] : 'var(--accent)',
            updatedAt: repo.updated_at,
          }))
        setProjects(filtered)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            A selection of things I've built and contributed to
          </p>
        </motion.div>

        {loading && (
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center py-12" style={{ color: '#ef4444' }}>
            Failed to load projects: {error}
          </p>
        )}

        {!loading && !error && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {projects.map((project) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={item}
                className="glow-card p-6 block group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <ExternalLink
                    size={20}
                    className="group-hover:text-accent transition-colors flex-shrink-0 ml-4"
                    style={{ color: 'var(--text-muted)' }}
                  />
                </div>
                <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {project.language && (
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {project.language}
                        </span>
                      </div>
                    )}
                    {project.stars > 0 && (
                      <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <Star size={14} className="text-yellow-500" />
                        <span className="text-sm">{project.stars}</span>
                      </div>
                    )}
                    {project.forks > 0 && (
                      <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <GitFork size={14} />
                        <span className="text-sm">{project.forks}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/zaheen4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border rounded-lg transition-colors duration-200"
            style={{ borderColor: 'var(--bg-border)', color: 'var(--text-primary)' }}
          >
            View All on GitHub
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
