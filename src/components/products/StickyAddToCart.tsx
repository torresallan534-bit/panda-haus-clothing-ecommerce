'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/useCartStore'

interface StickyAddToCartProps {
  id: string
  name: string
  price: number
  salePrice?: number | null
  image: string
  sku: string
  sizes: string[]
}

export const StickyAddToCart: React.FC<StickyAddToCartProps> = ({
  id,
  name,
  price,
  salePrice,
  image,
  sku,
  sizes,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || 'M')
  const addItem = useCartStore((state) => state.addItem)

  const activePrice = salePrice && salePrice < price ? salePrice : price

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 450)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price: activePrice,
      image,
      sku,
      selectedSize,
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 shadow-2xl"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-14 bg-neutral-100 rounded-sm overflow-hidden flex-shrink-0">
                <Image src={image} alt={name} fill className="object-cover" />
              </div>
              <div className="hidden sm:block truncate">
                <h4 className="text-xs font-medium text-neutral-900 truncate">{name}</h4>
                <p className="text-xs font-semibold text-neutral-900">
                  ${activePrice.toLocaleString('es-CO')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {sizes.length > 0 && (
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="text-xs border border-neutral-300 rounded-none bg-white py-2.5 px-3 font-medium focus:outline-none focus:border-neutral-900"
                >
                  {sizes.map((s) => (
                    <option key={s} value={s}>
                      Talla {s}
                    </option>
                  ))}
                </select>
              )}

              <button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-none bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-wider py-2.5 px-6 font-semibold transition-colors shadow-sm"
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
