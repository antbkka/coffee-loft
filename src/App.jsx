import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Lenis from 'lenis'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Booking from './pages/Booking'
import Contacts from './pages/Contacts'
import Cart from './pages/Cart'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-loft-black">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Глобальный контейнер уведомлений */}
      <Toaster
        position="bottom-right"
        gutter={12}
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#c9c5bd',
            border: '1px solid #b87333',
            padding: '14px 18px',
            borderRadius: '2px',
            fontSize: '14px',
            letterSpacing: '0.02em',
          },
          iconTheme: { primary: '#b87333', secondary: '#0d0d0d' },
          success: { duration: 2500 },
          error: { duration: 3500 },
        }}
      />
    </div>
  )
}