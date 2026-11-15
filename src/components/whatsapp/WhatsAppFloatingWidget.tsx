'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WhatsAppFloatingWidgetProps {
  phoneNumber: string
  defaultMessage?: string
}

export const WhatsAppFloatingWidget: React.FC<WhatsAppFloatingWidgetProps> = ({
  phoneNumber,
  defaultMessage = '¡Hola Panda Haus! Quisiera recibir asesoría personalizada sobre sus prendas.',
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '')
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
        >
          <span className="hidden md:inline-block bg-neutral-900 text-white text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-full shadow-lg opacity-90 group-hover:opacity-100 transition-opacity">
            ¿Dudas con tu talla? Escríbenos
          </span>

          <button
            onClick={handleClick}
            aria-label="Contactar por WhatsApp"
            className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="absolute w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping -z-10" />

            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.986-1.409C8.423 21.493 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.155-.494-4.425-1.343l-.317-.213-2.973.84.85-2.884-.232-.338C4.015 15.006 3.5 13.551 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
