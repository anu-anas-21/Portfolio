import { useEffect, useRef } from 'react'

/**
 * Canvas cursor trail: a soft ring that chases the pointer plus short-lived
 * sparks shed as it moves. Pure 2D canvas — cheap enough to run alongside the
 * WebGL background without competing for GPU time.
 *
 * Disabled on touch devices (no persistent pointer) and under reduced-motion.
 */

const MAX_SPARKS = 90
const COLORS = ['#8b5cf6', '#a855f7', '#c4b5fd', '#facc15']

export default function SparkCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const ctx = canvas.getContext('2d')
    let dpr = Math.min(window.devicePixelRatio, 2)

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const pointer = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let lastSpawn = 0
    let hovering = false
    const sparks = []

    const onMove = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY

      // Spawn sparks proportional to movement, throttled so fast flicks don't
      // dump hundreds of particles in one frame.
      const now = performance.now()
      if (now - lastSpawn > 16 && sparks.length < MAX_SPARKS) {
        lastSpawn = now
        const n = 1 + Math.floor(Math.random() * 2)
        for (let i = 0; i < n; i++) {
          sparks.push({
            x: pointer.x,
            y: pointer.y,
            vx: (Math.random() - 0.5) * 1.6,
            vy: (Math.random() - 0.5) * 1.6 + 0.3,
            life: 1,
            decay: 0.015 + Math.random() * 0.02,
            size: Math.random() * 2 + 0.8,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          })
        }
      }
    }

    // Grow the ring over interactive elements so it doubles as a hover cue.
    const onOver = (e) => {
      hovering = !!e.target.closest('a, button, input, textarea, [role="button"]')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })

    let raf
    let ringScale = 1

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Trailing ring
      ring.x += (pointer.x - ring.x) * 0.16
      ring.y += (pointer.y - ring.y) * 0.16
      const targetScale = hovering ? 2.1 : 1
      ringScale += (targetScale - ringScale) * 0.12

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      const r = 13 * ringScale
      const grad = ctx.createRadialGradient(ring.x, ring.y, 0, ring.x, ring.y, r)
      grad.addColorStop(0, 'rgba(196,181,253,0.22)')
      grad.addColorStop(1, 'rgba(139,92,246,0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(ring.x, ring.y, r, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = hovering ? 'rgba(250,204,21,0.75)' : 'rgba(167,139,250,0.6)'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.arc(ring.x, ring.y, r * 0.72, 0, Math.PI * 2)
      ctx.stroke()

      // Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.02 // slight gravity so the trail falls away
        s.life -= s.decay
        if (s.life <= 0) {
          sparks.splice(i, 1)
          continue
        }
        ctx.globalAlpha = Math.max(s.life, 0)
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      raf = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [])

  return <canvas ref={canvasRef} className="spark-cursor" aria-hidden="true" />
}
