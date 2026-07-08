# Manual de Trabajo — Språkkafé Oslo
**Versión:** 1.0  
**Fecha:** Julio 2026  
**Estado:** Documento vivo — se actualiza con cada sprint

---

## 1. Visión del proyecto

Språkkafé Oslo es una plataforma comunitaria que ayuda a personas hispanohablantes a encontrar actividades gratuitas para practicar noruego en Oslo.

**Misión:**  
Ayudamos a las personas a sentirse parte de Noruega a través del idioma, la comunidad y la cultura.

**Principios:**
- 🤝 Comunidad — Las personas aprenden mejor juntas
- 🌍 Pertenencia — Ayudar a sentirse parte de la sociedad noruega
- 💙 Accesibilidad — Información gratuita, clara y fácil de encontrar
- 🛡️ Confianza — Actividades verificadas, espacios seguros
- 🌱 Aprendizaje continuo — Acompañar más allá de una actividad

---

## 2. Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + Vite 8 |
| Estilos | Tailwind CSS 4 |
| Routing | React Router 7 |
| Deploy | Vercel (auto-deploy desde GitHub) |
| Control de versiones | GitHub |
| Datos | JSON local (activities.json, organizations.json) |
| Node.js | 22.x (configurado en .nvmrc y Vercel) |

---

## 3. Estructura del proyecto

```
sprakkafe-oslo/
├── src/
│   ├── components/         — Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ActivityCard.jsx
│   │   ├── Filters.jsx
│   │   ├── SearchBar.jsx
│   │   ├── MobileDetailPanel.jsx
│   │   ├── MissionSection.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/              — Páginas principales
│   │   ├── Home.jsx
│   │   ├── ActivityPage.jsx
│   │   └── OrganizationPage.jsx
│   ├── data/               — Datos en JSON
│   │   ├── activities.json
│   │   └── organizations.json
│   ├── assets/
│   │   └── logos/          — Logos reales de organizaciones
│   ├── utils/
│   │   ├── translations.js — DAYS y LEVELS centralizados
│   │   └── scrollTo.js     — Función de scroll con offset
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── app.css
├── public/
├── vercel.json             — Rewrites para SPA
├── .nvmrc                  — Node 22
├── package.json
└── .vscode/
    └── settings.json       — formatOnSave: false
```

---

## 4. Reglas de trabajo — LO QUE SE DEBE HACER

### 4.1 Git y control de versiones
- ✅ Hacer `git add . && git commit && git push` después de **cada cambio estable**
- ✅ Usar mensajes de commit descriptivos: `feat:`, `fix:`, `docs:`, `chore:`
- ✅ Verificar en Vercel que el deploy pasó antes de continuar
- ✅ Crear un commit de checkpoint antes de experimentos: `git commit -m "checkpoint: antes de X"`
- ✅ Si algo sale mal, restaurar con: `git checkout <hash> -- src/`

### 4.2 Código
- ✅ Editar archivos **uno por uno**, guardar y verificar antes de pasar al siguiente
- ✅ Usar `Ctrl+A` → borrar → pegar cuando se reemplaza un archivo completo
- ✅ Verificar siempre en `localhost:5173` antes de hacer push
- ✅ Ejecutar `npm run build` antes de cada push para detectar errores
- ✅ Mobile first: verificar en 390px antes de considerar cualquier cambio terminado

### 4.3 Diseño y UX
- ✅ El usuario principal está en móvil — cualquier cambio se prueba primero en móvil
- ✅ Mantener el sistema de colores de niveles: A1 verde, A2 azul, B1 púrpura, B2 naranja
- ✅ Usar `scrollToId()` de `utils/scrollTo.js` para todos los anchors internos
- ✅ Mantener el orden psicológico en ActivityPage: Confianza → Interés → Motivación → Decisión

### 4.4 Datos
- ✅ Toda traducción de días y niveles debe ir a través de `utils/translations.js`
- ✅ Los logos se referencian con `new URL('../assets/logos/...', import.meta.url).href`
- ✅ Verificar que `logoImg` en organizations.json coincide exactamente con el archivo en `assets/logos/`

---

## 5. Reglas de trabajo — LO QUE NO SE DEBE HACER

### 5.1 Git — PROHIBIDO
- ❌ **NUNCA** trabajar sin hacer commits regulares
- ❌ **NUNCA** hacer push sin verificar que `npm run build` pasa localmente
- ❌ **NUNCA** ignorar un error de build en Vercel — hay que resolverlo antes de continuar
- ❌ **NUNCA** usar `history.back()` para navegación — siempre `<Link to="/">`
- ❌ **NUNCA** dejar cambios importantes solo en local sin commitear

### 5.2 Código — PROHIBIDO
- ❌ **NUNCA** dejar que Prettier formatee automáticamente JSX — `formatOnSave` está en `false`
- ❌ **NUNCA** usar `<a href="#">` — siempre un destino real o un handler
- ❌ **NUNCA** importar el mismo JSON dos veces en componentes distintos que comparten padre
- ❌ **NUNCA** añadir `Instagram` u otros iconos de lucide-react sin verificar que existen en la versión instalada
- ❌ **NUNCA** crear archivos `.json` cuando se necesita un `.js` (ej: translations)
- ❌ **NUNCA** pegar código parcial en un archivo que ya tiene contenido — siempre reemplazar completo
- ❌ **NUNCA** editar XML de archivos directamente como si fuera código — usar las herramientas correctas

### 5.3 Diseño — PROHIBIDO
- ❌ **NUNCA** considerar un cambio terminado si no se ve bien en móvil (390px)
- ❌ **NUNCA** usar `scrollIntoView()` directamente — usar siempre `scrollToId()` con offset
- ❌ **NUNCA** añadir funcionalidades nuevas durante un sprint de corrección de bugs
- ❌ **NUNCA** usar `history.back()` — la navegación debe ser siempre explícita

### 5.4 Herramientas externas — PROHIBIDO
- ❌ **NUNCA** dejar que otra IA o herramienta externa modifique los archivos del proyecto sin revisión
- ❌ **NUNCA** aceptar código generado por otra herramienta sin compararlo con el estado actual de git
- ❌ **NUNCA** mezclar código de diferentes sesiones o herramientas sin verificar el encoding (UTF-8)

---

## 6. Flujo de trabajo estándar

```
1. Revisar el estado del proyecto
   → git status
   → npm run dev

2. Identificar el cambio a realizar
   → Un cambio por sesión, claramente definido

3. Implementar
   → Editar archivo por archivo
   → Verificar en localhost:5173 después de cada cambio

4. Verificar en móvil (390px)
   → DevTools → dispositivo móvil
   → Si no se ve bien, NO es un cambio terminado

5. Build de verificación
   → npm run build
   → Si hay errores, resolverlos antes de continuar

6. Commit y push
   → git add .
   → git commit -m "tipo: descripción clara"
   → git push

7. Verificar en Vercel
   → Confirmar que el deploy está en verde
   → Verificar en sprakkafe-oslo.vercel.app
```

---

## 7. Resolución de problemas comunes

### El build local pasa pero Vercel falla
1. Verificar la versión de Node.js en Vercel (debe ser 22.x)
2. Verificar que `vercel.json` solo tiene rewrites, sin `buildCommand` ni `outputDirectory`
3. Verificar el encoding de los archivos (no debe haber caracteres como `ðŸ‡³`)
4. Ejecutar `git log --oneline -5` para ver qué commit está en producción

### Los cambios no aparecen en Vercel
1. Verificar que el commit llegó: `git log --oneline -3`
2. Buscar si Vercel hizo un Instant Rollback en el dashboard
3. Forzar redeploy desde Vercel → Deployments → Redeploy
4. Si persiste: `git commit --allow-empty -m "trigger redeploy" && git push`

### Los cambios no están en git
1. `git status` para ver qué archivos están modificados
2. `git diff --name-only` para ver exactamente qué cambió
3. Si el árbol está limpio pero los archivos locales son diferentes, otra herramienta los modificó fuera de git

### Archivos con encoding roto (ðŸ‡³, Ã©, etc.)
1. Abrir el archivo en VS Code
2. Verificar el encoding en la barra inferior (debe ser UTF-8)
3. Si está roto: restaurar desde git con `git checkout <hash> -- src/archivo.jsx`
4. Reescribir el contenido correcto desde esta conversación

### Prettier rompe el JSX al guardar
- Confirmar que `.vscode/settings.json` tiene `"editor.formatOnSave": false`
- Si el archivo no existe, crearlo manualmente

---

## 8. Sprints y roadmap

### Completados ✅
- Sprint UX-001: Re-arquitectura de información
- Sprint UX-002: Jerarquía visual del panel
- Sprint UX-003: Hero
- Sprint UX-004: Header
- Sprint UX-005: Conversión y CTAs
- Sprint UX-006: MissionSection
- Sprint MVP-010: Navegación

### En progreso 🔄
- Sprint Mobile First: Revisión completa de experiencia móvil

### Pendientes ⬜
- Sprint MVP-011: Sistema de diseño
- Sprint MVP-012: Revisión de contenido
- Sprint MVP-013: Preparación para producción (SEO, performance, accesibilidad)
- Sprint MVP-014: Newsletter / Comunidad (Google Forms + GDPR)

### Largo plazo
- Supabase (base de datos real)
- Panel de administración
- Multi-ciudad (Bergen, Trondheim, Stavanger)

---

## 9. Departamentos y responsabilidades

### Programación
- Mantener la arquitectura limpia y consistente
- Respetar el flujo de trabajo de git
- Mobile first en todos los cambios
- No introducir dependencias nuevas sin justificación

### Diseño / UX
- Todo cambio visual se prueba en 390px antes de aprobarse
- Mantener el sistema de colores y tipografía establecido
- Respetar la jerarquía de información definida

### Contenido / Marketing
- Los textos van en los archivos JSX — no modificar directamente en producción
- Cualquier cambio de copy debe pasar por git
- Los textos legales (privacidad, GDPR) son responsabilidad de este departamento

### Datos
- Verificar las fuentes antes de añadir organizaciones o actividades
- Mantener el campo `lastChecked` actualizado en organizations.json
- Los logos deben ser PNG o SVG, nombrados exactamente como el `id` de la organización

---

## 10. Contacto y recursos

- **Repositorio:** https://github.com/DaniBetanD/sprakkafe-oslo
- **Producción:** https://sprakkafe-oslo.vercel.app
- **Desarrollo local:** http://localhost:5173 (con `npm run dev`)
- **Dashboard Vercel:** https://vercel.com/frivillig/sprakkafe-oslo