/**
 * PORTFOLIO WEBSITE SCRIPT
 * Includes dark/light mode toggle functionality
 */

// ======================
// DOM Elements
// ======================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");
const themeToggle = document.createElement("button"); // Will be added for theme switching
const root = document.documentElement;

// ======================
// Mobile Menu Toggle
// ======================
function setupMobileMenu() {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });
}

// ======================
// Smooth Scrolling
// ======================
function setupSmoothScrolling() {
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      navLinks.classList.remove("active");
      menuToggle.classList.remove("open");

      targetSection.scrollIntoView({
        behavior: "smooth",
      });

      setActiveNavItem(targetId);
    });
  });
}

// ======================
// Active Nav Item Highlight
// ======================
function setActiveNavItem(id) {
  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === id) {
      item.classList.add("active");
    }
  });
}

function setupScrollSpy() {
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    setActiveNavItem(`#${current}`);
  });
}

// ======================
// Form Submission
// ======================
function setupContactForm() {
  const contactForm = document.querySelector(".contact-form form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // In a real app, you would send this data to a server
      console.log("Form submitted:", data);
      alert("Message sent successfully! I'll get back to you soon.");
      contactForm.reset();
    });
  }
}

// ======================
// Animation Effects
// ======================
function setupAnimations() {
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  document
    .querySelectorAll("section, .project-card, .skill-item")
    .forEach((el) => {
      observer.observe(el);
    });
}

// ======================
// Initialize Everything
// ======================
function init() {
  setupMobileMenu();
  setupSmoothScrolling();
  setupScrollSpy();
  setupContactForm();
  setupAnimations();
  setupThemeToggle();

  // Set initial active nav item
  setActiveNavItem("#home");
}

// Start the application when DOM is loaded
document.addEventListener("DOMContentLoaded", init);