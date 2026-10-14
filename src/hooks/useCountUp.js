import { useEffect, useState } from 'react'

/**
 * Animates a number from 0 to `end` once `start` is true.
 * Skips the animation entirely for prefers-reduced-motion.
 */
export default function useCountUp(end, start, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return undefined

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setValue(end)
      return undefined
    }

    let frame
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * end))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, end, duration])

  return value
}
