import { useState } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import CV from './sections/CV'

function App() {
  const [page, setPage] = useState('home')

  const renderPage = () => {
    switch (page) {
      case 'about':
        return <About />

      case 'skills':
        return <Skills />

      case 'projects':
        return <Projects />

      case 'experience':
        return <Experience />

      case 'cv':
        return <CV />

      case 'contact':
        return <Contact />

      case 'home':
      default:
        return <Hero onNavigate={setPage} />
    }
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white">
        <Navbar
          currentPage={page}
          onNavigate={setPage}
        />

        <main>
          {renderPage()}
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default App