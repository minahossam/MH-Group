document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ELEMENTS
  ====================================================== */

  const body = document.body;

  const header = document.querySelector(".nav-shell");

  const menuButton =
    document.querySelector(".menu-toggle");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  const mobileLinks =
    document.querySelectorAll(".mobile-menu a");

  const cursor =
    document.querySelector(".cursor");

  const cursorRing =
    document.querySelector(".cursor-ring");

  const year =
    document.querySelector("#year");

  const hero =
    document.querySelector(".hero");

  const heroTitle =
    document.querySelector(".hero-title");

  const heroOrbs =
    document.querySelectorAll(".hero-orb");

  const magneticElements =
    document.querySelectorAll(".magnetic");

  const workTrack =
    document.querySelector(".work-track");

  const workProgress =
    document.querySelector(".work-progress span");


  /* =====================================================
     BODY READY
  ====================================================== */

  body.classList.add("js-ready");

  requestAnimationFrame(() => {
    setTimeout(() => {
      body.classList.add("hero-loaded");
    }, 100);
  });


  /* =====================================================
     YEAR
  ====================================================== */

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }


  /* =====================================================
     HEADER SCROLL
  ====================================================== */

  const updateHeader = () => {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 35
    );

  };

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =====================================================
     MOBILE MENU
  ====================================================== */

  const closeMobileMenu = () => {

    if (!mobileMenu || !menuButton) {
      return;
    }

    mobileMenu.classList.remove("open");

    body.classList.remove("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open menu"
    );
  };


  const openMobileMenu = () => {

    if (!mobileMenu || !menuButton) {
      return;
    }

    mobileMenu.classList.add("open");

    body.classList.add("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    menuButton.setAttribute(
      "aria-label",
      "Close menu"
    );
  };


  if (menuButton && mobileMenu) {

    menuButton.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        const open =
          mobileMenu.classList.contains("open");

        if (open) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }

      }
    );

  }


  /* =====================================================
     SMOOTH INTERNAL LINKS
  ====================================================== */

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

          if (targetId === "#top") {

            event.preventDefault();

            closeMobileMenu();

            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });

            return;
          }

          const target =
            document.querySelector(targetId);

          if (!target) {
            return;
          }

          event.preventDefault();

          closeMobileMenu();

          const headerHeight =
            header
              ? header.offsetHeight + 25
              : 0;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }
      );

    });


  /* =====================================================
     MOBILE MENU LINKS
  ====================================================== */

  mobileLinks.forEach((link) => {

    link.addEventListener(
      "click",
      () => {
        setTimeout(
          closeMobileMenu,
          50
        );
      }
    );

  });


  /* =====================================================
     ESCAPE
  ====================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {
        closeMobileMenu();
      }

    }
  );


  /* =====================================================
     RESIZE
  ====================================================== */

  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 900) {
        closeMobileMenu();
      }

    }
  );


  /* =====================================================
     REVEAL ANIMATIONS
  ====================================================== */

  const revealSelectors = [
    ".section-top",
    ".intro-title-wrap",
    ".intro-copy",
    ".project-card",
    ".statement h2",
    ".service-row",
    ".process-intro",
    ".process-item",
    ".about-heading",
    ".about-content",
    ".cta-inner",
    ".contact-heading",
    ".contact-form"
  ];

  const revealElements =
    document.querySelectorAll(
      revealSelectors.join(",")
    );


  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });


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
          threshold: 0.08,
          rootMargin:
            "0px 0px -60px 0px"
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


  /* =====================================================
     CUSTOM CURSOR
  ====================================================== */

  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  if (
    finePointer &&
    cursor &&
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

        cursor.style.left =
          `${mouseX}px`;

        cursor.style.top =
          `${mouseY}px`;

      },
      { passive: true }
    );


    const animateCursor = () => {

      ringX +=
        (mouseX - ringX) *
        0.13;

      ringY +=
        (mouseY - ringY) *
        0.13;

      cursorRing.style.left =
        `${ringX}px`;

      cursorRing.style.top =
        `${ringY}px`;

      requestAnimationFrame(
        animateCursor
      );

    };


    animateCursor();


    document
      .querySelectorAll(
        "a, button, select, textarea, input, .project-card, .service-row, .process-item"
      )
      .forEach((element) => {

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

      });

  }


  /* =====================================================
     MAGNETIC BUTTONS
  ====================================================== */

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

            const strength =
              element.classList.contains(
                "submit-button"
              )
                ? 0.08
                : 0.18;

            element.style.transform =
              `translate(${x * strength}px, ${y * strength}px)`;

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            element.style.transform =
              "translate(0, 0)";

          }
        );

      }
    );

  }


  /* =====================================================
     HERO MOUSE PARALLAX
  ====================================================== */

  if (
    finePointer &&
    hero &&
    heroTitle
  ) {

    hero.addEventListener(
      "mousemove",
      (event) => {

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


        heroTitle.style.transform =
          `translate(${x * 8}px, ${y * 6}px)`;


        heroOrbs.forEach(
          (orb, index) => {

            const amount =
              index === 0
                ? 18
                : -12;

            orb.style.transform =
              `translate(${x * amount}px, ${y * amount}px)`;

          }
        );

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        heroTitle.style.transform =
          "translate(0, 0)";

        heroOrbs.forEach(
          (orb) => {
            orb.style.transform =
              "translate(0, 0)";
          }
        );

      }
    );

  }


  /* =====================================================
     HERO SCROLL PARALLAX
  ====================================================== */

  if (heroOrbs.length) {

    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {

        if (ticking) {
          return;
        }

        requestAnimationFrame(
          () => {

            const scroll =
              window.scrollY;

            heroOrbs.forEach(
              (orb, index) => {

                const speed =
                  index === 0
                    ? 0.08
                    : -0.05;

                orb.style.marginTop =
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


  /* =====================================================
     HORIZONTAL PORTFOLIO DRAG
  ====================================================== */

  if (workTrack) {

    let isDown = false;

    let startX = 0;

    let scrollStart = 0;


    const getMaxScroll = () => {

      return Math.max(
        1,
        workTrack.scrollWidth -
        window.innerWidth
      );

    };


    const updateProgress = () => {

      if (!workProgress) {
        return;
      }

      const max =
        getMaxScroll();

      const current =
        Math.max(
          0,
          window.scrollX
        );

      const progress =
        Math.min(
          100,
          (current / max) * 100
        );

      workProgress.style.width =
        `${Math.max(15, progress)}%`;

    };


    workTrack.addEventListener(
      "mousedown",
      (event) => {

        isDown = true;

        workTrack.classList.add(
          "dragging"
        );

        startX =
          event.pageX -
          workTrack.offsetLeft;

        scrollStart =
          window.scrollX;

      }
    );


    window.addEventListener(
      "mouseup",
      () => {

        isDown = false;

        workTrack.classList.remove(
          "dragging"
        );

      }
    );


    workTrack.addEventListener(
      "mousemove",
      (event) => {

        if (!isDown) {
          return;
        }

        event.preventDefault();

        const x =
          event.pageX -
          workTrack.offsetLeft;

        const walk =
          (x - startX) * 1.2;

        window.scrollTo({
          left:
            scrollStart - walk
        });

      }
    );


    workTrack.addEventListener(
      "wheel",
      (event) => {

        if (
          Math.abs(event.deltaY) >
          Math.abs(event.deltaX)
        ) {

          event.preventDefault();

          window.scrollBy({
            left:
              event.deltaY * 1.5
          });

        }

      },
      { passive: false }
    );


    window.addEventListener(
      "scroll",
      updateProgress,
      { passive: true }
    );

    updateProgress();

  }


  /* =====================================================
     PROJECT HOVER TILT
  ====================================================== */

  if (finePointer) {

    document
      .querySelectorAll(".project-visual")
      .forEach((visual) => {

        visual.addEventListener(
          "mousemove",
          (event) => {

            const rect =
              visual.getBoundingClientRect();

            const x =
              (event.clientX - rect.left) /
              rect.width -
              0.5;

            const y =
              (event.clientY - rect.top) /
              rect.height -
              0.5;

            visual.style.transform =
              `perspective(900px) rotateX(${y * -2.5}deg) rotateY(${x * 2.5}deg) scale(.99)`;

          }
        );


        visual.addEventListener(
          "mouseleave",
          () => {

            visual.style.transform =
              "perspective(900px) rotateX(0) rotateY(0) scale(1)";

          }
        );

      });

  }


  /* =====================================================
     SERVICE ROW HOVER
  ====================================================== */

  document
    .querySelectorAll(".service-row")
    .forEach((row) => {

      row.addEventListener(
        "mouseenter",
        () => {
          row.style.zIndex = "2";
        }
      );

      row.addEventListener(
        "mouseleave",
        () => {
          row.style.zIndex = "1";
        }
      );

    });


  /* =====================================================
     PROCESS STAGGER
  ====================================================== */

  document
    .querySelectorAll(".process-item")
    .forEach((item, index) => {

      item.style.transitionDelay =
        `${index * 40}ms`;

    });


  /* =====================================================
     MOBILE TOUCH SAFETY
  ====================================================== */

  document.addEventListener(
    "touchstart",
    () => {},
    { passive: true }
  );

});
