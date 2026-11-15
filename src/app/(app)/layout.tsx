import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Panda Haus | E-commerce de Ropa Minimalista',
  description: 'Plantilla de alta conversión para marcas de moda contemporáneas. Desarrollada por Panda Haus.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-white text-neutral-900 antialiased">
        {/* Navbar Minimalista */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Menú Móvil */}
            <button
              aria-label="Menú"
              className="p-2 -ml-2 text-neutral-900 md:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Navegación Desktop */}
            <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-neutral-600">
              <Link href="/#best-sellers" className="hover:text-neutral-950 transition-colors">
                Colección
              </Link>
              <Link href="/#categorias" className="hover:text-neutral-950 transition-colors">
                Categorías
              </Link>
              <Link href="/#asesoria" className="hover:text-neutral-950 transition-colors">
                Asesoría WhatsApp
              </Link>
            </nav>

            {/* Logo Central Panda Haus */}
            <Link href="/" className="text-base sm:text-lg font-bold tracking-widest uppercase text-neutral-950">
              Panda Haus<span className="text-neutral-400 font-light">.</span>
            </Link>

            {/* Iconos de Acción */}
            <div className="flex items-center gap-4">
              <button aria-label="Carrito" className="relative p-2 text-neutral-900 hover:opacity-75 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-950 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Contenido Principal */}
        <div className="flex-1">{children}</div>

        {/* Footer Minimalista */}
        <footer className="bg-neutral-950 text-white py-12 px-6 mt-16 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase">Panda Haus Studio</p>
              <p className="text-xs text-neutral-400 mt-1">E-commerce de moda de alto impacto y conversión.</p>
            </div>
            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()} Panda Haus. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
