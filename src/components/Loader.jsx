import { useState, useEffect } from "react"

export default function Loader() {
  const [fading, setFading] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1000)
    const removeTimer = setTimeout(() => setRemoved(true), 1500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (removed) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0d0d] transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <h1 className="font-[Teko] text-5xl md:text-6xl tracking-[0.4em] text-white animate-pulse">
        FITNESS<span className="text-neon">YUG</span>
      </h1>
    </div>
  )
}
