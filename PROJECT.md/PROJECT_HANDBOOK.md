PROJECT_HANDBOOK.mdProyecto: Språkkafé OsloVersión: 2.0 (Documento Unificado)Estado: Documento vivoÚltima actualización: Julio 20261. Introducción y Visión del ProyectoEste documento define la forma oficial de trabajar dentro del proyecto Språkkafé Oslo. No pretende únicamente documentar el código; su objetivo es mantener una misma filosofía y rigor técnico, independientemente del número de personas que participen. Toda decisión relacionada con programación, diseño, contenido o arquitectura debe respetar las reglas aquí definidas.Språkkafé Oslo es una plataforma comunitaria que ayuda a personas hispanohablantes a encontrar actividades gratuitas para practicar noruego en Oslo.Misión: Ayudamos a las personas a sentirse parte de Noruega a través del idioma, la comunidad y la cultura.Filosofía Central: Construimos software para personas, no para desarrolladores ni diseñadores. Cada decisión debe facilitar que una persona recién llegada a Noruega encuentre su primer lugar donde practicar el idioma y sentirse parte de la comunidad.Antes de implementar cualquier funcionalidad, siempre nos hacemos la misma pregunta:¿Esto hace más fácil que una persona dé su primer paso? Si la respuesta es "no", la funcionalidad no es prioritaria.2. Principios del ProyectoMobile First: Diseñamos y probamos primero para móviles (390px). Después adaptamos a escritorio. Nunca al revés.Simplicidad: La mejor interfaz es la que necesita menos explicaciones. Preferimos eliminar funcionalidades antes que añadir complejidad innecesaria.Claridad: La información debe entenderse en pocos segundos. Reducimos texto, agrupamos contenido y priorizamos el uso de tarjetas, iconos y espacios en blanco.Comunidad: No estamos construyendo un directorio estático; ayudamos a crear relaciones entre personas. La tecnología está siempre al servicio de la comunidad.Calidad antes que velocidad: Preferimos avanzar más despacio si eso garantiza una mejor experiencia de usuario. Un sprint terminado correctamente vale más que cinco funcionalidades inacabadas.3. Stack TecnológicoCapaTecnologíaFrontendReact 19 + Vite 8EstilosTailwind CSS 4RoutingReact Router 7DeployVercel (auto-deploy desde GitHub)Control de versionesGitHubDatosJSON local (activities.json, organizations.json) → Futuro: SupabaseNode.js22.x (configurado en .nvmrc y Vercel)4. Estructura del Proyectosprakkafe-oslo/
├── src/
│   ├── components/         — Componentes reutilizables (< 200 líneas ideal)
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
│   ├── data/               — Archivos de datos JSON estáticos
│   │   ├── activities.json
│   │   └── organizations.json
│   ├── assets/
│   │   └── logos/          — Logos reales de las organizaciones (PNG/SVG)
│   ├── utils/
│   │   ├── translations.js — DAYS y LEVELS centralizados
│   │   └── scrollTo.js     — Función de scroll con offset para el Header
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── app.css
├── public/
├── vercel.json             — Configuración de rewrites para SPA
├── .nvmrc                  — Especificación de Node 22
├── package.json
└── .vscode/
    └── settings.json       — Configuración local (formatOnSave: false)
5. Organización y Flujo Oficial de DesarrolloReglas de SesiónUn objetivo por sprint: Cada sprint tiene un foco único (ej. Optimizar el buscador o rediseñar la ActivityPage). Nunca mezcles objetivos distintos.Un archivo cada vez: Modifica un archivo, guarda, prueba en local y continúa. Reduce errores y facilita la localización de bugs. No pegues código parcial; reemplaza el archivo completo si es necesario.Probar constantemente: No acumules cambios. Revisa el navegador, la consola y el comportamiento tras cada cambio importante.El Flujo de Trabajo Estándar1. Revisar el estado del proyecto
   └── git status
   └── npm run dev (en http://localhost:5173)

2. Implementar el cambio (Uno solo por sesión, bien definido)
   └── Editar archivo por archivo
   └── Conservar codificación UTF-8 sin romper caracteres especiales

3. Verificar de forma exhaustiva
   └── Validar vista móvil (390px) en DevTools
   └── Comprobar escritorio, responsive, navegación y consola sin errores

4. Build de seguridad local
   └── npm run build
   └── Si el build falla, NO se avanza. Se corrige primero.

5. Git Commit y Push
   └── git add .
   └── git commit -m "prefijo: descripción"
   └── git push

6. Verificar Producción
   └── Confirmar deploy en verde en el dashboard de Vercel
   └── Comprobar errores en consola en la URL real
6. Convenciones y Reglas de CódigoGit y CommitsUsa exclusivamente prefijos claros para el control de cambios:feat: Nuevas funcionalidades (ej. feat: add mobile carousel).fix: Corrección de errores (ej. fix: improve header navigation).docs: Cambios en documentación (ej. docs: update project handbook).style:, refactor:, perf:, test:, chore:checkpoint: Antes de cambios experimentales o rediseños grandes (git commit -m "checkpoint: before home redesign"). Permite restaurar rápidamente con git checkout.Programación en React y TailwindComponentes pequeños: Responsabilidad única. Idealmente menos de 200 líneas. Si supera las 300 se revisa, y si pasa de 400 se divide obligatoriamente.Reutilización: Diseña componentes independientes si la lógica o la interfaz se repite. Centraliza para evitar duplicar estilos, traducciones o datos.Formato manual: No dejes que formateadores automáticos rompan el JSX. Asegúrate de que .vscode/settings.json mantiene "editor.formatOnSave": false.Estilos con Tailwind: Mantener consistencia estricta en radios, espaciados, sombras y la paleta de colores de los niveles (A1: verde, A2: azul, B1: púrpura, B2: naranja). No introduzcas estilos aislados.Navegación y RutasToda navegación interna que requiera scroll debe utilizar scrollToId() importado de utils/scrollTo.js. PROHIBIDO usar scrollIntoView() directamente, ya que rompe el offset necesario para compensar el Header fijo.PROHIBIDO usar history.back(). La navegación debe ser explícita mediante el uso de <Link to="/"> u otros destinos reales. Nunca uses <a href="#">.Gestión de Datos y ContenidoToda traducción de días o niveles debe centralizarse en utils/translations.js. Nunca crees archivos .json para lógicas que requieren un script .js.Los logos de las organizaciones en los JSON se deben referenciar usando la sintaxis nativa: new URL('../assets/logos/...', import.meta.url).href. El campo logoImg en organizations.json debe coincidir exactamente con el nombre del archivo en la carpeta assets.7. Diseño UX y AccesibilidadLas 3 Preguntas de PantallaToda vista del proyecto debe responder instantáneamente al usuario:¿Qué estoy viendo? (Comprensión inmediata).¿Qué puedo hacer? (Acción principal evidente).¿Qué ocurre después? (Dirección y flujo claro, nunca dejar al usuario en un callejón sin salida).Orden Psicológico: En ActivityPage, mantén la estructura enfocada en la conversión del usuario: Confianza → Interés → Motivación → Decisión.Accesibilidad (A11y): Los botones y elementos interactivos táctiles deben medir al menos 44px. El contraste debe ser suficiente, la navegación lógica y los textos limpios. La accesibilidad es nativa del desarrollo, no una tarea secundaria para el futuro.8. Gestión de Errores y Resolución de ProblemasCuando aparezca un error, detén el desarrollo inmediatamente. No construyas sobre una base inestable.Problemas ComunesEl build local pasa pero Vercel fallaAsegúrate de que la versión de Node en el dashboard de Vercel está configurada en 22.x.Revisa que vercel.json contenga únicamente las reglas de rewrites para la SPA, sin declarar comandos de compilación personalizados.Verifica que no se hayan colado caracteres extraños de codificación rota (ej: ðŸ‡³ en lugar de emojis o tildes). El archivo debe guardarse estrictamente como UTF-8.Los cambios no se reflejan en producciónVerifica que el commit se envió correctamente ejecutando git log --oneline -3.Comprueba en el panel de Vercel si ocurrió un Instant Rollback.Si es necesario, fuerza un nuevo despliegue desde Vercel (Deployments → Redeploy) o genera un commit vacío para forzar el webhook: git commit --allow-empty -m "trigger redeploy" && git push.9. Organización por DepartamentosProgramación: Mantiene la arquitectura limpia, vigila los límites de líneas por componente y asegura que npm run build pase de forma impecable.Diseño / UX: Valida que todo cambio se adapte correctamente a los 390px de ancho y respete el sistema visual y la psicología de conversión.Contenido / Marketing: Los copies residen en los archivos JSX y los cambios de texto pasan obligatoriamente por el flujo de Git. Responsable de las validaciones de privacidad y GDPR.Datos: Mantiene la veracidad de activities.json y organizations.json, asegurando que el campo lastChecked esté actualizado y que los logos correspondientes existan en el repositorio.10. Sprints y RoadmapCompletados (Sprints UX/MVP): Re-arquitectura de información (001), Jerarquía visual (002), Hero (003), Header (004), Conversión y CTAs (005), Section Misión (006), Navegación (010).En Progreso: Sprint Mobile First (Revisión profunda y optimización en 390px).Pendientes: Sistema de diseño (011), Revisión final de contenido (012), Preparación para producción, SEO y accesibilidad (013), Newsletter y Comunidad mediante Google Forms y cumplimiento GDPR (014).Largo Plazo: Migración de datos a Supabase, panel de administración avanzado y expansión multi-ciudad (Bergen, Trondheim, Stavanger).11. Definición de "Trabajo Terminado" (DoD)Una tarea solo se mueve a la columna de finalizada si cumple estrictamente el siguiente checklist:[ ] Funciona correctamente según el objetivo del cambio.[ ] Se ve y se comporta de forma óptima en móvil (390px).[ ] Se ve de forma óptima en vistas de tablet y escritorio.[ ] La consola del navegador está limpia de errores y warnings.[ ] El comando npm run build finaliza localmente con 0 errores.[ ] El cambio ha sido documentado (si afecta lógicas globales o JSONs).[ ] Existe un commit descriptivo siguiendo las convenciones tipográficas.[ ] El despliegue automático en Vercel ha finalizado en verde y funciona en la URL de producción.12. Recursos y ContactoRepositorio GitHub: https://github.com/DaniBetanD/sprakkafe-osloProducción: https://sprakkafe-oslo.vercel.appEntorno Local: http://localhost:5173 (vía npm run dev)Dashboard Vercel: https://vercel.com/frivillig/sprakkafe-oslo