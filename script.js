document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = document.body.classList.toggle("menu-open");

      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

    });


    /* Close menu after clicking a link */

    navLinks.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        document.body.classList.remove("menu-open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

      });

    });

  }


  /* =========================
     NAVIGATION ON SCROLL
  ========================== */

  const handleScroll = () => {

    if (!nav) return;

    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

  };

  handleScroll();

  window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
  );


  /* =========================
     REVEAL ANIMATIONS
  ========================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
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


  /* =========================
     CURRENT YEAR
  ========================== */

  const yearElement =
    document.getElementById("year");

  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }


  /* =========================
     ESC KEY
     CLOSE MOBILE MENU
  ========================== */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      document.body.classList.remove("menu-open");

      if (menuToggle) {

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

      }

    }

  });

});
