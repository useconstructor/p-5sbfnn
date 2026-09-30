'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Menu,
  X,
  ChevronDown,
  Star,
  Heart,
  Flower2,
  Building2,
  PartyPopper,
  HandHeart,
  Award,
  Truck,
  Sparkles,
  Users,
  ChevronLeft,
  ChevronRight,
  Check,
  Send,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Leaf,
} from 'lucide-react'

interface Arrangement {
  id: number
  name: string
  description: string
  price_label: string
  image_gradient: string
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [arrangements, setArrangements] = useState<Arrangement[]>([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    fetch('/api/arrangements')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setArrangements(data)
        }
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const testimonials = [
    {
      text: 'Flores del Valle hizo que nuestro día fuera perfecto. El ramo de novia era exactamente como lo imaginé.',
      author: 'María G.',
      role: 'Novia',
      location: 'Medellín, 2024',
    },
    {
      text: 'Para nuestro evento corporativo eligieron flores que coincidieron perfectamente con nuestra identidad de marca.',
      author: 'Carlos R.',
      role: 'Gerente de Eventos',
      location: 'Grupo Empresarial LM',
    },
    {
      text: 'Entrega rápida, atención excepcional y arreglos hermosos. Los recomiendo 100%.',
      author: 'Laura S.',
      role: 'Cliente Frecuente',
      location: 'Sabaneta',
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('loading')

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CONSTRUCTOR_API}/v1/forms/${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      )

      if (res.ok) {
        setFormStatus('success')
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Catálogo', href: '#catalogo' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Precios', href: '#precios' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <main className="min-h-screen bg-cream">
      {/* Sticky Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#hero" className="flex items-center gap-2">
              <Flower2 className="w-8 h-8 text-forest" />
              <span
                className={`font-[var(--font-display)] text-2xl font-semibold tracking-tight ${
                  scrolled ? 'text-charcoal' : 'text-white drop-shadow-lg'
                }`}
              >
                Flores del Valle
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-forest ${
                    scrolled ? 'text-charcoal' : 'text-white drop-shadow-md'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                className="bg-forest hover:bg-forest-light text-white"
              >
                <a href="#contacto">Solicitar Presupuesto</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-charcoal hover:bg-beige' : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-cream shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-charcoal text-lg font-medium transition-all duration-300"
                style={{ transitionDelay: mobileMenuOpen ? `${index * 60}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="w-full bg-forest hover:bg-forest-light text-white mt-4"
              style={{ transitionDelay: mobileMenuOpen ? `${navLinks.length * 60}ms` : '0ms' }}
            >
              <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>
                Solicitar Presupuesto
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen min-h-[700px] overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Arreglo floral de lujo con rosas blancas y eucalipto"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-coral font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in">
            Diseño Floral de Alta Gama
          </p>
          <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl lg:text-7xl text-white font-semibold max-w-4xl leading-tight mb-6">
            Flores que Cuentan tu Historia
          </h1>
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
            Arreglos personalizados para bodas, eventos corporativos y momentos especiales.
            Cada creación es una obra de arte diseñada para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-forest hover:bg-forest-light text-white px-8 py-6 text-lg"
            >
              <a href="#contacto">Solicitar Presupuesto</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-charcoal px-8 py-6 text-lg"
            >
              <a href="#catalogo">Ver Catálogo</a>
            </Button>
          </div>

          <a
            href="#stats"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
          >
            <ChevronDown className="w-8 h-8" />
          </a>
        </div>
      </section>

      {/* Stats Banner */}
      <section id="stats" className="bg-beige py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { number: '1.200+', label: 'Eventos Realizados' },
              { number: '15', label: 'Años de Trayectoria' },
              { number: '98%', label: 'Satisfacción de Clientes' },
              { number: '24h', label: 'Entregas Rápidas' },
              { number: '100%', label: 'Flores Frescas' },
            ].map((stat, index) => (
              <div key={index} className="px-4">
                <p className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-forest mb-2">
                  {stat.number}
                </p>
                <p className="text-charcoal/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Arrangements */}
      <section id="catalogo" className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-coral font-medium tracking-widest uppercase text-sm mb-4">
              Nuestras Creaciones
            </p>
            <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl text-charcoal font-semibold mb-6">
              Arreglos Destacados
            </h2>
            <p className="text-charcoal/70 max-w-2xl mx-auto text-lg">
              Cada arreglo es creado con flores seleccionadas a mano y un diseño
              único que refleja la elegancia natural.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {arrangements.map((arrangement) => (
              <Card
                key={arrangement.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`h-64 bg-gradient-to-br ${arrangement.image_gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-white/90 backdrop-blur-sm text-forest font-medium px-4 py-2 rounded-full text-sm">
                      {arrangement.price_label}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-[var(--font-display)] text-xl font-semibold text-charcoal mb-2">
                    {arrangement.name}
                  </h3>
                  <p className="text-charcoal/70">{arrangement.description}</p>
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 text-forest font-medium mt-4 hover:gap-3 transition-all"
                  >
                    Consultar <ChevronRight className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 lg:py-28 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-coral font-medium tracking-widest uppercase text-sm mb-4">
              Nuestros Servicios
            </p>
            <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl font-semibold mb-6">
              Servicios para Eventos
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Transformamos tus momentos especiales con diseños florales únicos
              y un servicio personalizado de principio a fin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Bodas',
                description:
                  'Diseños personalizados que reflejan tu estilo, desde centros de mesa hasta ramos de novia.',
              },
              {
                icon: Building2,
                title: 'Corporativo',
                description:
                  'Arreglos que complementan tu imagen de marca para eventos empresariales y oficinas.',
              },
              {
                icon: PartyPopper,
                title: 'Quinceañeras',
                description:
                  'Creaciones florales memorables para celebrar esta fecha tan especial.',
              },
              {
                icon: HandHeart,
                title: 'Funerario',
                description:
                  'Tributos florales elegantes y respetuosos para honrar a quienes amamos.',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-white/10 hover:border-coral/50 hover:bg-white/5 transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-forest/30 flex items-center justify-center mb-6 group-hover:bg-coral/30 transition-colors">
                  <service.icon className="w-8 h-8 text-coral" />
                </div>
                <h3 className="font-[var(--font-display)] text-2xl font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-white/70 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section id="nosotros" className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-coral font-medium tracking-widest uppercase text-sm mb-4">
                Por Qué Elegirnos
              </p>
              <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl text-charcoal font-semibold mb-8">
                Compromiso con la Excelencia
              </h2>

              <div className="space-y-8">
                {[
                  {
                    icon: Award,
                    title: 'Diseñadores Certificados',
                    description:
                      'Equipo con más de 50 años combinados de experiencia en diseño floral internacional.',
                  },
                  {
                    icon: Sparkles,
                    title: 'Flores Premium',
                    description:
                      'Importamos directamente de Ecuador y trabajamos con cultivadores locales certificados.',
                  },
                  {
                    icon: Users,
                    title: 'Servicio Personalizado',
                    description:
                      'Consulta sin costo y ajustes ilimitados hasta tu satisfacción total.',
                  },
                  {
                    icon: Truck,
                    title: 'Entrega Garantizada',
                    description:
                      'Entregas puntuales con el máximo cuidado para preservar la frescura y belleza.',
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex gap-5">
                    <div className="w-14 h-14 rounded-xl bg-beige flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-7 h-7 text-forest" />
                    </div>
                    <div>
                      <h3 className="font-[var(--font-display)] text-xl font-semibold text-charcoal mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-charcoal/70 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/feature.png"
                  alt="Proceso de diseño floral artesanal"
                  width={600}
                  height={700}
                  className="object-cover w-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-forest text-white p-6 rounded-2xl shadow-xl">
                <p className="font-[var(--font-display)] text-3xl font-bold">15+</p>
                <p className="text-white/80 text-sm">Años de Experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-beige">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-coral font-medium tracking-widest uppercase text-sm mb-4">
              Testimonios
            </p>
            <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl text-charcoal font-semibold">
              Lo Que Dicen Nuestros Clientes
            </h2>
          </div>

          <div className="relative">
            <Card className="border-0 shadow-xl bg-white p-8 sm:p-12">
              <CardContent className="p-0 text-center">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-coral text-coral" />
                  ))}
                </div>
                <blockquote className="font-[var(--font-display)] text-2xl sm:text-3xl text-charcoal leading-relaxed mb-8 italic">
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-forest flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[currentTestimonial].author.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-charcoal">
                      {testimonials[currentTestimonial].author}
                    </p>
                    <p className="text-charcoal/60 text-sm">
                      {testimonials[currentTestimonial].role} · {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="precios" className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-coral font-medium tracking-widest uppercase text-sm mb-4">
              Nuestros Paquetes
            </p>
            <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl text-charcoal font-semibold mb-6">
              Opciones para Cada Ocasión
            </h2>
            <p className="text-charcoal/70 max-w-2xl mx-auto text-lg">
              Encuentra el paquete perfecto para tu celebración o contáctanos
              para una cotización personalizada.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Estándar',
                price: 'Desde $75.000',
                description: 'Perfecto para ocasiones íntimas',
                features: [
                  'Arreglo para escritorio o mesa pequeña',
                  '5 variedades de flores',
                  'Vigencia de 5 días',
                  'Entrega incluida en zona centro',
                ],
                popular: false,
              },
              {
                name: 'Premium',
                price: 'Desde $150.000',
                description: 'Nuestra opción más popular',
                features: [
                  'Arreglo grande para centro de mesa',
                  '8+ variedades de flores',
                  'Flores importadas incluidas',
                  'Vigencia de 7 días',
                  'Refresco de arreglo incluido',
                  'Consulta de diseño personalizada',
                ],
                popular: true,
              },
              {
                name: 'Eventos',
                price: 'Personalizado',
                description: 'Para bodas y eventos especiales',
                features: [
                  'Consulta para presupuesto a medida',
                  'Equipo dedicado a tu evento',
                  'Instalación profesional incluida',
                  'Seguimiento post evento',
                  'Coordinación con venue',
                ],
                popular: false,
              },
            ].map((tier, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  tier.popular ? 'ring-2 ring-forest' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-forest text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                    Más Popular
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="font-[var(--font-display)] text-2xl font-semibold text-charcoal mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-charcoal/60 text-sm mb-4">{tier.description}</p>
                  <p className="font-[var(--font-display)] text-3xl font-bold text-forest mb-6">
                    {tier.price}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
                        <span className="text-charcoal/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${
                      tier.popular
                        ? 'bg-forest hover:bg-forest-light text-white'
                        : 'bg-beige hover:bg-charcoal hover:text-white text-charcoal'
                    }`}
                  >
                    <a href="#contacto">Solicitar Cotización</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contacto" className="py-20 lg:py-28 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-coral font-medium tracking-widest uppercase text-sm mb-4">
                Contáctanos
              </p>
              <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl font-semibold mb-6">
                Solicita tu Presupuesto
              </h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                Cuéntanos sobre tu evento o la ocasión especial que deseas celebrar.
                Nuestro equipo te contactará para crear el arreglo perfecto.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p className="text-white/60">Medellín, Colombia</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <p className="font-medium">Consultas</p>
                    <p className="text-white/60">Utiliza el formulario de contacto</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {formStatus === 'success' ? (
                <Card className="border-0 bg-white/10 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-forest mx-auto flex items-center justify-center mb-6">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-[var(--font-display)] text-2xl font-semibold mb-3">
                      Mensaje Enviado
                    </h3>
                    <p className="text-white/70">
                      Gracias por contactarnos. Te responderemos pronto.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 bg-white/10 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Nombre</label>
                          <Input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                            placeholder="Tu nombre"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Teléfono</label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                            placeholder="Tu teléfono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Tipo de Evento</label>
                        <select
                          value={formData.eventType}
                          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                          className="w-full h-10 rounded-md bg-white/10 border border-white/20 text-white px-3 focus:outline-none focus:ring-2 focus:ring-forest"
                        >
                          <option value="" className="text-charcoal">
                            Selecciona una opción
                          </option>
                          <option value="boda" className="text-charcoal">
                            Boda
                          </option>
                          <option value="corporativo" className="text-charcoal">
                            Evento Corporativo
                          </option>
                          <option value="quinceañera" className="text-charcoal">
                            Quinceañera
                          </option>
                          <option value="cumpleaños" className="text-charcoal">
                            Cumpleaños
                          </option>
                          <option value="arreglo" className="text-charcoal">
                            Arreglo Personal
                          </option>
                          <option value="otro" className="text-charcoal">
                            Otro
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Mensaje</label>
                        <Textarea
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[120px]"
                          placeholder="Cuéntanos sobre tu evento o lo que necesitas..."
                        />
                      </div>
                      {formStatus === 'error' && (
                        <p className="text-coral text-sm">
                          Hubo un error al enviar. Por favor intenta de nuevo.
                        </p>
                      )}
                      <Button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full bg-forest hover:bg-forest-light text-white py-6"
                      >
                        {formStatus === 'loading' ? (
                          'Enviando...'
                        ) : (
                          <>
                            Enviar Mensaje <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Flower2 className="w-8 h-8 text-coral" />
                <span className="font-[var(--font-display)] text-2xl font-semibold text-white">
                  Flores del Valle
                </span>
              </div>
              <p className="text-white/60 leading-relaxed max-w-sm mb-6">
                Creamos arreglos florales de lujo que transforman momentos ordinarios
                en recuerdos extraordinarios.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Navegación</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-coral transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Servicios</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#servicios" className="text-white/60 hover:text-coral transition-colors">
                    Bodas
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="text-white/60 hover:text-coral transition-colors">
                    Corporativo
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="text-white/60 hover:text-coral transition-colors">
                    Quinceañeras
                  </a>
                </li>
                <li>
                  <a href="#catalogo" className="text-white/60 hover:text-coral transition-colors">
                    Catálogo
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Flores del Valle. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Leaf className="w-4 h-4" />
              <span>Comprometidos con la sostenibilidad</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
