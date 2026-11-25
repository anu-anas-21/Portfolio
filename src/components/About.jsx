import { CodeXml, Sparkles, Target, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const CARDS = [
  {
    icon: CodeXml,
    title: 'Backend Development',
    text: 'Building robust server-side applications with Java, Spring Boot, Node.js and RESTful APIs. Experienced in scalable, multi-tenant architectures.',
    cta: 'View Projects',
    href: '#projects',
    accent: 'brand',
  },
  {
    icon: Sparkles,
    title: 'Full-Stack Development',
    text: 'End-to-end delivery with React and Next.js on the front, Spring Boot and Node.js behind it — database design through to deployment.',
    cta: 'Explore More',
    href: '#projects',
    accent: 'featured',
  },
  {
    icon: Target,
    title: 'Problem Solving',
    text: 'Strong analytical skills with a focus on clean, efficient code. Quick learner, comfortable adapting to unfamiliar stacks under deadline.',
    cta: 'Get in Touch',
    href: '#contact',
    accent: 'gold',
  },
]

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 border-t border-white/5 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="About Me" title="Expertise Services! Let's Check it Out" />

        <div className="grid gap-5 md:grid-cols-3">
          {CARDS.map((card, i) => {
            const Icon = card.icon
            const featured = card.accent === 'featured'
            return (
              <Reveal key={card.title} delay={i * 0.08}>
                <div
                  className={`group h-full rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 ${
                    featured
                      ? 'border-brand/40 bg-gradient-to-br from-brand/20 to-brand-deep/10 shadow-glow'
                      : 'border-white/10 bg-white/[0.03] hover:border-brand/40 hover:bg-white/[0.06]'
                  }`}
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                      card.accent === 'gold'
                        ? 'bg-gold/15 text-gold'
                        : featured
                          ? 'bg-white/10 text-white'
                          : 'bg-brand/15 text-brand-glow'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-white">{card.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-white/60">{card.text}</p>
                  <a
                    href={card.href}
                    className={`group/link flex w-fit items-center gap-2 text-sm font-semibold ${
                      card.accent === 'gold' ? 'text-gold' : 'text-brand-glow'
                    }`}
                  >
                    {card.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
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
