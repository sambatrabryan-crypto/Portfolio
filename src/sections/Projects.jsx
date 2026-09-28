import { useState, useEffect } from 'react'
import projects from '../data/projects'

/* ============================================ */
/* LIGHTBOX — Affiche l'image en grand          */
/* ============================================ */
function Lightbox({ images, currentIndex, setCurrentIndex, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % images.length)
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [images.length, onClose, setCurrentIndex])

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Bouton fermer */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-cyan-400 hover:text-black"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Compteur */}
      <div className="absolute left-5 top-5 z-10 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Flèche gauche */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            prevImage()
          }}
          aria-label="Image précédente"
          className="absolute left-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-cyan-400 hover:text-black"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image principale */}
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Flèche droite */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            nextImage()
          }}
          aria-label="Image suivante"
          className="absolute right-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-cyan-400 hover:text-black"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Légende */}
      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-sm">
        {images[currentIndex].alt}
      </div>
    </div>
  )
}

/* ============================================ */
/* GALERIE — Miniature dans la carte projet     */
/* ============================================ */
function ProjectGallery({ images, onImageClick }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center bg-zinc-900">
        <span className="text-sm uppercase tracking-[0.2em] text-gray-600">
          Aperçu à venir
        </span>
      </div>
    )
  }

  const currentImage = images[currentIndex]

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
      {/* Image cliquable */}
      <img
        src={currentImage.src}
        alt={currentImage.alt}
        onClick={() => onImageClick(currentIndex)}
        className="h-full w-full cursor-zoom-in object-cover object-top transition duration-500 group-hover:scale-105"
        onError={(e) => {
          console.error('❌ Image introuvable :', currentImage.src)
        }}
      />

      {/* Overlay dégradé */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Icône zoom */}
      <div className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
        </svg>
      </div>

      {/* Flèches */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-cyan-400 hover:text-black"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-cyan-400 hover:text-black"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Points */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex(index)
              }}
              aria-label={`Aller à l'image ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Compteur */}
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}

/* ============================================ */
/* SECTION PROJETS                              */
/* ============================================ */
function Projects() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      <section id="projects" className="bg-zinc-950 px-6 py-24">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              Projets
            </p>

            <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Ce que je construis.
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-gray-400">
              Quelques projets qui illustrent mon expérience en développement
              web, mobile, backend et algorithmique.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
              >
                <ProjectGallery
                  images={project.images}
                  onImageClick={(index) =>
                    setLightbox({ images: project.images, index })
                  }
                />

                <div className="flex flex-1 flex-col p-7">
                  <p className="text-sm font-medium text-cyan-400">
                    {project.category}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {project.title}
                  </h3>

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
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          setCurrentIndex={(updater) => {
            setLightbox((prev) => {
              if (!prev) return prev
              const newIndex =
                typeof updater === 'function' ? updater(prev.index) : updater
              return { ...prev, index: newIndex }
            })
          }}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}

export default Projects