import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })
  console.log('🐼 Iniciando Seed para Panda Haus E-commerce...')

  const imagesDir = path.resolve(process.cwd(), 'Imagenes')
  const files = fs.readdirSync(imagesDir)

  // 1. Subir todas las imágenes locales a la colección Media de Payload
  const mediaMap: Record<string, string> = {}

  for (const filename of files) {
    const filePath = path.join(imagesDir, filename)
    const fileBuffer = fs.readFileSync(filePath)
    const ext = path.extname(filename).toLowerCase().replace('.', '')
    const mimeType = ext === 'webp' ? 'image/webp' : ext === 'jfif' || ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png'

    console.log(`Subiendo imagen: ${filename}...`)
    const mediaDoc = await payload.create({
      collection: 'media',
      data: {
        alt: filename.replace(/[\._]/g, ' '),
      },
      file: {
        data: fileBuffer,
        mimetype: mimeType,
        name: filename,
        size: fileBuffer.length,
      },
    })
    mediaMap[filename] = mediaDoc.id
  }

  // 2. Crear Categorías
  const catCamisas = await payload.create({
    collection: 'categories',
    data: { name: 'Camisas & Chaquetas', slug: 'camisas-chaquetas' },
  })
  const catPantalones = await payload.create({
    collection: 'categories',
    data: { name: 'Pantalones & Bermudas', slug: 'pantalones-bermudas' },
  })
  const catCalzado = await payload.create({
    collection: 'categories',
    data: { name: 'Calzado & Accesorios', slug: 'calzado-accesorios' },
  })

  // 3. Crear Productos
  const seedProducts = [
    {
      name: 'Camisa Oversize Popelina',
      slug: 'camisa-oversize-popelina',
      sku: 'PH-SHIRT-001',
      price: 189000,
      salePrice: 159000,
      category: catCamisas.id,
      primaryImage: mediaMap['camisa_corta_blanca.webp'],
      secondaryImage: mediaMap['camisa_larga_azul.webp'],
      sizes: ['S', 'M', 'L', 'XL'],
      featured: true,
    },
    {
      name: 'Chaqueta Utility Minimalista',
      slug: 'chaqueta-utility-minimalista',
      sku: 'PH-JKT-002',
      price: 320000,
      category: catCamisas.id,
      primaryImage: mediaMap['chaqueta_beige.jfif'],
      secondaryImage: mediaMap['chaqueta_azul.webp'],
      sizes: ['M', 'L', 'XL'],
      featured: true,
    },
    {
      name: 'Pantalón Cargo Tapered',
      slug: 'pantalon-cargo-tapered',
      sku: 'PH-PNT-003',
      price: 240000,
      salePrice: 210000,
      category: catPantalones.id,
      primaryImage: mediaMap['pantalon_cargo_beige.jpg'],
      secondaryImage: mediaMap['pantalon_cargo_bluejeans.jfif'],
      sizes: ['30', '32', '34'],
      featured: true,
    },
    {
      name: 'Pantalón de Vestir Contemporáneo',
      slug: 'pantalon-vestir-contemporaneo',
      sku: 'PH-PNT-004',
      price: 260000,
      category: catPantalones.id,
      primaryImage: mediaMap['pantalon_vestir_biegie.webp'],
      secondaryImage: mediaMap['pantalon_vestir_azul.jpg'],
      sizes: ['30', '32', '34', '36'],
      featured: true,
    },
    {
      name: 'Bermuda Relaxed Fit',
      slug: 'bermuda-relaxed-fit',
      sku: 'PH-BRM-005',
      price: 145000,
      category: catPantalones.id,
      primaryImage: mediaMap['short_beige.webp'],
      secondaryImage: mediaMap['bermudas_jeans.jfif'],
      sizes: ['28', '30', '32', '34'],
      featured: true,
    },
    {
      name: 'Sneakers Retro Low Edition',
      slug: 'sneakers-retro-low',
      sku: 'PH-SNK-006',
      price: 490000,
      category: catCalzado.id,
      primaryImage: mediaMap['nike_dunkLowRetro_blanco.webp'],
      secondaryImage: mediaMap['nike_airmaxplus_azul.webp'],
      sizes: ['39', '40', '41', '42'],
      featured: true,
    },
    {
      name: 'Zapato Derby Cuero Artesanal',
      slug: 'zapato-derby-cuero',
      sku: 'PH-SHO-007',
      price: 380000,
      category: catCalzado.id,
      primaryImage: mediaMap['zapatp_cuero_marron.jfif'],
      secondaryImage: mediaMap['zapatp_formal_negro.jfif'],
      sizes: ['39', '40', '41', '42'],
      featured: true,
    },
  ]

  for (const prod of seedProducts) {
    console.log(`Creando producto: ${prod.name}...`)
    await payload.create({
      collection: 'products',
      data: {
        name: prod.name,
        slug: prod.slug,
        sku: prod.sku,
        price: prod.price,
        salePrice: prod.salePrice || null,
        category: prod.category,
        featured: prod.featured,
        media: {
          primary: prod.primaryImage,
          secondary: prod.secondaryImage,
        },
        variations: {
          sizes: prod.sizes.map((size) => ({ size: size as any })),
          colors: [{ name: 'Neutral', hex: '#E5E5E5' }],
        },
      },
    })
  }

  // 4. Sembrar Globals
  await payload.updateGlobal({
    slug: 'store-settings',
    data: {
      general: {
        storeName: 'Panda Haus Studio',
        whatsappNumber: '573001234567',
        whatsappDefaultMessage: '¡Hola Panda Haus! Me interesa ver el catálogo de prendas.',
      },
      announcementBar: {
        enabled: true,
        text: 'ENVÍO GRATIS NACIONAL EN COMPRAS SUPERIORES A $200.000 COP',
      },
    },
  })

  console.log('✅ Base de datos sembrada con éxito.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Error durante el seed:', err)
  process.exit(1)
})
