import { lazy, Suspense, useState } from 'react'
import Preloader from './components/Preloader'
import SparkCursor from './components/SparkCursor'

// Three.js is ~600 kB — keep it out of the entry chunk. The scene is purely
// decorative, so it can stream in after the page is interactive; the CSS
// gradient fallback covers the gap.
const Scene3D = lazy(() => import('./components/Scene3D'))
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
  const [ready, setReady] = useState(false)

  return (
    <>
      <Preloader onDone={() => setReady(true)} />

      {/* Persistent WebGL field behind every section */}
      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 bg-ink"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 85% 110%, rgba(99,102,241,0.14), transparent 60%)',
            }}
          />
        }
      >
        <Scene3D />
      </Suspense>
      <SparkCursor />

      {/* isolate creates a stacking context so content always sits above the
          fixed canvas without each section needing its own z-index. */}
      <div className="relative isolate z-10 flex min-h-screen flex-col">
        <Navbar />
        <main>
          <Hero ready={ready} />
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
      </div>
    </>
  )
}

export default App
