import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

/* ============================================ */
/* FICHIERS                                     */
/* ============================================ */
const PDF_URL = '/CV-Bryann-Rakotoarivelo.pdf'
const PREVIEW_URL = '/cv-preview.png'

/* ============================================ */
/* ICÔNES                                       */
/* ============================================ */
const iconProps = {
  fill: 'none',
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
}

const DownloadIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={className} {...iconProps}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
)

const ZoomIcon = () => (
  <svg className="h-4 w-4" {...iconProps}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.35-4.35" />
    <path d="M11 8v6M8 11h6" />
  </svg>
)

const CloseIcon = () => (
  <svg className="h-5 w-5" {...iconProps} strokeWidth={2.5}>
    <path d="M6 18 18 6M6 6l12 12" />
  </svg>
)

/* ============================================ */
/* ZOOM — CV en grand                           */
/* ============================================ */
function ZoomModal({ src, alt, onClose, labels }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={labels.zoomAria}
      className="cv-fade fixed inset-0 z-[100] overflow-y-auto bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label={labels.close}
        className="fixed right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-cyan-400 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
      >
        <CloseIcon />
      </button>

      <div className="mx-auto max-w-5xl px-4 py-16">
        <img
          src={src}
          alt={alt}
          className="cv-pop w-full rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  )
}

/* ============================================ */
/* PAGE CV                                      */
/* ============================================ */
function CV() {
  const { t, lang } = useLanguage()
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const imgRef = useRef(null)

  const closeZoom = useCallback(() => setZoomed(false), [])

  // 🎯 Nom du PDF téléchargé selon la langue
  const pdfName =
    lang === 'fr'
      ? 'CV-Bryann-Rakotoarivelo.pdf'
      : 'Resume-Bryann-Rakotoarivelo.pdf'

  // 🎯 Alt de l'image selon la langue
  const previewAlt =
    lang === 'fr'
      ? 'Aperçu du CV de RAKOTOARIVELO Fiaianan-tsambatra Bryann'
      : 'Resume preview of RAKOTOARIVELO Fiaianan-tsambatra Bryann'

  // Labels du ZoomModal
  const labels = {
  close: t.cv.close,
  zoomAria: lang === 'fr' ? 'CV en grand' : 'Resume zoomed',
}

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [])

  return (
    <section className="min-h-screen bg-black px-6 pb-12 pt-32">
      <style>{`
        @keyframes cv-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes cv-unroll { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); } }
        @keyframes cv-shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
        @keyframes cv-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cv-pop { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: none; } }

        .cv-rise    { animation: cv-rise .8s cubic-bezier(.2,.7,.2,1) both; }
        .cv-unroll  { animation: cv-unroll 1s .45s cubic-bezier(.2,.7,.2,1) backwards; }
        .cv-shimmer { animation: cv-shimmer 1.6s ease-in-out infinite; }
        .cv-fade    { animation: cv-fade .25s ease-out both; }
        .cv-pop     { animation: cv-pop .35s cubic-bezier(.2,.7,.2,1) both; }

        @media (prefers-reduced-motion: reduce) {
          .cv-rise, .cv-unroll, .cv-shimmer, .cv-fade, .cv-pop { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* ============================= */}
        {/* EN-TÊTE                       */}
        {/* ============================= */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="cv-rise text-sm font-medium uppercase tracking-[0.3em] text-cyan-400"
              style={{ animationDelay: '0s' }}
            >
              {t.cv.label}
            </p>

            <h1
              className="cv-rise mt-3 text-4xl font-bold text-white sm:text-5xl"
              style={{ animationDelay: '.1s' }}
            >
              {t.cv.title}
            </h1>

            <p
              className="cv-rise mt-4 max-w-2xl leading-7 text-gray-400"
              style={{ animationDelay: '.2s' }}
            >
              {t.cv.description}
            </p>
          </div>

          <div
            className="cv-rise flex shrink-0 flex-wrap gap-3"
            style={{ animationDelay: '.3s' }}
          >
            {/* Bouton Télécharger PDF */}
            <a
              href={PDF_URL}
              download={pdfName}
              className="group inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 motion-reduce:hover:translate-y-0"
            >
              <DownloadIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              {t.cv.download}
            </a>
          </div>
        </div>

        {/* ============================= */}
        {/* APERÇU DU CV EN IMAGE         */}
        {/* ============================= */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
          <div
            className="cv-unroll relative"
            style={{ minHeight: loaded || failed ? undefined : '70vh' }}
          >
            {!loaded && !failed && (
              <div
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden"
              >
                <div className="cv-shimmer h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            )}

            {failed ? (
              <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="text-gray-400">{t.cv.error}</p>
                <a
                  href={PDF_URL}
                  download={pdfName}
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-medium text-black transition hover:bg-cyan-300"
                >
                  <DownloadIcon />
                  {t.cv.download}
                </a>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setZoomed(true)}
                aria-label={`${t.cv.zoom} — ${previewAlt}`}
                className="group relative block w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cyan-400"
              >
                <img
                  ref={imgRef}
                  src={PREVIEW_URL}
                  alt={previewAlt}
                  onLoad={() => setLoaded(true)}
                  onError={() => setFailed(true)}
                  className={`w-full transition-opacity duration-700 ${
                    loaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {loaded && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    <ZoomIcon />
                    {t.cv.zoom}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {zoomed && (
        <ZoomModal
          src={PREVIEW_URL}
          alt={previewAlt}
          onClose={closeZoom}
          labels={labels}
        />
      )}
    </section>
  )
}

export default CV