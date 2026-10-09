const body = document.body;
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const themeColor = document.querySelector('meta[name="theme-color"]');
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main > section[id]")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
body.classList.add("motion-ready");

function setTheme(theme) {
  const isLight = theme === "light";
  body.classList.toggle("light-mode", isLight);
  themeIcon.classList.toggle("bi-sun", !isLight);
  themeIcon.classList.toggle("bi-moon", isLight);
  themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
  themeColor.setAttribute("content", isLight ? "#f7f8fc" : "#0b1020");
  localStorage.setItem("theme", theme);
}

setTheme(localStorage.getItem("theme") === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  setTheme(body.classList.contains("light-mode") ? "dark" : "light");
});

function closeMenu() {
  siteNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuToggle.querySelector("i").className = "bi bi-list";
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  siteNav.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.querySelector("i").className = isOpen ? "bi bi-x-lg" : "bi bi-list";
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const header = document.querySelector(".site-header");
let scrollTicking = false;

function updateScrollState() {
  const position = window.scrollY + header.offsetHeight + window.innerHeight * 0.32;
  header.classList.toggle("scrolled", window.scrollY > 12);

  let currentSection = sections[0]?.id;
  sections.forEach((section) => {
    if (section.offsetTop <= position) currentSection = section.id;
  });
  navLinks.forEach((link) => {
    const isActive = link.hash === `#${currentSection}`;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });

  scrollTicking = false;
}

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollState);
    scrollTicking = true;
  }
}, { passive: true });
window.addEventListener("resize", updateScrollState);
updateScrollState();

const revealElements = document.querySelectorAll(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach((element) => revealObserver.observe(element));
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
