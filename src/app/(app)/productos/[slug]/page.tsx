import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { StickyAddToCart } from '@/components/products/StickyAddToCart'
import { WhatsAppFloatingWidget } from '@/components/whatsapp/WhatsAppFloatingWidget'
import { ALL_PRODUCTS } from '@/components/products/CatalogSection'
import { ProductDetailActions } from '@/components/products/ProductDetailActions'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = ALL_PRODUCTS.find((p) => p.slug === slug) || ALL_PRODUCTS[0]

  if (!product) {
    notFound()
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573248000501'
  const hasDiscount = product.salePrice && product.salePrice < product.price
  const activePrice = hasDiscount ? product.salePrice! : product.price

  return (
    <div className="min-h-screen bg-white font-sans">
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
                ${activePrice.toLocaleString('es-CO')} COP
              </span>
              {hasDiscount && (
                <span className="text-base text-neutral-400 line-through">
                  ${product.price.toLocaleString('es-CO')} COP
                </span>
              )}
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed font-light mb-8">
              Prenda de alta confección diseñada por Panda Haus Studio. Textura suave, estructura contemporánea y acabados de máxima durabilidad para el uso cotidiano.
            </p>

            {/* Acciones de Compra y Selección de Talla (Reactivo con Carrito y WhatsApp) */}
            <ProductDetailActions
              id={product.id}
              name={product.name}
              price={activePrice}
              image={product.image}
              sku={product.sku}
              sizes={product.sizes}
              whatsappNumber={whatsappNumber}
            />

            {/* Beneficios Garantizados */}
            <div className="mt-10 border-t border-neutral-200 pt-6 flex flex-col gap-3 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900">✓ Envío Express:</span> Despacho nacional en 24-48 horas.
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900">✓ Envío Gratis:</span> En compras superiores a $200.000 COP.
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900">✓ Cambios Fáciles:</span> 30 días para cambios de talla sin costo.
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900">✓ Atención Personalizada:</span> Pedidos confirmados 1 a 1 por WhatsApp.
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
