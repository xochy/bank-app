# Bank App - Vue 3 PWA

Una aplicación bancaria moderna construida con Vue 3, Vite, TypeScript y funcionalidades PWA (Progressive Web App).

## Descripción

Bank App es una aplicación web progresiva que permite a los usuarios acceder a funcionalidades bancarias básicas con soporte offline y capacidad de instalación como aplicación nativa en dispositivos móviles y escritorio.

## Características

- ✅ **Vue 3** con Composition API
- ✅ **TypeScript** para mayor seguridad de tipos
- ✅ **Vite 4.5.0** para desarrollo rápido
- ✅ **PWA** con instalación como app nativa
- ✅ **Offline First** con página personalizada sin conexión
- ✅ **Service Worker** para cache automático
- ✅ **Responsive Design** adaptado a móviles y escritorio
- ✅ **Minimal UI** para experiencia nativa

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn
- Navegador moderno con soporte para PWA

## Project Setup

```bash
npm install
```

### Instalar dependencias PWA

```bash
npm install -D vite-plugin-pwa
```

## Scripts de Desarrollo

### Compile and Hot-Reload for Development

```bash
npm run dev
```

### Type-Check, Compile and Minify for Production

```bash
npm run build
```

### Preview Production Build (Importante para PWA)

```bash
npm run preview
```

### Lint with ESLint

```bash
npm run lint
```

## Configuración PWA

### 1. Configurar Vite (vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB límite
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              }
            }
          }
        ]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Bank App',
        short_name: 'BankApp',
        description: 'Aplicación bancaria moderna y segura',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'minimal-ui',
        orientation: 'portrait',
        scope: '/',
        start_url: '/dashboard',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
```

### 2. Crear Página Offline (public/offline.html)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bank App - Sin conexión</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        
        .container {
            max-width: 400px;
            padding: 2rem;
        }
        
        .icon {
            width: 80px;
            height: 80px;
            background-color: #2563eb;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: white;
            font-size: 2rem;
        }
        
        h1 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #1e293b;
        }
        
        p {
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .retry-btn {
            background-color: #2563eb;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.2s;
        }
        
        .retry-btn:hover {
            background-color: #1d4ed8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">📱</div>
        <h1>Sin conexión a internet</h1>
        <p>Bank App necesita conexión a internet para funcionar. Verifica tu conexión y vuelve a intentar.</p>
        <button class="retry-btn" onclick="window.location.reload()">
            Reintentar
        </button>
    </div>
</body>
</html>
```

### 3. Configurar main.ts

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // si tienes router

const app = createApp(App)

// Si tienes router
if (router) {
  app.use(router)
}

app.mount('#app')

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registrado: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW falló al registrar: ', registrationError);
      });
  });
}
```

### 4. Actualizar index.html

Agregar en el `<head>`:

```html
<!-- PWA Meta Tags -->
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#2563eb">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Bank App">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## Recursos Requeridos

### Iconos (en carpeta public/)

- `pwa-192x192.png` (192x192 pixels)
- `pwa-512x512.png` (512x512 pixels)
- `favicon.ico`
- `apple-touch-icon.png` (180x180 pixels)

### Herramientas para crear iconos:
- [PWA Icon Generator](https://progressier.app/pwa-icons-and-ios-splash-screen-generator)
- Figma/Canva con diseño simple: "BA" en fondo azul (#2563eb)

## Instalación como App Nativa

### En Escritorio (Chrome/Edge):
1. Abre la aplicación en el navegador
2. Busca el ícono "Instalar" en la barra de direcciones
3. O ve a menú → "Instalar Bank App"

### En Android (Chrome):
1. Aparecerá banner automático "Agregar a pantalla de inicio"
2. O menú Chrome → "Agregar a la pantalla de inicio"

### En iOS (Safari):
1. Botón compartir → "Agregar a la pantalla de inicio"

## Verificar PWA

### Con Chrome DevTools:
1. F12 → pestaña "Application"
2. Sección "Manifest" → verificar configuración
3. "Service Workers" → confirmar registro
4. "Lighthouse" → auditoría PWA

### Comandos de prueba:
```bash
npm run build
npm run preview
```

## Estructura del Proyecto

```
bank-app/
├── public/
│   ├── offline.html
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── favicon.ico
│   └── apple-touch-icon.png
├── src/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── main.ts
│   └── App.vue
├── vite.config.ts
├── package.json
└── README.md
```

## Configuración de Colores

- **Theme Color**: `#2563eb` (Azul profesional)
- **Background Color**: `#ffffff` (Blanco limpio)
- **Offline Page**: Esquema azul/gris neutro

## Solución de Problemas Comunes

### Error: "maximumFileSizeToCacheInBytes"
```typescript
workbox: {
  maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB límite
}
```

### Error: TypeScript "cacheKeyWillBeUsed"
Eliminar la configuración `cacheKeyWillBeUsed` de las opciones de runtimeCaching.

### CSS muy pesado (>2MB)
- Configurar correctamente el purging de Tailwind CSS
- Importar solo las partes necesarias de librerías CSS
- Considerar usar CDN para algunas dependencias

## Tecnologías Utilizadas

- **Vue 3** - Framework progresivo
- **Vite** - Build tool rápido
- **TypeScript** - Superset de JavaScript tipado
- **PWA** - Progressive Web App capabilities
- **Workbox** - Service worker management
- **ESLint** - Linting de código

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**Bank App** - Aplicación bancaria moderna con tecnologías web progresivas 🏦📱