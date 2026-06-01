// Menú móvil: abre y cierra la navegación en pantallas pequeñas.
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Preguntas frecuentes: acordeón accesible con un solo panel abierto a la vez.
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector("button");
  const indicator = button ? button.querySelector("span") : null;

  if (!button) return;

  button.addEventListener("click", () => {
    const shouldOpen = !item.classList.contains("is-open");

    faqItems.forEach((currentItem) => {
      const currentButton = currentItem.querySelector("button");
      const currentIndicator = currentButton ? currentButton.querySelector("span") : null;

      currentItem.classList.remove("is-open");
      currentButton?.setAttribute("aria-expanded", "false");
      if (currentIndicator) currentIndicator.textContent = "+";
    });

    if (shouldOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      if (indicator) indicator.textContent = "-";
    }
  });
});

// Animación sutil: muestra contenido al entrar en pantalla sin depender de librerías.
const revealItems = document.querySelectorAll(".service-card, .gallery-card, .benefits-list article, .social-grid a");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });
}
