import { useLanguage } from '../context/LanguageContext'

function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="bg-zinc-950 px-6 py-24">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            {t.about.label}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            {t.about.title}
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2">

          {/* Texte à gauche */}
          <div>
            <p className="text-lg leading-8 text-gray-300">
              {t.about.p1}
            </p>

            <p className="mt-6 leading-8 text-gray-400">
              {t.about.p2}
            </p>

            <p className="mt-6 leading-8 text-gray-400">
              {t.about.p3}
            </p>
          </div>

          {/* Cartes à droite */}
          <div className="grid grid-cols-2 gap-4">
            {t.about.cards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-black p-6 transition hover:border-cyan-400/30"
              >
                <p className="text-3xl font-bold text-cyan-400">
                  {card.title}
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default About