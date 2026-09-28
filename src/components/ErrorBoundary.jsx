import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Erreur capturée :', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-black px-6 text-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Oups, une erreur est survenue.
            </h1>
            <p className="mt-3 text-gray-400">
              Recharge la page ou contacte-moi à{' '}
              <a
                href="mailto:sambatrabryan@gmail.com"
                className="text-cyan-400 underline"
              >
                sambatrabryan@gmail.com
              </a>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-black transition hover:bg-cyan-300"
            >
              Recharger la page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary