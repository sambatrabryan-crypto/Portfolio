import { useForm, ValidationError } from '@formspree/react'

function Contact() {
  // ⚠️ Remplace 'xxxxxxx' par ton vrai ID Formspree
  const [state, handleSubmit, reset] = useForm('mppwovep')

  return (
    <section id="contact" className="bg-zinc-950 px-6 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-14">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Contact
          </p>

          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Échangeons ensemble.
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-gray-400">
            Vous avez une opportunité, un projet ou souhaitez simplement
            échanger ? Vous pouvez me contacter directement ou consulter
            mes profils professionnels.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">

          {/* ============================= */}
          {/* INFORMATIONS DE CONTACT       */}
          {/* ============================= */}
          <div>
            <h3 className="text-2xl font-semibold">
              Mes coordonnées
            </h3>

            <p className="mt-4 max-w-lg leading-7 text-gray-400">
              Je suis ouvert aux opportunités professionnelles, aux
              collaborations et aux projets dans le domaine du développement
              informatique.
            </p>

            <div className="mt-8 space-y-4">

              {/* Email */}
              <a
                href="mailto:sambatrabryan@gmail.com"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-black p-4 transition hover:border-cyan-400/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-200 transition group-hover:text-cyan-400">
                    sambatrabryan@gmail.com
                  </p>
                </div>
              </a>

              {/* Téléphone */}
              <a
                href="tel:+231383283777"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-black p-4 transition hover:border-cyan-400/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="text-gray-200 transition group-hover:text-cyan-400">
                    +261 38 32 83 777
                  </p>
                </div>
              </a>

              {/* Localisation */}
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-black p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Localisation</p>
                  <p className="text-gray-200">Mokana, Fianarantsoa</p>
                </div>
              </div>

            </div>
          </div>

          {/* ============================= */}
          {/* FORMULAIRE (avec fix key)     */}
          {/* ============================= */}
          <div>
            {/* 🎯 La key force React à recréer le bloc → évite la page blanche */}
            <div key={state.succeeded ? 'success' : 'form'}>

              {state.succeeded ? (
                /* --- Message de succès --- */
                <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-8 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/15">
                    <svg
                      className="h-7 w-7 text-cyan-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>

                  <p className="text-lg font-semibold text-white">
                    Message envoyé avec succès !
                  </p>

                  <p className="mt-2 text-sm text-gray-400">
                    Merci pour votre message, je vous répondrai dans les plus brefs délais.
                  </p>

                  <button
                    onClick={reset}
                    className="mt-6 rounded-full border border-white/20 px-6 py-2 text-sm text-white transition hover:border-cyan-400 hover:text-cyan-400"
                  >
                    Envoyer un autre message
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

                  {/* Nom */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm text-gray-400"
                    >
                      Nom
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Votre nom"
                      required
                      disabled={state.submitting}
                      className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/50 disabled:opacity-60"
                    />
                    <ValidationError
                      field="name"
                      prefix="Nom"
                      errors={state.errors}
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm text-gray-400"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="votre@email.com"
                      required
                      disabled={state.submitting}
                      className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/50 disabled:opacity-60"
                    />
                    <ValidationError
                      field="email"
                      prefix="Email"
                      errors={state.errors}
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm text-gray-400"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      placeholder="Votre message..."
                      required
                      disabled={state.submitting}
                      className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/50 disabled:opacity-60"
                    />
                    <ValidationError
                      field="message"
                      prefix="Message"
                      errors={state.errors}
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>

                  {/* Bouton d'envoi */}
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-7 py-3 font-medium text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {state.submitting ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
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
                        Envoi en cours...
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
                        >
                          <path d="m22 2-7 20-4-9-9-4 20-7z" />
                          <path d="M22 2 11 13" />
                        </svg>
                        Envoyer le message
                      </>
                    )}
                  </button>

                  {/* Erreur globale Formspree */}
                  {state.errors &&
                    state.errors.length > 0 &&
                    !state.errors.some((e) => ['name', 'email', 'message'].includes(e.field)) && (
                      <p className="rounded-lg border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-400">
                        Une erreur est survenue lors de l'envoi. Réessayez dans quelques instants.
                      </p>
                    )}

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact