import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton'
import { StickyAddToCart } from '@/components/products/StickyAddToCart'
import { WhatsAppFloatingWidget } from '@/components/whatsapp/WhatsAppFloatingWidget'

// Mapeo de productos para la demo estática & dinámica
const PRODUCTS_MAP: Record<string, any> = {
  'camisa-oversize-popelina': {
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
    description: 'Camisa de corte oversize confeccionada en popelina 100% de algodón de fibra larga. Cuenta con cuello clásico estructurado, botones en acabado mate y hombros ligeramente caídos para un look relajado pero pulido.',
  },
  'chaqueta-utility-minimalista': {
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
    description: 'Chaqueta estilo safari/utility confeccionada en sarga de algodón de alto gramaje con forro térmico transpirable.',
  },
  'pantalon-cargo-tapered': {
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
    description: 'Pantalón cargo moderno con bolsillos laterales discretos y bota semitapered para ajuste perfecto con zapatillas.',
  },
  'pantalon-vestir-contemporaneo': {
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
    description: 'Pantalón sastre con pinzas frontales y tejido elástico para máximo confort en oficina y eventos formales.',
  },
  'bermuda-relaxed-fit': {
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
    description: 'Bermuda casual de tiro medio en gabardina suave. Ideal para climas cálidos y estilo streetwear relajado.',
  },
  'sneakers-retro-low': {
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
    description: 'Zapatillas urbanas de perfil bajo en cuero genuino con suela amortiguada de alto confort para uso diario.',
  },
  'zapato-derby-cuero': {
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
    description: 'Zapato derby clásico de horma italiana con suela cosida a mano y cuero encerado para elegancia atemporal.',
  },
  'gorra-clasica-algodon': {
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
    description: 'Gorra estructurada de 6 paneles en algodón twill con hebilla de ajuste metálica grabada.',
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = PRODUCTS_MAP[slug] || PRODUCTS_MAP['camisa-oversize-popelina']

  if (!product) {
    notFound()
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573001234567'
  const hasDiscount = product.salePrice && product.salePrice < product.price
  const activePrice = hasDiscount ? product.salePrice : product.price

  return (
    <div className="min-h-screen bg-white">
      {/* Migas de Pan (Breadcrumb) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
        <Link href="/" className="hover:text-neutral-900">Inicio</Link>
        <span>/</span>
        <Link href="/#best-sellers" className="hover:text-neutral-900">{product.categoryName}</Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium truncate">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Columna de Galería (Estilo Zara / Aesop) */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full bg-neutral-100 rounded-sm overflow-hidden">
              <Image
                src={product.primaryImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] w-full bg-neutral-100 rounded-sm overflow-hidden">
              <Image
                src={product.secondaryImage}
                alt={`${product.name} perspectiva`}
                fill
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
              {product.description}
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
        image={product.primaryImage}
        sku={product.sku}
        sizes={product.sizes}
      />

      {/* Widget Flotante */}
      <WhatsAppFloatingWidget phoneNumber={whatsappNumber} />
    </div>
  )
}
