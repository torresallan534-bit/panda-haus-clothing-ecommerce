import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@/components/products/ProductCard'
import { WhatsAppFloatingWidget } from '@/components/whatsapp/WhatsAppFloatingWidget'

// Catálogo semilla de alta conversión listo para usar
const FALLBACK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Camisa Oversize Popelina',
    slug: 'camisa-oversize-popelina',
    sku: 'PH-SHIRT-001',
    price: 189000,
    salePrice: 159000,
    primaryImage: '/images/seed/camisa_corta_blanca.webp',
    secondaryImage: '/images/seed/camisa_larga_azul.webp',
    sizes: ['S', 'M', 'L', 'XL'],
    categoryName: 'Camisas & Chaquetas',
  },
  {
    id: 'prod-2',
    name: 'Chaqueta Utility Minimalista',
    slug: 'chaqueta-utility-minimalista',
    sku: 'PH-JKT-002',
    price: 320000,
    salePrice: null,
    primaryImage: '/images/seed/chaqueta_beige.jfif',
    secondaryImage: '/images/seed/chaqueta_azul.webp',
    sizes: ['M', 'L', 'XL'],
    categoryName: 'Camisas & Chaquetas',
  },
  {
    id: 'prod-3',
    name: 'Pantalón Cargo Tapered',
    slug: 'pantalon-cargo-tapered',
    sku: 'PH-PNT-003',
    price: 240000,
    salePrice: 210000,
    primaryImage: '/images/seed/pantalon_cargo_beige.jpg',
    secondaryImage: '/images/seed/pantalon_cargo_bluejeans.jfif',
    sizes: ['30', '32', '34'],
    categoryName: 'Pantalones & Bermudas',
  },
  {
    id: 'prod-4',
    name: 'Pantalón de Vestir Contemporáneo',
    slug: 'pantalon-vestir-contemporaneo',
    sku: 'PH-PNT-004',
    price: 260000,
    salePrice: null,
    primaryImage: '/images/seed/pantalon_vestir_biegie.webp',
    secondaryImage: '/images/seed/pantalon_vestir_azul.jpg',
    sizes: ['30', '32', '34', '36'],
    categoryName: 'Pantalones & Bermudas',
  },
  {
    id: 'prod-5',
    name: 'Bermuda Relaxed Fit',
    slug: 'bermuda-relaxed-fit',
    sku: 'PH-BRM-005',
    price: 145000,
    salePrice: 125000,
    primaryImage: '/images/seed/short_beige.webp',
    secondaryImage: '/images/seed/bermudas_jeans.jfif',
    sizes: ['28', '30', '32', '34'],
    categoryName: 'Pantalones & Bermudas',
  },
  {
    id: 'prod-6',
    name: 'Sneakers Retro Low Edition',
    slug: 'sneakers-retro-low',
    sku: 'PH-SNK-006',
    price: 490000,
    salePrice: null,
    primaryImage: '/images/seed/nike_dunkLowRetro_blanco.webp',
    secondaryImage: '/images/seed/nike_airmaxplus_azul.webp',
    sizes: ['39', '40', '41', '42'],
    categoryName: 'Calzado & Accesorios',
  },
  {
    id: 'prod-7',
    name: 'Zapato Derby Cuero Artesanal',
    slug: 'zapato-derby-cuero',
    sku: 'PH-SHO-007',
    price: 380000,
    salePrice: 340000,
    primaryImage: '/images/seed/zapatp_cuero_marron.jfif',
    secondaryImage: '/images/seed/zapatp_formal_negro.jfif',
    sizes: ['39', '40', '41', '42'],
    categoryName: 'Calzado & Accesorios',
  },
  {
    id: 'prod-8',
    name: 'Gorra Clásica Algodón',
    slug: 'gorra-clasica-algodon',
    sku: 'PH-ACC-008',
    price: 95000,
    salePrice: null,
    primaryImage: '/images/seed/gorra_adidas_baseball.jfif',
    secondaryImage: '/images/seed/gorra_adidas_baseball.jfif',
    sizes: ['Única'],
    categoryName: 'Calzado & Accesorios',
  },
]

const CATEGORIES = [
  { name: 'Todos', slug: 'todos' },
  { name: 'Camisas & Chaquetas', slug: 'camisas-chaquetas' },
  { name: 'Pantalones & Bermudas', slug: 'pantalones-bermudas' },
  { name: 'Calzado & Accesorios', slug: 'calzado-accesorios' },
]

export default async function HomePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573001234567'
  const storeName = 'Panda Haus'

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
            href="#best-sellers"
            className="inline-block bg-white text-neutral-950 hover:bg-neutral-100 text-xs uppercase font-semibold tracking-widest py-3.5 px-8 transition-all duration-300 shadow-lg"
          >
            Explorar Colección
          </a>
        </div>
      </section>

      {/* 3. Categorías Rápidas */}
      <section id="categorias" className="py-10 px-4 max-w-7xl mx-auto border-b border-neutral-100">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-2 justify-start md:justify-center">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.slug}
              href="#best-sellers"
              className="flex-shrink-0 px-5 py-2.5 rounded-full border border-neutral-200 hover:border-neutral-900 text-xs font-medium uppercase tracking-wider text-neutral-800 transition-colors"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </section>

      {/* 4. Grid de Más Vendidos (2 cols móvil, 4 cols desktop) */}
      <section id="best-sellers" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">
              Selección Exclusiva
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-950 uppercase mt-1">
              Más Vendidos
            </h2>
          </div>
          <span className="text-xs uppercase tracking-wider text-neutral-500 mt-2 md:mt-0 font-medium">
            {FALLBACK_PRODUCTS.length} Productos Disponibles
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
          {FALLBACK_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              sku={product.sku}
              price={product.price}
              salePrice={product.salePrice}
              primaryImage={product.primaryImage}
              secondaryImage={product.secondaryImage}
              sizes={product.sizes}
              categoryName={product.categoryName}
            />
          ))}
        </div>
      </section>

      {/* 5. Bloque de Asesoría de Estilo */}
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

      {/* 6. Widget Flotante de WhatsApp */}
      <WhatsAppFloatingWidget
        phoneNumber={whatsappNumber}
        defaultMessage="¡Hola Panda Haus! Quisiera recibir asesoría personalizada sobre sus prendas."
      />
    </main>
  )
}
