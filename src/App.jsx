import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Process from './components/Process'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Process />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
