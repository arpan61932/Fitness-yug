import { useEffect } from "react"

// Scroll-reveal hook using IntersectionObserver
export function useReveal(delay = 0) {
  useEffect(() => {
    const revealAll = () => {
      document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach((el) => {
        el.classList.add("visible")
      })
    }

    const timer = setTimeout(() => {
      const targets = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right")

      if (!("IntersectionObserver" in window)) {
        revealAll()
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible")
            }
          })
        },
        { threshold: 0.01, rootMargin: "50px" }
      )

      targets.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          el.classList.add("visible")
        }
        observer.observe(el)
      })
    }, delay)

    // Safety fallback: ensure all elements become visible after delay + 1000ms
    const fallbackTimer = setTimeout(revealAll, delay + 1000)

    return () => {
      clearTimeout(timer)
      clearTimeout(fallbackTimer)
    }
  }, [delay])
}
