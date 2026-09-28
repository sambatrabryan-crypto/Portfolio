function Experience() {
  return (
    <section id="experience" className="bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Expérience
          </p>

          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Mon parcours professionnel.
          </h2>
        </div>

        <div className="relative border-l border-white/10 pl-8">

          <div className="relative pb-12">
            <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-4 border-black bg-cyan-400" />

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-2xl font-bold">
                Stage — Europ'Alu
              </h3>

              <span className="text-sm text-gray-500">
                Antananarivo
              </span>
            </div>

            <p className="mt-2 text-cyan-400">
              Développement informatique
            </p>

            <p className="mt-5 max-w-3xl leading-7 text-gray-400">
              Développement d'un système de gestion des visiteurs et des
              rendez-vous destiné à digitaliser l'accueil et améliorer le
              suivi des visiteurs au sein de l'entreprise.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                'React',
                'Node.js',
                'Express.js',
                'Flutter',
                'PostgreSQL',
              ].map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-4 border-black bg-gray-600" />

            <h3 className="text-2xl font-bold">
              Projets personnels
            </h3>

            <p className="mt-2 text-cyan-400">
              Développement Web, Backend & IA
            </p>

            <p className="mt-5 max-w-3xl leading-7 text-gray-400">
              Développement de projets personnels permettant d'explorer
              différentes technologies, notamment FastAPI, Python,
              PostgreSQL, Docker et les solutions basées sur
              l'intelligence artificielle.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Experience