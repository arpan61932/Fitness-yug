import { useState } from "react"

const INITIAL = { email: "", phone: "", description: "" }

export default function CTA() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState("idle") // idle | loading | success | error

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email) return
    setStatus("loading")

    try {
      const endpoint = window.location.port === "5173" ? "http://localhost:3000/api/join" : "/api/join"
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      setStatus(res.ok ? "success" : "error")
      if (res.ok) setForm(INITIAL)
    } catch {
      setStatus("error")
    }

    // Reset status after 4s
    setTimeout(() => setStatus("idle"), 4000)
  }

  const btnLabel = {
    idle:    "CLAIM YOUR PASS",
    loading: "Sending...",
    success: "✓ PASS CLAIMED!",
    error:   "✗ TRY AGAIN",
  }[status]

  const btnExtra = {
    idle:    "",
    loading: "opacity-60 cursor-not-allowed",
    success: "!bg-[var(--neon)]",
    error:   "!bg-red-600 !text-white",
  }[status]

  return (
    <section id="contact" className="cta-bg py-32">
      <div className="max-w-2xl mx-auto px-6 text-center">

        <h2 className="font-[Teko] text-6xl md:text-8xl font-bold text-white uppercase">
          Ready To Commit?
        </h2>
        <p className="text-gray-300 mt-4 mb-10 text-lg">
          Don&apos;t wait for tomorrow. The iron is calling today.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            required
            value={form.email}
            onChange={handleChange}
            className="neon-input w-full max-w-lg"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="neon-input w-full max-w-lg"
          />

          {/* Description / Goals */}
          <textarea
            name="description"
            placeholder="Tell us your fitness goals or which plan interests you..."
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="neon-input w-full max-w-lg resize-none"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className={`btn-neon mt-2 ${btnExtra}`}
          >
            {btnLabel}
          </button>

        </form>
      </div>
    </section>
  )
}
