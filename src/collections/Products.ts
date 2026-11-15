import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Producto',
    plural: 'Productos',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sku', 'price', 'category', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre de la Prenda',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL amigable)',
      unique: true,
      index: true,
      admin: {
        description: 'Se autogenera si se deja vacío (ej: pantalon-cargo-beige)',
      },
    },
    {
      name: 'sku',
      type: 'text',
      label: 'Código SKU',
      required: true,
      unique: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'number',
          label: 'Precio Regular ($)',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'salePrice',
          type: 'number',
          label: 'Precio de Oferta ($)',
          admin: {
            width: '50%',
            description: 'Dejar vacío si no está en descuento',
          },
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Categoría',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destacar en el Home (Más Vendidos)',
      defaultValue: true,
    },
    {
      name: 'media',
      type: 'group',
      label: 'Imágenes del Producto (Efecto Zara)',
      fields: [
        {
          name: 'primary',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagen Principal (Vista frontal/estándar)',
        },
        {
          name: 'secondary',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagen o Clip Secundario (Hover estilo Zara: modelo en movimiento/espalda)',
        },
        {
          name: 'gallery',
          type: 'array',
          label: 'Galería Adicional',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'variations',
      type: 'group',
      label: 'Tallas y Colores',
      fields: [
        {
          name: 'sizes',
          type: 'array',
          label: 'Tallas Disponibles',
          fields: [
            {
              name: 'size',
              type: 'select',
              options: ['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', '36', '38', '39', '40', '41', '42'],
              required: true,
            },
          ],
        },
        {
          name: 'colors',
          type: 'array',
          label: 'Colores Disponibles',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nombre del Color (ej. Beige Piedra, Azul Marino)',
              required: true,
            },
            {
              name: 'hex',
              type: 'text',
              label: 'Código Hex (#D2B48C)',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción y Composición de Materiales',
      defaultValue: '100% Algodón peinado de alto gramaje. Confección artesanal y corte relajado.',
    },
  ],
}
