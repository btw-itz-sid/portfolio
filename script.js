// TYPING ANIMATION
const texts = [
  "CS Undergrad 🎓",
  "AI/ML Developer 🧠",
  "Full Stack Builder 🚀",
  "LeetCode Grinder 💻",
  "Open Source Contributor 🌐"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

function type() {
  const current = texts[textIndex];

  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

type();

// NAVBAR SCROLL
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ACTIVE NAV LINK
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.style.color = "";
    if (link.getAttribute("href") === "#" + current) {
      link.style.color = "#f0f0f8";
    }
  });
});

// FADE UP ON SCROLL
const fadeEls = document.querySelectorAll(
  ".skill-card, .project-card, .dsa-card, .achievement-card, .contact-link"
);

fadeEls.forEach(el => el.classList.add("fade-up"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// SKILL BARS
setTimeout(() => {
  document.querySelectorAll(".skill-fill").forEach(bar => {
    const target = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => { bar.style.width = target; }, 100);
  });
}, 500);

// CONTACT FORM
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const msg = document.getElementById("msgInput").value.trim();

  let valid = true;

  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("msgError").textContent = "";
  document.getElementById("formSuccess").style.display = "none";

  if (!name) {
    document.getElementById("nameError").textContent = "Name is required";
    valid = false;
  }

  if (!email) {
    document.getElementById("emailError").textContent = "Email is required";
    valid = false;
  } else if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("emailError").textContent = "Enter a valid email";
    valid = false;
  }

  if (!msg) {
    document.getElementById("msgError").textContent = "Message is required";
    valid = false;
  } else if (msg.length < 10) {
    document.getElementById("msgError").textContent = "Message too short";
    valid = false;
  }

  if (valid) {
    document.getElementById("formSuccess").style.display = "block";
    document.getElementById("nameInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("msgInput").value = "";
  }
});

// HAMBURGER MENU
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  const btn = document.getElementById("hamburger");
  nav.classList.toggle("open");
  btn.classList.toggle("open");
}

function closeMenu() {
  const nav = document.getElementById("navLinks");
  const btn = document.getElementById("hamburger");
  nav.classList.remove("open");
  btn.classList.remove("open");
}

// Close menu on outside click
document.addEventListener("click", (e) => {
  const nav = document.getElementById("navLinks");
  const btn = document.getElementById("hamburger");
  if (!nav.contains(e.target) && !btn.contains(e.target)) {
    nav.classList.remove("open");
    btn.classList.remove("open");
  }
});