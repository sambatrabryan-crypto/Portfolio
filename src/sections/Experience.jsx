import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

/* ============================================ */
/* DONNÉES — Expériences par langue             */
/* ============================================ */
const experiences = {
  fr: [
    {
      title: "Stage — Europ'Alu",
      subtitle: 'Développement informatique',
      location: 'Antananarivo',
      period: '',
      description:
        "Conception et développement d'un système de gestion des visiteurs (Web & Mobile) destiné à digitaliser l'accueil et améliorer le suivi des visiteurs au sein de l'entreprise.",
      technologies: [
        'React',
        'Node.js',
        'Express.js',
        'Flutter',
        'PostgreSQL',
        'Firebase',
        'ELK Stack',
      ],
      active: true,
    },
    {
      title: "Stage — Ministère de l'Enseignement Supérieur",
      subtitle: 'Développement informatique',
      location: 'Antananarivo',
      period: '',
      description:
        "Création et réalisation d'une application de gestion des stocks pour le Ministère de l'Enseignement Supérieur et de la Recherche Scientifique.",
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS'],
      active: false,
    },
    {
      title: 'Projets personnels',
      subtitle: 'Développement Web, Backend & IA',
      location: '',
      period: '',
      description:
        "Développement de projets personnels permettant d'explorer différentes technologies, notamment FastAPI, Python, PostgreSQL, Docker et les solutions basées sur l'intelligence artificielle.",
      technologies: ['Python', 'FastAPI', 'Docker', 'PostgreSQL'],
      active: false,
    },
  ],

  en: [
    {
      title: "Internship — Europ'Alu",
      subtitle: 'Software development',
      location: 'Antananarivo',
      period: '',
      description:
        "Designed and developed a visitor management system (Web & Mobile) to digitize reception and improve visitor tracking within the company.",
      technologies: [
        'React',
        'Node.js',
        'Express.js',
        'Flutter',
        'PostgreSQL',
        'Firebase',
        'ELK Stack',
      ],
      active: true,
    },
    {
      title: 'Internship — Ministry of Higher Education',
      subtitle: 'Software development',
      location: 'Antananarivo',
      period: '',
      description:
        'Created and developed a stock management application for the Ministry of Higher Education and Scientific Research.',
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS'],
      active: false,
    },
    {
      title: 'Personal projects',
      subtitle: 'Web, Backend & AI development',
      location: '',
      period: '',
      description:
        'Developed personal projects to explore various technologies including FastAPI, Python, PostgreSQL, Docker, and AI-based solutions.',
      technologies: ['Python', 'FastAPI', 'Docker', 'PostgreSQL'],
      active: false,
    },
  ],
}

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
/* ÉLÉMENT DE LA TIMELINE                       */
/* ============================================ */
function ExperienceItem({ exp, reached, isLast, reduced, setItemRef }) {
  const [contentRef, visible] = useInView(reduced)

  return (
    <li ref={setItemRef} className={`relative ${isLast ? '' : 'pb-12'}`}>
      {/* Point sur la timeline */}
      <div
        aria-hidden="true"
        className="absolute -left-[40.5px] top-1 h-4 w-4"
      >
        {exp.active && (
          <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/50 motion-reduce:animate-none" />
        )}
        <span
          className={`relative block h-full w-full rounded-full border-4 border-black transition-all duration-500 ${
            reached
              ? 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]'
              : 'bg-gray-600'
          }`}
        />
      </div>

      {/* Contenu */}
      <div
        ref={contentRef}
        className={`transition duration-700 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        {/* En-tête */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <h3 className="text-2xl font-bold text-white">{exp.title}</h3>

          {(exp.period || exp.location) && (
            <div className="text-sm text-gray-400 sm:text-right">
              {exp.period && <p>{exp.period}</p>}
              {exp.location && <p>{exp.location}</p>}
            </div>
          )}
        </div>

        {/* Sous-titre */}
        <p className="mt-2 text-cyan-400">{exp.subtitle}</p>

        {/* Description */}
        <p className="mt-5 max-w-3xl leading-7 text-gray-400">
          {exp.description}
        </p>

        {/* Technologies */}
        <ul className="mt-5 flex flex-wrap gap-2">
          {exp.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 transition-colors duration-300 hover:border-cyan-400/50 hover:text-cyan-300"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

/* ============================================ */
/* SECTION EXPÉRIENCE                           */
/* ============================================ */
function Experience() {
  const { t, lang } = useLanguage()
  const reduced = usePrefersReducedMotion()
  const listRef = useRef(null)
  const lineRef = useRef(null)
  const itemRefs = useRef([])

  // 🎯 Récupère les expériences traduites selon la langue
  const localizedExperiences = experiences[lang] || experiences.fr

  const [reached, setReached] = useState(() =>
    localizedExperiences.map((e) => e.active)
  )

  // 🔄 Reset quand la langue change
  useEffect(() => {
    setReached(localizedExperiences.map((e) => e.active))
  }, [lang, localizedExperiences])

  /* Le trait cyan se remplit au fil du défilement */
  useEffect(() => {
    if (reduced) {
      setReached(localizedExperiences.map((e) => e.active))
      return
    }

    let raf = 0

    const update = () => {
      raf = 0
      const list = listRef.current
      if (!list) return

      const rect = list.getBoundingClientRect()
      const y = window.innerHeight * 0.55 - rect.top
      const clamped = Math.min(Math.max(y, 0), rect.height)

      if (lineRef.current && rect.height > 0) {
        lineRef.current.style.transform = `scaleY(${clamped / rect.height})`
      }

      const next = localizedExperiences.map((_, i) => {
        const el = itemRefs.current[i]
        return el ? el.offsetTop + 12 <= y : false
      })

      setReached((prev) =>
        prev.length === next.length && prev.every((v, i) => v === next[i])
          ? prev
          : next
      )
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced, localizedExperiences])

  return (
    <section id="experience" className="bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            {t.experience.label}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            {t.experience.title}
          </h2>
        </div>

        <ol ref={listRef} className="relative border-l border-white/10 pl-8">
          {/* Trait de progression */}
          {!reduced && (
            <div
              ref={lineRef}
              aria-hidden="true"
              className="absolute -left-px top-0 h-full w-px origin-top bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
              style={{ transform: 'scaleY(0)' }}
            />
          )}

          {localizedExperiences.map((exp, index) => (
            <ExperienceItem
              key={exp.title}
              exp={exp}
              reached={reached[index]}
              isLast={index === localizedExperiences.length - 1}
              reduced={reduced}
              setItemRef={(el) => {
                itemRefs.current[index] = el
              }}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experience