import { Lightbulb, Code, Rocket, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

const STEPS = [
  {
    num: '01',
    icon: Lightbulb,
    title: 'Understand & Analyze',
    text: 'Gathering requirements and analyzing the problem to understand the best approach.',
    badge: 'from-purple-500 to-indigo-500',
  },
  {
    num: '02',
    icon: Code,
    title: 'Design & Develop',
    text: 'Creating clean, scalable code with best practices and modern technologies.',
    badge: 'from-pink-500 to-purple-500',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Test & Deploy',
    text: 'Rigorous testing and smooth deployment to deliver production-ready solutions.',
    badge: 'from-yellow-500 to-orange-500',
  },
]

export default function Process() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute top-20 left-10 w-16 h-16 bg-purple-200 rounded-full opacity-40" />
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-yellow-200 rounded-full opacity-40" />

      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-10">
          <span className="text-purple-600 font-bold text-sm tracking-wider uppercase">Working Process</span>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-2">My Working Process</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.num} delay={i * 0.1} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-16 -right-9 z-10">
                    <ArrowRight className="w-6 h-6 text-yellow-400" />
                  </div>
                )}
                <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="inline-block mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.badge} flex items-center justify-center text-white font-bold text-base shadow-lg`}
                    >
                      {step.num}
                    </div>
                  </div>
                  <div className="mb-3">
                    <Icon className="w-9 h-9 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
