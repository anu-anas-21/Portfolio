import Reveal from './Reveal'

/**
 * Shared section header so every section announces itself the same way:
 * small brand eyebrow, large display title, gradient rule.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', className = '' }) {
  const centered = align === 'center'
  return (
    <Reveal className={`${centered ? 'text-center' : 'text-left'} mb-10 ${className}`}>
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-light">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <div
        className={`mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-brand via-brand-light to-gold ${
          centered ? 'mx-auto' : ''
        }`}
      />
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-sm text-white/60 ${centered ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
