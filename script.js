document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".nav-shell");
  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const cursor = document.querySelector(".cursor");
  const cursorRing = document.querySelector(".cursor-ring");
  const year = document.querySelector("#year");

  /* =========================
     YEAR
  ========================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =========================
     HEADER
  ========================= */

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );
  };

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();

  /* =========================
     MOBILE MENU
  ========================= */

  const closeMobileMenu = () => {
    if (!mobileMenu || !menuButton) return;

    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );
  };

  const openMobileMenu = () => {
    if (!mobileMenu || !menuButton) return;

    mobileMenu.classList.add("open");
    document.body.classList.add("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );
  };

  if (menuButton && mobileMenu) {
    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen =
        mobileMenu.classList.contains("open");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  /* =========================
     MOBILE LINKS
  ========================= */

  mobileLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId =
        link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        closeMobileMenu();
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        closeMobileMenu();
        return;
      }

      event.preventDefault();

      closeMobileMenu();

      setTimeout(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 120);
    });
  });

  /* =========================
     ALL INTERNAL LINKS
  ========================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#" ||
          targetId === "#top"
        ) {
          if (targetId === "#top") {
            event.preventDefault();

            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }

          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        closeMobileMenu();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });

  /* =========================
     ESCAPE KEY
  ========================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  /* =========================
     CLOSE MENU ON RESIZE
  ========================= */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });

  /* =========================
     REVEAL ANIMATIONS
  ========================= */

  const revealElements =
    document.querySelectorAll(
      [
        ".section-label",
        ".intro-layout",
        ".service-item",
        ".process-item",
        ".about-layout",
        ".contact-content"
      ].join(", ")
    );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");

            observer.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.1,
          rootMargin:
            "0px 0px -50px 0px"
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

  /* =========================
     CUSTOM CURSOR
  ========================= */

  if (
    cursor &&
    cursorRing &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
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

    document
      .querySelectorAll(
        "a, button, .service-item, .process-item"
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

  /* =========================
     HERO MOTION
  ========================= */

  const hero =
    document.querySelector(".hero");

  const heroTitle =
    document.querySelector(".hero-title");

  const heroOrbits =
    document.querySelectorAll(
      ".hero-orbit"
    );

  if (hero && heroTitle) {

    hero.addEventListener(
      "mousemove",
      (event) => {
        if (
          !window.matchMedia(
            "(pointer: fine)"
          ).matches
        ) {
          return;
        }

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
      }
    );

    hero.addEventListener(
      "mouseleave",
      () => {
        heroTitle.style.transform =
          "translate(0, 0)";
      }
    );
  }

  /* =========================
     HERO PARALLAX
  ========================= */

  if (heroOrbits.length > 0) {
    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;

        window.requestAnimationFrame(() => {
          const scrollPosition =
            window.scrollY;

          heroOrbits.forEach(
            (orbit, index) => {
              const speed =
                index === 0
                  ? 0.08
                  : -0.05;

              orbit.style.marginTop =
                `${scrollPosition * speed}px`;
            }
          );

          ticking = false;
        });

        ticking = true;
      },
      { passive: true }
    );
  }

  /* =========================
     HERO MICRO INTERACTIONS
  ========================= */

  const heroDiscover =
    document.querySelector(
      ".hero-discover"
    );

  if (heroDiscover) {
    heroDiscover.addEventListener(
      "mouseenter",
      () => {
        heroDiscover.style.transform =
          "translateY(-3px)";
      }
    );

    heroDiscover.addEventListener(
      "mouseleave",
      () => {
        heroDiscover.style.transform =
          "translateY(0)";
      }
    );
  }

  /* =========================
     SERVICE INTERACTIONS
  ========================= */

  document
    .querySelectorAll(".service-item")
    .forEach((item) => {
      item.addEventListener(
        "mouseenter",
        () => {
          item.style.zIndex = "2";
        }
      );

      item.addEventListener(
        "mouseleave",
        () => {
          item.style.zIndex = "1";
        }
      );
    });

  /* =========================
     PROCESS INTERACTIONS
  ========================= */

  document
    .querySelectorAll(".process-item")
    .forEach((item) => {
      item.addEventListener(
        "mouseenter",
        () => {
          item.style.zIndex = "2";
        }
      );

      item.addEventListener(
        "mouseleave",
        () => {
          item.style.zIndex = "1";
        }
      );
    });

  /* =========================
     TOUCH SAFETY
  ========================= */

  document.addEventListener(
    "touchstart",
    () => {},
    { passive: true }
  );

  /* =========================
     INITIAL STATE
  ========================= */

  document.body.classList.add(
    "js-ready"
  );
});
