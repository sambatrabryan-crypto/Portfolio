function CV() {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/CV-Bryann-Rakotoarivelo.pdf'
    link.download = 'CV-Bryann-Rakotoarivelo.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="min-h-screen bg-black px-6 pb-12 pt-32">
      <div className="mx-auto max-w-6xl">

        {/* ============================= */}
        {/* EN-TÊTE                       */}
        {/* ============================= */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              Curriculum Vitae
            </p>

            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Mon CV
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-gray-400">
              Consultez mon parcours, mes compétences et mes expériences
              professionnelles.
            </p>
          </div>

          {/* Bouton Télécharger le PDF */}
          <button
            onClick={handleDownload}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-medium text-black transition-transform duration-300 hover:scale-105"
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="M7 10l5 5 5-5" />
              <path d="M12 15V3" />
            </svg>
            Télécharger le PDF
          </button>
        </div>

        {/* ============================= */}
        {/* APERÇU DU CV EN IMAGE         */}
        {/* ============================= */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
          <img
            src="/cv-preview.png"
            alt="Aperçu du CV de RAKOTOARIVELO Fiaianan-tsambatra Bryann"
            className="w-full"
          />
        </div>

      </div>
    </section>
  )
}

export default CV