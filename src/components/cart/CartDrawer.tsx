'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/useCartStore'

interface CartDrawerProps {
  whatsappNumber?: string
}

const FREE_SHIPPING_THRESHOLD = 200000

export const CartDrawer: React.FC<CartDrawerProps> = ({
  whatsappNumber = '573248000501',
}) => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearCart, totalPrice, totalItems } =
    useCartStore()

  // Estado del formulario de pedido para WhatsApp
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    paymentMethod: 'Transferencia (Nequi / Bancolombia)',
    notes: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const subtotal = totalPrice()
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const shippingCost = isFreeShipping || subtotal === 0 ? 0 : 15000
  const finalTotal = subtotal + shippingCost
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Ingresa tu nombre completo'
    if (!formData.phone.trim()) newErrors.phone = 'Ingresa un número de celular de contacto'
    if (!formData.city.trim()) newErrors.city = 'Ingresa tu ciudad o municipio'
    if (!formData.address.trim()) newErrors.address = 'Ingresa tu dirección de entrega'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendOrderToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Formateo del pedido para WhatsApp
    const itemsListText = items
      .map(
        (item, index) =>
          `${index + 1}. *${item.name}*\n   - Talla: ${item.selectedSize} | Cant: ${item.quantity}\n   - Subtotal: $${(
            item.price * item.quantity
          ).toLocaleString('es-CO')} COP`
      )
      .join('\n\n')

    const message =
      `🛍️ *NUEVO PEDIDO - PANDA HAUS STUDIO* 🐼\n` +
      `==============================\n\n` +
      `👤 *DATOS DEL CLIENTE:*\n` +
      `▪ *Nombre:* ${formData.fullName}\n` +
      `▪ *Celular:* ${formData.phone}\n` +
      `▪ *Ciudad:* ${formData.city}\n` +
      `▪ *Dirección:* ${formData.address}\n` +
      `▪ *Método de Pago:* ${formData.paymentMethod}\n` +
      (formData.notes ? `▪ *Notas:* ${formData.notes}\n` : '') +
      `\n==============================\n` +
      `📦 *PRENDAS SOLICITADAS:*\n\n` +
      `${itemsListText}\n\n` +
      `==============================\n` +
      `💵 *RESUMEN DE PAGO:*\n` +
      `▪ *Subtotal:* $${subtotal.toLocaleString('es-CO')} COP\n` +
      `▪ *Envío:* ${isFreeShipping ? 'GRATIS 🎉' : `$${shippingCost.toLocaleString('es-CO')} COP`}\n` +
      `▪ *TOTAL A PAGAR:* $${finalTotal.toLocaleString('es-CO')} COP\n` +
      `==============================\n\n` +
      `¿Me confirman disponibilidad y datos para realizar el despacho? Muchas gracias.`

    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '')
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Fondo oscuro con clic para cerrar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Lateral */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-white text-neutral-900 shadow-2xl flex flex-col h-full z-10 font-sans"
          >
            {/* Cabecera del Drawer */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold tracking-widest uppercase">Tu Carrito</h2>
                <span className="text-xs bg-neutral-100 px-2 py-0.5 rounded-full font-medium text-neutral-600">
                  {totalItems()} {totalItems() === 1 ? 'ítem' : 'ítems'}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                aria-label="Cerrar carrito"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Barra de progreso de Envío Gratis */}
            {items.length > 0 && (
              <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-100">
                <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                  {isFreeShipping ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <span>✓</span> ¡Felicidades! Tienes Envío Gratis
                    </span>
                  ) : (
                    <span className="text-neutral-600">
                      Te faltan <strong className="text-neutral-900">${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('es-CO')}</strong> para Envío Gratis
                    </span>
                  )}
                  <span className="text-[10px] text-neutral-400">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isFreeShipping ? 'bg-emerald-500' : 'bg-neutral-900'
                    }`}
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Contenido: Lista de Productos o Carrito Vacío */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-1">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-xs mb-6">
                    Explora nuestra colección y añade tus prendas favoritas para ordenar directamente por WhatsApp.
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-neutral-950 text-white text-xs uppercase tracking-widest font-semibold py-3 px-6 hover:bg-black transition-colors"
                  >
                    Ver Colección
                  </button>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-neutral-100">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="py-4 flex gap-3 first:pt-0">
                      {/* Imagen Miniatura */}
                      <div className="relative w-16 h-20 bg-neutral-100 rounded-sm overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>

                      {/* Detalles del Ítem */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs font-medium text-neutral-900 truncate">{item.name}</h4>
                            <button
                              onClick={() => removeItem(item.id, item.selectedSize)}
                              className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                              aria-label="Eliminar producto"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mt-0.5">
                            Talla: <strong>{item.selectedSize}</strong>
                          </span>
                        </div>

                        {/* Cantidad y Precio */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-neutral-200">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-xs text-neutral-600 hover:bg-neutral-100"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-xs text-neutral-600 hover:bg-neutral-100"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-semibold text-neutral-900">
                            ${(item.price * item.quantity).toLocaleString('es-CO')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pie del Drawer: Totales y Formulario WhatsApp */}
            {items.length > 0 && (
              <div className="border-t border-neutral-200 bg-neutral-50/80 p-5 flex flex-col gap-3">
                {/* Desglose de Totales */}
                <div className="flex flex-col gap-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-medium text-neutral-900">${subtotal.toLocaleString('es-CO')} COP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío:</span>
                    <span className="font-medium text-neutral-900">
                      {isFreeShipping ? (
                        <span className="text-emerald-700 font-semibold">GRATIS</span>
                      ) : (
                        `$${shippingCost.toLocaleString('es-CO')} COP`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-neutral-950 border-t border-neutral-200 pt-2 mt-1">
                    <span>Total a Pagar:</span>
                    <span>${finalTotal.toLocaleString('es-CO')} COP</span>
                  </div>
                </div>

                {/* Alternar Vista Formulario */}
                {!showCheckoutForm ? (
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-widest font-semibold py-3.5 px-4 rounded-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.986-1.409C8.423 21.493 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.155-.494-4.425-1.343l-.317-.213-2.973.84.85-2.884-.232-.338C4.015 15.006 3.5 13.551 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
                    </svg>
                    <span>Completar Pedido por WhatsApp</span>
                  </button>
                ) : (
                  <form onSubmit={handleSendOrderToWhatsApp} className="flex flex-col gap-2.5 pt-2 border-t border-neutral-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                        Datos para despacho
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowCheckoutForm(false)}
                        className="text-[11px] text-neutral-500 hover:text-neutral-900 underline"
                      >
                        Ocultar datos
                      </button>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Nombre y Apellido *"
                        className={`w-full text-xs p-2.5 border rounded-none bg-white focus:outline-none ${
                          errors.fullName ? 'border-red-500' : 'border-neutral-300 focus:border-neutral-900'
                        }`}
                      />
                      {errors.fullName && <span className="text-[10px] text-red-500">{errors.fullName}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Celular *"
                          className={`w-full text-xs p-2.5 border rounded-none bg-white focus:outline-none ${
                            errors.phone ? 'border-red-500' : 'border-neutral-300 focus:border-neutral-900'
                          }`}
                        />
                        {errors.phone && <span className="text-[10px] text-red-500">{errors.phone}</span>}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Ciudad / Dpto *"
                          className={`w-full text-xs p-2.5 border rounded-none bg-white focus:outline-none ${
                            errors.city ? 'border-red-500' : 'border-neutral-300 focus:border-neutral-900'
                          }`}
                        />
                        {errors.city && <span className="text-[10px] text-red-500">{errors.city}</span>}
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Dirección exacta, Barrio o Torre/Apto *"
                        className={`w-full text-xs p-2.5 border rounded-none bg-white focus:outline-none ${
                          errors.address ? 'border-red-500' : 'border-neutral-300 focus:border-neutral-900'
                        }`}
                      />
                      {errors.address && <span className="text-[10px] text-red-500">{errors.address}</span>}
                    </div>

                    <div>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full text-xs p-2.5 border border-neutral-300 rounded-none bg-white focus:outline-none focus:border-neutral-900"
                      >
                        <option value="Transferencia (Nequi / Bancolombia / Daviplata)">
                          Nequi / Bancolombia / Daviplata
                        </option>
                        <option value="Pago Contraentrega">Pago Contraentrega</option>
                        <option value="Tarjeta Débito / Crédito">Tarjeta Débito / Crédito</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-widest font-semibold py-3.5 px-4 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 mt-1"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.986-1.409C8.423 21.493 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.155-.494-4.425-1.343l-.317-.213-2.973.84.85-2.884-.232-.338C4.015 15.006 3.5 13.551 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
                      </svg>
                      <span>Enviar Pedido a WhatsApp 📲</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
