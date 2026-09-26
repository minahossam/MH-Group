/* =========================================================
   MH GROUP — INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     LOADER
  ======================================================= */

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader?.classList.add("hidden");
    }, 650);
  });


  /* =======================================================
     YEAR
  ======================================================= */

  document.querySelectorAll(".year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });


  /* =======================================================
     HEADER
  ======================================================= */

  const header = document.getElementById("siteHeader");

  const updateHeader = () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  const closeMenu = () => {
    menuToggle?.classList.remove("active");
    mobileNav?.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuToggle?.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    menuToggle?.classList.add("active");
    mobileNav?.classList.add("active");
    document.body.classList.add("menu-open");

    menuToggle?.setAttribute("aria-expanded", "true");
  };

  menuToggle?.addEventListener("click", () => {

    const isOpen = mobileNav?.classList.contains("active");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }

  });


  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });


  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  window.addEventListener("resize", () => {

    if (window.innerWidth > 700) {
      closeMenu();
    }

  });


  /* =======================================================
     SMOOTH INTERNAL LINKS
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerOffset = 70;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     REVEAL ON SCROLL
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");

          observerInstance.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     STAGGERED PROJECT ANIMATION
  ======================================================= */

  document.querySelectorAll(".project-list").forEach((list) => {

    const cards = list.querySelectorAll(".project-card");

    cards.forEach((card, index) => {

      card.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;

    });

  });


  /* =======================================================
     SERVICES STAGGER
  ======================================================= */

  document.querySelectorAll(".services-grid").forEach((grid) => {

    grid.querySelectorAll(".service").forEach((service, index) => {

      service.style.transitionDelay =
        `${Math.min(index * 60, 300)}ms`;

    });

  });


  /* =======================================================
     FAQ ACCORDION
  ======================================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {

    const button = item.querySelector(".faq-question");

    button?.addEventListener("click", () => {

      const isOpen = item.classList.contains("open");

      faqItems.forEach((otherItem) => {

        otherItem.classList.remove("open");

        const otherButton =
          otherItem.querySelector(".faq-question");

        otherButton?.setAttribute(
          "aria-expanded",
          "false"
        );

      });

      if (!isOpen) {

        item.classList.add("open");

        button.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    });

  });


  /* =======================================================
     CONTACT FORM
  ======================================================= */

  const contactForm =
    document.getElementById("contactForm");

  const submitButton =
    contactForm?.querySelector(".submit-button");

  const submitLabel =
    contactForm?.querySelector(".submit-label");

  if (contactForm && submitButton && submitLabel) {

    contactForm.addEventListener("submit", () => {

      submitButton.disabled = true;

      submitLabel.textContent = "Sending Inquiry...";

    });

  }


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const hero =
    document.querySelector(".hero");

  const orbits =
    document.querySelectorAll(".hero-orbit");

  if (
    hero &&
    orbits.length &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    hero.addEventListener("mousemove", (event) => {

      const rect = hero.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      orbits.forEach((orbit, index) => {

        const intensity =
          (index + 1) * 8;

        orbit.style.marginLeft =
          `${x * intensity}px`;

        orbit.style.marginTop =
          `${y * intensity}px`;

      });

    });

    hero.addEventListener("mouseleave", () => {

      orbits.forEach((orbit) => {

        orbit.style.marginLeft = "";
        orbit.style.marginTop = "";

      });

    });

  }


  /* =======================================================
     PROJECT HOVER MICRO-INTERACTION
  ======================================================= */

  const projectCards =
    document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {

    const arrow =
      card.querySelector(".project-arrow");

    card.addEventListener("mouseenter", () => {

      if (arrow) {
        arrow.style.transform = "rotate(45deg)";
      }

    });

    card.addEventListener("mouseleave", () => {

      if (arrow) {
        arrow.style.transform = "";
      }

    });

  });


  /* =======================================================
     PREVENT DOUBLE FORM SUBMISSION
  ======================================================= */

  let formSubmitted = false;

  contactForm?.addEventListener("submit", (event) => {

    if (formSubmitted) {
      event.preventDefault();
      return;
    }

    formSubmitted = true;

  });

});
