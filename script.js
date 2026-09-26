/* =========================================================
   MH GROUP
   PREMIUM DIGITAL STUDIO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     YEAR
     ======================================================= */

  document.querySelectorAll(".year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });


  /* =======================================================
     PAGE LOADER
     ======================================================= */

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader?.classList.add("loaded");
    }, 500);
  });


  /* =======================================================
     THEME
     ======================================================= */

  const themeToggle = document.getElementById("themeToggle");

  const savedTheme = localStorage.getItem("mh-theme");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (savedTheme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }

  themeToggle?.addEventListener("click", () => {

    document.documentElement.classList.toggle("dark");

    const isDark =
      document.documentElement.classList.contains("dark");

    localStorage.setItem(
      "mh-theme",
      isDark ? "dark" : "light"
    );

  });


  /* =======================================================
     HEADER SCROLL
     ======================================================= */

  const header = document.getElementById("siteHeader");

  const updateHeader = () => {

    if (window.scrollY > 30) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const closeMobileMenu = () => {

    menuToggle?.classList.remove("active");
    mobileMenu?.classList.remove("active");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove("menu-open");

  };

  menuToggle?.addEventListener("click", () => {

    const active =
      mobileMenu?.classList.toggle("active");

    menuToggle.classList.toggle(
      "active",
      active
    );

    menuToggle.setAttribute(
      "aria-expanded",
      String(Boolean(active))
    );

    document.body.classList.toggle(
      "menu-open",
      active
    );

  });

  document.querySelectorAll(".mobile-link").forEach((link) => {

    link.addEventListener(
      "click",
      closeMobileMenu
    );

  });

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMobileMenu();
    }

  });

  window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {
      closeMobileMenu();
    }

  });


  /* =======================================================
     SMOOTH ANCHOR LINKS
     ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

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

      const headerOffset = 80;

      const position =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: position,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     REVEAL ON SCROLL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

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
          rootMargin: "0px 0px -40px 0px"
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
     STAGGER PROJECTS
     ======================================================= */

  document
    .querySelectorAll(".project-card")
    .forEach((card, index) => {

      card.style.transitionDelay =
        `${Math.min(index * 80, 400)}ms`;

    });


  /* =======================================================
     SERVICE STAGGER
     ======================================================= */

  document
    .querySelectorAll(".service-row")
    .forEach((row, index) => {

      row.style.transitionDelay =
        `${Math.min(index * 50, 250)}ms`;

    });


  /* =======================================================
     FAQ
     ======================================================= */

  const faqItems =
    document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {

    const question =
      item.querySelector(".faq-question");

    question?.addEventListener("click", () => {

      const wasActive =
        item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");
      });

      if (!wasActive) {
        item.classList.add("active");
      }

    });

  });


  /* =======================================================
     CONTACT FORM
     ======================================================= */

  const form =
    document.getElementById("contactForm");

  const submitButton =
    document.getElementById("submitButton");

  const formStatus =
    document.getElementById("formStatus");

  form?.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (!submitButton) {
      return;
    }

    submitButton.disabled = true;

    const originalHTML =
      submitButton.innerHTML;

    submitButton.innerHTML =
      "<span>Sending inquiry...</span><span>...</span>";

    if (formStatus) {
      formStatus.textContent = "";
    }

    try {

      const response =
        await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json"
          }
        });

      if (response.ok) {

        form.reset();

        if (formStatus) {
          formStatus.textContent =
            "Thank you. Your inquiry has been sent. We will get back to you shortly.";
        }

        submitButton.innerHTML =
          "<span>Inquiry sent</span><span>✓</span>";

      } else {

        throw new Error("Form submission failed.");

      }

    } catch (error) {

      if (formStatus) {
        formStatus.textContent =
          "Something went wrong. Please email mhgroup4u@gmail.com directly.";
      }

      submitButton.innerHTML =
        originalHTML;

      submitButton.disabled = false;

    }

  });


  /* =======================================================
     CUSTOM CURSOR
     ======================================================= */

  const cursorDot =
    document.querySelector(".cursor-dot");

  const cursorRing =
    document.querySelector(".cursor-ring");

  if (
    cursorDot &&
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

      cursorDot.style.left =
        `${mouseX}px`;

      cursorDot.style.top =
        `${mouseY}px`;

    });

    const animateCursor = () => {

      ringX +=
        (mouseX - ringX) * 0.13;

      ringY +=
        (mouseY - ringY) * 0.13;

      cursorRing.style.left =
        `${ringX}px`;

      cursorRing.style.top =
        `${ringY}px`;

      requestAnimationFrame(animateCursor);

    };

    animateCursor();


    document
      .querySelectorAll("a, button, input, textarea, select")
      .forEach((element) => {

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
     HERO ORBIT PARALLAX
     ======================================================= */

  const orbitOne =
    document.querySelector(".orbit-one");

  const orbitTwo =
    document.querySelector(".orbit-two");

  if (
    orbitOne &&
    orbitTwo &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    window.addEventListener("mousemove", (event) => {

      const x =
        (event.clientX / window.innerWidth - 0.5);

      const y =
        (event.clientY / window.innerHeight - 0.5);

      orbitOne.style.transform =
        `translate(${x * 22}px, ${y * 22}px)`;

      orbitTwo.style.transform =
        `translate(${x * -16}px, ${y * -16}px)`;

    });

  }


  /* =======================================================
     PROJECT MICRO INTERACTION
     ======================================================= */

  document
    .querySelectorAll(".project-card")
    .forEach((card) => {

      const visual =
        card.querySelector(".project-visual");

      if (!visual) {
        return;
      }

      card.addEventListener(
        "mousemove",
        (event) => {

          if (
            !window.matchMedia("(pointer: fine)").matches
          ) {
            return;
          }

          const rect =
            card.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) /
            rect.width -
            0.5;

          const y =
            (event.clientY - rect.top) /
            rect.height -
            0.5;

          visual.style.transform =
            `scale(.985) translate(${x * 4}px, ${y * 4}px)`;

        }
      );

      card.addEventListener(
        "mouseleave",
        () => {
          visual.style.transform = "";
        }
      );

    });

});
