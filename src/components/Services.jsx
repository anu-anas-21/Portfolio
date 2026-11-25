import { Server, Plug, Layers, PanelsTopLeft, Bug, Wrench } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { SERVICES } from '../data/services'

const ICONS = {
  server: Server,
  plug: Plug,
  layers: Layers,
  panels: PanelsTopLeft,
  bug: Bug,
  wrench: Wrench,
}

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 border-t border-white/5 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What I Offer"
          title="Services"
          subtitle="Professional software development services tailored to meet your project needs"
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon]
            return (
              <Reveal key={service.title} delay={i * 0.05}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-500 hover:border-brand/40 hover:bg-white/[0.06] hover:shadow-glow">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-deep text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-display text-base font-bold text-white transition-colors group-hover:text-brand-glow">
                    {service.title}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-white/60">{service.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
