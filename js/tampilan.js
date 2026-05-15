const body = document.body;
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

// Menandai menu aktif sesuai data-page pada body
const setActiveNav = () => {
  const page = body.dataset.page;

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === page);
  });
};

// Mengubah tampilan header saat scroll
const handleHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 20);
};

// Animasi reveal saat elemen muncul di layar
const setupRevealAnimation = () => {
  const revealItems = document.querySelectorAll(".reveal");

  // Jika browser tidak mendukung IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
};

// Toggle menu mobile
navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Menutup menu mobile saat salah satu link diklik
navLinks?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

// Event scroll
window.addEventListener("scroll", handleHeaderState, { passive: true });

// Menjalankan semua fungsi
setActiveNav();
handleHeaderState();
setupRevealAnimation();