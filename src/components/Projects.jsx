import { useLayoutEffect, useRef } from 'react'
import {
  Coffee,
  PenTool,
  Building2,
  SquareCheckBig,
  ShoppingBag,
  Workflow,
  Bot,
  Globe,
  ExternalLink,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import { GithubIcon } from './icons'
import { PROJECTS } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  coffee: Coffee,
  pen: PenTool,
  building: Building2,
  check: SquareCheckBig,
  shop: ShoppingBag,
  workflow: Workflow,
  bot: Bot,
  globe: Globe,
}

export default function Projects() {
  const gridRef = useRef(null)

  // Scroll-scrubbed 3D entrance: cards start laid back in Z and rotate upright
  // as the grid scrolls into place.
  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll('[data-project-card]')
      gsap.fromTo(
        cards,
        { rotateX: 32, y: 70, opacity: 0, filter: 'blur(10px)' },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.6,
          },
        },
      )
    }, grid)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="relative scroll-mt-24 border-t border-white/5 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 45% 35% at 80% 20%, rgba(168,85,247,0.14), transparent 65%)',
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Portfolio" title="Digital Product Showcases" />

        <div
          ref={gridRef}
          className="grid gap-6 md:grid-cols-2"
          style={{ perspective: '1600px' }}
        >
          {PROJECTS.map((project) => {
            const Icon = ICONS[project.icon]
            return (
              <div key={project.title} data-project-card>
                <TiltCard className="rounded-2xl">
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:border-brand/50">
                    {/* header */}
                    <div
                      className={`relative h-32 shrink-0 overflow-hidden bg-gradient-to-br ${project.gradient}`}
                    >
                      <div className="absolute inset-0 bg-ink/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110"
                          style={{ transform: 'translateZ(35px)' }}
                        >
                          <Icon className="h-9 w-9 text-white" />
                        </div>
                      </div>
                      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
                      <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-white/10" />
                    </div>

                    {/* body */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-brand-glow">
                          {project.title}
                        </h3>
                        {project.period && (
                          <span className="mt-1 shrink-0 text-xs font-medium text-white/35">
                            {project.period}
                          </span>
                        )}
                      </div>

                      <p className="mb-4 text-sm leading-relaxed text-white/60">
                        {project.description}
                      </p>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.highlights.map((h) => (
                          <span
                            key={h}
                            className="rounded border border-white/5 bg-white/[0.04] px-2 py-1 text-xs text-white/45"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {project.tech.length > 0 && (
                        <div className="mt-auto flex flex-wrap gap-2 border-t border-white/10 pt-4">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-glow"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {(project.code || project.demo) && (
                        <div
                          className={`flex gap-3 border-t border-white/10 pt-4 ${
                            project.tech.length > 0 ? 'mt-4' : 'mt-auto'
                          }`}
                        >
                          {project.code && (
                            <a
                              href={project.code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/10"
                            >
                              <GithubIcon className="h-4 w-4" />
                              Code
                            </a>
                          )}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-deep px-4 py-2 text-sm font-medium text-white shadow-glow transition-shadow hover:shadow-[0_0_30px_-6px_rgba(139,92,246,0.8)]"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Live Demo
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
