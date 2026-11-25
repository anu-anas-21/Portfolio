import { Trophy, Award, Medal, Star, ExternalLink } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import { ACHIEVEMENTS } from '../data/achievements'

const ICONS = { trophy: Trophy, award: Award, medal: Medal }

export default function Achievements() {
  return (
    <section id="achievements" className="relative scroll-mt-24 border-t border-white/5 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Recognition" title="Achievements & Certifications" />

        <div className="grid gap-6 md:grid-cols-3">
          {ACHIEVEMENTS.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <Reveal key={item.title} delay={i * 0.07}>
                <TiltCard className="rounded-2xl" max={7}>
                  <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all duration-500 hover:border-gold/40 hover:bg-white/[0.06]">
                    <div className="absolute -top-3 right-6">
                      <span
                        className={`rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white ${item.badgeGradient}`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    <div
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110"
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      <Icon className="h-8 w-8" style={{ color: item.iconColor }} />
                    </div>

                    <h3 className="mb-2 font-display text-base font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/60">{item.text}</p>
                    {item.note && <p className="mt-2 text-xs text-white/35">{item.note}</p>}

                    <div className="mt-4 flex justify-center gap-1">
                      {Array.from({ length: item.stars }).map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                      ))}
                    </div>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-glow transition-colors hover:text-gold"
                      >
                        View Certificate
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
