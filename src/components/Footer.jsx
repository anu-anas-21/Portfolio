import { useEffect, useState } from 'react'
import { Mail, ArrowUp } from 'lucide-react'
import Reveal from './Reveal'
import { GithubIcon, LinkedinIcon } from './icons'

const SOCIALS = [
  { icon: Mail, href: 'mailto:anasanu0174@gmail.com', label: 'Email' },
  { icon: GithubIcon, href: 'https://github.com/anu-anas-21', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/anu-anas', label: 'LinkedIn' },
]

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer className="relative border-t border-white/10 bg-ink-800/60 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-6">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="mb-3 font-display text-2xl font-extrabold text-white">
            Mohammed Anas<span className="text-gold">.</span>
          </h2>
          <p className="mb-6 max-w-md text-sm text-white/50">
            Building scalable software solutions with passion and precision. Let&apos;s create
            something amazing together.
          </p>

          <div className="mb-6 flex items-center gap-4">
            {SOCIALS.map((s) => {
              const Icon = s.icon
              const ext = s.href.startsWith('http')
              return (
                <a
                  key={s.href}
                  href={s.href}
                  aria-label={s.label}
                  target={ext ? '_blank' : undefined}
                  rel={ext ? 'noopener noreferrer' : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-brand hover:bg-brand hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>

          <div className="mb-6 h-px w-full bg-white/10" />

          <p className="text-center text-sm text-white/35">
            © {new Date().getFullYear()} Mohammed Anas A T. All rights reserved.
          </p>
        </Reveal>
      </div>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep text-white shadow-glow transition-transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  )
}
