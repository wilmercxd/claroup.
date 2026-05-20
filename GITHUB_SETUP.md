# 🐙 Guía: Cómo Publicar en GitHub

Instrucciones paso a paso para publicar tu proyecto en GitHub y hacerlo público.

---

## Paso 1: Crear Repositorio en GitHub

1. **Ve a [github.com](https://github.com)**
2. **Inicia sesión** (crea cuenta si no tienes)
3. **Botón "+"** en la esquina superior derecha
4. **"New repository"**

### Rellena los campos:

| Campo | Valor |
|---|---|
| **Repository name** | `claro-up-sales-toolkit` |
| **Description** | Kit de Ventas Interactivo para Claro UP - Seguro Celular |
| **Public / Private** | ✅ **Public** |
| **Add README** | ❌ (ya lo tenemos) |
| **.gitignore** | ❌ (ya lo tenemos) |
| **License** | ✅ MIT License |

5. **"Create repository"**

---

## Paso 2: Conectar tu Repositorio Local

### Si NUNCA hiciste git:

```bash
# Navega a tu carpeta del proyecto
cd claro-up-sales-toolkit

# Inicializa Git
git init

# Agrega todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: Claro UP Sales Toolkit v1.0"

# Agrega el repositorio remoto (REEMPLAZA CON TU USERNAME)
git remote add origin https://github.com/TU-USERNAME/claro-up-sales-toolkit.git

# Renombra rama a main (si te pide)
git branch -M main

# Sube todo a GitHub
git push -u origin main
```

### Si YA tienes Git:

```bash
# Simplemente agrega el remoto y sube
git remote add origin https://github.com/TU-USERNAME/claro-up-sales-toolkit.git
git branch -M main
git push -u origin main
```

---

## Paso 3: Verifica en GitHub

1. **Ve a [github.com/TU-USERNAME/claro-up-sales-toolkit]()**
2. Deberías ver todos tus archivos
3. El README.md se renderiza automáticamente

---

## Paso 4: Configuración Avanzada (Opcional)

### A. Proteger rama main

**Settings** → **Branches** → **Add rule**
- Branch name pattern: `main`
- ✅ Require status checks to pass
- ✅ Require code reviews
- ✅ Dismiss stale reviews

### B. Agregar Topics (para descubrimiento)

**Settings** → **Topics** → Agrega:
- `claro`
- `sales`
- `toolkit`
- `react`
- `education`
- `colombia`

### C. Agregar Badges en README

En `README.md`, después del título, agrega:

```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/tu-username/claro-up-sales-toolkit?style=social)](https://github.com/tu-username/claro-up-sales-toolkit)
[![Open Source](https://img.shields.io/badge/Open%20Source-❤️-red)](https://github.com/tu-username/claro-up-sales-toolkit)
```

---

## Paso 5: Desplegar en Vercel (Automático)

### Desde GitHub:

1. **Ve a [vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **"New Project"**
4. **Selecciona tu repositorio** `claro-up-sales-toolkit`
5. **Configuración:**
   - Framework: React
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **"Deploy"**

### Resultado:
- URL: `https://claro-up-sales-toolkit.vercel.app`
- Actualizaciones automáticas cuando hagas push
- Dominio personalizado (opcional)

---

## Paso 6: Anunciar tu Proyecto

### LinkedIn
```
🚀 ¡Acabo de publicar Claro UP Sales Toolkit!

Kit de Ventas Interactivo para Seguro Celular. Herramienta educativa y comercial para agentes TMK.

✅ Guiones completos
✅ Playbook de objeciones
✅ Calculadora de comisiones
✅ Open Source (MIT License)

GitHub: github.com/tu-username/claro-up-sales-toolkit
Demo: claro-up-sales-toolkit.vercel.app

#ClaroUP #SalesToolkit #OpenSource #React #Colombia
```

### Twitter/X
```
🛡️ Claro UP Sales Toolkit is now LIVE!

Interactive sales training tool for cell phone insurance agents.

📊 Scripts • 💬 Objections • 💰 Commissions

Open source. Completely free.

🔗 github.com/tu-username/claro-up-sales-toolkit
```

### Email a tu equipo
```
Asunto: 🚀 Claro UP Sales Toolkit - Kit de Ventas para Descargar

Hola equipo,

Hemos lanzado Claro UP Sales Toolkit, una herramienta interactiva completa para vender Claro UP.

Usa en Claude.ai (sin instalación): [enlace a ClaroUpSalesKit.jsx]
O accede online: claro-up-sales-toolkit.vercel.app

¿Preguntas? GitHub Issues: [enlace]

¡Felices ventas!
```

---

## Paso 7: Mantener Actualizado

### Flujo regular:

```bash
# 1. Haz cambios locales
# Edita archivos...

# 2. Commit
git add .
git commit -m "fix: corrige tabla de comisiones"

# 3. Push a GitHub
git push origin main

# 4. Vercel redeploy automático
# (tu sitio se actualiza automáticamente)
```

### Recibir actualizaciones de otros:

```bash
# 1. Alguien hace un PR en GitHub
# 2. Revisa y aprueba
# 3. Merge en GitHub
# 4. Descarga cambios:

git pull origin main
```

---

## Ayuda Rápida

### Errores comunes

**Error: "fatal: not a git repository"**
```bash
git init
git remote add origin https://github.com/TU-USERNAME/claro-up-sales-toolkit.git
```

**Error: "rejected"**
```bash
git pull origin main
# Resuelve conflictos si los hay
git push origin main
```

**Error: "Authentication failed"**
- Crea token en GitHub Settings → Developer settings → Tokens
- Usa token como contraseña en push

---

## Checklist Final

- [ ] Repositorio creado en GitHub (público)
- [ ] Todos los archivos subidos (git push)
- [ ] README.md visible en GitHub
- [ ] Badges agregados
- [ ] Topics configurados
- [ ] Desplegado en Vercel/Netlify
- [ ] Link funciona desde cualquier navegador
- [ ] Anunciado en redes (LinkedIn, email)
- [ ] Issues habilitadas para feedback
- [ ] Workflow CI/CD funcionando

---

## 🎉 ¡Ya estás en GitHub!

Tu proyecto es ahora:
✅ Público
✅ Versionado
✅ Colaborativo
✅ Desplegado
✅ Descubrible

**Próximo paso:** Invita a otros a contribuir o déjalos clonar/usar.

---

**¿Necesitas ayuda?** → Abre Issue en GitHub o email a soporte.

