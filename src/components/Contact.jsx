import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

// Web3Forms (https://web3forms.com) — delivers submissions straight to
// anasanu0174@gmail.com with no backend required.
const WEB3FORMS_ACCESS_KEY = '3b400a63-a022-46d2-803b-928d5dcf54a2'

const CONTACT_ITEMS = [
  { icon: Mail, label: 'Email', value: 'anasanu0174@gmail.com', href: 'mailto:anasanu0174@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+971 58 981 4988', href: 'tel:+971589814988' },
  {
    icon: MapPin,
    label: 'Current Location',
    value: 'Bangalore, India',
    href: null,
    note: 'Open to relocating to the UAE',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio inquiry from ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Request failed')
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const field =
    'w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder-white/30 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30'

  return (
    <section id="contact" className="relative scroll-mt-24 border-t border-white/5 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 50% 45% at 25% 50%, rgba(139,92,246,0.16), transparent 65%), radial-gradient(ellipse 40% 40% at 85% 60%, rgba(250,204,21,0.07), transparent 65%)',
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Get a Project"
          title="Let's Talk"
          subtitle="Have a project in mind or want to discuss opportunities? Feel free to reach out!"
        />

        <Reveal direction="left" className="mb-6">
          <h3 className="mb-3 font-display text-xl font-bold text-white">Let&apos;s Connect</h3>
          <p className="max-w-2xl text-sm leading-relaxed text-white/60">
            I&apos;m currently looking for new opportunities in software development. Whether you
            have a question, a project idea, or just want to say hello, I&apos;d love to hear from
            you!
          </p>
        </Reveal>

        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          <Reveal direction="left" className="h-full">
            <div className="flex h-full flex-col justify-between gap-3">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon
                const Wrapper = item.href ? 'a' : 'div'
                return (
                  <Wrapper
                    key={item.label}
                    href={item.href || undefined}
                    className={`group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-300 ${
                      item.href ? 'hover:border-brand/40 hover:bg-white/[0.06]' : ''
                    }`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-deep text-white transition-transform group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/45">{item.label}</p>
                      <p className="text-sm font-semibold text-white">{item.value}</p>
                      {item.note && <p className="mt-0.5 text-xs text-gold">{item.note}</p>}
                    </div>
                  </Wrapper>
                )
              })}

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <p className="mb-1 text-xs font-semibold text-gold">Home Address</p>
                <p className="text-sm text-white">Malappuram, Kerala, India</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" className="h-full">
            <form
              onSubmit={handleSubmit}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-ink-700/60 p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            >
              <div className="flex flex-1 flex-col space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">Your Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={`${field} h-11`}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className={`${field} h-11`}
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label className="mb-1.5 block text-sm font-medium text-white/70">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    required
                    className={`${field} min-h-[90px] flex-1 resize-none py-2.5`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-deep text-base font-bold text-white shadow-glow transition-all duration-300 hover:shadow-[0_0_50px_-6px_rgba(139,92,246,0.85)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <p className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Thanks! Your message has been sent — I&apos;ll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="flex items-center gap-2 text-sm font-medium text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Something went wrong. Please email me directly at anasanu0174@gmail.com.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
