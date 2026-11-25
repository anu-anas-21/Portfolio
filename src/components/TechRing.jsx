/**
 * A rotating 3D carousel of the core stack.
 *
 * Deliberately CSS-only: one `rotateY` keyframe on a `preserve-3d` parent,
 * which the compositor handles on the GPU. No JavaScript runs per frame, so
 * this costs essentially nothing next to the WebGL scene behind it.
 */

const TECHS = [
  'Java',
  'Spring Boot',
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'PostgreSQL',
  'MySQL',
  'Docker',
  'Tailwind',
  'Prisma',
  'AWS',
]

export default function TechRing() {
  const count = TECHS.length
  const angle = 360 / count

  return (
    <div className="tech-ring-stage" aria-hidden="true">
      <div className="tech-ring">
        {TECHS.map((tech, i) => (
          <span
            key={tech}
            className="tech-ring__item"
            style={{ transform: `rotateY(${i * angle}deg) translateZ(var(--ring-r))` }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
