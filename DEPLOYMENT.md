# 🚀 Guía de Despliegue

Instrucciones para publicar Claro UP Sales Toolkit en diferentes plataformas.

---

## 1. Despliegue en Vercel (Recomendado ⭐)

**Ventajas:** Gratis, rápido, CI/CD automático, HTTPS, sin configuración.

### Pasos:

1. **Crea cuenta en [Vercel](https://vercel.com)**
2. **Conecta tu repositorio GitHub:**
   - Dashboard → "Add New..." → "Project"
   - Selecciona tu fork de claro-up-sales-toolkit
   - Click "Import"

3. **Configuración automática:**
   - Framework: React
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Enviroment: dejar por defecto

4. **Deploy:**
   - Click "Deploy"
   - Vercel construye automáticamente
   - Tu URL: `https://claro-up-sales-toolkit.vercel.app`

5. **Futuras actualizaciones:**
   - Push a main en GitHub
   - Vercel redeploy automático

### URL en Vercel:
```
https://claro-up-sales-toolkit.vercel.app
```

---

## 2. Despliegue en Netlify

**Ventajas:** Integración GitHub simple, deploy automático, formas gratuitas.

### Pasos:

1. **Crea cuenta en [Netlify](https://netlify.com)**
2. **New site from Git:**
   - Click "New site from Git"
   - Selecciona GitHub
   - Autoriza a Netlify
   - Selecciona tu repositorio

3. **Configuración:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

4. **Custom domain (opcional):**
   - Domain settings → agregar dominio propio

### URL en Netlify:
```
https://claro-up-sales-toolkit.netlify.app
```

---

## 3. Despliegue en GitHub Pages

**Ventajas:** Gratis, integrado con GitHub, sin proveedor externo.

### Pasos:

1. **Actualiza vite.config.js:**
```javascript
export default defineConfig({
  base: '/claro-up-sales-toolkit/',
  // ... resto de config
})
```

2. **Crea GitHub Actions workflow:**

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. **En GitHub:**
   - Settings → Pages
   - Source: GitHub Actions
   - Click "Deploy"

### URL en GitHub Pages:
```
https://tu-usuario.github.io/claro-up-sales-toolkit
```

---

## 4. Despliegue en Firebase Hosting

### Pasos:

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar proyecto
firebase init hosting

# Seleccionar:
# - Proyecto (crear nuevo o seleccionar existente)
# - Public directory: dist
# - Configure as single-page app: Yes

# Buildear
npm run build

# Deploy
firebase deploy
```

### URL en Firebase:
```
https://tu-proyecto.firebaseapp.com
```

---

## 5. Despliegue en tu Servidor

### Opción A: Apache/Nginx

```bash
# Build
npm run build

# Copiar a servidor
scp -r dist/* usuario@tu-servidor.com:/var/www/claro-up/

# Configurar .htaccess (Apache)
# RewriteEngine On
# RewriteBase /claro-up/
# RewriteRule ^index\.html$ - [L]
# RewriteCond %{REQUEST_FILENAME} !-f
# RewriteCond %{REQUEST_FILENAME} !-d
# RewriteRule . index.html [L]
```

### Opción B: Docker

Crea `Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build image
docker build -t claro-up-sales-toolkit .

# Run container
docker run -p 80:80 claro-up-sales-toolkit
```

---

## 🔧 Configuración de Dominios Personalizados

### Vercel
- Domain settings → agregar dominio
- Actualizar registros DNS de tu dominio
- Verificación automática

### Netlify
- Domain settings → Custom domain
- Instrucciones de DNS automáticas

### GitHub Pages
- Settings → Pages → Custom domain
- Agregar CNAME a tu dominio

---

## 📊 Monitoreo Post-Deploy

- **Uptime:** Uptime Robot (monitoreo gratuito)
- **Analytics:** Google Analytics (agregar snippet)
- **Errors:** Sentry (error tracking)
- **Performance:** Lighthouse CI

---

## 🆘 Troubleshooting

### "Build fails"
```bash
# Limpiar cache
rm -rf node_modules dist
npm install
npm run build
```

### "Page not found (404)"
- Verifica `base` en vite.config.js
- SPA routing requiere redirect a index.html

### "CSS/JS no carga"
- Revisa rutas en vite.config.js
- Limpiar caché del navegador

### "Enviroment variables"
- Si agregas variables, agregalas en plataforma de deploy
- Acceder como `import.meta.env.VITE_*`

---

## 📋 Checklist Pre-Deploy

- [ ] `npm run build` sin errores
- [ ] `npm run preview` se abre correctamente
- [ ] URLs están configuradas
- [ ] README tiene instrucciones de deploy
- [ ] Sitio es responsive (mobile + desktop)
- [ ] Metrics de Lighthouse OK
- [ ] SSL/HTTPS habilitado
- [ ] Sitemap y robots.txt (si aplica)

---

**¡Tu kit de ventas está listo para el mundo!** 🚀

Para soporte, abre un Issue en GitHub.
