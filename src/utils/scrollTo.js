export function scrollToId(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth", // 👈 Esto fuerza el desplazamiento suave animado
      block: "start",     // Alinea el inicio de la sección arriba
    });
  }
}