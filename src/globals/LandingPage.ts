import { GlobalConfig } from 'payload'

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  label: 'Página Principal (Landing)',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Sección Hero Principal',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titular de Impacto',
          defaultValue: 'ESENCIALES DE TEMPORADA',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Subtítulo',
          defaultValue: 'Prendas contemporáneas diseñadas para resistir el tiempo. Estética minimalista con corte ergonómico.',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagen Principal de Fondo (Desktop / Móvil)',
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'Texto del Botón Principal',
          defaultValue: 'EXPLORAR COLECCIÓN',
          required: true,
        },
        {
          name: 'ctaLink',
          type: 'text',
          label: 'Enlace del Botón',
          defaultValue: '#best-sellers',
          required: true,
        },
      ],
    },
    {
      name: 'leadMagnet',
      type: 'group',
      label: 'Banner Lead Magnet (Descuento WhatsApp/Email)',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titular del Descuento',
          defaultValue: 'ÚNETE AL CLUB PANDA HAUS',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Descripción',
          defaultValue: 'Obtén 10% OFF en tu primera compra al registrar tu WhatsApp o correo.',
        },
        {
          name: 'discountPercentage',
          type: 'number',
          label: 'Porcentaje de descuento',
          defaultValue: 10,
        },
      ],
    },
    {
      name: 'styleAdvisory',
      type: 'group',
      label: 'Bloque de Asesoría de Estilo Personalizada',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          defaultValue: '¿DUDAS CON TU TALLA O LOOK?',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Texto descriptivo',
          defaultValue: 'Nuestros asesores de estilo te ayudan en tiempo real a elegir la prenda y talla exacta a través de WhatsApp.',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen del Asesor / Modelo',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Texto del Botón',
          defaultValue: 'HABLAR CON UN ASESOR EN VIVO',
        },
      ],
    },
  ],
}
