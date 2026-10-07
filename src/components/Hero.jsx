export default function Hero() {
  return (
    <section id="home" className="hero-bg min-h-screen flex items-center justify-center relative">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="reveal-up text-neon font-[Teko] tracking-[0.4em] text-lg mb-4 uppercase">
          No Excuses. Only Results.
        </p>
        <h1 className="reveal-up delay-1 font-[Teko] text-6xl md:text-8xl lg:text-9xl font-bold leading-tight text-white uppercase">
          Unleash Your <br />
          <span className="text-neon">True Potential</span>
        </h1>
        <p className="reveal-up delay-2 text-gray-400 max-w-xl mx-auto mt-6 text-sm md:text-base leading-relaxed">
          Step into a visually stunning, high-performance training ground designed for those who demand more.
          Elite equipment, expert coaching, and an atmosphere forged for greatness.
        </p>
        <div className="reveal-up delay-3 flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a href="#memberships" className="btn-neon">Start Free Trial</a>
          <a href="#classes" className="btn-outline">Explore Classes</a>
        </div>
      </div>
    </section>
  )
}
