"use client"

import { useEffect, useRef } from "react"

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement; // Asserção de tipo para HTMLCanvasElement

    // Verifique se canvas não é nulo
    if (!canvas) {
      console.error("Canvas element is not available")
      return
    }

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    if (!ctx) {
      console.error("Failed to get 2D context")
      return // Verifica se ctx é nulo
    }

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: { x: number; y: number; radius: number; vx: number; vy: number }[] = []
    const numStars = 100
    let mouseX = 0
    let mouseY = 0

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1,
      })
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "white"
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()

        star.x += star.vx + (mouseX - canvas.width / 2) * 0.00001
        star.y += star.vy + (mouseY - canvas.height / 2) * 0.00001

        if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx
        if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy
      })
    }

    function animate() {
      drawStars()
      requestAnimationFrame(animate)
    }

    animate()

    function handleMouseMove(event: MouseEvent) {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-gray-900" />
}
