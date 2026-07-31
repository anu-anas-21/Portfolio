import { CodeXml, Sparkles, Target, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

const CARDS = [
  {
    icon: CodeXml,
    title: 'Backend Development',
    text: 'Building robust server-side applications with Java, Spring Boot, and RESTful APIs. Expert in creating scalable microservices.',
    cta: 'View Projects',
    href: '#projects',
    variant: 'light',
  },
  {
    icon: Sparkles,
    title: 'Full-Stack Development',
    text: 'End-to-end application development with React frontend and Spring Boot backend. Complete solution delivery.',
    cta: 'Explore More',
    href: '#projects',
    variant: 'dark',
  },
  {
    icon: Target,
    title: 'Problem Solving',
    text: 'Strong analytical skills with focus on clean, efficient code. Quick learner adapting to new technologies.',
    cta: 'Get in Touch',
    href: '#contact',
    variant: 'light',
  },
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-16 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-20 h-20 bg-yellow-400 rounded-full opacity-20" />
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-purple-400 rounded-full opacity-20" />

      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-10">
          <span className="text-purple-600 font-bold text-sm tracking-wider uppercase">About Me</span>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-2">
            Expertise Services! Let's Check it Out
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {CARDS.map((card, i) => {
            const Icon = card.icon
            const dark = card.variant === 'dark'
            return (
              <Reveal key={card.title} delay={i * 0.1}>
                <div
                  className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full ${
                    dark
                      ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
                      : 'bg-white'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      dark ? 'bg-white/20 backdrop-blur-sm' : i === 2 ? 'bg-yellow-100' : 'bg-purple-100'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        dark ? 'text-white' : i === 2 ? 'text-yellow-600' : 'text-purple-600'
                      }`}
                    />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${dark ? '' : 'text-slate-900'}`}>
                    {card.title}
                  </h3>
                  <p className={`text-sm mb-4 leading-relaxed ${dark ? 'text-white/90' : 'text-slate-600'}`}>
                    {card.text}
                  </p>
                  <a
                    href={card.href}
                    className={`font-semibold flex items-center gap-2 group w-fit ${
                      dark ? 'text-yellow-400' : 'text-purple-600'
                    }`}
                  >
                    {card.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
