import { useEffect, useRef } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import gsap from 'gsap'
import { GithubIcon, LinkedinIcon } from './icons'
import profile from '../assets/profile.jpg'

export default function Hero({ ready }) {
  const rootRef = useRef(null)
  const tiltRef = useRef(null)

  // Entrance: hold everything blurred until the preloader clears, then resolve
  // the column into focus from the top down.
  useEffect(() => {
    if (!ready) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = rootRef.current?.querySelectorAll('[data-hero]')
    if (!items?.length) return

    if (reduced) {
      gsap.set(items, { opacity: 1, filter: 'none', y: 0 })
      return
    }

    const tl = gsap.timeline()
    tl.fromTo(
      items,
      { opacity: 0, y: 24, filter: 'blur(12px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.09,
      },
    )
    return () => tl.kill()
  }, [ready])

  // Pointer-driven 3D tilt on the portrait.
  useEffect(() => {
    const el = tiltRef.current
    if (!el) return
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Canonical GSAP names — quickTo ignores the rotateX/rotateY aliases.
    const quickX = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })
    const quickY = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      // Normalised offset from the portrait's centre, clamped so the tilt stays
      // tasteful even when the pointer is across the page.
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)))
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)))
      quickX(dx * 14)
      quickY(-dy * 12)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      gsap.killTweensOf(el)
    }
  }, [])

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Section-local glow, layered over the global particle field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 55% 45% at 70% 40%, rgba(139,92,246,0.22), transparent 65%), radial-gradient(ellipse 45% 40% at 20% 70%, rgba(99,102,241,0.16), transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-8 sm:py-10 lg:py-8">
        <div className="grid items-center gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {/* ---------- copy ---------- */}
          <div className="text-center lg:text-left">
            <div
              data-hero
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm sm:py-1.5"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
              <span className="text-xs font-medium text-white/90">Open to Opportunities</span>
            </div>

            <h1
              data-hero
              className="mb-2 text-balance font-display text-2xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3.3rem]"
            >
              Hello, I&apos;m
              {/* At the lg breakpoint the copy column halves in width, so the
                  display size steps up only at xl — otherwise the name wraps
                  and strands "A T" on its own line. */}
              <span className="mt-1 block bg-gradient-to-r from-white via-brand-glow to-brand-light bg-clip-text text-transparent">
                Mohammed Anas A T
              </span>
            </h1>

            <p data-hero className="mb-2 text-base font-medium text-white/85 sm:text-lg md:text-xl">
              Full Stack Developer
            </p>

            <p
              data-hero
              className="mx-auto mb-4 max-w-lg text-xs leading-relaxed text-white/60 sm:text-sm md:text-base lg:mx-0"
            >
              Full Stack Developer with hands-on production experience building web platforms
              end-to-end using Java, Spring Boot, React, Next.js, and Node.js. Currently at Beverse,
              delivering full-stack membership, admissions, and assessment platforms.
            </p>

            <div data-hero className="mb-4 flex flex-row justify-center gap-2 sm:gap-3 lg:justify-start">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-brand to-brand-deep px-4 py-2 text-xs font-semibold text-white shadow-glow transition-all hover:shadow-[0_0_50px_-6px_rgba(139,92,246,0.75)] sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
              >
                View Projects
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-gold hover:text-gold sm:px-6 sm:py-3 sm:text-sm"
              >
                Hire Me
              </a>
            </div>

            <div data-hero className="flex items-center justify-center gap-2 sm:gap-3 lg:justify-start">
              {[
                { href: 'mailto:anasanu0174@gmail.com', Icon: Mail, ext: false },
                { href: 'https://github.com/anu-anas-21', Icon: GithubIcon, ext: true },
                { href: 'https://www.linkedin.com/in/anu-anas', Icon: LinkedinIcon, ext: true },
              ].map(({ href, Icon, ext }) => (
                <a
                  key={href}
                  href={href}
                  target={ext ? '_blank' : undefined}
                  rel={ext ? 'noopener noreferrer' : undefined}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white sm:p-2.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ---------- portrait ---------- */}
          <div data-hero className="relative flex justify-center lg:justify-end">
            <div style={{ perspective: '1000px' }}>
              <div
                ref={tiltRef}
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 -m-2 rounded-full border border-brand/50 sm:-m-3" />
                <div className="absolute inset-0 -m-4 animate-spin-slow rounded-full border border-dashed border-white/20 sm:-m-6" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -m-8 rounded-full bg-brand/20 blur-3xl"
                />

                <div className="relative h-36 w-36 overflow-hidden rounded-full bg-gradient-to-br from-brand via-brand-light to-brand-deep p-[2px] shadow-glow sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-60 lg:w-60">
                  <div className="h-full w-full overflow-hidden rounded-full">
                    <img
                      src={profile}
                      alt="Mohammed Anas A T"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Pills are wider than the portrait on phones and would cover
                    it — the same two facts are already in the copy above. */}
                <div
                  className="animate-float absolute -right-2 -top-2 hidden rounded-lg border border-white/10 bg-ink-700/90 px-2.5 py-1.5 shadow-xl backdrop-blur-sm sm:block sm:rounded-xl sm:px-4 sm:py-2"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <span className="whitespace-nowrap text-[10px] font-bold text-brand-glow sm:text-xs">
                    Full Stack Developer
                  </span>
                </div>
                <div
                  className="animate-float absolute -bottom-2 -left-2 hidden rounded-lg bg-gold px-2.5 py-1.5 shadow-glow-gold sm:block sm:rounded-xl sm:px-4 sm:py-2"
                  style={{ animationDelay: '1.4s', transform: 'translateZ(40px)' }}
                >
                  <span className="whitespace-nowrap text-[10px] font-bold text-ink sm:text-xs">
                    MCA Graduate
                  </span>
                </div>

                <div className="absolute -top-6 left-1/4 h-3 w-3 rounded-full bg-brand-light" />
                <div className="absolute -bottom-6 right-1/4 h-4 w-4 rounded-full bg-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div
          className="animate-float flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/30 p-1.5"
          style={{ animationDuration: '1.8s' }}
        >
          <div className="h-1 w-1 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  )
}
