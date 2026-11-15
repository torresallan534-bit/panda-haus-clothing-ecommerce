'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductCard } from '@/components/products/ProductCard'

export interface ProductItem {
  id: string
  name: string
  slug: string
  sku: string
  price: number
  salePrice?: number | null
  image: string
  categoryKey: 'camisas' | 'chaquetas' | 'pantalones' | 'calzado' | 'accesorios'
  categoryName: string
  sizes: string[]
  isBestSeller: boolean
}

// Catálogo completo de las 15 prendas individuales
export const ALL_PRODUCTS: ProductItem[] = [
  // Camisas
  {
    id: 'prod-1',
    name: 'Camisa Manga Corta Blanca',
    slug: 'camisa-manga-corta-blanca',
    sku: 'PH-CAM-001',
    price: 149000,
    salePrice: 129000,
    image: '/images/seed/camisa_corta_blanca.webp',
    categoryKey: 'camisas',
    categoryName: 'Camisas',
    sizes: ['S', 'M', 'L', 'XL'],
    isBestSeller: true,
  },
  {
    id: 'prod-2',
    name: 'Camisa Manga Larga Oxford Azul',
    slug: 'camisa-manga-larga-azul',
    sku: 'PH-CAM-002',
    price: 179000,
    salePrice: null,
    image: '/images/seed/camisa_larga_azul.webp',
    categoryKey: 'camisas',
    categoryName: 'Camisas',
    sizes: ['S', 'M', 'L', 'XL'],
    isBestSeller: true,
  },

  // Chaquetas
  {
    id: 'prod-3',
    name: 'Chaqueta Safari Utility Beige',
    slug: 'chaqueta-safari-beige',
    sku: 'PH-CHQ-001',
    price: 289000,
    salePrice: 249000,
    image: '/images/seed/chaqueta_beige.jpg',
    categoryKey: 'chaquetas',
    categoryName: 'Chaquetas',
    sizes: ['M', 'L', 'XL'],
    isBestSeller: true,
  },
  {
    id: 'prod-4',
    name: 'Chaqueta Bomber Contemporánea Azul',
    slug: 'chaqueta-bomber-azul',
    sku: 'PH-CHQ-002',
    price: 310000,
    salePrice: null,
    image: '/images/seed/chaqueta_azul.webp',
    categoryKey: 'chaquetas',
    categoryName: 'Chaquetas',
    sizes: ['M', 'L', 'XL'],
    isBestSeller: true,
  },

  // Pantalones & Bermudas
  {
    id: 'prod-5',
    name: 'Pantalón Cargo Beige Tapered',
    slug: 'pantalon-cargo-beige',
    sku: 'PH-PNT-001',
    price: 219000,
    salePrice: 189000,
    image: '/images/seed/pantalon_cargo_beige.jpg',
    categoryKey: 'pantalones',
    categoryName: 'Pantalones & Shorts',
    sizes: ['30', '32', '34'],
    isBestSeller: true,
  },
  {
    id: 'prod-6',
    name: 'Pantalón Cargo Denim Bluejeans',
    slug: 'pantalon-cargo-denim',
    sku: 'PH-PNT-002',
    price: 229000,
    salePrice: null,
    image: '/images/seed/pantalon_cargo_bluejeans.jpg',
    categoryKey: 'pantalones',
    categoryName: 'Pantalones & Shorts',
    sizes: ['30', '32', '34'],
    isBestSeller: false,
  },
  {
    id: 'prod-7',
    name: 'Pantalón Sastre de Vestir Beige',
    slug: 'pantalon-sastre-beige',
    sku: 'PH-PNT-003',
    price: 259000,
    salePrice: null,
    image: '/images/seed/pantalon_vestir_biegie.webp',
    categoryKey: 'pantalones',
    categoryName: 'Pantalones & Shorts',
    sizes: ['30', '32', '34', '36'],
    isBestSeller: true,
  },
  {
    id: 'prod-8',
    name: 'Pantalón Sastre de Vestir Azul Marino',
    slug: 'pantalon-sastre-azul',
    sku: 'PH-PNT-004',
    price: 259000,
    salePrice: 229000,
    image: '/images/seed/pantalon_vestir_azul.jpg',
    categoryKey: 'pantalones',
    categoryName: 'Pantalones & Shorts',
    sizes: ['30', '32', '34', '36'],
    isBestSeller: false,
  },
  {
    id: 'prod-9',
    name: 'Short Casual Lino Beige',
    slug: 'short-casual-beige',
    sku: 'PH-SHT-001',
    price: 139000,
    salePrice: 119000,
    image: '/images/seed/short_beige.webp',
    categoryKey: 'pantalones',
    categoryName: 'Pantalones & Shorts',
    sizes: ['28', '30', '32', '34'],
    isBestSeller: false,
  },
  {
    id: 'prod-10',
    name: 'Bermuda Denim Relaxed Fit',
    slug: 'bermuda-denim-clasica',
    sku: 'PH-BRM-001',
    price: 149000,
    salePrice: null,
    image: '/images/seed/bermudas_jeans.jpg',
    categoryKey: 'pantalones',
    categoryName: 'Pantalones & Shorts',
    sizes: ['28', '30', '32', '34'],
    isBestSeller: false,
  },

  // Calzado
  {
    id: 'prod-11',
    name: 'Sneakers Dunk Low Retro Blanco',
    slug: 'sneakers-dunk-low-blanco',
    sku: 'PH-CAL-001',
    price: 489000,
    salePrice: 439000,
    image: '/images/seed/nike_dunkLowRetro_blanco.webp',
    categoryKey: 'calzado',
    categoryName: 'Calzado',
    sizes: ['39', '40', '41', '42'],
    isBestSeller: true,
  },
  {
    id: 'prod-12',
    name: 'Sneakers Air Max Plus Azul',
    slug: 'sneakers-air-max-plus-azul',
    sku: 'PH-CAL-002',
    price: 549000,
    salePrice: null,
    image: '/images/seed/nike_airmaxplus_azul.webp',
    categoryKey: 'calzado',
    categoryName: 'Calzado',
    sizes: ['39', '40', '41', '42'],
    isBestSeller: false,
  },
  {
    id: 'prod-13',
    name: 'Zapato Oxford Cuero Artesanal Marrón',
    slug: 'zapato-oxford-cuero-marron',
    sku: 'PH-CAL-003',
    price: 369000,
    salePrice: 329000,
    image: '/images/seed/zapatp_cuero_marron.jpg',
    categoryKey: 'calzado',
    categoryName: 'Calzado',
    sizes: ['39', '40', '41', '42'],
    isBestSeller: true,
  },
  {
    id: 'prod-14',
    name: 'Zapato Derby Formal Negro',
    slug: 'zapato-derby-formal-negro',
    sku: 'PH-CAL-004',
    price: 389000,
    salePrice: null,
    image: '/images/seed/zapatp_formal_negro.jpg',
    categoryKey: 'calzado',
    categoryName: 'Calzado',
    sizes: ['39', '40', '41', '42'],
    isBestSeller: false,
  },

  // Accesorios
  {
    id: 'prod-15',
    name: 'Gorra Baseball Algodón Clásica',
    slug: 'gorra-baseball-clasica',
    sku: 'PH-ACC-001',
    price: 89000,
    salePrice: 75000,
    image: '/images/seed/gorra_adidas_baseball.jpg',
    categoryKey: 'accesorios',
    categoryName: 'Accesorios',
    sizes: ['Ajustable'],
    isBestSeller: true,
  },
]

const TABS = [
  { key: 'lo-mas-vendido', label: '★ Lo Más Vendido', description: 'Nuestros esenciales más populares de temporada' },
  { key: 'camisas', label: 'Camisas', description: 'Cortes limpios y tejidos transpirables' },
  { key: 'chaquetas', label: 'Chaquetas', description: 'Prendas de abrigo estructuradas de alto gramaje' },
  { key: 'pantalones', label: 'Pantalones & Shorts', description: 'Siluetas sastre, cargo y bermudas contemporáneas' },
  { key: 'calzado', label: 'Calzado', description: 'Sneakers urbanos y zapatos formales cosidos a mano' },
  { key: 'accesorios', label: 'Accesorios', description: 'Complementos esenciales para elevar cualquier outfit' },
]

export const CatalogSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('lo-mas-vendido')

  // Filtrado reactivo según la categoría seleccionada
  const filteredProducts = activeTab === 'lo-mas-vendido'
    ? ALL_PRODUCTS.filter((p) => p.isBestSeller)
    : ALL_PRODUCTS.filter((p) => p.categoryKey === activeTab)

  const activeTabMeta = TABS.find((t) => t.key === activeTab)

  return (
    <section id="catalogo" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Barra de Filtros / Pestañas de Categoría (Mobile-First Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 justify-start md:justify-center border-b border-neutral-100">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                isActive
                  ? 'bg-neutral-950 text-white shadow-md'
                  : 'bg-neutral-100/80 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Encabezado de la Sección Dinámica */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mt-10 mb-8 gap-2">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">
            Categoría Seleccionada
          </span>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-950 uppercase mt-1">
            {activeTabMeta?.label.replace('★ ', '')}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-light mt-1">
            {activeTabMeta?.description}
          </p>
        </div>

        <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Prenda' : 'Prendas'} disponibles
        </span>
      </div>

      {/* Grid de Productos Filtrados con Animación */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                slug={product.slug}
                sku={product.sku}
                price={product.price}
                salePrice={product.salePrice}
                primaryImage={product.image}
                secondaryImage={null}
                sizes={product.sizes}
                categoryName={product.categoryName}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
