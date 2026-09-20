document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".header");
  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const year = document.querySelector("#year");


  /* =====================================================
     YEAR
  ===================================================== */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =====================================================
     HEADER
  ===================================================== */

  const updateHeader = () => {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const openMenu = () => {

    if (!mobileMenu || !menuButton) return;

    mobileMenu.classList.add("active");
    document.body.classList.add("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

  };


  const closeMenu = () => {

    if (!mobileMenu || !menuButton) return;

    mobileMenu.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

  };


  if (menuButton) {

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.addEventListener(
      "click",
      () => {

        if (mobileMenu.classList.contains("active")) {
          closeMenu();
        } else {
          openMenu();
        }

      }
    );

  }


  /* =====================================================
     MOBILE LINKS
  ===================================================== */

  mobileLinks.forEach((link) => {

    link.addEventListener(
      "click",
      () => {
        closeMenu();
      }
    );

  });


  /* =====================================================
     ESCAPE
  ===================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    }
  );


  /* =====================================================
     SMOOTH SCROLL
  ===================================================== */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

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

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


  /* =====================================================
     CLOSE MENU ON DESKTOP
  ===================================================== */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 900 &&
        mobileMenu
      ) {
        closeMenu();
      }

    }
  );


});
