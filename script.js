document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTS
  ========================================== */

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const currentYear = document.getElementById("currentYear");


  /* =========================================
     CURRENT YEAR
  ========================================== */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =========================================
     HEADER ON SCROLL
  ========================================== */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* =========================================
     MOBILE MENU
  ========================================== */

  const closeMenu = () => {
    if (!menuToggle || !mainNav) return;

    menuToggle.classList.remove("active");
    mainNav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    document.body.classList.remove("menu-open");
  };


  const openMenu = () => {
    if (!menuToggle || !mainNav) return;

    menuToggle.classList.add("active");
    mainNav.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");

    document.body.classList.add("menu-open");
  };


  if (menuToggle) {
    menuToggle.addEventListener("click", () => {

      const isOpen = mainNav.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });
  }


  /* =========================================
     CLOSE MOBILE MENU ON LINK CLICK
  ========================================== */

  if (mainNav) {

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });

  }


  /* =========================================
     ESCAPE KEY
  ========================================== */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  /* =========================================
     SMOOTH ANCHOR SCROLL
  ========================================== */

  const anchorLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  anchorLinks.forEach((link) => {

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

      const headerOffset = header
        ? header.offsetHeight
        : 0;

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


  /* =========================================
     REVEAL ANIMATIONS
  ========================================== */

  const revealTargets = document.querySelectorAll(
    [
      ".statement-content",
      ".service-row",
      ".approach-main",
      ".approach-item",
      ".process-item",
      ".industry-item",
      ".about-content",
      ".contact-main"
    ].join(", ")
  );


  revealTargets.forEach((element, index) => {

    element.classList.add("reveal-element");

    element.style.setProperty(
      "--reveal-delay",
      `${Math.min(index * 45, 300)}ms`
    );

  });


  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


  revealTargets.forEach((element) => {
    revealObserver.observe(element);
  });


  /* =========================================
     REDUCED MOTION SUPPORT
  ========================================== */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    revealTargets.forEach((element) => {
      element.classList.add("is-visible");
    });

  }


  /* =========================================
     CONTACT BUTTON SAFETY
  ========================================== */

  const contactButton =
    document.querySelector(".contact-button");

  if (contactButton) {

    contactButton.addEventListener("click", () => {

      /*
        The email address in index.html is still
        a placeholder and will be replaced later
        with the real MH Group email.
      */

    });

  }

});
