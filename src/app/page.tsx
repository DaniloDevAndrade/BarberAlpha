"use client"

import Header from "./components/Header"
import { Calendar, Clock, Users, Scissors, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import StarryBackground from "./components/StarryBackgroud"
import Footer from "./components/Footer"

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Juliana Castro",
      barbershop: "Corte e Estilo",
      text: "O Barber Alpha não é apenas uma ferramenta; é como um membro da equipe! Minhas clientes estão adorando a facilidade de entrar em filas e esperar de casa e eu tenho mais tempo para me dedicar a cada um delas.",
    },
    {
      name: "Marcos Ferreira",
      barbershop: "Barbearia Arte",
      text: "Com o Barber Alpha, consegui organizar minhas finanças de forma que nunca pensei ser possível. O stress de perder clientes por conta de filas grandes desapareceu! Meu negócio nunca esteve tão bem!",
    },
    {
      name: "Fernando Costa",
      barbershop: "Barbearia Clássica",
      text: "Já experimentei várias plataformas, mas nada se compara ao Barber Alpha. A agilidade no atendimento aumentou e a satisfação dos meus clientes também. Recomendo de olhos fechados!",
    },
    {
      name: "Lucas Almeida",
      barbershop: "Barbearia Premium",
      text: "Com o Barber Alpha, finalmente consegui equilibrar meu tempo. Agora posso atender mais clientes e ainda ter tempo para meu descanso. Muito mais que um aplicativo, uma verdadeira transformação!",
    },
    {
      name: "Fernanda Gomes",
      barbershop: "Sobrancelhas e Barba",
      text: "O Barber Alpha trouxe uma nova vida à minha barbearia! O feedback dos clientes tem sido incrível, e tem sido tão bom ver todos entrando em filas e esperando de CASA! sem qualquer dificuldade. Super recomendo!",
    },
  ];
  

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
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
            Simplifique a fila da sua barbearia. Gerencie clientes, horários e aumente sua eficiência com nossa
            plataforma intuitiva.
          </p>
          <a
            href="#"
            className="mt-8 bg-indigo-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-indigo-700"
          >
            Comece AGORA!
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
                    <dt className="text-lg leading-6 font-medium">Fila online</dt>
                    <dd className="mt-2 text-base text-gray-400">
                      Permita que seus clientes em filas onlines e esperem de casa! através da nossa plataforma intuitiva.
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
                    <dt className="text-lg leading-6 font-medium">Gerenciamento de finanças</dt>
                    <dd className="mt-2 text-base text-gray-400">
                      Organize facilmente as finanças de sua barbearia e aumente seus lucros!.
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
                <source media="(min-width: 1024px)" srcSet="/dashboard.svg?height=600&width=1200" />
                <Image
                  src="/dashboard3.svg?height=300&width=600"
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
                <div
                  className="flex flex-col md:flex-row transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-4 mb-8 md:mb-0">
                      <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full flex flex-col">
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-lg mb-4 flex-grow">{testimonial.text}</p>
                        <div className="flex items-center">
                          <div className="ml-4">
                            <p className="font-bold">{testimonial.name}</p>
                            <p className="text-sm text-gray-400">{testimonial.barbershop}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={prevTestimonial}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-indigo-600 p-2 rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-indigo-600 p-2 rounded-full"
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
                <h3 className="text-xl font-bold mb-2">Como funciona a fila online?</h3>
                <p className="text-gray-400">
                  Os clientes podem acessar sua página de fila, apos preencher os dados necessarios ele vai entrar em uma fila online
                  podendo esperar de casa sua vez de ser chamado, ao chegar sua vez enviaremos uma mensagem no whatsapp para ele se 
                  dirigir até a barbearia.
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
                <h3 className="text-xl font-bold mb-2">Posso gerenciar minha barbearia pelo celular?</h3>
                <p className="text-gray-400">
                  Sim, o sistema já foi criado pensando nisso, permitindo que você gerencie sua barbearia de qualquer
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

      <Footer></Footer>
    </div>
  )
}
