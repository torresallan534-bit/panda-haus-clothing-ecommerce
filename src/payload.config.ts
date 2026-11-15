import path from 'path'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { StoreSettings } from './globals/StoreSettings'
import { LandingPage } from './globals/LandingPage'

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [Products, Categories, Media, Users],
  globals: [StoreSettings, LandingPage],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'PANDA_HAUS_SECRET_KEY_2026',
  typescript: {
    outputFile: path.resolve(process.cwd(), 'src/types/payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://127.0.0.1/panda-haus-ecommerce',
  }),
})
