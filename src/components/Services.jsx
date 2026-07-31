import { Server, Plug, Layers, PanelsTopLeft, Bug, Wrench } from 'lucide-react'
import Reveal from './Reveal'
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
    <section id="services" className="scroll-mt-20 py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-10">
          <span className="text-cyan-600 font-medium text-sm tracking-wider uppercase">What I Offer</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">Services</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-600 text-sm mt-3 max-w-2xl mx-auto">
            Professional software development services tailored to meet your project needs
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon]
            return (
              <Reveal key={service.title} delay={i * 0.05}>
                <div className="group p-5 rounded-2xl bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-cyan-100 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-500 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">{service.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white border border-slate-100 rounded-full text-xs text-slate-600 font-medium"
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
