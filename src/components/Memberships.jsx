const PLANS = [
  {
    id: "standard",
    name: "STANDARD",
    price: 49,
    features: ["Access to main gym floor", "Locker room access", "Free Wi-Fi"],
    disabled: ["Group Classes", "Personal Training"],
    highlight: false,
    delay: "reveal-left",
    cta: "Select Plan",
  },
  {
    id: "elite",
    name: "ELITE VANGUARD",
    price: 89,
    badge: "MOST POPULAR",
    features: ["24/7 All-Access", "Unlimited Group Classes", "Sauna & Recovery Zone", "1 PT Session / Month", "Nutrition Consultation"],
    disabled: [],
    highlight: true,
    delay: "reveal-up",
    cta: "Select Elite",
  },
  {
    id: "vip",
    name: "VIP FORGE",
    price: 149,
    features: ["Everything in Elite", "Dedicated Locker", "4 PT Sessions / Month", "Custom Diet Plan", "Priority Support"],
    disabled: [],
    highlight: false,
    delay: "reveal-right",
    cta: "Select VIP",
  },
]

function PriceTier({ name, price, badge, features, disabled, highlight, delay, cta }) {
  return (
    <div
      className={`${delay} relative rounded-xl p-8 border transition-all duration-300 flex flex-col gap-6 ${
        highlight
          ? "border-[var(--neon)] bg-[#111] shadow-[0_0_30px_rgba(200,247,67,0.15)] scale-105"
          : "border-white/10 bg-[#111] hover:border-white/30"
      }`}
    >
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--neon)] text-black text-xs font-bold tracking-widest px-4 py-1 rounded-full">
          {badge}
        </div>
      )}

      <h3 className="font-[Teko] text-2xl tracking-widest text-white">{name}</h3>

      <div className="font-[Teko] text-5xl font-bold text-white">
        <span className="text-2xl align-super text-gray-400">$</span>
        {price}
        <span className="text-lg text-gray-400 font-normal">/mo</span>
      </div>

      <ul className="space-y-2 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="text-neon">✓</span> {f}
          </li>
        ))}
        {disabled.map((f) => (
          <li key={f} className="flex items-center gap-2 text-gray-600 text-sm line-through">
            <span>✗</span> {f}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`text-center w-full ${highlight ? "btn-neon" : "btn-outline"}`}
      >
        {cta}
      </a>
    </div>
  )
}

export default function Memberships() {
  return (
    <section id="memberships" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="reveal-up text-center mb-16">
          <h2 className="font-[Teko] text-5xl md:text-6xl font-bold text-white uppercase">
            Choose Your <span className="text-neon">Path</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {PLANS.map((p) => (
            <PriceTier key={p.id} {...p} />
          ))}
        </div>

      </div>
    </section>
  )
}
