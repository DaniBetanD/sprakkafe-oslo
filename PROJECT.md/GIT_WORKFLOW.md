# Språkkafé Oslo
# Git Workflow

Versión: 1.0  
Estado: Documento vivo  
Última actualización: Julio 2026

---

# Objetivo

Este documento define el flujo oficial de trabajo con Git para Språkkafé Oslo.

Todos los cambios del proyecto deben seguir este proceso.

El objetivo no es únicamente mantener el código.

El objetivo es proteger el proyecto.

Cada commit representa un punto seguro al que siempre podremos volver.

---

# Filosofía

Git no es un sistema de copias de seguridad.

Git es la historia del proyecto.

Cada commit debe responder a una pregunta:

> ¿Qué cambió exactamente?

Si la respuesta no es clara, el commit probablemente sea demasiado grande.

---

# Rama principal

Actualmente el proyecto utiliza una única rama:

```
main
```

Todo el desarrollo se realiza sobre ella.

En futuras fases podrán añadirse ramas como:

```
develop

feature/*

hotfix/*
```

pero durante el MVP se mantiene un flujo sencillo.

---

# Flujo oficial

Cada sesión de trabajo debe seguir este orden.

```
git status

↓

npm run dev

↓

Desarrollar

↓

Guardar

↓

Probar

↓

npm run build

↓

git add .

↓

git commit

↓

git push

↓

Verificar Vercel

↓

Continuar
```

Nunca cambiar este orden.

---

# Antes de empezar

Siempre ejecutar:

```bash
git status
```

Debe indicar claramente el estado del proyecto.

Después comprobar:

```bash
git pull
```

si existen colaboradores.

Actualmente, al trabajar sobre una única rama, es recomendable verificar que `origin/main` está actualizado antes de comenzar.

---

# Desarrollo

Durante el desarrollo:

Guardar frecuentemente.

Probar frecuentemente.

No esperar al final para descubrir errores.

---

# Un cambio por sprint

Cada sprint debe tener un único objetivo.

Ejemplos:

✔ Mejorar navegación

✔ Añadir carrusel móvil

✔ Rediseñar Footer

No mezclar:

❌ Navegación

❌ SEO

❌ Base de datos

❌ Traducciones

Todo en el mismo commit.

---

# Commits pequeños

Preferimos:

5 commits pequeños

antes que

1 commit enorme.

Los commits pequeños facilitan:

•

Revisar cambios

•

Encontrar errores

•

Volver atrás

---

# Convención de commits

Formato oficial:

```
tipo: descripción
```

---

## feat

Nueva funcionalidad.

Ejemplo

```
feat: add mobile carousel
```

---

## fix

Corrección de errores.

```
fix: correct scroll offset
```

---

## docs

Cambios de documentación.

```
docs: update development guide
```

---

## refactor

Mejora interna sin cambiar funcionalidad.

```
refactor: simplify activity filters
```

---

## style

Cambios únicamente visuales.

```
style: improve spacing in footer
```

---

## chore

Tareas de mantenimiento.

```
chore: update dependencies
```

---

# Commits de checkpoint

Antes de experimentar:

```
git commit -m "checkpoint: before home redesign"
```

Esto permite volver atrás rápidamente.

---

# Validación antes del commit

Siempre comprobar:

```
git status
```

Después:

```
npm run build
```

Si el build falla:

No hacer commit.

Resolver primero.

---

# Añadir archivos

Normalmente:

```bash
git add .
```

Si solo queremos añadir un archivo:

```bash
git add src/components/Header.jsx
```

---

# Revisar cambios

Antes de confirmar:

```bash
git diff
```

o

```bash
git diff --staged
```

Esto evita subir cambios inesperados.

---

# Crear el commit

Ejemplo:

```bash
git commit -m "feat: improve mobile navigation"
```

El mensaje debe explicar claramente el objetivo.

No usar mensajes como:

```
update

changes

fix

nuevo
```

---

# Subir cambios

Después del commit:

```bash
git push
```

Esperar siempre a que termine correctamente.

---

# Validar producción

Después del push:

Abrir Vercel.

Comprobar:

✔ Build correcto

✔ Estado Ready

✔ Producción funcionando

Solo entonces continuar el desarrollo.

---

# Si Vercel falla

Detener el desarrollo.

Resolver el problema.

Nunca seguir acumulando cambios mientras producción está rota.

---

# Restaurar un archivo

Si un archivo se rompe:

```bash
git checkout HEAD -- src/components/Header.jsx
```

o utilizando un commit concreto:

```bash
git checkout <hash> -- src/components/Header.jsx
```

---

# Restaurar un proyecto completo

Consultar el historial:

```bash
git log --oneline
```

Elegir un commit estable.

Restaurar únicamente los archivos necesarios.

Evitar volver atrás todo el proyecto salvo casos extremos.

---

# Historial

Ver últimos commits:

```bash
git log --oneline -10
```

Ver el último commit:

```bash
git show HEAD
```

Ver estadísticas:

```bash
git show --stat HEAD
```

---

# Archivos importantes

Antes de cada push comprobar especialmente:

```
App.jsx

Home.jsx

Header.jsx

Footer.jsx

MissionSection.jsx

activities.json

organizations.json

package.json
```

Son archivos críticos del MVP.

---

# Archivos que nunca deben subirse

No incluir:

```
node_modules/

dist/

.env.local

*.log

.vscode/*
```

excepto:

```
.vscode/settings.json
```

que forma parte del proyecto.

---

# Deploy seguro

Proceso oficial:

```
Guardar

↓

Build

↓

Commit

↓

Push

↓

Vercel

↓

Revisión móvil

↓

Revisión desktop
```

---

# Resolución de conflictos

Si Git indica conflictos:

No hacer cambios rápidos.

Leer el conflicto.

Entender qué cambió.

Resolver manualmente.

Probar.

Commit.

Push.

---

# Buenas prácticas

✔ Commits frecuentes

✔ Build antes del push

✔ Verificar producción

✔ Probar en móvil

✔ Documentar decisiones importantes

✔ Mantener el historial limpio

---

# Errores aprendidos

Durante el desarrollo del MVP aprendimos:

• No dejar cambios importantes sin commitear.

• No hacer push sin ejecutar `npm run build`.

• No continuar un sprint si Vercel muestra errores.

• No modificar varios componentes críticos sin validar cada paso.

• Los commits pequeños facilitan encontrar el origen de cualquier problema.

• Verificar tanto localhost como la web en producción después de cada sprint.

---

# Checklist antes de cerrar una sesión

□ `git status` limpio

□ `npm run build` correcto

□ Commit descriptivo

□ Push realizado

□ Deploy en Vercel correcto

□ Web revisada en móvil

□ Web revisada en desktop

□ Consola sin errores

□ Documentación actualizada si hubo cambios importantes

---

# Regla de oro

Nunca terminar una sesión de trabajo dejando el proyecto en un estado que otro desarrollador no pueda continuar.

Cada sesión debe finalizar con un proyecto estable, documentado y desplegado correctamente.