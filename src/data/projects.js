export const PROJECTS = [
  {
    title: 'Nexyu',
    period: '2026 · Beverse',
    description:
      'A multi-tenant SaaS platform for Beverse Health that unifies lead capture, payments and candidate operations across three modules on one shared shell, identity and permission model. Every stage change atomically sets an SLA deadline, round-robin assigns an owner, opens a task and queues a notification — with Postgres row-level security isolating tenants at the database layer rather than in application code.',
    highlights: ['Multi-tenant RLS', 'Workflow automation', 'SLA tracking', 'Signed webhooks'],
    tech: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Prisma 7', 'Auth.js', 'Tailwind CSS'],
    icon: 'workflow',
    gradient: 'from-indigo-500 to-violet-600',
    demo: 'https://nexyu-flow.vercel.app',
  },
  {
    title: 'Beverse Bot',
    period: '2026 · Beverse',
    description:
      'A candidate self-service chatbot on Telegram and WhatsApp. Questions are answered by Claude, grounded strictly in the organisation’s own FAQ content with a deterministic keyword fallback; candidates verify by one-time email code to check application status, and can escalate to a human, which opens a round-robin assigned task in the CRM.',
    highlights: ['Telegram & WhatsApp', 'AI-grounded FAQ', 'OTP verification', 'Human escalation'],
    tech: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'Claude API', 'Vitest'],
    icon: 'bot',
    gradient: 'from-sky-500 to-cyan-600',
  },
  {
    title: 'Join Beverse',
    period: '2026 · Beverse',
    description:
      'The brand site tying Edooka, Beverse Health and Beverse School into a single ecosystem narrative — an animated one-page Next.js build with a motion-driven hero, rotating ecosystem orbit, glassmorphic cards and animated impact counters.',
    highlights: ['Animated one-pager', 'Ecosystem orbit', 'Glassmorphism', 'Motion design'],
    tech: ['Next.js 16', 'TypeScript', 'React 19', 'Tailwind CSS', 'Framer Motion'],
    icon: 'globe',
    gradient: 'from-lime-500 to-emerald-600',
    demo: 'https://joinbeverse.vercel.app',
  },
  {
    title: 'RollOut Café Platform',
    period: 'Mar – Apr 2026',
    description:
      'A full-stack platform that combines an e-commerce storefront for cycling gear, apparel and nutrition with café ordering and community event listings — a Spring Boot monolith over MySQL, served to a React and Vite frontend.',
    highlights: ['E-commerce storefront', 'Café ordering', 'Community events', 'REST API'],
    tech: ['Java 17', 'Spring Boot 3', 'Spring Data JPA', 'MySQL', 'React', 'Vite'],
    icon: 'shop',
    gradient: 'from-emerald-500 to-teal-600',
    code: 'https://github.com/anu-anas-21/rollout-platform',
    demo: 'https://rolloutcafe.netlify.app/',
  },
  {
    title: 'Cafe Management System',
    period: 'Jan 2026',
    description:
      'An end-to-end hospitality management system integrating a React frontend with a Spring Boot backend for contactless customer ordering and real-time administrative oversight.',
    highlights: ['Contactless ordering', 'Real-time management', 'Admin dashboard', 'Digital workflow'],
    tech: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'React'],
    icon: 'coffee',
    gradient: 'from-amber-600 to-orange-600',
    code: 'https://github.com/anu-anas-21/cafe-management',
    demo: 'https://down-town-cafe.vercel.app/',
  },
  {
    title: 'AI Virtual Board',
    period: 'Nov 2023 – May 2024',
    description:
      'A virtual drawing board enabling real-time drawing, erasing, and brush control through hand-gesture recognition — no physical input device required.',
    highlights: ['Hand-gesture recognition', 'Real-time drawing', 'Brush control', 'No hardware needed'],
    tech: ['Python', 'OpenCV', 'MediaPipe'],
    icon: 'pen',
    gradient: 'from-violet-500 to-purple-500',
    code: 'https://github.com/anu-anas-21/Virtual-Board',
  },
  {
    title: 'City 360',
    period: 'Jun 2023 – Nov 2023',
    description:
      'A city-information web app consolidating rooms, events, and local transport (buses) into a single platform for newcomers to a city.',
    highlights: ['Room listings', 'Local events', 'Bus transport info', 'Newcomer friendly'],
    tech: [],
    icon: 'building',
    gradient: 'from-blue-500 to-cyan-500',
    code: 'https://github.com/anu-anas-21/City360',
  },
  {
    title: 'Get-it-Done',
    period: 'Nov 2021 – Mar 2022',
    description:
      'A construction services web application centralizing management of specialized trades (plumbing, mechanics, architecture) to improve project efficiency and team collaboration.',
    highlights: ['Trade management', 'Project efficiency', 'Team collaboration', 'Centralized platform'],
    tech: ['React', 'CSS', 'Firebase', 'JavaScript'],
    icon: 'check',
    gradient: 'from-orange-500 to-amber-500',
    code: 'https://github.com/anu-anas-21/Get-it-Done',
  },
]
