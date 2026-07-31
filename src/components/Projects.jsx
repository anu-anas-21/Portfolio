import { Coffee, PenTool, Building2, SquareCheckBig, ExternalLink } from 'lucide-react'
import Reveal from './Reveal'
import { GithubIcon } from './icons'
import { PROJECTS } from '../data/projects'

const ICONS = {
  coffee: Coffee,
  pen: PenTool,
  building: Building2,
  check: SquareCheckBig,
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-16 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-200 rounded-full opacity-30" />

      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-10">
          <span className="text-purple-600 font-bold text-sm tracking-wider uppercase">Portfolio</span>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-2">Digital Product Showcases</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => {
            const Icon = ICONS[project.icon]
            return (
              <Reveal key={project.title} delay={(i % 2) * 0.1}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  <div
                    className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden rounded-t-2xl shrink-0`}
                  >
                    <div className="absolute inset-0 bg-black/5" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-9 h-9 text-white" />
                      </div>
                    </div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full" />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>
                      {project.period && (
                        <span className="shrink-0 text-xs text-slate-400 font-medium mt-1">{project.period}</span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{project.description}</p>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.highlights.map((h) => (
                          <span key={h} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 mt-auto">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {(project.code || project.demo) && (
                      <div className={`flex gap-3 pt-4 border-t border-slate-100 ${project.tech.length > 0 ? 'mt-4' : 'mt-auto'}`}>
                        {project.code && (
                          <a
                            href={project.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                          >
                            <GithubIcon className="w-4 h-4" />
                            Code
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    )}
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
