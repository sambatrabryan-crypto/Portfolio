import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

/* ============================================ */
/* DONNÉES                                      */
/* ============================================ */
const BRAND = 'RAKOTOARIVELO Fiainan-tsambatra Bryann'
const GITHUB_URL = 'https://github.com/sambatrabryan-crypto'
const LINKEDIN_URL = 'https://www.linkedin.com/in/bryan-sambatra-5abb4a38b'

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400'

/* ============================================ */
/* ICÔNES                                       */
/* ============================================ */
const GitHubIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.94 3.2 9.13 7.65 10.61.56.1.77-.24.77-.54v-1.9c-3.11.68-3.77-1.5-3.77-1.5-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.49-.28-5.1-1.24-5.1-5.53 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.09 1.15a10.7 10.7 0 0 1 5.62 0c2.15-1.45 3.09-1.15 3.09-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.3-2.62 5.24-5.12 5.52.4.35.76 1.04.76 2.1v3.11c0 .3.2.65.78.54 4.44-1.49 7.64-5.67 7.64-10.61C23.25 5.48 18.27.5 12 .5z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const ArrowIcon = () => (
  <svg
    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

/* ============================================ */
/* NAVBAR                                       */
/* ============================================ */
function Navbar({ currentPage, onNavigate }) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false })

  const progressRef = useRef(null)
  const linksRef = useRef(null)
  const itemRefs = useRef({})

  // Liens traduits
  const LINKS = [
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'experience', label: t.nav.experience },
    { id: 'cv', label: t.nav.cv },
  ]

  const MOBILE_LINKS = [{ id: 'home', label: t.nav.home || 'Accueil' }, ...LINKS]

  const socials = [
    { label: 'GitHub', href: GITHUB_URL, icon: <GitHubIcon /> },
    ...(LINKEDIN_URL
      ? [{ label: 'LinkedIn', href: LINKEDIN_URL, icon: <LinkedInIcon /> }]
      : []),
  ]

  const handleNavigate = (page) => {
    onNavigate(page)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* Fond de la barre + barre de progression */
  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const y = window.scrollY
      setScrolled(y > 20)

      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
      }
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
  }, [currentPage])

  /* Indicateur glissant sous le lien actif */
  useLayoutEffect(() => {
    const measure = () => {
      const el = itemRefs.current[currentPage]
      if (!el) {
        setIndicator((prev) => (prev.visible ? { ...prev, visible: false } : prev))
        return
      }
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, visible: true })
    }

    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready?.then(measure)

    return () => window.removeEventListener('resize', measure)
  }, [currentPage, t])

  /* Menu mobile : Échap ferme */
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => {
      if (e.matches) setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    mq.addEventListener('change', onChange)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      mq.removeEventListener('change', onChange)
    }
  }, [menuOpen])

  return (
    <>
      {menuOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        aria-label="Navigation principale"
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'border-b border-white/10 bg-black/70 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl'
            : 'border-b border-transparent bg-black/40 backdrop-blur-md'
        }`}
      >
        <div
          ref={progressRef}
          aria-hidden="true"
          className="absolute -bottom-px left-0 h-px w-full origin-left bg-cyan-400"
          style={{ transform: 'scaleX(0)' }}
        />

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          {/* Logo — sans truncate, ton nom s'affiche en entier */}
          <button
            onClick={() => handleNavigate('home')}
            aria-label={`${BRAND} — retour à l'accueil`}
            className={`group relative shrink-0 rounded-md text-sm font-bold tracking-tight text-white sm:text-base lg:text-lg ${focusRing}`}
          >
            <span className="relative z-10 block">
              {BRAND}
              <span className="text-cyan-400">.</span>
            </span>

            <span className="absolute -inset-2 -z-0 rounded-full bg-cyan-400/0 blur-xl transition-all duration-500 group-hover:bg-cyan-400/25" />
          </button>

          {/* ============================= */}
          {/* NAVIGATION DESKTOP            */}
          {/* ============================= */}
          <div className="hidden items-center gap-1 lg:flex">
            <div ref={linksRef} className="relative flex items-center gap-1">
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-0 h-full rounded-full bg-white/10 transition-all duration-300 ease-out motion-reduce:transition-none ${
                  indicator.visible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ left: indicator.left, width: indicator.width }}
              >
                <span className="absolute bottom-1 left-1/2 h-0.5 w-1/2 -translate-x-1/2 rounded-full bg-cyan-400" />
              </span>

              {LINKS.map((link) => {
                const isActive = currentPage === link.id
                return (
                  <button
                    key={link.id}
                    ref={(el) => {
                      itemRefs.current[link.id] = el
                    }}
                    onClick={() => handleNavigate(link.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative rounded-full px-3 py-2 text-sm transition-colors duration-300 ${focusRing} ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                )
              })}
            </div>

            {/* Réseaux */}
            <div className="ml-2 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-cyan-400/40 hover:text-cyan-400 ${focusRing}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Contact */}
            <button
              onClick={() => handleNavigate('contact')}
              aria-current={currentPage === 'contact' ? 'page' : undefined}
              className={`group ml-2 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-black transition duration-300 hover:bg-cyan-300 ${focusRing} ${
                currentPage === 'contact'
                  ? 'ring-2 ring-cyan-400/40 ring-offset-2 ring-offset-black'
                  : ''
              }`}
            >
              {t.nav.contact}
              <ArrowIcon />
            </button>

            {/* 🌐 LanguageSwitcher — EN DERNIER */}
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* ============================= */}
          {/* BOUTON MENU MOBILE            */}
          {/* ============================= */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />

            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white ${focusRing}`}
            >
              <span className="relative block h-3.5 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                    menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                    menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* ============================= */}
        {/* MENU MOBILE                   */}
        {/* ============================= */}
        <div
          id="mobile-menu"
          className={`absolute left-0 right-0 top-full border-b border-white/10 bg-black/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
            menuOpen
              ? 'visible translate-y-0 opacity-100'
              : 'pointer-events-none invisible -translate-y-2 opacity-0'
          }`}
        >
          <div className="mx-auto max-w-6xl px-6 py-4">
            <ul className="space-y-1">
              {MOBILE_LINKS.map((link) => {
                const isActive = currentPage === link.id
                return (
                  <li key={link.id}>
                    <button
                      onClick={() => handleNavigate(link.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base transition-colors ${focusRing} ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span
                        className={`h-5 w-0.5 rounded-full transition-colors ${
                          isActive ? 'bg-cyan-400' : 'bg-transparent'
                        }`}
                        aria-hidden="true"
                      />
                      {link.label}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => handleNavigate('contact')}
                className={`group flex flex-1 items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 ${focusRing}`}
              >
                {t.nav.contact}
                <ArrowIcon />
              </button>

              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-400 ${focusRing}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar