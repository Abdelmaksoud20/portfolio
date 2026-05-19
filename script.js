const root = document.documentElement;
const year = document.querySelector("[data-year]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const header = document.querySelector("[data-header]");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "" : "dark";
  if (nextTheme) {
    root.dataset.theme = nextTheme;
    localStorage.setItem("portfolio-theme", nextTheme);
  } else {
    delete root.dataset.theme;
    localStorage.removeItem("portfolio-theme");
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));

document.querySelector("[data-contact-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Portfolio message from ${form.get("name")}`);
  const body = encodeURIComponent(
    `Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`
  );

  window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
});
