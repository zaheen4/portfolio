import { motion } from 'framer-motion'
import { Code2, Database, Globe, Terminal, Cpu, Layers } from 'lucide-react'

const skills = [
  { name: 'Python', icon: Code2, level: 'Advanced', color: '#3776AB' },
  { name: 'JavaScript', icon: Globe, level: 'Intermediate', color: '#F7DF1E' },
  { name: 'React', icon: Layers, level: 'Intermediate', color: '#61DAFB' },
  { name: 'Web Scraping', icon: Terminal, level: 'Advanced', color: 'var(--accent)' },
  { name: 'Automation', icon: Cpu, level: 'Advanced', color: '#06b6d4' },
  { name: 'GUI Development', icon: Database, level: 'Intermediate', color: '#10b981' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={item}
              className="glow-card p-6 text-center cursor-default"
            >
              <div
                className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${skill.color}20` }}
              >
                <skill.icon size={28} style={{ color: skill.color }} />
              </div>
              <h3 className="text-lg font-semibold mb-1">{skill.name}</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{skill.level}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
