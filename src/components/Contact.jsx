import { motion } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaFacebook, FaDiscord } from 'react-icons/fa6'

const contacts = [
  {
    name: 'Email',
    href: 'mailto:zwaseet@gmail.com',
    icon: FaEnvelope,
    color: '#ea4335',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mir-zaheen-waseet',
    icon: FaLinkedin,
    color: '#0077b5',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/zaheen.4',
    icon: FaFacebook,
    color: '#1877f2',
  },
  {
    name: 'Discord',
    href: 'https://discord.com/users/353566198304342016',
    icon: FaDiscord,
    color: '#5865f2',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto mb-12" style={{ color: 'var(--text-secondary)' }}>
            Have a project in mind or just want to chat? Feel free to reach out through any of these channels.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          {contacts.map((contact) => (
            <motion.a
              key={contact.name}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              variants={item}
              className="glow-card p-6 w-40 text-center group"
            >
              <div
                className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: `${contact.color}20` }}
              >
                <contact.icon size={26} style={{ color: contact.color }} />
              </div>
              <p className="text-sm font-medium group-hover:text-primary transition-colors" style={{ color: 'var(--text-secondary)' }}>
                {contact.name}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
