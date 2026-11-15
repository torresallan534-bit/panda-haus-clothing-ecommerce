import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton'
import { StickyAddToCart } from '@/components/products/StickyAddToCart'
import { WhatsAppFloatingWidget } from '@/components/whatsapp/WhatsAppFloatingWidget'
import { ALL_PRODUCTS, ProductItem } from '@/components/products/CatalogSection'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = ALL_PRODUCTS.find((p) => p.slug === slug) || ALL_PRODUCTS[0]

  if (!product) {
    notFound()
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573001234567'
  const hasDiscount = product.salePrice && product.salePrice < product.price
  const activePrice = hasDiscount ? product.salePrice! : product.price

  return (
    <div className="min-h-screen bg-white">
      {/* Migas de Pan (Breadcrumb) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
        <Link href="/" className="hover:text-neutral-900">Inicio</Link>
        <span>/</span>
        <Link href="/#catalogo" className="hover:text-neutral-900">{product.categoryName}</Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium truncate">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Columna de Galería (Imagen de alta resolución) */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full bg-neutral-100 rounded-sm overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Columna de Información & Compra */}
          <div className="flex flex-col md:sticky md:top-24 h-fit">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
              SKU: {product.sku}
            </span>
            <h1 className="text-2xl sm:text-4xl font-light text-neutral-950 uppercase tracking-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl sm:text-2xl font-semibold text-neutral-900">
                ${activePrice.toLocaleString('es-CO')}
              </span>
              {hasDiscount && (
                <span className="text-base text-neutral-400 line-through">
                  ${product.price.toLocaleString('es-CO')}
                </span>
              )}
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed font-light mb-8">
              Prenda de alta confección diseñada por Panda Haus Studio. Textura suave, estructura contemporánea y acabados de máxima durabilidad para el uso cotidiano.
            </p>

            {/* Selector de Tallas */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-900">
                  Selecciona tu talla
                </span>
                <span className="text-xs text-neutral-500 underline cursor-pointer">
                  Guía de tallas
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    type="button"
                    className="border border-neutral-300 hover:border-neutral-900 text-xs font-medium py-2.5 px-4 focus:bg-neutral-950 focus:text-white transition-all"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs de Alta Conversión */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="w-full bg-neutral-950 hover:bg-black text-white text-xs uppercase tracking-widest font-semibold py-4 transition-colors shadow-md"
              >
                Añadir al Carrito
              </button>

              {/* Botón Dinámico de WhatsApp */}
              <WhatsAppButton
                phoneNumber={whatsappNumber}
                productName={product.name}
                sku={product.sku}
                price={activePrice}
              />
            </div>

            {/* Beneficios Garantizados */}
            <div className="mt-10 border-t border-neutral-200 pt-6 flex flex-col gap-3 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900">✓ Envío Express:</span> Despacho en 24-48 horas.
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900">✓ Cambios Fáciles:</span> 30 días para cambios sin costo.
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900">✓ Pago Seguro:</span> Tarjetas, transferencias y contraentrega.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart al hacer scroll */}
      <StickyAddToCart
        id={product.id}
        name={product.name}
        price={product.price}
        salePrice={product.salePrice}
        image={product.image}
        sku={product.sku}
        sizes={product.sizes}
      />

      {/* Widget Flotante */}
      <WhatsAppFloatingWidget phoneNumber={whatsappNumber} />
    </div>
  )
}
