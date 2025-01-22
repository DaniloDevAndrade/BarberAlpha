"use client"

import Link from "next/link"
import { Scissors, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? "bg-gray-900/80 backdrop-blur-sm" : "md:bg-transparent bg-gray-900/80"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link  className='flex' href="/">
              <Scissors className={`h-8 w-auto ${isScrolled ? "text-white" : "text-white"}`} />
              <h1 className="hidden ml-3 text-lg font-extrabold tracking-tight lg:block lg:text-2xl">Barber Alpha</h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#features"
              className={`text-base font-medium ${isScrolled ? "text-white hover:text-indigo-200" : "text-white hover:text-indigo-200"}`}
            >
              Recursos
            </Link>
            <Link
              href="/#dashboard"
              className={`text-base font-medium ${isScrolled ? "text-white hover:text-indigo-200" : "text-white hover:text-indigo-200"}`}
            >
              Dashboard
            </Link>
            <Link
              href="/#testimonials"
              className={`text-base font-medium ${isScrolled ? "text-white hover:text-indigo-200" : "text-white hover:text-indigo-200"}`}
            >
              Depoimentos
            </Link>
            <Link
              href="/#faq"
              className={`text-base font-medium ${isScrolled ? "text-white hover:text-indigo-200" : "text-white hover:text-indigo-200"}`}
            >
              FAQ
            </Link>
            <Link
              href="/login"
              className="inline-block py-2 px-4 border border-transparent rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="inline-block py-2 px-4 border border-transparent rounded-md text-base font-medium bg-white text-indigo-600 hover:bg-indigo-50"
            >
              Cadastrar
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="#features" className="text-white block px-3 py-2 rounded-md text-base font-medium">
                Recursos
              </Link>
              <Link href="#dashboard" className="text-white block px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </Link>
              <Link href="#testimonials" className="text-white block px-3 py-2 rounded-md text-base font-medium">
                Depoimentos
              </Link>
              <Link href="#faq" className="text-white block px-3 py-2 rounded-md text-base font-medium">
                FAQ
              </Link>
              <Link href="/login" className="text-white block px-3 py-2 rounded-md text-base font-medium">
                Entrar
              </Link>
              <Link href="/signup" className="text-white block px-3 py-2 rounded-md text-base font-medium">
                Cadastrar
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

