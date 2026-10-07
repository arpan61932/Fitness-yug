const FEATURES = [
  "State-of-the-Art Rogue Equipment",
  "Dark, Focused Aesthetic Environment",
  "Olympic Lifting & Powerlifting Zones",
  "24/7 Exclusive Member Access",
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Text */}
        <div>
          <h2 className="reveal-left font-[Teko] text-5xl md:text-6xl font-bold text-white uppercase leading-tight">
            The <span className="text-neon">Fitness Yug</span> Difference
          </h2>
          <p className="reveal-left delay-1 text-gray-400 mt-6 leading-relaxed">
            We aren&apos;t just a gym. We are an aesthetic sanctuary forged in grit and iron.
            Our facilities are designed to hyper-focus your mind and push your body to the absolute limit.
          </p>
          <ul className="reveal-left delay-2 mt-6 space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-gray-300">
                <span className="text-neon font-bold text-lg">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Image Grid */}
        <div className="reveal-right relative h-80 md:h-[420px]">
          <div className="about-img-1 absolute top-0 left-0 w-[55%] h-[60%] rounded-lg shadow-2xl" />
          <div className="about-img-2 absolute bottom-0 right-0 w-[55%] h-[60%] rounded-lg shadow-2xl" />
          {/* Neon accent */}
          <div className="absolute top-[35%] left-[30%] w-20 h-20 rounded-full blur-3xl opacity-30" style={{ background: "var(--neon)" }} />
        </div>

      </div>
    </section>
  )
}
