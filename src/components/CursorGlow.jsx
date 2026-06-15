import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const el = useRef(null)

  useEffect(() => {
    // Skip on touch devices and when user prefers reduced motion
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx
    let cy = ty
    let raf

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
    }

    const tick = () => {
      // Lerp — 0.07 gives a silky lag that trails naturally
      cx += (tx - cx) * 0.07
      cy += (ty - cy) * 0.07

      if (el.current) {
        el.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={el}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0"
      style={{
        width: 520,
        height: 520,
        borderRadius: '50%',
        background:
          'radial-gradient(circle at center, rgba(184,151,90,0.08) 0%, transparent 65%)',
        willChange: 'transform',
      }}
    />
  )
}
