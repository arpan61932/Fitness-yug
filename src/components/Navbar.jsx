import { useState, useEffect } from "react"

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Classes", href: "#classes" },
  { label: "Memberships", href: "#memberships" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">

        {/* Logo */}
        <a href="#home" className="font-[Teko] text-3xl font-bold tracking-widest text-white">
          FITNESS<span className="text-neon">YUG</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium tracking-widest text-gray-300 hover:text-neon transition-colors uppercase"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <a href="#memberships" className="btn-neon hidden md:inline-block text-sm">
          Join Now
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <span className={`bar transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`bar transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`bar transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md px-6 pb-6 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              className="text-gray-300 hover:text-neon transition-colors uppercase tracking-widest py-2 border-b border-white/10"
            >
              {label}
            </a>
          ))}
          <a href="#memberships" onClick={closeMenu} className="btn-neon text-center mt-2">
            Join Now
          </a>
        </div>
      )}
    </header>
  )
}
