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
  ========================== */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================
     NAVIGATION SCROLL
  ========================== */

  const handleScroll = () => {

    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  handleScroll();


  /* =========================
     MOBILE MENU
  ========================== */

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      const isOpen = mobileMenu.classList.toggle("open");

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

  }


  mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mobileMenu?.classList.remove("open");

      document.body.classList.remove("menu-open");

      menuButton?.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


  /* =========================
     SMOOTH ANCHOR LINKS
  ========================== */

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

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================
     REVEAL ON SCROLL
  ========================== */

  const revealElements = document.querySelectorAll(
    ".section-label, .intro-layout, .service-item, .process-item, .about-layout, .contact-content"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });


  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
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
        rootMargin: "0px 0px -60px 0px"
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
  ========================== */

  if (
    cursor &&
    cursorRing &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;


    window.addEventListener("mousemove", (event) => {

      mouseX = event.clientX;
      mouseY = event.clientY;

      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;

    });


    const animateCursor = () => {

      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursor);

    };

    animateCursor();


    const interactiveElements = document.querySelectorAll(
      "a, button, .service-item, .process-item"
    );


    interactiveElements.forEach((element) => {

      element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("active");
      });

      element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("active");
      });

    });

  }


  /* =========================
     PARALLAX
  ========================== */

  const heroOrbits = document.querySelectorAll(".hero-orbit");

  if (heroOrbits.length > 0) {

    window.addEventListener(
      "scroll",
      () => {

        const scrollPosition = window.scrollY;

        heroOrbits.forEach((orbit, index) => {

          const speed = index === 0 ? 0.08 : -0.05;

          orbit.style.transform =
            `translateY(${scrollPosition * speed}px)`;

        });

      },
      {
        passive: true
      }
    );

  }


  /* =========================
     SERVICE HOVER
  ========================== */

  const serviceItems =
    document.querySelectorAll(".service-item");


  serviceItems.forEach((item) => {

    item.addEventListener("mouseenter", () => {

      item.style.zIndex = "2";

    });


    item.addEventListener("mouseleave", () => {

      item.style.zIndex = "1";

    });

  });


  /* =========================
     PROCESS HOVER
  ========================== */

  const processItems =
    document.querySelectorAll(".process-item");


  processItems.forEach((item) => {

    item.addEventListener("mouseenter", () => {

      item.style.zIndex = "2";

    });


    item.addEventListener("mouseleave", () => {

      item.style.zIndex = "1";

    });

  });


});
