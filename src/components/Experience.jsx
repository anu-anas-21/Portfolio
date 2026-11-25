import { Briefcase, GraduationCap, MapPin, CalendarDays, ExternalLink } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { EXPERIENCE, EDUCATION } from '../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 border-t border-white/5 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Career" title="Experience" />

        <div className="relative mb-14 space-y-6">
          {/* timeline rail */}
          <div className="absolute left-6 top-2 bottom-2 hidden w-px bg-gradient-to-b from-brand via-brand/30 to-transparent sm:block" />

          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08} className="relative sm:pl-16">
              <div className="absolute left-0 top-2 hidden h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep shadow-glow ring-4 ring-ink sm:flex">
                <Briefcase className="h-5 w-5 text-white" />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand/40 hover:bg-white/[0.06]">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{job.role}</h3>
                    <p className="text-sm font-semibold text-brand-glow">{job.company}</p>
                  </div>
                  <div className="flex flex-col items-start gap-1 text-xs text-white/50 sm:items-end">
                    <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-semibold text-brand-glow">
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {job.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {job.points.map((point) => (
                    <li key={point.text} className="flex gap-2 text-sm leading-relaxed text-white/60">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>
                        {point.text}
                        {point.link && (
                          <a
                            href={point.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 inline-flex items-center gap-1 font-semibold text-gold hover:text-gold-deep"
                          >
                            {point.linkLabel}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <SectionHeading eyebrow="Background" title="Education" className="mb-8" />

        <div className="grid gap-5 md:grid-cols-2">
          {EDUCATION.map((edu, i) => (
            <Reveal key={edu.degree} delay={i * 0.08}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-gold/40">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-deep text-ink">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                  <p className="mt-0.5 text-sm text-white/60">{edu.school}</p>
                  <p className="mt-1 text-xs text-white/40">
                    {edu.period} · {edu.location}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
