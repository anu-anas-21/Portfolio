import { ArrowRight, Mail } from 'lucide-react'
import Reveal from './Reveal'
import { GithubIcon, LinkedinIcon } from './icons'
import profile from '../assets/profile.jpg'

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700"
    >
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-20 right-32 w-16 h-16 text-yellow-400" viewBox="0 0 100 100">
          <path d="M10 50 Q 25 25, 50 50 T 90 50" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="50" cy="50" r="8" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-32 left-20 w-20 h-20 text-white/30" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" stroke="currentColor" strokeWidth="3" fill="none" />
        </svg>
        <svg className="absolute top-40 left-1/4 w-12 h-12 text-pink-400" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="5,5" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <Reveal direction="left" className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-xs font-medium text-white">Open to Opportunities</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
              Hello, I'm<span className="block mt-1">Mohammed Anas A T</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 font-medium mb-3">Full Stack Developer</p>

            <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
              Full Stack Developer with hands-on production experience building web platforms end-to-end
              using Java, Spring Boot, React, Next.js, and Node.js. Currently at Beverse, delivering
              full-stack membership, admissions, and assessment platforms.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-6 py-3 rounded-full text-sm font-semibold shadow-lg shadow-yellow-500/30 transition-colors"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-purple-600 px-6 py-3 rounded-full text-sm font-semibold transition-colors"
              >
                Hire Me
              </a>
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <a
                href="mailto:anasanu0174@gmail.com"
                className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-yellow-400 text-white hover:text-slate-900 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/anu-anas-21"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-yellow-400 text-white hover:text-slate-900 transition-all duration-300"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/anu-anas"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-yellow-400 text-white hover:text-slate-900 transition-all duration-300"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

          <Reveal direction="scale" className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 -m-3 rounded-full border-4 border-yellow-400" />
              <div className="absolute inset-0 -m-6 rounded-full border-4 border-dashed border-white/30 animate-spin-slow" />
              <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-400 p-2 shadow-2xl shadow-yellow-500/30">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img src={profile} alt="Mohammed Anas A T" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 bg-white rounded-xl px-4 py-2 shadow-xl">
                <span className="text-xs font-bold text-purple-600">Full Stack Developer</span>
              </div>
              <div className="absolute -bottom-2 -left-2 bg-yellow-400 rounded-xl px-4 py-2 shadow-xl">
                <span className="text-xs font-bold text-slate-900">MCA Graduate</span>
              </div>
              <div className="absolute -top-6 left-1/4 w-3 h-3 bg-pink-400 rounded-full" />
              <div className="absolute -bottom-6 right-1/4 w-4 h-4 bg-yellow-300 rounded-full" />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 rounded-full border-2 border-white/50 flex items-start justify-center p-1.5">
          <div className="w-1 h-1 rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  )
}
