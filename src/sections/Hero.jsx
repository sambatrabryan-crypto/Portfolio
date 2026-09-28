function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 pt-20"
    >
      {/* Effet lumineux en arrière-plan */}
      <div className="absolute left-1/2 top-1/2 -z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Développeur Full-Stack
          </p>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
            Je transforme des idées
            <br />
            en{' '}
            <span className="text-cyan-400">
              applications.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Je conçois et développe des applications web, mobiles et
            backend, avec un intérêt particulier pour l'intelligence
            artificielle.
          </p>

          <div className="mt-12 flex gap-6 text-sm text-gray-500">
            <span>Web</span>
            <span>•</span>
            <span>Mobile</span>
            <span>•</span>
            <span>Backend</span>
            <span>•</span>
            <span>IA</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero