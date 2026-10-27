const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

function setMenu(open) {
  if (!navLinks || !menuBtn) return;
  navLinks.classList.toggle("open", open);
  nav.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", e => {
    if (!nav.contains(e.target)) setMenu(false);
  });
}

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0e0e11" : "#fbfaf7");
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => applyTheme(currentTheme() === "dark" ? "light" : "dark"));
}

if (navLinks) {
  const sectionLinks = new Map(
    [...navLinks.querySelectorAll('a[href^="#"]')].map(a => [a.getAttribute("href").slice(1), a])
  );

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(a => a.classList.remove("active"));
      sectionLinks.get(entry.target.id)?.classList.add("active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  document.querySelectorAll("main section[id]").forEach(s => sectionObserver.observe(s));
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
