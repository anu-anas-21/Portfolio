import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Pointer-tracking 3D tilt.
 *
 * The card leans toward the cursor and lifts slightly, with a highlight that
 * follows the pointer across the surface. Tilt is driven off the card's own
 * bounds, so each one in a grid reacts independently.
 */
export default function TiltCard({ children, className = '', max = 9, lift = 10 }) {
  const wrapRef = useRef(null)
  const cardRef = useRef(null)
  const glareRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const card = cardRef.current
    if (!wrap || !card) return

    // Touch devices have no hover state to drive this, and tilting on tap
    // just feels like a bug — leave the card flat.
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Canonical GSAP names: quickTo does not resolve the rotateX/rotateY
    // aliases that gsap.set/gsap.to accept, and fails silently if given them.
    const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' })
    const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' })
    const transZ = gsap.quickTo(card, 'z', { duration: 0.5, ease: 'power3.out' })

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width // 0..1
      const py = (e.clientY - r.top) / r.height
      rotY((px - 0.5) * max * 2)
      rotX(-(py - 0.5) * max * 2)
      if (glareRef.current) {
        gsap.to(glareRef.current, {
          opacity: 1,
          duration: 0.3,
          background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(196,181,253,0.22), transparent 55%)`,
        })
      }
    }

    const onEnter = () => transZ(lift)
    const onLeave = () => {
      rotX(0)
      rotY(0)
      transZ(0)
      if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.4 })
    }

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerenter', onEnter)
    wrap.addEventListener('pointerleave', onLeave)
    return () => {
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerenter', onEnter)
      wrap.removeEventListener('pointerleave', onLeave)
      gsap.killTweensOf([card, glareRef.current])
    }
  }, [max, lift])

  return (
    <div ref={wrapRef} className="h-full" style={{ perspective: '1100px' }}>
      <div
        ref={cardRef}
        className={`relative h-full ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
        />
      </div>
    </div>
  )
}
