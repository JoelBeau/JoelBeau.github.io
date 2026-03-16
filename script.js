const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const sections = document.querySelectorAll("main section[id]");
const yearTarget = document.getElementById("year");
const typedText = document.getElementById("typed-text");
const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const updateActiveNav = () => {
  const offset = window.scrollY + 140;

  sections.forEach((section) => {
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-menu a[href="#${id}"]`);

    if (!link) {
      return;
    }

    const isActive =
      offset >= section.offsetTop &&
      offset < section.offsetTop + section.offsetHeight;

    link.classList.toggle("active", isActive);
  });
};

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("load", updateActiveNav);

if (typedText && !prefersReducedMotion.matches) {
  // Keep these short so the terminal effect stays readable and professional.
  const messages = [
    "init --focus software-engineering systems security",
    "tracking -> cloud infrastructure networking developer-platforms",
    "current_state: building practical tools with real engineering intent"
  ];

  let messageIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const currentMessage = messages[messageIndex];
    typedText.textContent = currentMessage.slice(0, charIndex);

    if (!deleting && charIndex < currentMessage.length) {
      charIndex += 1;
      setTimeout(type, 55);
      return;
    }

    if (!deleting && charIndex === currentMessage.length) {
      deleting = true;
      setTimeout(type, 1700);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(type, 22);
      return;
    }

    deleting = false;
    messageIndex = (messageIndex + 1) % messages.length;
    setTimeout(type, 350);
  };

  type();
} else if (typedText) {
  typedText.textContent = "focus: software engineering, systems, infrastructure, security";
}

if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -30px 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
