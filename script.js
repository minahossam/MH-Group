/* =========================================================
   MH GROUP
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-nav a");
  const yearElement = document.querySelector("#year");
  const revealElements = document.querySelectorAll(".reveal");

  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =======================================================
     HEADER SCROLL
     ======================================================= */

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function openMenu() {
    if (!menuToggle || !mobileNav) return;

    mobileNav.classList.add("active");
    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!menuToggle || !mobileNav) return;

    mobileNav.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mobileNav) {

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {

      const isOpen = mobileNav.classList.contains("active");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });

  }

  /* =======================================================
     MOBILE NAV LINKS
     ======================================================= */

  mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {
      closeMenu();
    });

  });

  /* =======================================================
     CLOSE MOBILE MENU WITH ESC
     ======================================================= */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });

  /* =======================================================
     CLOSE MENU WHEN CLICKING OUTSIDE
     ======================================================= */

  document.addEventListener("click", (event) => {

    if (!mobileNav || !menuToggle) return;

    const clickedInsideMenu =
      mobileNav.contains(event.target);

    const clickedToggle =
      menuToggle.contains(event.target);

    if (
      mobileNav.classList.contains("active") &&
      !clickedInsideMenu &&
      !clickedToggle
    ) {
      closeMenu();
    }

  });

  /* =======================================================
     SMOOTH ANCHOR SCROLL
     ======================================================= */

  const anchorLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  anchorLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

  /* =======================================================
     REVEAL ON SCROLL
     ======================================================= */

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }

  /* =======================================================
     RESIZE
     ======================================================= */

  let resizeTimer;

  window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

      if (window.innerWidth > 900) {
        closeMenu();
      }

    }, 150);

  });

});
