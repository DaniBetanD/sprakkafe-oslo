export function scrollToId(id) {
    const element = document.getElementById(id);

    if (!element) return;

    const header = document.querySelector("header");
    const headerOffset = header ? header.offsetHeight : 80;

    const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
        top: elementPosition - headerOffset - 12,
        behavior: "smooth",
    });
}