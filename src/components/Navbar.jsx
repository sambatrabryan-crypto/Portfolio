import { useState, useEffect } from 'react'

function Navbar({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { id: 'about', label: 'À propos' },
    { id: 'skills', label: 'Compétences' },
    { id: 'projects', label: 'Projets' },
    { id: 'experience', label: 'Expérience' },
  ]

  const handleNavigate = (page) => {
    onNavigate(page)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'border-b border-transparent bg-black/40 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <button
          onClick={() => handleNavigate('home')}
          className="group relative text-base font-bold tracking-tight text-white sm:text-lg"
        >
          <span className="relative z-10">
            RAKOTOARIVELO Fiaianan-tsambatra Bryann
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              .
            </span>
          </span>

          <span className="absolute -inset-2 -z-0 rounded-full bg-cyan-400/0 blur-xl transition-all duration-500 group-hover:bg-cyan-400/30" />
        </button>

        {/* Navigation desktop */}
        <div className="hidden items-center gap-1 md:flex">

          {/* Liens */}
          {links.map((link) => {
            const isActive = currentPage === link.id

            return (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`group relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="relative z-10">
                  {link.label}
                </span>

                <span
                  className={`absolute inset-0 scale-90 rounded-full bg-white/5 transition-all duration-300 ${
                    isActive
                      ? 'scale-100 opacity-100'
                      : 'opacity-0 group-hover:scale-100 group-hover:opacity-100'
                  }`}
                />

                <span
                  className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                    isActive
                      ? 'w-1/2'
                      : 'w-0 group-hover:w-1/2'
                  }`}
                />
              </button>
            )
          })}

          {/* CV */}
          <button
            onClick={() => handleNavigate('cv')}
            className={`group relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
              currentPage === 'cv'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="relative z-10">
              CV
            </span>

            <span
              className={`absolute inset-0 scale-90 rounded-full bg-white/5 transition-all duration-300 ${
                currentPage === 'cv'
                  ? 'scale-100 opacity-100'
                  : 'opacity-0 group-hover:scale-100 group-hover:opacity-100'
              }`}
            />

            <span
              className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                currentPage === 'cv'
                  ? 'w-1/2'
                  : 'w-0 group-hover:w-1/2'
              }`}
            />
          </button>

          {/* GitHub — agrandi */}
          <a
            href="https://github.com/sambatrabryan-crypto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="group ml-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-cyan-400/40 hover:text-cyan-400"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.94 3.2 9.13 7.65 10.61.56.1.77-.24.77-.54v-1.9c-3.11.68-3.77-1.5-3.77-1.5-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.49-.28-5.1-1.24-5.1-5.53 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.09 1.15a10.7 10.7 0 0 1 5.62 0c2.15-1.45 3.09-1.15 3.09-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.3-2.62 5.24-5.12 5.52.4.35.76 1.04.76 2.1v3.11c0 .3.2.65.78.54 4.44-1.49 7.64-5.67 7.64-10.61C23.25 5.48 18.27.5 12 .5z" />
            </svg>
          </a>

          {/* Contact */}
          <button
            onClick={() => handleNavigate('contact')}
            className="group relative ml-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-[1px] transition-transform duration-300 hover:scale-105"
          >
            <span
              className={`relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                currentPage === 'contact'
                  ? 'bg-transparent text-black'
                  : 'bg-black text-white group-hover:bg-transparent group-hover:text-black'
              }`}
            >
              Contact

              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Menu mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <select
            value={currentPage}
            onChange={(e) => handleNavigate(e.target.value)}
            className="rounded-full border border-white/20 bg-black px-3 py-2 text-sm text-white"
          >
            <option value="home">Accueil</option>
            <option value="about">À propos</option>
            <option value="skills">Compétences</option>
            <option value="projects">Projets</option>
            <option value="experience">Expérience</option>
            <option value="cv">CV</option>
            <option value="contact">Contact</option>
          </select>
        </div>

      </div>
    </nav>
  )
}

export default Navbar