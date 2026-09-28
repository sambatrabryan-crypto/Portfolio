function About() {
  return (
    <section id="about" className="bg-zinc-950 px-6 py-24">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            À propos
          </p>

          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Construire, apprendre, évoluer.
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2">

          <div>
            <p className="text-lg leading-8 text-gray-300">
              Je suis un étudiant en informatique passionné par le
              développement logiciel et la création de solutions
              numériques concrètes.
            </p>

            <p className="mt-6 leading-8 text-gray-400">
              Je m'intéresse particulièrement au développement web,
              mobile et backend, ainsi qu'aux technologies liées à
              l'intelligence artificielle.
            </p>

            <p className="mt-6 leading-8 text-gray-400">
              À travers mes projets et mes expériences, je cherche à
              développer des applications utiles, apprendre de nouvelles
              technologies et améliorer continuellement ma façon de
              concevoir des solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-white/10 bg-black p-6">
              <p className="text-3xl font-bold text-cyan-400">Web</p>
              <p className="mt-2 text-sm text-gray-400">
                Applications modernes et interfaces utilisateur
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black p-6">
              <p className="text-3xl font-bold text-cyan-400">Mobile</p>
              <p className="mt-2 text-sm text-gray-400">
                Applications mobiles avec Flutter
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black p-6">
              <p className="text-3xl font-bold text-cyan-400">Backend</p>
              <p className="mt-2 text-sm text-gray-400">
                APIs, bases de données et architecture
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black p-6">
              <p className="text-3xl font-bold text-cyan-400">IA</p>
              <p className="mt-2 text-sm text-gray-400">
                Exploration des solutions basées sur l'IA
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default About