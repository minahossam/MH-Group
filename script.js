/* =========================================================
   MH GROUP — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================== */

  const loader = document.getElementById("loader");
  const header = document.getElementById("siteHeader");

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const cursor = document.getElementById("cursor");
  const cursorFollower = document.getElementById("cursorFollower");

  const year = document.getElementById("year");


  /* =======================================================
     YEAR
  ======================================================== */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =======================================================
     LOADER
  ======================================================== */

  window.addEventListener("load", () => {

    setTimeout(() => {

      if (loader) {
        loader.classList.add("hidden");
      }

      document.body.classList.add("page-loaded");

    }, 900);

  });


  /* =======================================================
     HEADER SCROLL
  ======================================================== */

  const handleHeader = () => {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };

  handleHeader();

  window.addEventListener("scroll", handleHeader, {
    passive: true
  });


  /* =======================================================
     MOBILE MENU
  ======================================================== */

  const closeMenu = () => {

    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    document.body.classList.remove("menu-open");

  };


  const openMenu = () => {

    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.add("active");
    mobileMenu.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");

    document.body.classList.add("menu-open");

  };


  if (menuToggle) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        mobileMenu &&
        mobileMenu.classList.contains("active");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });

  }


  if (mobileMenu) {

    mobileMenu
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener("click", () => {
          closeMenu();
        });

      });

  }


  /* =======================================================
     ESCAPE KEY
  ======================================================== */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  /* =======================================================
     SMOOTH INTERNAL LINKS
  ======================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

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

        const headerOffset =
          window.innerWidth <= 760
            ? 70
            : 90;

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
     REVEAL ANIMATIONS
  ======================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("visible");

            revealObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );


    revealElements.forEach(element => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     STAGGERED REVEALS
  ======================================================== */

  const groups = [
    ".service-list .service-item",
    ".process-grid .process-card",
    ".projects .project"
  ];


  groups.forEach(selector => {

    const items =
      document.querySelectorAll(selector);

    items.forEach((item, index) => {

      item.style.transitionDelay =
        `${Math.min(index * 0.08, 0.45)}s`;

    });

  });


  /* =======================================================
     CUSTOM CURSOR
  ======================================================== */

  const hasFinePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  if (
    hasFinePointer &&
    cursor &&
    cursorFollower
  ) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let followerX = mouseX;
    let followerY = mouseY;


    window.addEventListener(
      "mousemove",
      event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left =
          `${mouseX}px`;

        cursor.style.top =
          `${mouseY}px`;

      },
      { passive: true }
    );


    const animateCursor = () => {

      followerX +=
        (mouseX - followerX) * 0.13;

      followerY +=
        (mouseY - followerY) * 0.13;

      cursorFollower.style.left =
        `${followerX}px`;

      cursorFollower.style.top =
        `${followerY}px`;

      requestAnimationFrame(
        animateCursor
      );

    };

    animateCursor();


    const interactiveElements =
      document.querySelectorAll(
        "a, button, input, textarea"
      );


    interactiveElements.forEach(element => {

      element.addEventListener(
        "mouseenter",
        () => {
          document.body.classList.add(
            "cursor-hover"
          );
        }
      );


      element.addEventListener(
        "mouseleave",
        () => {
          document.body.classList.remove(
            "cursor-hover"
          );
        }
      );

    });

  }


  /* =======================================================
     HERO PARALLAX
  ======================================================== */

  const hero =
    document.querySelector(".hero");

  const heroOrbits =
    document.querySelectorAll(".hero-orbit");


  if (
    hero &&
    heroOrbits.length &&
    hasFinePointer
  ) {

    hero.addEventListener(
      "mousemove",
      event => {

        const rect =
          hero.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width -
          0.5;

        const y =
          (event.clientY - rect.top) /
          rect.height -
          0.5;


        heroOrbits.forEach(
          (orbit, index) => {

            const amount =
              (index + 1) * 18;

            orbit.style.transform =
              `translate(
                ${x * amount}px,
                ${y * amount}px
              )`;

          }
        );

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        heroOrbits.forEach(orbit => {

          orbit.style.transform =
            "translate(0, 0)";

        });

      }
    );

  }


  /* =======================================================
     PROJECT IMAGE MOVEMENT
  ======================================================== */

  if (hasFinePointer) {

    document
      .querySelectorAll(".project-image")
      .forEach(project => {

        project.addEventListener(
          "mousemove",
          event => {

            const rect =
              project.getBoundingClientRect();

            const x =
              ((event.clientX - rect.left) /
                rect.width -
                0.5) *
              8;

            const y =
              ((event.clientY - rect.top) /
                rect.height -
                0.5) *
              8;


            const placeholder =
              project.querySelector(
                ".project-placeholder"
              );


            if (placeholder) {

              placeholder.style.transform =
                `translate(
                  ${x}px,
                  ${y}px
                )`;

            }

          }
        );


        project.addEventListener(
          "mouseleave",
          () => {

            const placeholder =
              project.querySelector(
                ".project-placeholder"
              );

            if (placeholder) {

              placeholder.style.transform =
                "translate(0, 0)";

            }

          }
        );

      });

  }


  /* =======================================================
     FORM SUBMIT FEEDBACK
  ======================================================== */

  const form =
    document.querySelector(".contact-form");

  if (form) {

    form.addEventListener(
      "submit",
      () => {

        const button =
          form.querySelector(
            ".form-submit"
          );

        if (!button) return;

        const span =
          button.querySelector("span");

        if (span) {
          span.textContent =
            "Sending...";
        }

      }
    );

  }


  /* =======================================================
     RESIZE SAFETY
  ======================================================== */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(() => {

          if (
            window.innerWidth > 760
          ) {
            closeMenu();
          }

        }, 150);

    },
    { passive: true }
  );

});
