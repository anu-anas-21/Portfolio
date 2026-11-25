import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll-triggered "blur-in" reveal.
 *
 * Elements start blurred, offset and transparent, then resolve into focus as
 * they enter the viewport. Keeping every reveal on the same curve is what makes
 * the page feel like one continuous piece rather than a stack of sections.
 */

const OFFSETS = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
  scale: { scale: 0.92, y: 12 },
  none: { x: 0, y: 0 },
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.9,
  blur = 12,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect the OS-level reduced-motion setting: show content immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { opacity: 1, clearProps: 'all' })
      return
    }

    const from = { opacity: 0, filter: `blur(${blur}px)`, ...OFFSETS[direction] }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        from,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [direction, delay, duration, blur])

  return (
    <Tag ref={ref} data-reveal className={className}>
      {children}
    </Tag>
  )
}
