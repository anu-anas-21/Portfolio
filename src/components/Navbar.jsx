import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently filling the viewport.
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto max-w-6xl rounded-full border transition-all duration-500 ${
          scrolled
            ? 'border-white/10 bg-ink-800/80 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl'
            : 'border-white/5 bg-white/[0.03] backdrop-blur-md'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-2.5 sm:px-6">
          <a href="#home" className="font-display text-lg font-extrabold tracking-tight text-white">
            Anas<span className="text-gold">.</span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative text-sm font-medium transition-colors duration-300 ${
                  active === link.href ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-brand to-gold transition-all duration-300 ${
                    active === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-brand to-brand-deep px-4 py-1.5 text-xs font-semibold text-white shadow-glow transition-shadow hover:shadow-[0_0_40px_-6px_rgba(139,92,246,0.8)] lg:inline-flex"
          >
            Let&apos;s Talk
          </a>

          <button
            className="p-1 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-1 border-t border-white/10 px-4 py-3 lg:hidden">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl bg-gradient-to-r from-brand to-brand-deep px-3 py-2 text-center text-sm font-semibold text-white"
            >
              Let&apos;s Talk
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
