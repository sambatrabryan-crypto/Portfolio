import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

/* ============================================ */
/* DONNÉES TECHNIQUES (ne changent pas selon la langue) */
/* ============================================ */
const skillGroups = [
  {
    key: 'frontend',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    key: 'backend',
    skills: ['Node.js', 'Express.js', 'PHP', 'Python'],
  },
  {
    key: 'mobile',
    skills: ['Flutter', 'Dart', 'Java'],
  },
  {
    key: 'database',
    skills: ['MySQL', 'PostgreSQL', 'Firebase', 'SQL'],
  },
  {
    key: 'conception',
    skills: ['Merise', 'MCD / MLD / MPD', 'UML'],
  },
  {
    key: 'devops',
    skills: ['Git', 'Docker', 'Jenkins', 'SonarQube', 'Nexus', 'CI/CD'],
  },
  {
    key: 'observability',
    skills: ['ELK Stack', 'Elasticsearch', 'Logstash', 'Kibana'],
  },
  {
    key: 'systems',
    skills: ['Windows', 'Linux'],
  },
  {
    key: 'ai',
    skills: ['Intelligence artificielle'],
  },
]

/* ============================================ */
/* UTILITAIRES                                  */
/* ============================================ */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

function useInView(reduced) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (reduced || !el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  return [ref, visible]
}

/* ============================================ */
/* CARTE DE COMPÉTENCES                         */
/* ============================================ */
const borderMask = {
  WebkitMask:
    'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude',
}

function SkillCard({ group, title, index, reduced }) {
  const [ref, visible] = useInView(reduced)

  return (
    <div
      ref={ref}
      className={`transition duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: visible ? `${(index % 3) * 100}ms` : '0ms' }}
    >
      <div
        data-spot
        className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 transition duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
      >
        {/* Lueur de fond */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(320px circle at var(--x, -999px) var(--y, -999px), rgba(34,211,238,0.10), transparent 60%)',
          }}
        />

        {/* Liseré lumineux */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl p-px"
          style={{
            background:
              'radial-gradient(260px circle at var(--x, -999px) var(--y, -999px), rgba(34,211,238,0.7), transparent 60%)',
            ...borderMask,
          }}
        />

        <h3 className="relative text-xl font-semibold text-white">
          {title}
        </h3>

        <ul className="relative mt-5 flex flex-wrap gap-2">
          {group.skills.map((skill, i) => (
            <li
              key={skill}
              className="skill-pill rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300 transition-colors duration-300 hover:border-cyan-400/50 hover:text-cyan-300"
              style={
                visible
                  ? {
                      animation: `skill-pill-in .5s ${
                        250 + i * 60
                      }ms cubic-bezier(.2,.7,.2,1) both`,
                    }
                  : { opacity: 0 }
              }
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ============================================ */
/* SECTION COMPÉTENCES                          */
/* ============================================ */
function Skills() {
  const { t } = useLanguage()
  const reduced = usePrefersReducedMotion()
  const gridRef = useRef(null)

  const handlePointerMove = (e) => {
    if (reduced || e.pointerType !== 'mouse' || !gridRef.current) return
    gridRef.current.querySelectorAll('[data-spot]').forEach((card) => {
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--x', `${e.clientX - rect.left}px`)
      card.style.setProperty('--y', `${e.clientY - rect.top}px`)
    })
  }

  const handlePointerLeave = () => {
    if (!gridRef.current) return
    gridRef.current.querySelectorAll('[data-spot]').forEach((card) => {
      card.style.removeProperty('--x')
      card.style.removeProperty('--y')
    })
  }

  return (
    <section id="skills" className="bg-black px-6 py-24">
      <style>{`
        @keyframes skill-pill-in {
          from { opacity: 0; transform: translateY(8px) scale(.92); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .skill-pill { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            {t.skills.label}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            {t.skills.title}
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-gray-400">
            {t.skills.description}
          </p>
        </div>

        <div
          ref={gridRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group, index) => (
            <SkillCard
              key={group.key}
              group={group}
              title={t.skills.groups[group.key]}
              index={index}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills