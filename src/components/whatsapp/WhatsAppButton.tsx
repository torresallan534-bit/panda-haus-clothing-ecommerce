'use client'

import React from 'react'

interface WhatsAppButtonProps {
  phoneNumber: string
  productName: string
  sku: string
  selectedSize?: string
  price: number
  className?: string
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  productName,
  sku,
  selectedSize,
  price,
  className = '',
}) => {
  const handleWhatsAppClick = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
    
    const message = 
      `¡Hola Panda Haus! 👋 Quiero consultar sobre esta prenda:\n\n` +
      `▪ *Producto:* ${productName}\n` +
      `▪ *SKU:* ${sku}\n` +
      `▪ *Precio:* $${price.toLocaleString('es-CO')}\n` +
      (selectedSize ? `▪ *Talla que busco:* ${selectedSize}\n` : '') +
      `▪ *Enlace:* ${currentUrl}\n\n` +
      `¿Tienen disponibilidad y asesoría de envío?`

    const encodedMessage = encodeURIComponent(message)
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '')
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      type="button"
      onClick={handleWhatsAppClick}
      className={`flex items-center justify-center gap-2.5 w-full py-3.5 px-6 border border-emerald-600 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100/70 transition-all text-xs font-semibold uppercase tracking-widest rounded-sm ${className}`}
    >
      <svg
        className="w-4 h-4 fill-current text-emerald-600"
        viewBox="0 0 24 24"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.986-1.409C8.423 21.493 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.155-.494-4.425-1.343l-.317-.213-2.973.84.85-2.884-.232-.338C4.015 15.006 3.5 13.551 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
      </svg>
      <span>Consultar por WhatsApp</span>
    </button>
  )
}
