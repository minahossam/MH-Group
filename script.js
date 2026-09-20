/* =========================================================
   MH GROUP — V5
   WebGL Hero + Site Interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     YEAR
     ======================================================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =======================================================
     LOADER
     ======================================================= */

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {

    setTimeout(() => {

      if (loader) {
        loader.classList.add("is-hidden");
      }

    }, 900);

  });


  /* =======================================================
     HEADER
     ======================================================= */

  const header =
    document.getElementById("siteHeader");

  const updateHeader = () => {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const menuToggle =
    document.getElementById("menuToggle");

  const mobileMenu =
    document.getElementById("mobileMenu");


  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        mobileMenu.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

    });


    mobileMenu
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener("click", () => {

          mobileMenu.classList.remove("open");

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          menuToggle.setAttribute(
            "aria-label",
            "Open menu"
          );

        });

      });

  }


  /* =======================================================
     SMOOTH SCROLL
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

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
          header
            ? header.offsetHeight
            : 0;

        const position =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: position,
          behavior: "smooth"
        });

      });

    });


  /* =======================================================
     WEBGL HERO
     ======================================================= */

  const canvas =
    document.getElementById("webglCanvas");


  /*
   * If Three.js failed to load,
   * keep the website functional.
   */

  if (
    canvas &&
    typeof THREE !== "undefined"
  ) {

    createWebGLHero(canvas);

  }


  /* =======================================================
     CONTACT BUTTON
     ======================================================= */

  const contactButton =
    document.querySelector(".contact-button");


  if (
    contactButton &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    contactButton.addEventListener(
      "mousemove",
      event => {

        const rect =
          contactButton.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        const rotateX =
          (y / rect.height) * -8;

        const rotateY =
          (x / rect.width) * 8;

        contactButton.style.transform =
          `perspective(500px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           scale(1.05)`;

      }
    );


    contactButton.addEventListener(
      "mouseleave",
      () => {

        contactButton.style.transform =
          "perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)";

      }
    );

  }

});


/* =========================================================
   WEBGL HERO FUNCTION
   ========================================================= */

function createWebGLHero(canvas) {

  /*
   * -------------------------------------------------------
   * SCENE
   * -------------------------------------------------------
   */

  const scene =
    new THREE.Scene();


  /*
   * -------------------------------------------------------
   * CAMERA
   * -------------------------------------------------------
   */

  const camera =
    new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

  camera.position.z = 7;


  /*
   * -------------------------------------------------------
   * RENDERER
   * -------------------------------------------------------
   */

  const renderer =
    new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });


  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.8)
  );

  renderer.setSize(
    window.innerWidth,
    window.innerHeight,
    false
  );

  renderer.setClearColor(
    0x000000,
    0
  );


  /*
   * -------------------------------------------------------
   * MAIN DIGITAL OBJECT
   * -------------------------------------------------------
   *
   * A layered geometric form rather than a literal logo.
   * This keeps the visual premium and abstract.
   */

  const objectGroup =
    new THREE.Group();

  scene.add(objectGroup);


  /*
   * Outer wireframe sphere
   */

  const outerGeometry =
    new THREE.IcosahedronGeometry(
      2.05,
      2
    );


  const outerMaterial =
    new THREE.MeshBasicMaterial({
      color: 0x315cff,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });


  const outer =
    new THREE.Mesh(
      outerGeometry,
      outerMaterial
    );

  objectGroup.add(outer);


  /*
   * Inner dark object
   */

  const innerGeometry =
    new THREE.IcosahedronGeometry(
      1.55,
      3
    );


  const innerMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x101217,
      metalness: 0.88,
      roughness: 0.22,
      transparent: true,
      opacity: 0.96
    });


  const inner =
    new THREE.Mesh(
      innerGeometry,
      innerMaterial
    );

  objectGroup.add(inner);


  /*
   * Inner wire structure
   */

  const innerWireGeometry =
    new THREE.IcosahedronGeometry(
      1.68,
      2
    );


  const innerWireMaterial =
    new THREE.MeshBasicMaterial({
      color: 0x6f8cff,
      wireframe: true,
      transparent: true,
      opacity: 0.13
    });


  const innerWire =
    new THREE.Mesh(
      innerWireGeometry,
      innerWireMaterial
    );

  objectGroup.add(innerWire);


  /*
   * Blue energy ring
   */

  const ringGeometry =
    new THREE.TorusGeometry(
      2.35,
      0.018,
      16,
      160
    );


  const ringMaterial =
    new THREE.MeshBasicMaterial({
      color: 0x315cff,
      transparent: true,
      opacity: 0.7
    });


  const ring =
    new THREE.Mesh(
      ringGeometry,
      ringMaterial
    );


  ring.rotation.x =
    Math.PI * 0.45;

  ring.rotation.y =
    Math.PI * 0.18;

  objectGroup.add(ring);


  /*
   * Second ring
   */

  const ringTwoGeometry =
    new THREE.TorusGeometry(
      2.7,
      0.009,
      12,
      160
    );


  const ringTwoMaterial =
    new THREE.MeshBasicMaterial({
      color: 0xf3f2ee,
      transparent: true,
      opacity: 0.18
    });


  const ringTwo =
    new THREE.Mesh(
      ringTwoGeometry,
      ringTwoMaterial
    );


  ringTwo.rotation.x =
    Math.PI * 0.25;

  ringTwo.rotation.z =
    Math.PI * 0.2;

  objectGroup.add(ringTwo);


  /*
   * -------------------------------------------------------
   * PARTICLE FIELD
   * -------------------------------------------------------
   */

  const particleCount =
    window.innerWidth < 700
      ? 450
      : 900;


  const particlePositions =
    new Float32Array(
      particleCount * 3
    );


  for (
    let i = 0;
    i < particleCount;
    i++
  ) {

    const radius =
      4.2 + Math.random() * 5.5;

    const angle =
      Math.random() * Math.PI * 2;

    const height =
      (Math.random() - 0.5) * 7;


    particlePositions[i * 3] =
      Math.cos(angle) *
      radius;

    particlePositions[i * 3 + 1] =
      height;

    particlePositions[i * 3 + 2] =
      Math.sin(angle) *
      radius;

  }


  const particlesGeometry =
    new THREE.BufferGeometry();


  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      particlePositions,
      3
    )
  );


  const particlesMaterial =
    new THREE.PointsMaterial({
      color: 0x315cff,
      size:
        window.innerWidth < 700
          ? 0.018
          : 0.025,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    });


  const particles =
    new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );


  scene.add(particles);


  /*
   * -------------------------------------------------------
   * LIGHTING
   * -------------------------------------------------------
   */

  const ambientLight =
    new THREE.AmbientLight(
      0xffffff,
      0.7
    );

  scene.add(ambientLight);


  const blueLight =
    new THREE.PointLight(
      0x315cff,
      7,
      12
    );

  blueLight.position.set(
    3,
    2,
    4
  );

  scene.add(blueLight);


  const whiteLight =
    new THREE.PointLight(
      0xffffff,
      2.2,
      10
    );

  whiteLight.position.set(
    -3,
    2,
    3
  );

  scene.add(whiteLight);


  /*
   * -------------------------------------------------------
   * MOUSE
   * -------------------------------------------------------
   */

  let mouseX = 0;
  let mouseY = 0;

  let targetMouseX = 0;
  let targetMouseY = 0;


  const isTouch =
    window.matchMedia(
      "(pointer: coarse)"
    ).matches;


  if (!isTouch) {

    window.addEventListener(
      "mousemove",
      event => {

        targetMouseX =
          (event.clientX /
            window.innerWidth -
            0.5) * 2;

        targetMouseY =
          (event.clientY /
            window.innerHeight -
            0.5) * 2;

      },
      { passive: true }
    );

  }


  /*
   * -------------------------------------------------------
   * ANIMATION
   * -------------------------------------------------------
   */

  let time = 0;


  renderer.setAnimationLoop(
    () => {

      time += 0.006;


      /*
       * Smooth mouse
       */

      mouseX +=
        (targetMouseX - mouseX) *
        0.035;

      mouseY +=
        (targetMouseY - mouseY) *
        0.035;


      /*
       * Main object
       */

      objectGroup.rotation.y =
        time * 0.32 +
        mouseX * 0.28;

      objectGroup.rotation.x =
        Math.sin(time * 0.7) * 0.08 -
        mouseY * 0.16;


      objectGroup.position.x =
        mouseX * 0.32;

      objectGroup.position.y =
        -mouseY * 0.2;


      /*
       * Individual rings
       */

      ring.rotation.z =
        time * 0.7;

      ringTwo.rotation.y =
        time * 0.4;


      /*
       * Particle movement
       */

      particles.rotation.y =
        time * 0.025;

      particles.rotation.x =
        mouseY * 0.025;


      /*
       * Very subtle light movement
       */

      blueLight.position.x =
        3 +
        Math.sin(time) * 1.2;

      blueLight.position.y =
        2 +
        Math.cos(time * 0.7) * 0.8;


      /*
       * Render
       */

      renderer.render(
        scene,
        camera
      );

    }
  );


  /*
   * -------------------------------------------------------
   * RESIZE
   * -------------------------------------------------------
   */

  const resize =
    () => {

      const width =
        window.innerWidth;

      const height =
        window.innerHeight;


      camera.aspect =
        width / height;

      camera.updateProjectionMatrix();


      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          1.8
        )
      );


      renderer.setSize(
        width,
        height,
        false
      );


      /*
       * Move object slightly on mobile
       */

      if (width < 700) {

        objectGroup.scale.set(
          0.72,
          0.72,
          0.72
        );

        objectGroup.position.x =
          0.65;

      } else {

        objectGroup.scale.set(
          1,
          1,
          1
        );

      }

    };


  window.addEventListener(
    "resize",
    resize,
    { passive: true }
  );


  resize();

}
