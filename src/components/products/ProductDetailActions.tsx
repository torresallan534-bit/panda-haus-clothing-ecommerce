'use client'

import React, { useState } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton'

interface ProductDetailActionsProps {
  id: string
  name: string
  price: number
  image: string
  sku: string
  sizes: string[]
  whatsappNumber: string
}

export const ProductDetailActions: React.FC<ProductDetailActionsProps> = ({
  id,
  name,
  price,
  image,
  sku,
  sizes,
  whatsappNumber,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || 'M')
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image,
      sku,
      selectedSize,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Selector de Tallas */}
      <div>
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-900">
            Talla Seleccionada: <span className="text-neutral-500 font-normal">{selectedSize}</span>
          </span>
          <span className="text-xs text-neutral-500 underline cursor-pointer hover:text-neutral-900">
            Guía de tallas
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`border text-xs font-semibold py-2.5 px-5 transition-all ${
                selectedSize === size
                  ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Botones de Alta Conversión */}
      <div className="flex flex-col gap-3">
        {/* Botón Principal: Añadir al Carrito (Abre el Drawer) */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full bg-neutral-950 hover:bg-black text-white text-xs uppercase tracking-widest font-semibold py-4 transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>Añadir al Carrito</span>
        </button>

        {/* Botón Secundario: Consultar Prenda por WhatsApp */}
        <WhatsAppButton
          phoneNumber={whatsappNumber}
          productName={name}
          sku={sku}
          selectedSize={selectedSize}
          price={price}
        />
      </div>
    </div>
  )
}
