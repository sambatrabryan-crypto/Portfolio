import { useEffect, useRef, useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { useLanguage } from '../context/LanguageContext'

/* ============================================ */
/* DONNÉES                                      */
/* ============================================ */
const EMAIL = 'sambatrabryan@gmail.com'
const PHONE_DISPLAY = '+261 38 32 83 777'
const PHONE_LINK = '+261383283777'
const LOCATION = 'Mokana, Fianarantsoa'

/* Ajoute tes liens ici : une entrée sans `href` n'est pas affichée */
const PROFILES = [
  { label: 'GitHub', href: '' },
  { label: 'LinkedIn', href: '' },
]

const inputClass =
  'w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 disabled:opacity-60'

/* ============================================ */
/* UTILITAIRES                                  */
/* ============================================ */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

function Reveal({ children, delay = 0, reduced }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (reduced || !el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <div
      ref={ref}
      className={`transition duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

/* ============================================ */
/* ICÔNES                                       */
/* ============================================ */
const iconProps = {
  fill: 'none',
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
}

const EmailIcon = () => (
  <svg className="h-5 w-5" {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="h-5 w-5" {...iconProps}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const PinIcon = () => (
  <svg className="h-5 w-5" {...iconProps}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const CopyIcon = () => (
  <svg className="h-4 w-4" {...iconProps}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
)

const CheckIcon = () => (
  <svg className="h-4 w-4" {...iconProps} strokeWidth={2.5}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

/* ============================================ */
/* CARTE DE COORDONNÉE                          */
/* ============================================ */
function ContactCard({ icon, label, value, href, copyValue, copiedLabel }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  const content = (
    <>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400 transition duration-300 group-hover:bg-cyan-400 group-hover:text-black">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="truncate text-gray-200 transition group-hover:text-cyan-400">
          {value}
        </p>
      </div>
    </>
  )

  return (
    <div className="group flex items-center gap-2 rounded-xl border border-white/10 bg-black transition hover:border-cyan-400/30">
      {href ? (
        <a
          href={href}
          className="flex min-w-0 flex-1 items-center gap-4 rounded-xl p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
        >
          {content}
        </a>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-4 p-4">
          {content}
        </div>
      )}

      {copyValue && (
        <>
          {copied && (
            <span className="text-xs font-medium text-cyan-400">
              {copiedLabel}
            </span>
          )}
          <button
            type="button"
            onClick={copy}
            aria-label={`Copier ${label.toLowerCase()}`}
            className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-white/10 hover:text-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
          <span className="sr-only" role="status">
            {copied ? `${label} copié dans le presse-papiers` : ''}
          </span>
        </>
      )}
    </div>
  )
}

/* ============================================ */
/* CHAMP DE FORMULAIRE                          */
/* ============================================ */
function Field({ id, label, state, as = 'input', ...props }) {
  const Tag = as
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-gray-400">
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        required
        disabled={state.submitting}
        className={`${inputClass} ${as === 'textarea' ? 'resize-none' : ''}`}
        {...props}
      />
      <ValidationError
        field={id}
        prefix={label}
        errors={state.errors}
        className="mt-1 text-sm text-red-400"
      />
    </div>
  )
}

/* ============================================ */
/* SECTION CONTACT                              */
/* ============================================ */
function Contact() {
  const { t } = useLanguage()
  const [state, handleSubmit, reset] = useForm('mppwovep')
  const reduced = usePrefersReducedMotion()
  const activeProfiles = PROFILES.filter((p) => p.href)

  const hasGlobalError =
    state.errors &&
    state.errors.length > 0 &&
    !state.errors.some((e) => ['name', 'email', 'message'].includes(e.field))

  return (
    <section id="contact" className="bg-zinc-950 px-6 py-24">
      <style>{`
        @keyframes contact-check { to { stroke-dashoffset: 0; } }
        @keyframes contact-ring { 0% { transform: scale(.6); opacity: 0; } 60% { opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        .contact-check { stroke-dasharray: 24; stroke-dashoffset: 24; animation: contact-check .6s .25s ease-out forwards; }
        .contact-ring { animation: contact-ring .5s cubic-bezier(.2,.7,.2,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .contact-check { animation: none; stroke-dashoffset: 0; }
          .contact-ring { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            {t.contact.label}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            {t.contact.title}
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-gray-400">
            {t.contact.description}
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* ============================= */}
          {/* INFORMATIONS DE CONTACT       */}
          {/* ============================= */}
          <Reveal reduced={reduced}>
            <h3 className="text-2xl font-semibold text-white">
              {t.contact.coordinatesTitle}
            </h3>

            <p className="mt-4 max-w-lg leading-7 text-gray-400">
              {t.contact.coordinatesText}
            </p>

            <div className="mt-8 space-y-4">
              <ContactCard
                icon={<EmailIcon />}
                label={t.contact.email}
                value={EMAIL}
                href={`mailto:${EMAIL}`}
                copyValue={EMAIL}
                copiedLabel={t.contact.copied}
              />

              <ContactCard
                icon={<PhoneIcon />}
                label={t.contact.phone}
                value={PHONE_DISPLAY}
                href={`tel:${PHONE_LINK}`}
                copyValue={PHONE_DISPLAY}
                copiedLabel={t.contact.copied}
              />

              <ContactCard
                icon={<PinIcon />}
                label={t.contact.location}
                value={LOCATION}
              />
            </div>

            {activeProfiles.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {activeProfiles.map((profile) => (
                  <a
                    key={profile.label}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-gray-200 transition hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                  >
                    {profile.label}
                  </a>
                ))}
              </div>
            )}
          </Reveal>

          {/* ============================= */}
          {/* FORMULAIRE                    */}
          {/* ============================= */}
          <Reveal delay={150} reduced={reduced}>
            <div key={state.succeeded ? 'success' : 'form'}>
              {state.succeeded ? (
                /* --- Message de succès --- */
                <div
                  role="status"
                  className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-8 text-center"
                >
                  <div className="contact-ring mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/15">
                    <svg
                      className="h-7 w-7 text-cyan-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path className="contact-check" d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>

                  <p className="text-lg font-semibold text-white">
                    {t.contact.form.success}
                  </p>

                  <p className="mt-2 text-sm text-gray-400">
                    {t.contact.form.successText}
                  </p>

                  <button
                    onClick={reset}
                    className="mt-6 rounded-full border border-white/20 px-6 py-2.5 text-sm text-white transition hover:border-cyan-400 hover:text-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                  >
                    {t.contact.form.reset}
                  </button>
                </div>
              ) : (
                /* --- Formulaire --- */
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(e)
                  }}
                  className="space-y-5"
                >
                  {/* Champ piège anti-spam */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />

                  <Field
                    id="name"
                    label={t.contact.form.name}
                    type="text"
                    placeholder={t.contact.form.namePlaceholder}
                    autoComplete="name"
                    state={state}
                  />

                  <Field
                    id="email"
                    label={t.contact.form.email}
                    type="email"
                    placeholder={t.contact.form.emailPlaceholder}
                    autoComplete="email"
                    state={state}
                  />

                  <Field
                    id="message"
                    label={t.contact.form.message}
                    as="textarea"
                    rows="6"
                    placeholder={t.contact.form.messagePlaceholder}
                    state={state}
                  />

                  {/* Bouton d'envoi */}
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-7 py-3 font-medium text-black transition hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {state.submitting ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin motion-reduce:animate-none"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        {t.contact.form.sending}
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="m22 2-7 20-4-9-9-4 20-7z" />
                          <path d="M22 2 11 13" />
                        </svg>
                        {t.contact.form.submit}
                      </>
                    )}
                  </button>

                  {/* Erreur globale Formspree */}
                  {hasGlobalError && (
                    <p
                      role="alert"
                      className="rounded-lg border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-400"
                    >
                      {t.contact.form.error}
                    </p>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact