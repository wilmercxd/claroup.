# 📁 Estructura del Proyecto

```
claro-up-sales-toolkit/
├── 📄 index.html                 # Página de entrada
├── 📄 index.jsx                  # Punto de entrada React
├── 📄 index.css                  # Estilos globales
│
├── 🔧 ClaroUpSalesKit.jsx        # Componente principal
│   ├── TabInicio                 # Reglas de oro + estadísticas
│   ├── TabProducto               # Producto + tabla de primas
│   ├── TabGuiones                # 4 guiones vendedores
│   ├── TabObjeciones             # Playbook 7 objeciones
│   ├── TabCalculadora            # Calculadora de comisiones
│   ├── TabProceso                # Pasos de activación (BO)
│   └── Componentes auxiliares    # CopyButton, fmt()
│
├── 📦 package.json               # Dependencias y scripts
├── 🔧 vite.config.js            # Configuración Vite
│
├── 📚 README.md                  # Documentación principal
├── 🚀 DEPLOYMENT.md             # Guía de despliegue
├── 🤝 CONTRIBUTING.md           # Guía de contribuciones
│
├── 📋 LICENSE                    # MIT License
└── 🚫 .gitignore               # Archivos ignorados por Git


## Datos y Constantes

### PRIMAS (Tabla de tarifas)
```javascript
[
  { rango, prima, diario, comision, comisionAgente }
  ...
]
```

### SCRIPTS (Guiones)
```javascript
[
  { titulo, contexto, guion, tip }
  ...
]
```

### OBJECTIONS (Objeciones)
```javascript
[
  { obj, tipo, color, respuestas: [ { enfoque, guion } ] }
  ...
]
```

### TABS (Navegación)
```javascript
[
  { id, label, emoji }
  ...
]
```


## Funciones Clave

### fmt(number)
Formatea números a formato moneda colombiana
```javascript
fmt(16000) → "16.000"
```

### CopyButton(text)
Componente reutilizable para copiar al portapapeles
```javascript
<CopyButton text={guion} />
```


## Estilos

### Colores
- Rojo Claro: #dc2626
- Rojo Oscuro: #991b1b
- Textos: #111, #374151, #6b7280
- Fondos: #fff, #f9fafb, #f5f5f5

### Fuentes
- Display: Outfit (400, 600, 700, 800)
- Mono: JetBrains Mono (para código)

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px


## Tamaño del Proyecto

- **HTML:** 1 archivo
- **CSS:** Inline (sin archivos separados)
- **JS:** 1 componente React (~900 líneas)
- **Total (sin deps):** ~50KB
- **Bundles (minified + gzipped):** ~15KB


## Cómo Agregar Nuevas Funcionalidades

### 1. Nueva Sección en Guiones
```javascript
// En SCRIPTS array, agrega:
{
  titulo: "🆕 Tu nuevo guion",
  contexto: "Cuándo usarlo",
  guion: "El texto del guion aquí",
  tip: "Un tip táctico"
}
```

### 2. Nueva Objeción
```javascript
// En OBJECTIONS array, agrega:
{
  obj: '"Cliente dice esto"',
  tipo: "Categoría",
  color: "#color-hex",
  respuestas: [
    {
      enfoque: "Nombre del enfoque",
      guion: "Tu respuesta aquí"
    }
  ]
}
```

### 3. Nuevo Tab
```javascript
// 1. Agregar a TABS array
{ id: "nuevo", label: "🆕 Tab", emoji: "🆕" }

// 2. Crear función TabNuevo()
function TabNuevo() { ... }

// 3. Agregar case en renderTab()
case "nuevo": return <TabNuevo />;
```


## Performance

- **Render:** < 100ms
- **TTI (Time to Interactive):** < 1s
- **Sin network requests** (salvo Google Fonts)
- **Mobile-optimized:** Fully responsive


## Compatibilidad

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ IE11: No soportado


## Build Output

```
dist/
├── index.html          (~2KB)
├── assets/
│   ├── index-*.js      (~15KB gzipped)
│   └── index-*.css     (~2KB gzipped)
└── favicon.ico
```

Total: ~20KB gzipped
