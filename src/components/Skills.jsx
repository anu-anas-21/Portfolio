import Reveal from './Reveal'
import { SKILL_GROUPS } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-16 bg-slate-50/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-10">
          <span className="text-cyan-600 font-medium text-sm tracking-wider uppercase">My Expertise</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">Skills &amp; Technologies</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mt-3 rounded-full" />
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                <div className={`inline-block px-4 py-1.5 rounded-full ${group.chipBg} mb-4`}>
                  <span
                    className={`text-sm font-semibold bg-gradient-to-r ${group.gradient} bg-clip-text text-transparent`}
                  >
                    {group.title}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm text-slate-700 font-medium border border-slate-100 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
