import { useEffect, useRef } from 'react'
// Named imports so the bundler can drop the parts of three.js this never uses.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Clock,
  Color,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SRGBColorSpace,
  TorusGeometry,
  WebGLRenderer,
} from 'three'

/**
 * The site's only WebGL context.
 *
 * Everything 3D lives in this one scene — the particle field and the floating
 * wireframe solids — because each extra context costs its own GL state and
 * compositing layer. One context, a handful of draw calls, one rAF loop.
 *
 * Quality is chosen from device capability up front and then *lowered* at
 * runtime if frames start costing too much, so weak hardware degrades to
 * something smooth rather than staying pretty and stuttering.
 */

// Particle budget and solid count per tier.
const TIERS = {
  high: { particles: 1400, solids: 3, dpr: 1.5 },
  mid: { particles: 850, solids: 2, dpr: 1.35 },
  low: { particles: 350, solids: 1, dpr: 1 },
}

function detectTier() {
  const cores = navigator.hardwareConcurrency || 4
  const mem = navigator.deviceMemory || 4
  const mobile = window.matchMedia('(max-width: 768px)').matches
  if (mobile || cores <= 4 || mem <= 4) return 'low'
  if (cores <= 8) return 'mid'
  return 'high'
}

// Soft radial sprite drawn once — cheaper than shipping a texture file.
function makeGlowTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(255,255,255,0.55)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new CanvasTexture(canvas)
  tex.colorSpace = SRGBColorSpace
  return tex
}

export default function Scene3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
    } catch {
      return // No WebGL — the CSS gradient fallback stands in.
    }

    let tier = detectTier()
    let budget = TIERS[tier]
    const maxParticles = TIERS.high.particles // buffers are allocated once, at max

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, budget.dpr))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new Scene()
    const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 22

    // ---------------------------------------------------------------- particles
    const positions = new Float32Array(maxParticles * 3)
    const colors = new Float32Array(maxParticles * 3)
    const drift = new Float32Array(maxParticles)

    const palette = [
      new Color('#8b5cf6'),
      new Color('#a855f7'),
      new Color('#6366f1'),
      new Color('#c4b5fd'),
      new Color('#facc15'),
    ]

    for (let i = 0; i < maxParticles; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 42
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      const c = palette[Math.random() < 0.06 ? 4 : Math.floor(Math.random() * 4)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
      drift[i] = Math.random() * 0.6 + 0.2
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('color', new BufferAttribute(colors, 3))
    // Drawing a sub-range is how quality is dialled down without reallocating.
    geometry.setDrawRange(0, budget.particles)

    const glow = makeGlowTexture()
    const material = new PointsMaterial({
      size: 0.42,
      map: glow,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: AdditiveBlending,
      sizeAttenuation: true,
    })

    const points = new Points(geometry, material)
    scene.add(points)

    // ------------------------------------------------------------------ solids
    // Low-poly wireframes: a few hundred vertices each, one draw call apiece.
    // Pushed out toward the edges and well back in Z: the canvas is fixed, so
    // anything near the centre would sit parked behind the same card for the
    // whole page. Out here they read as distant background geometry.
    const solidDefs = [
      { geo: new IcosahedronGeometry(4.2, 1), color: '#8b5cf6', pos: [-18, 6, -14], spin: 0.055 },
      { geo: new TorusGeometry(3.1, 0.9, 8, 26), color: '#facc15', pos: [19, -7, -17], spin: -0.07 },
      { geo: new OctahedronGeometry(3.4, 0), color: '#6366f1', pos: [14, 11, -22], spin: 0.045 },
    ]

    const solids = solidDefs.slice(0, budget.solids).map((d) => {
      const mat = new MeshBasicMaterial({
        color: new Color(d.color),
        wireframe: true,
        transparent: true,
        // Low enough to read as depth behind translucent cards rather than
        // competing with the content in front of it.
        opacity: 0.15,
      })
      const mesh = new Mesh(d.geo, mat)
      mesh.position.set(...d.pos)
      mesh.userData.spin = d.spin
      mesh.userData.baseY = d.pos[1]
      scene.add(mesh)
      return mesh
    })
    // Geometries for tiers we did not build still need disposing.
    const unusedGeos = solidDefs.slice(budget.solids).map((d) => d.geo)

    // ------------------------------------------------------------- interaction
    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onPointerMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    let scrollY = window.scrollY
    const onScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ------------------------------------------------------- adaptive quality
    // Watch a rolling window of frame times. Two slow windows in a row drops a
    // quality step; this only ever goes downwards, so it cannot oscillate.
    const order = ['high', 'mid', 'low']
    let slowStreak = 0
    let frameCount = 0
    let windowStart = performance.now()

    const degrade = () => {
      const idx = order.indexOf(tier)
      if (idx >= order.length - 1) return false
      tier = order[idx + 1]
      budget = TIERS[tier]
      geometry.setDrawRange(0, budget.particles)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, budget.dpr))
      renderer.setSize(window.innerWidth, window.innerHeight)
      while (solids.length > budget.solids) {
        const m = solids.pop()
        scene.remove(m)
        m.material.dispose()
        unusedGeos.push(m.geometry)
      }
      return true
    }

    // --------------------------------------------------------------- the loop
    let raf
    let running = true
    const clock = new Clock()
    const posAttr = geometry.attributes.position

    const render = () => {
      const t = clock.getElapsedTime()
      const dt = Math.min(clock.getDelta(), 0.05)

      if (!reduced) {
        // Only the particles actually being drawn need updating.
        const count = budget.particles
        const arr = posAttr.array
        for (let i = 0; i < count; i++) {
          const yi = i * 3 + 1
          arr[yi] += drift[i] * dt * 0.9
          if (arr[yi] > 21) arr[yi] = -21
        }
        posAttr.updateRanges = [{ start: 0, count: count * 3 }]
        posAttr.needsUpdate = true

        points.rotation.y = t * 0.02

        // Solids spin slowly and parallax upward as the page scrolls, so they
        // travel past the content instead of sitting behind one card.
        const scrollProgress = scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)
        for (const m of solids) {
          m.rotation.x += m.userData.spin * dt
          m.rotation.y += m.userData.spin * dt * 1.4
          m.position.y = m.userData.baseY + scrollProgress * 26
        }
      }

      pointer.x += (target.x - pointer.x) * 0.03
      pointer.y += (target.y - pointer.y) * 0.03
      camera.position.x = pointer.x * 2.2
      camera.position.y = -pointer.y * 1.4 - (scrollY / window.innerHeight) * 1.5
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)

      // Quality check once per ~60 frames.
      frameCount++
      if (frameCount >= 60) {
        const now = performance.now()
        const avg = (now - windowStart) / frameCount
        frameCount = 0
        windowStart = now
        // >22ms/frame is below ~45fps. Ignore absurd values from a throttled
        // or backgrounded tab, which would otherwise trigger a false degrade.
        if (avg > 22 && avg < 200) {
          slowStreak++
          if (slowStreak >= 2 && degrade()) slowStreak = 0
        } else {
          slowStreak = 0
        }
      }

      raf = requestAnimationFrame(render)
    }
    render()

    const onVisibility = () => {
      if (document.hidden && running) {
        cancelAnimationFrame(raf)
        running = false
      } else if (!document.hidden && !running) {
        running = true
        clock.getDelta() // drop the gap so nothing jumps
        windowStart = performance.now()
        frameCount = 0
        render()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      geometry.dispose()
      glow.dispose()
      material.dispose()
      for (const m of solids) {
        m.geometry.dispose()
        m.material.dispose()
      }
      for (const g of unusedGeos) g.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-ink"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 85% 110%, rgba(99,102,241,0.14), transparent 60%)',
      }}
    />
  )
}
