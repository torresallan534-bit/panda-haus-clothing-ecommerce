import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/common/Navbar'
import { CartDrawer } from '@/components/cart/CartDrawer'

export const metadata: Metadata = {
  title: 'Panda Haus | E-commerce de Ropa Minimalista',
  description: 'Plantilla de alta conversión para marcas de moda contemporáneas. Pedidos directos a WhatsApp.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573248000501'

  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-white text-neutral-900 antialiased font-sans">
        {/* Navbar Interactivo */}
        <Navbar />

        {/* Drawer del Carrito Global */}
        <CartDrawer whatsappNumber={whatsappNumber} />

        {/* Contenido Principal */}
        <div className="flex-1">{children}</div>

        {/* Footer Minimalista */}
        <footer className="bg-neutral-950 text-white py-12 px-6 mt-16 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase">Panda Haus Studio</p>
              <p className="text-xs text-neutral-400 mt-1">E-commerce de moda de alto impacto y conversión.</p>
              <p className="text-xs text-neutral-400 mt-1">WhatsApp Oficial: +57 324 800 0501</p>
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
