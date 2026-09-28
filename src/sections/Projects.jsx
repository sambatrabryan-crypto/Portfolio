import projects from '../data/projects'

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
              className="flex flex-col rounded-2xl border border-white/10 bg-black p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
            >
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
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects