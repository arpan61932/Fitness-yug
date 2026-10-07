import { useReveal } from "./hooks/useReveal"
import Loader from "./components/Loader"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Classes from "./components/Classes"
import Memberships from "./components/Memberships"
import CTA from "./components/CTA"
import Footer from "./components/Footer"

export default function App() {
  useReveal(1400)

  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Classes />
        <Memberships />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
