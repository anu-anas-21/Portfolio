import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import Reveal from './Reveal'

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

  return (
    <section
      id="contact"
      className="scroll-mt-20 py-16 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-10">
          <span className="text-yellow-400 font-bold text-sm tracking-wider uppercase">Get a Project</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white mt-2">Let's Talk</h2>
          <p className="text-white/80 mt-3 max-w-2xl mx-auto text-base">
            Have a project in mind or want to discuss opportunities? Feel free to reach out!
          </p>
        </Reveal>

        <Reveal direction="left" className="mb-6">
          <h3 className="text-xl font-bold text-white mb-3">Let's Connect</h3>
          <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
            I'm currently looking for new opportunities in software development. Whether you have a
            question, a project idea, or just want to say hello, I'd love to hear from you!
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <Reveal direction="left" className="h-full">
            <div className="h-full flex flex-col justify-between gap-3">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon
                const Wrapper = item.href ? 'a' : 'div'
                return (
                  <Wrapper
                    key={item.label}
                    href={item.href || undefined}
                    className={`flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 group ${
                      item.href ? 'hover:bg-white/20 hover:shadow-lg' : ''
                    }`}
                  >
                    <div className="w-11 h-11 rounded-lg bg-yellow-400 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/70">{item.label}</p>
                      <p className="text-sm font-semibold text-white">{item.value}</p>
                      {item.note && <p className="text-xs text-yellow-400 mt-0.5">{item.note}</p>}
                    </div>
                  </Wrapper>
                )
              })}

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-xs text-yellow-400 font-semibold mb-1">Home Address</p>
                <p className="text-sm text-white">Malappuram, Kerala, India</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" className="h-full">
            <form onSubmit={handleSubmit} className="h-full flex flex-col bg-white rounded-2xl p-6 shadow-2xl">
              <div className="space-y-4 flex-1 flex flex-col">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    required
                    className="w-full flex-1 min-h-[90px] px-4 py-2.5 rounded-lg border border-slate-200 text-sm shadow-sm transition-colors resize-none focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <p className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Thanks! Your message has been sent — I'll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="flex items-center gap-2 text-sm text-red-600 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
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
