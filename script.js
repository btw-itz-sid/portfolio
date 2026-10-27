const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// NAV BACKGROUND ON SCROLL
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// MOBILE MENU
function setMenu(open) {
  navLinks.classList.toggle("open", open);
  nav.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", e => {
  if (!nav.contains(e.target)) setMenu(false);
});

// ACTIVE NAV LINK
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

// REVEAL ON SCROLL
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
