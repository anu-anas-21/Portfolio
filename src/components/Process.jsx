import { Lightbulb, Code, Rocket, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const STEPS = [
  {
    num: '01',
    icon: Lightbulb,
    title: 'Understand & Analyze',
    text: 'Gathering requirements and analyzing the problem to understand the best approach.',
    badge: 'from-brand to-brand-deep',
  },
  {
    num: '02',
    icon: Code,
    title: 'Design & Develop',
    text: 'Creating clean, scalable code with best practices and modern technologies.',
    badge: 'from-brand-light to-brand',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Test & Deploy',
    text: 'Rigorous testing and smooth deployment to deliver production-ready solutions.',
    badge: 'from-gold to-gold-deep',
  },
]

export default function Process() {
  return (
    <section className="relative border-t border-white/5 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Working Process" title="My Working Process" />

        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.num} delay={i * 0.08} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="absolute -right-9 top-16 z-10 hidden md:block">
                    <ArrowRight className="h-6 w-6 text-brand/50" />
                  </div>
                )}
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand/40 hover:bg-white/[0.06]">
                  <div className="mb-4 inline-block">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.badge} font-display text-base font-bold text-white shadow-lg`}
                    >
                      {step.num}
                    </div>
                  </div>
                  <div className="mb-3">
                    <Icon className="h-9 w-9 text-brand-glow transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{step.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
