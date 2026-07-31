import { motion } from 'framer-motion'

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
}) {
  const offsets = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    scale: { y: 0, x: 0, scale: 0.8 },
    none: { y: 0, x: 0 },
  }
  const initial = { opacity: 0, ...offsets[direction] }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
