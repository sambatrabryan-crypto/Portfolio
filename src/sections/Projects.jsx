import { useState, useEffect, useRef, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'
import projects from '../data/projects'

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

function Reveal({ children, delay = 0, reduced }) {
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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <div
      ref={ref}
      className={`transition duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

/* ============================================ */
/* LIGHTBOX                                     */
/* ============================================ */
function Lightbox({ images, currentIndex, setCurrentIndex, onClose, labels }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const touchStartX = useRef(null)
  const count = images.length

  const nextImage = useCallback(
    () => setCurrentIndex((prev) => (prev + 1) % count),
    [count, setCurrentIndex]
  )
  const prevImage = useCallback(
    () => setCurrentIndex((prev) => (prev - 1 + count) % count),
    [count, setCurrentIndex]
  )

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll('button')
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [onClose, nextImage, prevImage])

  useEffect(() => {
    if (count < 2) return
    ;[(currentIndex + 1) % count, (currentIndex - 1 + count) % count].forEach(
      (i) => {
        const img = new Image()
        img.src = images[i].src
      }
    )
  }, [currentIndex, count, images])

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null || count < 2) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 50) return
    if (dx < 0) nextImage()
    else prevImage()
  }

  const current = images[currentIndex]

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      className="lightbox-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label={labels.close}
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-cyan-400 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {count > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            prevImage()
          }}
          aria-label={labels.prev}
          className="absolute left-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-cyan-400 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      <img
        key={currentIndex}
        src={current.src}
        alt={current.alt}
        className="lightbox-image max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {count > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            nextImage()
          }}
          aria-label={labels.next}
          className="absolute right-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-cyan-400 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div className="absolute bottom-5 left-1/2 z-10 max-w-[90vw] -translate-x-1/2 rounded-full bg-white/10 px-5 py-2 text-center text-sm text-white backdrop-blur-sm">
        {current.alt}
      </div>
    </div>
  )
}

/* ============================================ */
/* GALERIE                                      */
/* ============================================ */
function ProjectGallery({ images, onImageClick, labels }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [failed, setFailed] = useState({})

  if (!images || images.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center bg-zinc-900">
        <span className="text-sm text-gray-500">{labels.comingSoon}</span>
      </div>
    )
  }

  const currentImage = images[currentIndex]
  const hasFailed = failed[currentIndex]

  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative h-64 overflow-hidden bg-zinc-900">
      {hasFailed ? (
        <div className="flex h-full items-center justify-center">
          <span className="text-sm text-gray-500">{labels.unavailable}</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onImageClick(currentIndex)}
          aria-label={`${labels.zoomIn} : ${currentImage.alt}`}
          className="block h-full w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cyan-400"
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            loading="lazy"
            onError={() => setFailed((prev) => ({ ...prev, [currentIndex]: true }))}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </button>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {!hasFailed && (
        <div className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
          </svg>
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            aria-label={labels.prev}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-cyan-400 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            aria-label={labels.next}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-cyan-400 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex(index)
              }}
              aria-label={`${labels.goTo} ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {!hasFailed && (
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
          </svg>
          {labels.zoom}
        </div>
      )}
    </div>
  )
}

/* ============================================ */
/* CARTE PROJET                                 */
/* ============================================ */
function ProjectCard({ project, reduced, onImageClick, labels }) {
  const cardRef = useRef(null)

  const handlePointerMove = (e) => {
    if (reduced || e.pointerType !== 'mouse') return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    el.style.setProperty('--ry', `${(px - 0.5) * 7}deg`)
    el.style.setProperty('--rx', `${(0.5 - py) * 7}deg`)
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }

  const handlePointerLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black hover:border-cyan-400/30"
      style={{
        transform: 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
        transition: 'transform 0.25s ease-out, border-color 0.3s',
      }}
    >
      {!reduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(34,211,238,0.10), transparent 60%)',
          }}
        />
      )}

      <ProjectGallery
        images={project.images}
        onImageClick={onImageClick}
        labels={labels}
      />

      <div className="flex flex-1 flex-col p-7">
        <p className="text-sm font-medium text-cyan-400">{project.category}</p>

        <h3 className="mt-2 text-2xl font-bold text-white">{project.title}</h3>

        <p className="mt-4 flex-1 leading-7 text-gray-400">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300"
            >
              {technology}
            </span>
          ))}
        </div>

        {(project.demo || project.github) && (
          <div className="relative z-20 mt-6 flex flex-wrap gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                {labels.viewDemo}
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                {labels.sourceCode}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

/* ============================================ */
/* SECTION PROJETS                              */
/* ============================================ */
function Projects() {
  const { t, lang } = useLanguage()
  const [lightbox, setLightbox] = useState(null)
  const reduced = usePrefersReducedMotion()

  // 🎯 Récupère les projets traduits selon la langue
  const localizedProjects = projects[lang] || projects.fr || projects

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const updateLightboxIndex = useCallback((updater) => {
    setLightbox((prev) => {
      if (!prev) return prev
      const index = typeof updater === 'function' ? updater(prev.index) : updater
      return { ...prev, index }
    })
  }, [])

  // Labels communs réutilisés
  const labels = {
    close: t.projects.close,
    prev: t.projects.prev,
    next: t.projects.next,
    goTo: t.projects.goTo,
    zoom: t.projects.zoom,
    zoomIn: t.projects.zoomIn,
    viewDemo: t.projects.viewDemo,
    sourceCode: t.projects.sourceCode,
    comingSoon: t.projects.comingSoon,
    unavailable: t.projects.unavailable,
  }

  return (
    <>
      <style>{`
        @keyframes lightbox-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lightbox-image-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .lightbox-backdrop { animation: lightbox-backdrop-in .25s ease-out both; }
        .lightbox-image { animation: lightbox-image-in .35s cubic-bezier(.2,.7,.2,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .lightbox-backdrop, .lightbox-image { animation: none; }
        }
      `}</style>

      <section id="projects" className="bg-zinc-950 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              {t.projects.label}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              {t.projects.title}
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-gray-400">
              {t.projects.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {localizedProjects.map((project, i) => (
              <Reveal
                key={project.slug ?? project.title}
                delay={(i % 2) * 120}
                reduced={reduced}
              >
                <ProjectCard
                  project={project}
                  reduced={reduced}
                  labels={labels}
                  onImageClick={(index) =>
                    setLightbox({ images: project.images, index })
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          setCurrentIndex={updateLightboxIndex}
          onClose={closeLightbox}
          labels={labels}
        />
      )}
    </>
  )
}

export default Projects