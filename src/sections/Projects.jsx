import { useState } from 'react'
import projects from '../data/projects'

function ProjectGallery({ images, title }) {
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

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative h-64 overflow-hidden bg-zinc-900">
      {/* Image */}
      <img
        src={currentImage.src}
        alt={currentImage.alt}
        className="h-full w-full object-cover object-top"
        onError={(e) => {
          e.target.style.display = 'none'
        }}
      />

      {/* Overlay dégradé */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Navigation (flèches) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-cyan-400 hover:text-black"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-cyan-400 hover:text-black"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Indicateur (points) */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Aller à l'image ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 bg-cyan-400'
                  : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Compteur */}
      <div className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}

function Projects() {
  return (
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
              {/* Galerie d'images */}
              <ProjectGallery images={project.images} title={project.title} />

              {/* Contenu */}
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
  )
}

export default Projects