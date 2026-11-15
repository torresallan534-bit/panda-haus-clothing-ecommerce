import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CatalogSection } from '@/components/products/CatalogSection'
import { WhatsAppFloatingWidget } from '@/components/whatsapp/WhatsAppFloatingWidget'

export default async function HomePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573248000501'

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* 1. Barra de Beneficios */}
      <div className="bg-neutral-950 text-white text-[11px] py-2 px-4 text-center tracking-widest uppercase font-medium">
        ENVÍO GRATIS A NIVEL NACIONAL POR COMPRAS SUPERIORES A $200.000 COP
      </div>

      {/* 2. Hero Section (Inspirado en Gymshark/Aesop: Full Height / 82vh) */}
      <section className="relative h-[82vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/images/seed/chaqueta_azul.webp"
          alt="Panda Haus Collection"
          fill
          priority
          className="object-cover object-center filter brightness-[0.82]"
        />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold mb-3 text-neutral-200">
            Nueva Colección 2026
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight uppercase leading-tight mb-4">
            ESENCIALES DE TEMPORADA
          </h1>
          <p className="text-sm sm:text-base text-neutral-200 max-w-xl font-light mb-8">
            Prendas contemporáneas diseñadas para resistir el tiempo. Estética minimalista con corte ergonómico.
          </p>
          <a
            href="#catalogo"
            className="inline-block bg-white text-neutral-950 hover:bg-neutral-100 text-xs uppercase font-semibold tracking-widest py-3.5 px-8 transition-all duration-300 shadow-lg"
          >
            Explorar Catálogo
          </a>
        </div>
      </section>

      {/* 3. Catálogo Interactivo por Categorías (Por defecto: Lo Más Vendido) */}
      <CatalogSection />

      {/* 4. Bloque de Asesoría de Estilo */}
      <section id="asesoria" className="bg-neutral-100 py-16 px-6 my-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-neutral-200">
            <Image
              src="/images/seed/camisa_corta_blanca.webp"
              alt="Asesoría personalizada"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start md:pl-6">
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-2">
              Atención Personalizada
            </span>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight uppercase text-neutral-900 mb-4">
              ¿DUDAS CON TU TALLA O LOOK?
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-light">
              Nuestros asesores de estilo te ayudan en tiempo real a elegir la prenda y talla exacta a través de WhatsApp.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                '¡Hola Panda Haus! Quisiera recibir asesoría personalizada para elegir mi prenda y talla.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-widest font-semibold py-3.5 px-8 transition-colors shadow-sm"
            >
              Hablar con un Asesor en Vivo
            </a>
          </div>
        </div>
      </section>

      {/* 5. Widget Flotante de WhatsApp */}
      <WhatsAppFloatingWidget
        phoneNumber={whatsappNumber}
        defaultMessage="¡Hola Panda Haus! Quisiera recibir asesoría personalizada sobre sus prendas."
      />
    </main>
  )
}
