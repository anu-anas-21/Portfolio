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

      <div className="w-full max-w-6xl mx-auto px-6 py-8 sm:py-10 lg:py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-center">
          <Reveal direction="left" className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-3">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-xs font-medium text-white">Open to Opportunities</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
              Hello, I'm<span className="block mt-0.5">Mohammed Anas A T</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-2">
              Full Stack Developer
            </p>

            <p className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed mb-4 max-w-lg mx-auto lg:mx-0">
              Full Stack Developer with hands-on production experience building web platforms end-to-end
              using Java, Spring Boot, React, Next.js, and Node.js. Currently at Beverse, delivering
              full-stack membership, admissions, and assessment platforms.
            </p>

            <div className="flex flex-row gap-2 sm:gap-3 justify-center lg:justify-start mb-4">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg shadow-yellow-500/30 transition-colors"
              >
                View Projects
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-purple-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-colors"
              >
                Hire Me
              </a>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
              <a
                href="mailto:anasanu0174@gmail.com"
                className="p-2 sm:p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-yellow-400 text-white hover:text-slate-900 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/anu-anas-21"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-yellow-400 text-white hover:text-slate-900 transition-all duration-300"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/anu-anas"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-yellow-400 text-white hover:text-slate-900 transition-all duration-300"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

          <Reveal direction="scale" className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 -m-2 sm:-m-3 rounded-full border-4 border-yellow-400" />
              <div className="absolute inset-0 -m-4 sm:-m-6 rounded-full border-4 border-dashed border-white/30 animate-spin-slow" />
              <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-400 p-2 shadow-2xl shadow-yellow-500/30">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img src={profile} alt="Mohammed Anas A T" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 bg-white rounded-lg sm:rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-xl animate-float">
                <span className="text-[10px] sm:text-xs font-bold text-purple-600 whitespace-nowrap">
                  Full Stack Developer
                </span>
              </div>
              <div
                className="absolute -bottom-2 -left-2 bg-yellow-400 rounded-lg sm:rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-xl animate-float"
                style={{ animationDelay: '1.4s' }}
              >
                <span className="text-[10px] sm:text-xs font-bold text-slate-900 whitespace-nowrap">
                  MCA Graduate
                </span>
              </div>
              <div className="absolute -top-6 left-1/4 w-3 h-3 bg-pink-400 rounded-full" />
              <div className="absolute -bottom-6 right-1/4 w-4 h-4 bg-yellow-300 rounded-full" />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div
          className="w-5 h-8 rounded-full border-2 border-white/50 flex items-start justify-center p-1.5 animate-float"
          style={{ animationDuration: '1.8s' }}
        >
          <div className="w-1 h-1 rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  )
}
