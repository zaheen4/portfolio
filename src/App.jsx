import { ThemeProvider } from './context/ThemeContext'
import ThemeTransition from './components/ThemeTransition'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NotFound from './components/NotFound'

function App() {
  const validPaths = ['/', '/portfolio/', '/portfolio']
  const is404 = !validPaths.includes(window.location.pathname)

  if (is404) {
    return (
      <ThemeProvider>
        <NotFound />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <ThemeTransition />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </ThemeProvider>
  )
}

export default App
