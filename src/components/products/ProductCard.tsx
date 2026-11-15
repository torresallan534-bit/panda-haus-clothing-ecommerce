'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/useCartStore'

export interface ProductCardProps {
  id: string
  name: string
  slug: string
  sku: string
  price: number
  salePrice?: number | null
  primaryImage: string
  secondaryImage: string
  sizes: string[]
  categoryName?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  slug,
  sku,
  price,
  salePrice,
  primaryImage,
  secondaryImage,
  sizes,
  categoryName,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || 'M')
  const [isHovered, setIsHovered] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const hasDiscount = salePrice && salePrice < price
  const activePrice = hasDiscount ? salePrice : price
  const discountPercent = hasDiscount ? Math.round(((price - salePrice!) / price) * 100) : 0

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id,
      name,
      price: activePrice,
      image: primaryImage,
      sku,
      selectedSize,
    })
  }

  return (
    <div
      className="group relative flex flex-col font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenedor de la Imagen (Ratio 3:4 estilo editorial) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-sm">
        {/* Badge de Oferta */}
        {hasDiscount && (
          <span className="absolute top-2.5 left-2.5 z-20 bg-neutral-900 text-white text-[10px] tracking-widest uppercase font-medium px-2 py-0.5">
            -{discountPercent}%
          </span>
        )}

        <Link href={`/productos/${slug}`} className="block w-full h-full">
          {/* Imagen Primaria */}
          <Image
            src={primaryImage}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />

          {/* Imagen Secundaria (Efecto Zara Hover) */}
          <Image
            src={secondaryImage}
            alt={`${name} en detalle`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ease-out absolute inset-0 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />
        </Link>

        {/* Botón Añadir Rápido (Hover en Desktop, Táctil en Móvil) */}
        <div className="absolute bottom-0 inset-x-0 p-2 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out md:block">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-neutral-950/90 hover:bg-black text-white text-xs uppercase tracking-wider py-2.5 font-medium backdrop-blur-sm transition-colors shadow-sm"
          >
            Añadir Rápido ({selectedSize})
          </button>
        </div>
      </div>

      {/* Información del Producto */}
      <div className="pt-3 pb-1 flex flex-col gap-1">
        {categoryName && (
          <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">
            {categoryName}
          </span>
        )}
        <Link href={`/productos/${slug}`}>
          <h3 className="text-xs md:text-sm font-normal text-neutral-900 line-clamp-1 hover:underline underline-offset-4">
            {name}
          </h3>
        </Link>

        {/* Precios */}
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs md:text-sm font-semibold text-neutral-900">
            ${activePrice.toLocaleString('es-CO')}
          </span>
          {hasDiscount && (
            <span className="text-[11px] md:text-xs text-neutral-400 line-through">
              ${price.toLocaleString('es-CO')}
            </span>
          )}
        </div>

        {/* Selector sutil de tallas (Mobile-Friendly) */}
        {sizes.length > 0 && (
          <div className="flex items-center gap-1.5 mt-1 overflow-x-auto scrollbar-none py-1">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`text-[10px] px-2 py-0.5 border transition-all ${
                  selectedSize === size
                    ? 'border-neutral-900 bg-neutral-900 text-white font-medium'
                    : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
