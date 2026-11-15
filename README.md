# 🐼 Panda Haus - E-commerce de Ropa Minimalista

Plantilla base de E-commerce de ropa de alta conversión construida para la agencia **Panda Haus**. Totalmente administrable mediante **Payload CMS (MongoDB)** e integrada de forma nativa con **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion** y **Zustand**.

---

## ⚡ Características Principales

1. **Diseño Mobile-First & Minimalista**: Estética inspirada en Aesop con ergonomía y microinteracciones de alta conversión inspiradas en Gymshark.
2. **Efecto Zara Hover en Tarjetas de Producto**: Al hacer hover o interacción táctil, la imagen principal rota suavemente a una secundaria mostrando el detalle o modelo.
3. **Conversión vía WhatsApp Integrada**:
   - Botón contextual en la página de producto (`/productos/[slug]`) con mensaje pre-rellenado que incluye Nombre, SKU, Talla y URL exacta.
   - Widget flotante animado con Framer Motion activado automáticamente tras scroll de 200px.
4. **Sticky Add-to-Cart**: Barra fija inferior para compra inmediata al desplazarse por el producto.
5. **100% Administrable con Payload CMS**:
   - `StoreSettings`: Teléfono WhatsApp, mensaje de bienvenida, barra de anuncios superior y redes sociales.
   - `LandingPage`: Hero section (titulares, botón CTA, imagen), Lead Magnet con descuento, bloque de Asesoría de Estilo.
   - `Products`, `Categories` y `Media`.

---

## 🚀 Puesta en Marcha Local

### 1. Clonar e Instalar Dependencias
```bash
git clone <url-del-repo>
cd <nombre-del-repo>
npm install
```

### 2. Configuración de Variables de Entorno
Crea un archivo `.env` en la raíz:
```env
PAYLOAD_SECRET=panda_haus_super_secret_key_2026
DATABASE_URI=mongodb://127.0.0.1:27017/panda-haus-ecommerce
NEXT_PUBLIC_WHATSAPP_NUMBER=573001234567
```

### 3. Sembrar Imágenes y Catálogo Inicial
```bash
npm run seed
```

### 4. Iniciar Servidor de Desarrollo
```bash
npm run dev
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Panel Admin Payload: [http://localhost:3000/admin](http://localhost:3000/admin)

---

Desarrollado para **Panda Haus Studio**.
