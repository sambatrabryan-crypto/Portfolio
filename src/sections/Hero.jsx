import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

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

function useTypewriter(words, reduced, lang) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const first = useRef(true)

  // 🔄 Reset quand la langue change
  useEffect(() => {
    setText('')
    setIndex(0)
    setDeleting(false)
    first.current = true
  }, [lang])

  useEffect(() => {
    if (reduced) return
    const word = words[index]
    if (!word) return

    const complete = !deleting && text === word

    let delay = deleting ? 40 : 75
    if (complete) delay = 1700
    if (first.current) delay = 1100

    const timer = setTimeout(() => {
      first.current = false
      if (complete) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, index, words, reduced])

  return reduced ? words[0] : text
}

function Hero() {
  const { t, lang } = useLanguage()
  const reduced = usePrefersReducedMotion()
  const typed = useTypewriter(t.hero.words, reduced, lang)
  const sectionRef = useRef(null)
  const spotRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const spot = spotRef.current
    if (reduced || !section || !spot) return

    let targetX = section.clientWidth / 2
    let targetY = section.clientHeight / 2
    let x = targetX
    let y = targetY
    let raf

    const onMove = (e) => {
      const rect = section.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
    }

    const tick = () => {
      x += (targetX - x) * 0.08
      y += (targetY - y) * 0.08
      spot.style.background = `radial-gradient(520px circle at ${x}px ${y}px, rgba(34,211,238,0.13), transparent 60%)`
      raf = requestAnimationFrame(tick)
    }

    section.addEventListener('pointermove', onMove)
    tick()

    return () => {
      section.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  const gridMask = 'radial-gradient(ellipse at center, black 25%, transparent 75%)'

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 pt-20"
    >
      <style>{`
        @keyframes hero-rise { from { transform: translateY(110%); } to { transform: translateY(0); } }
        @keyframes hero-fade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes hero-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes hero-breathe { 0%, 100% { transform: scale(1); opacity: .7; } 50% { transform: scale(1.3); opacity: 1; } }
        @keyframes hero-blink { 50% { opacity: 0; } }
        @keyframes hero-scroll { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }

        .hero-rise   { display: inline-block; animation: hero-rise .9s cubic-bezier(.2,.7,.2,1) both; }
        .hero-fade   { animation: hero-fade .8s ease-out both; }
        .hero-line   { animation: hero-line .8s cubic-bezier(.2,.7,.2,1) both; }
        .hero-orb    { animation: hero-breathe 7s ease-in-out infinite; }
        .hero-cursor { animation: hero-blink 1s steps(1) infinite; }
        .hero-scroll { animation: hero-scroll 2.2s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .hero-rise, .hero-fade, .hero-line, .hero-orb, .hero-cursor { animation: none; }
          .hero-scroll { animation: none; opacity: 0; }
        }
      `}</style>

      {/* Grille discrète */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: gridMask,
          WebkitMaskImage: gridMask,
        }}
      />

      {/* Halo central */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="hero-orb h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Halo curseur */}
      <div
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-4xl">

          {/* Label pro */}
          <div
            className="hero-fade mb-8 flex items-center gap-4"
            style={{ animationDelay: '0s' }}
          >
            <span className="hero-line h-px w-12 origin-left bg-cyan-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400 sm:text-sm">
              {t.hero.label}
            </p>
          </div>

          {/* Titre avec typewriter */}
          <h1
            aria-label={`${t.hero.titleLine1} ${t.hero.words[0]}`}
            className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            <span aria-hidden="true">
              <span className="block overflow-hidden pb-2">
                <span className="hero-rise" style={{ animationDelay: '.15s' }}>
                  {t.hero.titleLine1}
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="hero-rise" style={{ animationDelay: '.3s' }}>
                  {t.hero.titleLine2 && `${t.hero.titleLine2} `}
                  <span className="text-cyan-400">{typed}</span>
                  <span className="hero-cursor ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] bg-cyan-400" />
                </span>
              </span>
            </span>
          </h1>

          {/* Description */}
          <p
            className="hero-fade mt-6 max-w-2xl text-lg leading-8 text-gray-400"
            style={{ animationDelay: '.8s' }}
          >
            {t.hero.description}
          </p>

          {/* Badges */}
          <ul className="mt-12 flex flex-wrap gap-3">
            {t.hero.skills.map((skill, i) => (
              <li
                key={skill}
                className="hero-fade rounded-full border border-white/10 px-4 py-1.5 text-sm text-gray-300 transition-colors duration-300 hover:border-cyan-400/60 hover:text-cyan-300"
                style={{ animationDelay: `${1 + i * 0.1}s` }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden h-12 w-px -translate-x-1/2 overflow-hidden bg-white/10 sm:block"
      >
        <span className="hero-scroll block h-full w-full bg-cyan-400" />
      </div>
    </section>
  )
}

export default Hero