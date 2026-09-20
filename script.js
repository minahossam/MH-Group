/* =========================================================
   MH GROUP — V4
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     YEAR
     ------------------------------------------------------- */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* -------------------------------------------------------
     HEADER
     ------------------------------------------------------- */

  const header = document.getElementById("header");

  const handleHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleHeader, {
    passive: true
  });

  handleHeader();


  /* -------------------------------------------------------
     MOBILE MENU
     ------------------------------------------------------- */

  const menuButton = document.getElementById("menuButton");
  const nav = document.getElementById("nav");

  if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

    });


    /* Close menu after clicking a link */

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.setAttribute(
          "aria-label",
          "Open menu"
        );

      });

    });

  }


  /* -------------------------------------------------------
     CUSTOM CURSOR
     ------------------------------------------------------- */

  const cursor = document.getElementById("cursor");

  if (cursor && window.matchMedia("(pointer: fine)").matches) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove", event => {

      mouseX = event.clientX;
      mouseY = event.clientY;

    });


    const animateCursor = () => {

      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;

      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;

      requestAnimationFrame(animateCursor);

    };

    animateCursor();


    /* Cursor interaction */

    const interactiveElements =
      document.querySelectorAll(
        "a, button, .service-item, .audience-list div"
      );

    interactiveElements.forEach(element => {

      element.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-active");
      });

      element.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-active");
      });

    });

  }


  /* -------------------------------------------------------
     REVEAL ON SCROLL
     ------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".intro-content, .service-feature, .service-list, " +
    ".approach-content > div:last-child, .audience-content, " +
    ".about-main, .contact-main"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });


  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
      }
    );


    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* -------------------------------------------------------
     HERO ORBIT MOVEMENT
     ------------------------------------------------------- */

  const orbit = document.querySelector(".hero-orbit");

  if (
    orbit &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    let targetX = 0;
    let targetY = 0;

    let currentOrbitX = 0;
    let currentOrbitY = 0;


    document.addEventListener("mousemove", event => {

      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      targetX = x * 18;
      targetY = y * 12;

    });


    const animateOrbit = () => {

      currentOrbitX +=
        (targetX - currentOrbitX) * 0.04;

      currentOrbitY +=
        (targetY - currentOrbitY) * 0.04;

      orbit.style.transform =
        `translate3d(${currentOrbitX}px, ${currentOrbitY}px, 0) translateY(-50%)`;

      requestAnimationFrame(animateOrbit);

    };

    animateOrbit();

  }


  /* -------------------------------------------------------
     SMOOTH ANCHOR NAVIGATION
     ------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerHeight =
        header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* -------------------------------------------------------
     CONTACT CIRCLE MICRO INTERACTION
     ------------------------------------------------------- */

  const contactCircle =
    document.querySelector(".contact-circle");

  if (
    contactCircle &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    contactCircle.addEventListener(
      "mousemove",
      event => {

        const rect =
          contactCircle.getBoundingClientRect();

        const x =
          event.clientX - rect.left - rect.width / 2;

        const y =
          event.clientY - rect.top - rect.height / 2;

        const rotateX =
          (y / rect.height) * -8;

        const rotateY =
          (x / rect.width) * 8;

        contactCircle.style.transform =
          `perspective(500px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           scale(1.04)`;

      }
    );


    contactCircle.addEventListener(
      "mouseleave",
      () => {

        contactCircle.style.transform =
          "perspective(500px) rotateX(0) rotateY(0) scale(1)";

      }
    );

  }


  /* -------------------------------------------------------
     KEYBOARD ACCESSIBILITY
     ------------------------------------------------------- */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      if (nav) {
        nav.classList.remove("open");
      }

      if (menuButton) {

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.setAttribute(
          "aria-label",
          "Open menu"
        );

      }

    }

  });

});
