import { Trophy, Award, Medal, Star, ExternalLink } from 'lucide-react'
import Reveal from './Reveal'
import { ACHIEVEMENTS } from '../data/achievements'

const ICONS = { trophy: Trophy, award: Award, medal: Medal }

export default function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-20 py-16 bg-slate-50/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-50/50 to-teal-50/50 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-10">
          <span className="text-cyan-600 font-medium text-sm tracking-wider uppercase">Recognition</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
            Achievements &amp; Certifications
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-3 rounded-full" />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 text-center group h-full">
                  <div className="absolute -top-3 right-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${item.badgeGradient}`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div
                    className={`w-16 h-16 mx-auto rounded-xl ${item.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8" style={{ color: item.iconColor }} />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                  {item.note && <p className="text-xs text-slate-400 mt-2">{item.note}</p>}
                  <div className="flex justify-center gap-1 mt-4">
                    {Array.from({ length: item.stars }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-cyan-600 hover:text-cyan-700"
                    >
                      View Certificate
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
