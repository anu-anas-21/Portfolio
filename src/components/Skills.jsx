import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TechRing from './TechRing'
import { SKILL_GROUPS } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 border-t border-white/5 py-16">
      {/* soft section glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 50% 40% at 15% 30%, rgba(139,92,246,0.12), transparent 65%)',
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="My Expertise" title="Skills & Technologies" />

        <Reveal className="mb-10">
          <TechRing />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-brand/40 hover:bg-white/[0.06] hover:shadow-glow">
                <div className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                  <span
                    className={`bg-gradient-to-r text-sm font-semibold ${group.gradient} bg-clip-text text-transparent`}
                  >
                    {group.title}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="cursor-default rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/75 transition-colors hover:border-brand/50 hover:bg-brand/10 hover:text-white"
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
