# 📚 Ejemplos: Cómo Extender el Proyecto

Guía para agregar nuevas características a Claro UP Sales Toolkit.

---

## Ejemplo 1: Agregar Nueva Objeción

### Paso 1: Identificar la objeción
"Mi banco ya me ofrece un seguro" es una objeción común.

### Paso 2: Crear el objeto
En `ClaroUpSalesKit.jsx`, busca el array `OBJECTIONS` y agrega:

```javascript
{
  obj: '"Mi banco ya me ofrece un seguro"',
  tipo: "Competencia",
  color: "#06b6d4", // Color único
  respuestas: [
    {
      enfoque: "Diferenciación + Cobertura",
      guion: "[Nombre], es excelente que tu banco se preocupe. La diferencia es que Claro up está diseñado específicamente para el celular: cubre hurto, daño físico Y falla eléctrica. Además, te envían el reemplazo a casa en 2-5 días. Es protección completa sin estar ligada a otro producto."
    },
    {
      enfoque: "Precio vs Beneficio",
      guion: "¿Tu banco te cubre hurto simple Y daño físico? Porque Claro up cubre ambos por solo $[COSTO DIARIO] al día. Es una inversión mínima comparada con el valor de tu equipo."
    }
  ]
},
```

### Paso 3: Guardar y probar
- Guarda el archivo
- Recarga la página (si estás en local, se actualiza automáticamente)
- Ve a la pestaña 💬 Objeciones
- ¡Verás tu nueva objeción!

---

## Ejemplo 2: Agregar Nuevo Guion

### Escenario
Quieres un guion específico para "cliente que compró equipo premium".

### Paso 1: Crear el guion
En el array `SCRIPTS`, agrega:

```javascript
{
  titulo: "🎩 Ofrecimiento Premium — Cliente que compró equipo de alto valor",
  contexto: "Cuando el cliente acaba de comprar un iPhone o Samsung Premium ($1M+)",
  guion: `[Nombre], felicidades por tu nuevo [MARCA] [MODELO]. Es un equipo premium que requiere protección premium.

Claro up te cubre:
✅ Si alguien te lo roba (40% deducible)
✅ Si se te cae y se rompe (25% deducible)
✅ Si tiene falla después de garantía (25% deducible)

Y por supuesto, 2 reemplazos en 12 meses y envío a domicilio.

Tu inversión en este equipo es importante. Por apenas $[PRIMA MENSUAL] al mes (menos que un restaurante), duermes tranquilo sabiendo que está protegido. ¿Activamos?`,
  tip: "Para clientes premium: enfatiza que es una inversión pequeña vs. el costo del equipo. El deducible bajo es el gancho."
},
```

### Paso 2: Verificar
- Guarda
- Ve a 🎙️ Guiones
- Verás tu guion nuevo en la lista
- Prueba el botón Copiar

---

## Ejemplo 3: Actualizar Tabla de Primas

### Escenario
Los precios suben y necesitas actualizar las primas.

### Paso 1: Modificar PRIMAS
```javascript
const PRIMAS = [
  // ANTES:
  // { rango: "$200.001 – $499.999", prima: 16000, diario: 534, comision: 14400, comisionAgente: 7200 },
  
  // DESPUÉS:
  { rango: "$200.001 – $499.999", prima: 18000, diario: 600, comision: 16200, comisionAgente: 8100 },
  
  // Recuerda:
  // diario = prima / 30 (aproximado)
  // comision = prima * 0.9
  // comisionAgente = comision * 0.5
];
```

### Paso 2: Verificar en todas partes
- 🛡️ Producto → tabla de primas
- 💰 Comisiones → opciones de precio
- 🎙️ Guiones → se actualizan automáticamente

---

## Ejemplo 4: Agregar Pestaña Nueva

### Escenario
Quieres una pestaña de "Videotutoriales" o "FAQ".

### Paso 1: Agregar a TABS
```javascript
const TABS = [
  // ... tabs existentes ...
  { id: "videos", label: "🎬 Videos", emoji: "🎬" },
];
```

### Paso 2: Crear función TabVideos
```javascript
function TabVideos() {
  return (
    <div>
      <div style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
        borderRadius: 16, padding: "24px 20px", color: "#fff", marginBottom: 24,
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>
          🎬 Videotutoriales
        </div>
        <div style={{ fontSize: 14, opacity: 0.9 }}>
          Aprende viendo. Estos videos te muestran cómo hacer cada paso.
        </div>
      </div>

      {/* Contenido aquí */}
    </div>
  );
}
```

### Paso 3: Agregar al renderTab
```javascript
const renderTab = () => {
  switch (activeTab) {
    // ... casos existentes ...
    case "videos": return <TabVideos />;
    default: return <TabInicio />;
  }
};
```

### Paso 4: Probar
- Recarga la página
- Verás la pestaña nueva 🎬 en la navegación

---

## Ejemplo 5: Cambiar Colores

### Escenario
Tu marca uses otros colores (no rojo, sino azul).

### Busca y reemplaza en `ClaroUpSalesKit.jsx`:

```javascript
// Rojo principal: #dc2626
// Reemplazar con tu color

// Ejemplos:
#dc2626  →  #3b82f6   // Azul
#991b1b  →  #1e40af   // Azul oscuro
```

O busca en el editor:
- Ctrl+H (Windows) o Cmd+H (Mac)
- Find: `#dc2626`
- Replace: `#3b82f6`
- Replace All

---

## Ejemplo 6: Agregar Datos de Deducibles

### Escenario
Quieres una tabla comparativa de deducibles por tipo de daño.

En `TabProducto()`, agrega después del primer div:

```javascript
<div style={{
  background: "#fff", borderRadius: 16, padding: 24, marginBottom: 20,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6",
}}>
  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, fontFamily: "'Outfit', sans-serif" }}>📊 Tabla de Deducibles</h3>
  
  {[
    { tipo: "Daño físico (caída, pantalla rota)", deducible: "25%", ejemplo: "Si equipo cuesta $1M, pagas $250K" },
    { tipo: "Hurto o hurto calificado", deducible: "40%", ejemplo: "Si equipo cuesta $1M, pagas $400K" },
    { tipo: "Falla eléctrica/mecánica", deducible: "25%", ejemplo: "Si equipo cuesta $1M, pagas $250K" },
  ].map((d, i) => (
    <div key={i} style={{
      padding: "14px 16px", borderRadius: 12, marginBottom: 10,
      background: i % 2 === 0 ? "#f0f9ff" : "#fff",
      border: "1px solid #e5e7eb",
    }}>
      <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 4 }}>{d.tipo}</div>
      <div style={{ fontSize: 14, color: "#dc2626", fontWeight: 700, marginBottom: 4 }}>Deducible: {d.deducible}</div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>💡 {d.ejemplo}</div>
    </div>
  ))}
</div>
```

---

## Checklist para Nuevas Features

- [ ] He identificado dónde encaja (qué array, qué función)
- [ ] He copiado la estructura de un elemento existente
- [ ] He completado todos los campos requeridos
- [ ] He probado en el navegador (recargué la página)
- [ ] Los colores son consistentes
- [ ] Las fuentes son claras
- [ ] Funciona en móvil y desktop
- [ ] Sin errores de consola
- [ ] Los botones Copiar funcionan (si aplica)

---

## Preguntas Frecuentes al Extender

**P: ¿Necesito reiniciar el servidor?**
R: Si estás en `npm run dev`, no. Si hiciste cambios en `package.json` o `vite.config.js`, sí.

**P: ¿Cómo agrego un ícono nuevo?**
R: Usa emojis (🎯, 🎨, 🚀). Están en el código como strings.

**P: ¿Puedo agregar imágenes?**
R: Sí, pero mejor en línea (data: URIs) o hosted. Agrega a `public/` si despliegas.

**P: ¿Cómo agrego analytics?**
R: Agrega Google Analytics a `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

**P: ¿Cómo hago cambios sin tocar el código?**
R: No es posible fácilmente. Considera CMS como Strapi si necesitas sin-código.

---

## Próximos Pasos

1. **Haz tu cambio** usando estos ejemplos
2. **Prueba localmente** con `npm run dev`
3. **Haz commit** con mensaje claro: `feat: agrega guion premium`
4. **Abre PR** en GitHub
5. **¡Celebra!** Tu mejora está en producción 🎉

---

**¿Necesitas ayuda?** Abre un Issue en GitHub o revisa `CONTRIBUTING.md`.
