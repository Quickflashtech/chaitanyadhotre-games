(() => {

  const circle = document.querySelector(".reluctant-circle");
  const hint = document.querySelector(".experiment-hint");

  if (hint) {
    setTimeout(() => {
      hint.style.opacity = "0";

      setTimeout(() => {
        hint.remove();
      }, 600);
    }, 5000);
  }

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  let vx = 0;
  let vy = 0;

  let mouseX = null;
  let mouseY = null;

  const REPULSE_RADIUS = 160;
  const REPULSE_STRENGTH = 0.35;
  const FRICTION = 0.965;
  const EDGE_PADDING = 64;

  let idleTime = Math.random() * 1000;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Repulsion
    if (mouseX !== null) {
      const dx = x - mouseX;
      const dy = y - mouseY;
      const dist = Math.hypot(dx, dy);

      if (dist < REPULSE_RADIUS && dist > 0.001) {
        const force = (REPULSE_RADIUS - dist) / REPULSE_RADIUS;
        vx += (dx / dist) * force * REPULSE_STRENGTH;
        vy += (dy / dist) * force * REPULSE_STRENGTH;
      }
    }

    // Idle drift
    idleTime += 0.0008;
    vx += Math.sin(idleTime * 1.3) * 0.006;
    vy += Math.cos(idleTime * 1.1) * 0.006;

    // Edge containment
    if (x < EDGE_PADDING) vx += 0.2;
    if (x > vw - EDGE_PADDING) vx -= 0.2;
    if (y < EDGE_PADDING) vy += 0.2;
    if (y > vh - EDGE_PADDING) vy -= 0.2;

    x += vx;
    y += vy;

    vx *= FRICTION;
    vy *= FRICTION;

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    requestAnimationFrame(animate);
  }

  animate();

})();