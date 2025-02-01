"use client"

import Header from "./components/Header"
import { Calendar, Clock, Users, Scissors, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import StarryBackground from "./components/StarryBackgroud"

export default function Home() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDirection, setAnimationDirection] = useState<"left" | "right">("right")

  const testimonials = [
    {
      name: "João Silva",
      barbershop: "Barbearia Estilo",
      text: "Barber Alpha revolucionou minha barbearia. Agora tenho mais tempo para focar no que realmente importa: meus clientes.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Maria Oliveira",
      barbershop: "Corte & Charme",
      text: "Desde que comecei a usar o Barber Alpha, minha agenda está sempre cheia e organizada. Recomendo a todos os barbeiros!",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Carlos Santos",
      barbershop: "Barba & Cia",
      text: "A facilidade de uso e a eficiência do Barber Alpha são incomparáveis. Meus clientes adoram poder agendar online a qualquer hora.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Ana Rodrigues",
      barbershop: "Tesoura de Ouro",
      text: "O Barber Alpha simplificou minha vida. Gerenciar minha barbearia nunca foi tão fácil e eficiente.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Pedro Almeida",
      barbershop: "Barber Shop Prime",
      text: "Excelente plataforma! Aumentou significativamente a produtividade da minha barbearia.",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const moveTestimonials = useCallback(
    (direction: "left" | "right") => {
      if (!isAnimating) {
        setIsAnimating(true)
        setAnimationDirection(direction)
        setTimeout(() => {
          setCurrentTestimonialIndex((prevIndex) => {
            if (direction === "right") {
              return (prevIndex + 1) % testimonials.length
            } else {
              return (prevIndex - 1 + testimonials.length) % testimonials.length
            }
          })
          setIsAnimating(false)
        }, 500) // Half of the animation duration
      }
    },
    [isAnimating, testimonials.length],
  )

  const nextTestimonial = useCallback(() => moveTestimonials("right"), [moveTestimonials])
  const prevTestimonial = useCallback(() => moveTestimonials("left"), [moveTestimonials])

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [nextTestimonial])

  const renderTestimonial = (index: number) => {
    const testimonial = testimonials[index]
    return (
      <div
        key={index}
        className={`bg-gray-800 p-6 rounded-lg shadow-lg h-full flex flex-col justify-between transition-all duration-500 ${
          isAnimating
            ? animationDirection === "right"
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        <div>
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-lg mb-4">{testimonial.text}</p>
        </div>
        <div className="flex items-center mt-4">
          <Image
            src={testimonial.image || "/placeholder.svg"}
            alt={testimonial.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="ml-4">
            <p className="font-bold">{testimonial.name}</p>
            <p className="text-sm text-gray-400">{testimonial.barbershop}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white">
      <StarryBackground />
      <Header />

      <main className="pt-20 relative z-10">
        {/* Hero section */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Barber Alpha</h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Simplifique o agendamento da sua barbearia. Gerencie clientes, horários e aumente sua eficiência com nossa
            plataforma intuitiva.
          </p>
          <a
            href="#"
            className="mt-8 bg-indigo-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-indigo-700"
          >
            Comece gratuitamente
          </a>
        </div>

        {/* Feature section */}
        <div className="py-12" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Recursos</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                Tudo que você precisa para gerenciar sua barbearia
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <Calendar className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium">Agendamento online</dt>
                    <dd className="mt-2 text-base text-gray-400">
                      Permita que seus clientes agendem horários 24/7 através da nossa plataforma intuitiva.
                    </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <Clock className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium">Gerenciamento de horários</dt>
                    <dd className="mt-2 text-base text-gray-400">
                      Organize facilmente os horários dos seus barbeiros e evite conflitos de agendamento.
                    </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium">Gestão de clientes</dt>
                    <dd className="mt-2 text-base text-gray-400">
                      Mantenha um registro detalhado dos seus clientes, incluindo preferências e histórico de serviços.
                    </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <Scissors className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium">Catálogo de serviços</dt>
                    <dd className="mt-2 text-base text-gray-400">
                      Crie e gerencie facilmente seu catálogo de serviços, incluindo preços e durações.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Dashboard preview section */}
        <div className="py-12 bg-gray-800" id="dashboard">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Dashboard</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                Gerencie sua barbearia com facilidade
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <picture>
                <source media="(min-width: 1024px)" srcSet="/placeholder.svg?height=600&width=1200" />
                <source media="(min-width: 768px)" srcSet="/placeholder.svg?height=450&width=900" />
                <Image
                  src="/placeholder.svg?height=300&width=600"
                  alt="Dashboard do Barber Alpha"
                  width={600}
                  height={300}
                  className="w-full h-auto"
                />
              </picture>
            </div>
          </div>
        </div>

        {/* Testimonials section */}
        <div className="py-12" id="testimonials">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Depoimentos</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                O que nossos clientes dizem
              </p>
            </div>
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out">
                  {[0, 1, 2].map((offset) => {
                    const index = (currentTestimonialIndex + offset) % testimonials.length
                    return (
                      <div key={offset} className="w-full md:w-1/3 flex-shrink-0 px-4">
                        {renderTestimonial(index)}
                      </div>
                    )
                  })}
                </div>
              </div>
              <button
                onClick={prevTestimonial}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Depoimentos anteriores"
                disabled={isAnimating}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Próximos depoimentos"
                disabled={isAnimating}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* FAQ section */}
        <div className="py-12" id="faq">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">FAQ</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">Perguntas Frequentes</p>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Como funciona o agendamento online?</h3>
                <p className="text-gray-400">
                  Os clientes podem acessar sua página de agendamento, escolher o serviço desejado, selecionar um
                  barbeiro disponível e marcar um horário conveniente.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Posso personalizar os serviços oferecidos?</h3>
                <p className="text-gray-400">
                  Sim, você tem total controle sobre o catálogo de serviços, podendo adicionar, editar ou remover
                  serviços conforme necessário.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Como o Barber Alpha ajuda a evitar conflitos de horários?</h3>
                <p className="text-gray-400">
                  Nosso sistema atualiza automaticamente a disponibilidade em tempo real, garantindo que não haja
                  sobreposição de agendamentos.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Existe um aplicativo móvel para gerenciar minha barbearia?</h3>
                <p className="text-gray-400">
                  Sim, oferecemos aplicativos para iOS e Android, permitindo que você gerencie sua barbearia de qualquer
                  lugar, a qualquer momento.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="bg-indigo-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              <span className="block">Pronto para simplificar sua barbearia?</span>
              <span className="block text-indigo-200">Comece a usar o Barber Alpha hoje.</span>
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Comece agora
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3 inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Saiba mais
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">&copy; 2023 Barber Alpha. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

