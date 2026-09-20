document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     LOADER
  ===================================================== */

  const loader =
    document.getElementById("loader");

  window.addEventListener("load", () => {

    setTimeout(() => {

      if (loader) {
        loader.classList.add("hidden");
      }

    }, 500);

  });


  /* =====================================================
     YEAR
  ===================================================== */

  const year =
    document.getElementById("year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }


  /* =====================================================
     HEADER
  ===================================================== */

  const header =
    document.getElementById("siteHeader");

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

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


  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const menuToggle =
    document.getElementById("menuToggle");

  const mobileMenu =
    document.getElementById("mobileMenu");


  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          mobileMenu.classList.toggle("open");

        menuToggle.setAttribute(
          "aria-expanded",
          isOpen ? "true" : "false"
        );

        document.body.classList.toggle(
          "menu-open",
          isOpen
        );

      }
    );


    mobileMenu
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            mobileMenu.classList.remove(
              "open"
            );

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

            document.body.classList.remove(
              "menu-open"
            );

          }
        );

      });

  }


  /* =====================================================
     SMOOTH ANCHOR SCROLL
  ===================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

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

          const headerOffset = 75;

          const position =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerOffset;

          window.scrollTo({
            top: position,
            behavior: "smooth"
          });

        }
      );

    });


  /* =====================================================
     THREE.JS
  ===================================================== */

  if (
    typeof THREE === "undefined"
  ) {

    console.warn(
      "Three.js was not loaded."
    );

    return;
  }


  const canvas =
    document.getElementById(
      "webglCanvas"
    );

  if (!canvas) return;


  /* =====================================================
     SCENE
  ===================================================== */

  const scene =
    new THREE.Scene();


  scene.fog =
    new THREE.FogExp2(
      0x090b0f,
      0.075
    );


  /* =====================================================
     CAMERA
  ===================================================== */

  const camera =
    new THREE.PerspectiveCamera(
      42,
      window.innerWidth /
      window.innerHeight,
      0.1,
      100
    );

  camera.position.z = 7;


  /* =====================================================
     RENDERER
  ===================================================== */

  const renderer =
    new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power"
    });


  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      1.5
    )
  );


  renderer.setSize(
    window.innerWidth,
    window.innerHeight,
    false
  );


  renderer.setClearColor(
    0x090b0f,
    0
  );


  /* =====================================================
     MAIN OBJECT
  ===================================================== */

  const object =
    new THREE.Group();

  scene.add(object);


  /* =====================================================
     OUTER WIREFRAME
  ===================================================== */

  const outerGeometry =
    new THREE.IcosahedronGeometry(
      1.65,
      1
    );


  const outerMaterial =
    new THREE.MeshBasicMaterial({
      color: 0x6b96d1,
      wireframe: true,
      transparent: true,
      opacity: 0.13
    });


  const outer =
    new THREE.Mesh(
      outerGeometry,
      outerMaterial
    );

  object.add(outer);


  /* =====================================================
     INNER FORM
  ===================================================== */

  const innerGeometry =
    new THREE.IcosahedronGeometry(
      1.22,
      2
    );


  const innerMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x161b22,
      roughness: 0.92,
      metalness: 0.08,
      transparent: true,
      opacity: 0.78
    });


  const inner =
    new THREE.Mesh(
      innerGeometry,
      innerMaterial
    );

  object.add(inner);


  /* =====================================================
     INNER SOFT WIREFRAME
  ===================================================== */

  const wireGeometry =
    new THREE.IcosahedronGeometry(
      1.25,
      2
    );


  const wireMaterial =
    new THREE.MeshBasicMaterial({
      color: 0xa5b9d1,
      wireframe: true,
      transparent: true,
      opacity: 0.035
    });


  const wire =
    new THREE.Mesh(
      wireGeometry,
      wireMaterial
    );

  object.add(wire);


  /* =====================================================
     RINGS
  ===================================================== */

  const ringGeometry =
    new THREE.TorusGeometry(
      2.05,
      0.012,
      8,
      100
    );


  const ringMaterial =
    new THREE.MeshBasicMaterial({
      color: 0x718fb7,
      transparent: true,
      opacity: 0.12
    });


  const ring =
    new THREE.Mesh(
      ringGeometry,
      ringMaterial
    );

  ring.rotation.x =
    Math.PI * 0.55;

  ring.rotation.y =
    Math.PI * 0.15;

  object.add(ring);


  const ring2Geometry =
    new THREE.TorusGeometry(
      2.35,
      0.007,
      8,
      100
    );


  const ring2Material =
    new THREE.MeshBasicMaterial({
      color: 0xc1ccda,
      transparent: true,
      opacity: 0.045
    });


  const ring2 =
    new THREE.Mesh(
      ring2Geometry,
      ring2Material
    );

  ring2.rotation.x =
    Math.PI * 0.18;

  ring2.rotation.z =
    Math.PI * 0.42;

  object.add(ring2);


  /* =====================================================
     LIGHTING
  ===================================================== */

  const ambient =
    new THREE.AmbientLight(
      0xffffff,
      0.28
    );

  scene.add(ambient);


  const blueLight =
    new THREE.PointLight(
      0x6b96d1,
      0.75,
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
      0xdbe4ef,
      0.28,
      10
    );

  whiteLight.position.set(
    -3,
    -2,
    3
  );

  scene.add(whiteLight);


  /* =====================================================
     PARTICLES
  ===================================================== */

  const particleCount =
    window.innerWidth < 700
      ? 80
      : 150;


  const positions =
    new Float32Array(
      particleCount * 3
    );


  for (
    let i = 0;
    i < particleCount;
    i++
  ) {

    const index =
      i * 3;

    positions[index] =
      (Math.random() - 0.5) * 11;

    positions[index + 1] =
      (Math.random() - 0.5) * 8;

    positions[index + 2] =
      (Math.random() - 0.5) * 8;

  }


  const particleGeometry =
    new THREE.BufferGeometry();


  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      positions,
      3
    )
  );


  const particleMaterial =
    new THREE.PointsMaterial({
      color: 0x91a5be,
      size: 0.015,
      transparent: true,
      opacity: 0.13,
      depthWrite: false
    });


  const particles =
    new THREE.Points(
      particleGeometry,
      particleMaterial
    );

  scene.add(particles);


  /* =====================================================
     MOUSE
  ===================================================== */

  const mouse = {
    x: 0,
    y: 0
  };


  const targetMouse = {
    x: 0,
    y: 0
  };


  window.addEventListener(
    "pointermove",
    event => {

      targetMouse.x =
        (
          event.clientX /
          window.innerWidth -
          0.5
        ) * 0.30;


      targetMouse.y =
        (
          event.clientY /
          window.innerHeight -
          0.5
        ) * 0.20;

    },
    {
      passive: true
    }
  );


  /* =====================================================
     ANIMATION
  ===================================================== */

  let elapsed = 0;


  function animate() {

    elapsed += 0.0015;


    /* Smooth mouse */

    mouse.x +=
      (
        targetMouse.x -
        mouse.x
      ) * 0.012;


    mouse.y +=
      (
        targetMouse.y -
        mouse.y
      ) * 0.012;


    /* Very slow rotation */

    outer.rotation.y += 0.00035;
    outer.rotation.x += 0.00012;

    inner.rotation.y -= 0.00020;
    inner.rotation.x += 0.00008;

    wire.rotation.y -= 0.00022;

    ring.rotation.z += 0.00016;

    ring2.rotation.z -= 0.00010;


    /* Gentle floating */

    object.position.y =
      Math.sin(elapsed * 1.2) *
      0.035;


    /* Gentle mouse influence */

    object.rotation.y +=
      (
        mouse.x * 0.12 -
        object.rotation.y
      ) * 0.006;


    object.rotation.x +=
      (
        -mouse.y * 0.08 -
        object.rotation.x
      ) * 0.006;


    /* Particles */

    particles.rotation.y += 0.000045;


    particles.rotation.x =
      Math.sin(elapsed * .6) *
      0.008;


    renderer.render(
      scene,
      camera
    );

  }


  /*
     Three.js recommends setAnimationLoop()
     for the animation loop.
  */

  renderer.setAnimationLoop(
    animate
  );


  /* =====================================================
     RESIZE
  ===================================================== */

  function resize() {

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
        1.5
      )
    );


    renderer.setSize(
      width,
      height,
      false
    );


    if (width < 700) {

      object.scale.set(
        0.68,
        0.68,
        0.68
      );

    } else {

      object.scale.set(
        1,
        1,
        1
      );

    }

  }


  resize();


  window.addEventListener(
    "resize",
    resize
  );


});
