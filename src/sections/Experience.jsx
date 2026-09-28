function Experience() {
  const experiences = [
    {
      title: 'Stage — Europ\'Alu',
      subtitle: 'Développement informatique',
      location: 'Antananarivo',
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
      title: 'Stage — Ministère de l\'Enseignement Supérieur',
      subtitle: 'Développement informatique',
      location: 'Antananarivo',
      description:
        "Création et réalisation d'une application de gestion des stocks pour le Ministère de l'Enseignement Supérieur et de la Recherche Scientifique.",
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS'],
      active: false,
    },
    {
      title: 'Projets personnels',
      subtitle: 'Développement Web, Backend & IA',
      location: '',
      description:
        "Développement de projets personnels permettant d'explorer différentes technologies, notamment FastAPI, Python, PostgreSQL, Docker et les solutions basées sur l'intelligence artificielle.",
      technologies: ['Python', 'FastAPI', 'Docker', 'PostgreSQL'],
      active: false,
    },
  ]

  return (
    <section id="experience" className="bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Expérience
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Mon parcours professionnel.
          </h2>
        </div>

        <div className="relative border-l border-white/10 pl-8">

          {experiences.map((exp, index) => (
            <div
              key={exp.title}
              className={`relative ${index < experiences.length - 1 ? 'pb-12' : ''}`}
            >
              {/* Point sur la timeline */}
              <div
                className={`absolute -left-[37px] top-1 h-4 w-4 rounded-full border-4 border-black ${
                  exp.active ? 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]' : 'bg-gray-600'
                }`}
              />

              {/* En-tête */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-2xl font-bold text-white">
                  {exp.title}
                </h3>

                {exp.location && (
                  <span className="text-sm text-gray-500">
                    {exp.location}
                  </span>
                )}
              </div>

              {/* Sous-titre */}
              <p className="mt-2 text-cyan-400">
                {exp.subtitle}
              </p>

              {/* Description */}
              <p className="mt-5 max-w-3xl leading-7 text-gray-400">
                {exp.description}
              </p>

              {/* Technologies */}
              <div className="mt-5 flex flex-wrap gap-2">
                {exp.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Experience