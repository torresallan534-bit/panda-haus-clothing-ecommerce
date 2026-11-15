import { GlobalConfig } from 'payload'

export const StoreSettings: GlobalConfig = {
  slug: 'store-settings',
  label: 'Configuración de la Tienda',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'general',
      type: 'group',
      label: 'Datos de Contacto & WhatsApp',
      fields: [
        {
          name: 'storeName',
          type: 'text',
          label: 'Nombre de la Marca',
          defaultValue: 'Panda Haus Studio',
          required: true,
        },
        {
          name: 'whatsappNumber',
          type: 'text',
          label: 'Número de WhatsApp (con código de país, sin + ni espacios)',
          defaultValue: '573001234567',
          required: true,
          admin: {
            description: 'Ejemplo: 573001234567 para Colombia o 52155... para México.',
          },
        },
        {
          name: 'whatsappDefaultMessage',
          type: 'text',
          label: 'Mensaje genérico de bienvenida para WhatsApp',
          defaultValue: '¡Hola! Quisiera recibir asesoría sobre sus prendas disponibles.',
        },
      ],
    },
    {
      name: 'announcementBar',
      type: 'group',
      label: 'Barra de Beneficios Superior',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Mostrar barra superior',
          defaultValue: true,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Texto del anuncio',
          defaultValue: 'ENVÍO GRATIS A NIVEL NACIONAL POR COMPRAS SUPERIORES A $200.000 COP',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Enlace opcional al hacer clic',
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Redes Sociales',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: ['Instagram', 'TikTok', 'Facebook', 'Pinterest'],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Enlace',
          required: true,
        },
      ],
    },
  ],
}
