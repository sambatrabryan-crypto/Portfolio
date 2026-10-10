import { useLanguage } from '../context/LanguageContext'

function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-sm">
      <button
        onClick={() => setLang('fr')}
        aria-label="Français"
        className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
          lang === 'fr'
            ? 'bg-cyan-400 text-black'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLang('en')}
        aria-label="English"
        className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
          lang === 'en'
            ? 'bg-cyan-400 text-black'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  )
}

export default LanguageSwitcher