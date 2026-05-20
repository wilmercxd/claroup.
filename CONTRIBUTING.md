# Contribuir a Claro UP Sales Toolkit

¡Gracias por tu interés en mejorar esta herramienta! Aquí te explicamos cómo colaborar.

## Cómo Reportar Bugs

1. Verifica que el bug no haya sido reportado antes
2. Abre un Issue con un título descriptivo
3. Describe los pasos para reproducir el problema
4. Incluye capturas si es visual
5. Menciona tu navegador y sistema operativo

### Plantilla de Bug Report
```markdown
## Descripción
[Describe el problema de forma clara]

## Pasos para reproducir
1. ...
2. ...
3. ...

## Comportamiento esperado
[Qué debería pasar]

## Comportamiento actual
[Qué está pasando]

## Ambiente
- Navegador: [ej. Chrome 120]
- SO: [ej. Windows 11]
- Dispositivo: [Escritorio/Móvil]
```

---

## Sugerencias de Mejora

1. Abre un Issue con etiqueta `enhancement`
2. Describe la idea claramente
3. Explica cómo beneficia a vendedores o supervisores
4. Si es posible, sugiere implementación

### Ejemplos de mejoras bienvenidas:
- Nuevos guiones para objecciones adicionales
- Mejoras visuales o UX
- Soporte para múltiples idiomas
- Más datos o estadísticas de productos
- Integración con otras herramientas

---

## Proceso de Contribución

### 1. Fork el Repositorio
```bash
git clone https://github.com/TU-USERNAME/claro-up-sales-toolkit.git
cd claro-up-sales-toolkit
```

### 2. Crea una Rama
```bash
git checkout -b feature/nombre-de-la-mejora
# o
git checkout -b fix/descripcion-del-bug
```

**Convención de nombres:**
- `feature/` para nuevas características
- `fix/` para correcciones
- `docs/` para documentación
- `test/` para pruebas

### 3. Realiza tus Cambios
```bash
npm install
npm run dev
# Edita los archivos
```

### 4. Commit con Mensajes Claros
```bash
git add .
git commit -m "feat: agrega guion para objeción 'es caro'"
```

**Formato de mensajes:**
- `feat:` nueva característica
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `style:` cambios de formato (sin cambios lógicos)
- `refactor:` reorganización sin cambios funcionales

### 5. Push y Pull Request
```bash
git push origin feature/nombre-de-la-mejora
```

En GitHub, abre un Pull Request con:
- Título descriptivo
- Descripción de cambios
- Referencias a Issues relacionados (#123)
- Capturas si hay cambios visuales

---

## Estándares de Código

### React
- Usa componentes funcionales
- Mantén los componentes pequenos y reutilizables
- Usa hooks (useState, useEffect)
- Comenta código complejo

### Estilos
- CSS-in-JS inline (sin librerías externas)
- Usa variables de color consistentes
- Mobile-first responsive design

### Documentación
- Escribe comentarios en español
- Actualiza README si cambian features
- Docstring en funciones complejas

---

## Checklist antes de PR

- [ ] El código funciona sin errores
- [ ] Probé en navegador moderno (Chrome, Firefox, Safari)
- [ ] Los cambios son responsive (móvil + escritorio)
- [ ] Sin console warnings ni errores
- [ ] Actualicé documentación si es necesario
- [ ] Los commits tienen mensajes claros
- [ ] No hay archivos no relacionados en el PR

---

## Contacto

- **Issues:** Abre un Issue en GitHub
- **Discussiones:** GitHub Discussions
- **Email:** [contacto CXD]

---

¡Esperamos tus contribuciones! 🚀
