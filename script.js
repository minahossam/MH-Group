/* =========================================================
   MH GROUP
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =======================================================
     ELEMENTS
  ======================================================== */

  const body = document.body;

  const header =
    document.querySelector(".site-header");

  const menuToggle =
    document.querySelector(".menu-toggle");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  const mobileLinks =
    document.querySelectorAll(".mobile-menu a");

  const themeToggle =
    document.querySelector(".theme-toggle");

  const cursorDot =
    document.querySelector(".cursor-dot");

  const cursorRing =
    document.querySelector(".cursor-ring");

  const revealElements =
    document.querySelectorAll(".reveal");

  const yearElements =
    document.querySelectorAll(".year");

  const faqItems =
    document.querySelectorAll(".faq-item");

  const projectForm =
    document.querySelector("#projectForm");

  const toast =
    document.querySelector(".toast");

  const hero =
    document.querySelector(".hero");

  const heroTitle =
    document.querySelector(".hero-title");

  const heroOrbits =
    document.querySelectorAll(".hero-orbit");


  /* =======================================================
     YEAR
  ======================================================== */

  const currentYear =
    new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });


  /* =======================================================
     HEADER SCROLL
  ======================================================== */

  const updateHeader = () => {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 40
    );
  };

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =======================================================
     THEME
  ======================================================== */

  const savedTheme =
    localStorage.getItem("mh-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
  }

  const updateThemeColor = () => {

    const metaTheme =
      document.querySelector(
        'meta[name="theme-color"]'
      );

    if (!metaTheme) return;

    metaTheme.setAttribute(
      "content",
      body.classList.contains("dark")
        ? "#0b0b0a"
        : "#f4f0e8"
    );
  };

  updateThemeColor();


  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      () => {

        body.classList.toggle("dark");

        const isDark =
          body.classList.contains("dark");

        localStorage.setItem(
          "mh-theme",
          isDark
            ? "dark"
            : "light"
        );

        updateThemeColor();

      }
    );
  }


  /* =======================================================
     MOBILE MENU
  ======================================================== */

  const openMenu = () => {

    if (!mobileMenu || !menuToggle) {
      return;
    }

    mobileMenu.classList.add("open");

    body.classList.add("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Close menu"
    );

  };


  const closeMenu = () => {

    if (!mobileMenu || !menuToggle) {
      return;
    }

    mobileMenu.classList.remove("open");

    body.classList.remove("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open menu"
    );

  };


  if (menuToggle) {

    menuToggle.addEventListener(
      "click",
      () => {

        const open =
          mobileMenu.classList.contains("open");

        if (open) {
          closeMenu();
        } else {
          openMenu();
        }

      }
    );
  }


  mobileLinks.forEach((link) => {

    link.addEventListener(
      "click",
      () => {
        closeMenu();
      }
    );

  });


  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    }
  );


  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 1000) {
        closeMenu();
      }

    }
  );


  /* =======================================================
     SMOOTH INTERNAL LINKS
  ======================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

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

          if (!target) {
            return;
          }

          event.preventDefault();

          closeMenu();

          const headerOffset = 75;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerOffset;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }
      );

    });


  /* =======================================================
     REVEAL OBSERVER
  ======================================================== */

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -50px 0px"
        }
      );

    revealElements.forEach(
      (element) => {
        revealObserver.observe(element);
      }
    );

  } else {

    revealElements.forEach(
      (element) => {
        element.classList.add("visible");
      }
    );

  }


  /* =======================================================
     FAQ
  ======================================================== */

  faqItems.forEach((item) => {

    const button =
      item.querySelector(".faq-question");

    if (!button) return;

    button.addEventListener(
      "click",
      () => {

        const wasOpen =
          item.classList.contains("open");

        faqItems.forEach(
          (otherItem) => {
            otherItem.classList.remove(
              "open"
            );
          }
        );

        if (!wasOpen) {
          item.classList.add("open");
        }

      }
    );

  });


  /* =======================================================
     CUSTOM CURSOR
  ======================================================== */

  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;

  if (
    finePointer &&
    cursorDot &&
    cursorRing
  ) {

    let mouseX =
      window.innerWidth / 2;

    let mouseY =
      window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;


    window.addEventListener(
      "mousemove",
      (event) => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;

        cursorDot.style.left =
          `${mouseX}px`;

        cursorDot.style.top =
          `${mouseY}px`;

      },
      { passive: true }
    );


    const animateCursor = () => {

      ringX +=
        (mouseX - ringX) * 0.12;

      ringY +=
        (mouseY - ringY) * 0.12;

      cursorRing.style.left =
        `${ringX}px`;

      cursorRing.style.top =
        `${ringY}px`;

      requestAnimationFrame(
        animateCursor
      );

    };

    animateCursor();


    const interactiveElements =
      document.querySelectorAll(
        "a, button, input, textarea, select, .service-item, .project-card"
      );


    interactiveElements.forEach(
      (element) => {

        element.addEventListener(
          "mouseenter",
          () => {

            cursorRing.classList.add(
              "active"
            );

          }
        );

        element.addEventListener(
          "mouseleave",
          () => {

            cursorRing.classList.remove(
              "active"
            );

          }
        );

      }
    );

  }


  /* =======================================================
     HERO MOUSE MOTION
  ======================================================== */

  if (
    hero &&
    heroTitle &&
    finePointer
  ) {

    hero.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          hero.getBoundingClientRect();

        const x =
          (
            event.clientX -
            rect.left
          ) /
            rect.width -
          0.5;

        const y =
          (
            event.clientY -
            rect.top
          ) /
            rect.height -
          0.5;

        heroTitle.style.transform =
          `
          translate(
            ${x * 7}px,
            ${y * 5}px
          )
          `;

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        heroTitle.style.transform =
          "translate(0,0)";

      }
    );

  }


  /* =======================================================
     HERO PARALLAX
  ======================================================== */

  if (heroOrbits.length) {

    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {

        if (ticking) return;

        window.requestAnimationFrame(
          () => {

            const scroll =
              window.scrollY;

            heroOrbits.forEach(
              (orbit, index) => {

                const speed =
                  index === 0
                    ? 0.06
                    : -0.035;

                orbit.style.marginTop =
                  `${scroll * speed}px`;

              }
            );

            ticking = false;

          }
        );

        ticking = true;

      },
      { passive: true }
    );

  }


  /* =======================================================
     MAGNETIC BUTTON
  ======================================================== */

  const magneticElements =
    document.querySelectorAll(
      ".magnetic"
    );

  if (finePointer) {

    magneticElements.forEach(
      (element) => {

        element.addEventListener(
          "mousemove",
          (event) => {

            const rect =
              element.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left -
              rect.width / 2;

            const y =
              event.clientY -
              rect.top -
              rect.height / 2;

            element.style.transform =
              `
              translate(
                ${x * 0.08}px,
                ${y * 0.08}px
              )
              `;

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            element.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =======================================================
     SERVICE HOVER
  ======================================================== */

  document
    .querySelectorAll(".service-item")
    .forEach((item) => {

      item.addEventListener(
        "mouseenter",
        () => {
          item.style.zIndex = "3";
        }
      );

      item.addEventListener(
        "mouseleave",
        () => {
          item.style.zIndex = "1";
        }
      );

    });


  /* =======================================================
     FORM
  ======================================================== */

  if (projectForm) {

    projectForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        const formData =
          new FormData(projectForm);

        const name =
          formData.get("name");

        const email =
          formData.get("email");

        const message =
          formData.get("message");

        const budget =
          formData.get("budget");

        const timeline =
          formData.get("timeline");

        const services =
          formData.getAll("service");


        /*
          IMPORTANT:

          This currently prepares the inquiry
          locally.

          Connect this form later to your
          backend / CRM / email service.
        */

        const inquiry = {

          name,
          email,

          services,

          budget,

          timeline,

          message

        };


        console.log(
          "MH Group Project Inquiry:",
          inquiry
        );


        showToast();

        projectForm.reset();

      }
    );

  }


  /* =======================================================
     TOAST
  ======================================================== */

  let toastTimer;


  const showToast = () => {

    if (!toast) return;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
      setTimeout(() => {

        toast.classList.remove(
          "show"
        );

      }, 4000);

  };


  /* =======================================================
     PAGE READY
  ======================================================== */

  requestAnimationFrame(() => {

    body.classList.add(
      "js-ready"
    );

  });

});
