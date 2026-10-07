const CLASSES = [
  {
    id: 1,
    title: "HYPERTROPHY",
    desc: "Build massive, aesthetic muscle with our science-backed bodybuilding programs.",
    bg: "class-bg-1",
    delay: "",
  },
  {
    id: 2,
    title: "IGNITE HIIT",
    desc: "Shred fat and skyrocket your endurance with high-intensity interval training.",
    bg: "class-bg-2",
    delay: "delay-1",
  },
  {
    id: 3,
    title: "POWERLIFTING",
    desc: "Master the squat, bench, and deadlift under the guidance of elite strength coaches.",
    bg: "class-bg-3",
    delay: "delay-2",
  },
]

function ClassCard({ title, desc, bg, delay }) {
  return (
    <article className={`reveal-up ${delay} rounded-xl overflow-hidden border border-white/10 hover:border-[var(--neon)] transition-all duration-300 group`}>
      {/* Image */}
      <div className={`${bg} h-56 w-full transition-transform duration-500 group-hover:scale-105`} />

      {/* Info */}
      <div className="bg-[#111] p-6">
        <h3 className="font-[Teko] text-2xl text-white tracking-widest">{title}</h3>
        <p className="text-gray-400 text-sm mt-2 leading-relaxed">{desc}</p>
        <a
          href="#memberships"
          className="inline-block mt-4 text-neon text-sm font-semibold tracking-widest hover:underline"
        >
          View Schedule →
        </a>
      </div>
    </article>
  )
}

export default function Classes() {
  return (
    <section id="classes" className="py-24 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="reveal-up text-center mb-14">
          <h2 className="font-[Teko] text-5xl md:text-6xl font-bold text-white uppercase">
            Elite <span className="text-neon">Programs</span>
          </h2>
          <p className="text-gray-400 mt-3">From high-intensity circuits to focused hypertrophy, pick your poison.</p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {CLASSES.map((c) => (
            <ClassCard key={c.id} {...c} />
          ))}
        </div>

      </div>
    </section>
  )
}
