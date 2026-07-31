import { useEffect, useState } from 'react'
import { Mail, ArrowUp } from 'lucide-react'
import Reveal from './Reveal'
import { GithubIcon, LinkedinIcon } from './icons'

const SOCIALS = [
  { icon: Mail, href: 'mailto:anasanu0174@gmail.com' },
  { icon: GithubIcon, href: 'https://github.com/anu-anas-21' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/anu-anas' },
]

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white relative">
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#f8fafc"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-14 pb-6">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-3">
            Mohammed Anas<span className="text-cyan-400">.</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-md mb-6">
            Building scalable software solutions with passion and precision. Let's create something
            amazing together.
          </p>

          <div className="flex items-center gap-4 mb-6">
            {SOCIALS.map((s, i) => {
              const Icon = s.icon
              return (
                <a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-slate-900 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>

          <div className="w-full h-px bg-slate-800 mb-8" />

          <p className="text-slate-500 text-sm text-center">
            © {new Date().getFullYear()} Mohammed Anas A T. All rights reserved.
          </p>
        </Reveal>
      </div>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 shadow-xl shadow-yellow-500/30 flex items-center justify-center transition-colors z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  )
}
