import { useEffect, useRef, useState } from 'react'

/**
 * Adds a "reveal" class once an element scrolls into view.
 * Pair with the .reveal / .reveal.is-visible CSS utility.
 * Respects prefers-reduced-motion by design (CSS handles that part).
 */
export default function useReveal(options = { threshold: 0.2 }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, isVisible]
}
