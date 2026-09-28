const skillGroups = [
  {
    title: 'Frontend',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'PHP', 'Python'],
  },
  {
    title: 'Mobile',
    skills: ['Flutter', 'Dart', 'Java'],
  },
  {
    title: 'Bases de données',
    skills: ['MySQL', 'PostgreSQL', 'Firebase', 'SQL'],
  },
  {
    title: 'Conception & Modélisation',
    skills: ['Merise', 'MCD / MLD / MPD', 'UML'],
  },
  {
    title: 'DevOps & Tools',
    skills: ['Git', 'Docker', 'Jenkins', 'SonarQube', 'Nexus', 'CI/CD'],
  },
  {
    title: 'Observabilité',
    skills: ['ELK Stack', 'Elasticsearch', 'Logstash', 'Kibana'],
  },
  {
    title: 'Systèmes',
    skills: ['Windows', 'Linux'],
  },
  {
    title: 'IA & Data',
    skills: ['Intelligence artificielle'],
  },
]

function Skills() {
  return (
    <section id="skills" className="bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Compétences
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Technologies que j'utilise.
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-gray-400">
            Un ensemble de technologies que j'utilise dans mes projets
            et que je continue à approfondir.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-white/10 bg-zinc-950 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <h3 className="text-xl font-semibold text-white">
                {group.title}
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300"
                  >
                    {skill}
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

export default Skills