import { Briefcase, GraduationCap, MapPin, CalendarDays, ExternalLink } from 'lucide-react'
import Reveal from './Reveal'
import { EXPERIENCE, EDUCATION } from '../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-16 bg-white relative overflow-hidden">
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-100 rounded-full opacity-50" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-100 rounded-full opacity-50" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-10">
          <span className="text-purple-600 font-bold text-sm tracking-wider uppercase">Career</span>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-2">Experience</h2>
        </Reveal>

        <div className="relative space-y-6 mb-14">
          <div className="hidden sm:block absolute left-6 top-2 bottom-2 w-px bg-slate-200" />
          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.1} className="relative sm:pl-16">
              <div className="hidden sm:flex absolute left-0 top-2 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 items-center justify-center shadow-lg ring-4 ring-white">
                <Briefcase className="w-5 h-5 text-white" />
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{job.role}</h3>
                    <p className="text-purple-600 font-semibold text-sm">{job.company}</p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-slate-500">
                    <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-semibold">
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {job.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {job.points.map((point) => (
                    <li key={point.text} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      <span>
                        {point.text}
                        {point.link && (
                          <a
                            href={point.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 ml-2 text-purple-600 font-semibold hover:text-purple-700"
                          >
                            {point.linkLabel}
                            <ExternalLink className="w-3 h-3" />
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

        <Reveal className="text-center mb-8">
          <span className="text-cyan-600 font-medium text-sm tracking-wider uppercase">Background</span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">Education</h3>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {EDUCATION.map((edu, i) => (
            <Reveal key={edu.degree} delay={i * 0.1}>
              <div className="flex items-start gap-4 bg-slate-50/70 rounded-2xl p-5 border border-slate-100 h-full">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                  <p className="text-sm text-slate-600 mt-0.5">{edu.school}</p>
                  <p className="text-xs text-slate-400 mt-1">
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
