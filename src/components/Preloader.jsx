import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * First-paint curtain: a counter runs to 100 while the tagline sharpens from a
 * heavy blur, then the veil splits away to reveal the page.
 *
 * It also buys the WebGL background a moment to compile shaders, so the hero
 * is never seen mid-initialisation.
 */
export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [gone, setGone] = useState(false)
  const rootRef = useRef(null)
  const topRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setGone(true)
      onDone?.()
      return
    }

    // Hold the page still while the curtain is up, so a stray scroll doesn't
    // land the visitor mid-page when it lifts.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    const release = () => {
      document.body.style.overflow = prevOverflow
    }

    const counter = { v: 0 }
    const tl = gsap.timeline()

    tl.to(counter, {
      v: 100,
      duration: 1.9,
      ease: 'power2.inOut',
      onUpdate: () => setPct(Math.round(counter.v)),
    })
      // Hold for a beat at 100 so the number registers before the reveal.
      .to({}, { duration: 0.18 })
      // Split the veil: top half up, bottom half down.
      .to(
        topRef.current,
        { yPercent: -100, duration: 0.85, ease: 'power4.inOut' },
        'reveal',
      )
      .to(
        bottomRef.current,
        { yPercent: 100, duration: 0.85, ease: 'power4.inOut' },
        'reveal',
      )
      .to(rootRef.current, { autoAlpha: 0, duration: 0.3 }, 'reveal+=0.5')
      .call(() => {
        release()
        setGone(true)
        onDone?.()
      })

    return () => {
      tl.kill()
      release()
    }
  }, [onDone])

  if (gone) return null

  // Text sharpens as the counter climbs — same blur-in language as the rest
  // of the page, introduced before the visitor sees any content.
  const blur = (1 - pct / 100) * 14
  const opacity = 0.25 + (pct / 100) * 0.75

  return (
    <div ref={rootRef} className="fixed inset-0 z-[200]" aria-hidden="true">
      <div ref={topRef} className="absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div ref={bottomRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div
          className="font-display text-6xl font-black leading-none text-white sm:text-8xl"
          style={{ filter: `blur(${blur * 0.25}px)` }}
        >
          {String(pct).padStart(2, '0')}
          <span className="text-brand">%</span>
        </div>

        <p
          className="mt-6 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80 sm:text-sm"
          style={{ filter: `blur(${blur}px)`, opacity }}
        >
          Full Stack Developer
        </p>

        <div className="mt-8 h-px w-40 overflow-hidden bg-white/10 sm:w-64">
          <div
            className="h-full bg-gradient-to-r from-brand via-brand-light to-gold"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
