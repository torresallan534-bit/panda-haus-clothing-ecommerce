'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/useCartStore'

export const Navbar: React.FC = () => {
  const { totalItems, setIsOpen } = useCartStore()
  const [mounted, setMounted] = useState(false)

  // Prevenir discrepancias de hidratación con zustand persist
  useEffect(() => {
    setMounted(true)
  }, [])

  const count = mounted ? totalItems() : 0

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-neutral-600">
          <Link href="/#catalogo" className="hover:text-neutral-950 transition-colors">
            Catálogo
          </Link>
          <Link href="/#asesoria" className="hover:text-neutral-950 transition-colors">
            Asesoría WhatsApp
          </Link>
        </nav>

        {/* Logo Central Panda Haus */}
        <Link href="/" className="text-base sm:text-lg font-bold tracking-widest uppercase text-neutral-950">
          Panda Haus<span className="text-neutral-400 font-light">.</span>
        </Link>

        {/* Icono de Carrito Interactivo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir carrito de compras"
            className="relative p-2.5 text-neutral-900 hover:opacity-75 transition-all flex items-center gap-1.5 group"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>

            {/* Contador dinámico */}
            <span
              className={`min-w-4 h-4 px-1 bg-neutral-950 text-white text-[9px] font-bold rounded-full flex items-center justify-center transition-transform ${
                count > 0 ? 'scale-100' : 'scale-90 opacity-60'
              }`}
            >
              {count}
            </span>

            <span className="hidden sm:inline-block text-xs uppercase tracking-wider font-semibold text-neutral-800 ml-1">
              Bolsa
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
