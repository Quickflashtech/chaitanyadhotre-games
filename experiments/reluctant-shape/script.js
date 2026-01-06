const circle = document.querySelector(".reluctant-circle");
const stage = document.querySelector(".reluctant-stage");
const closeBtn = document.querySelector(".overlay-close");

// ---- constants ----
const IDLE_FORCE = 0.006;
const IDLE_SPEED = 0.0008;
const FRICTION = 0.965;

const REPULSE_RADIUS = 160;
const REPULSE_STRENGTH = 0.35;

const EDGE_PADDING = 120;
const EDGE_FORCE = 0.006;

// ---- state ----
let idleTime = Math.random() * 1000;

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

let vx = 0;
let vy = 0;

let mouseX = null;
let mouseY = null;

// ---- close logic ----
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    window.history.back();
  });
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    window.history.back();
  }
});

// ---- mouse tracking ----
if (stage) {
  stage.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  stage.addEventListener("mouseleave", () => {
    mouseX = null;
    mouseY = null;
  });
}

// ---- animation ----
function animate() {
  // Cursor repulsion
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

  // Idle drift (when cursor influence is weak)
  let idleAllowed = true;

  if (mouseX !== null) {
    const dx = x - mouseX;
    const dy = y - mouseY;
    const dist = Math.hypot(dx, dy);

    if (dist < REPULSE_RADIUS * 1.2) {
      idleAllowed = false;
    }
  }

  if (idleAllowed) {
    idleTime += IDLE_SPEED;

    const idleMod =
      0.6 + Math.sin(idleTime * 0.15) * 0.4;

    vx += Math.sin(idleTime * 1.3) * IDLE_FORCE * idleMod;
    vy += Math.cos(idleTime * 1.1) * IDLE_FORCE * idleMod;
  }

  // Gentle center bias
  vx += (window.innerWidth / 2 - x) * 0.00002;
  vy += (window.innerHeight / 2 - y) * 0.00002;

  // Edge correction
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  if (x < EDGE_PADDING) vx += (cx - x) * EDGE_FORCE;
  if (x > window.innerWidth - EDGE_PADDING) vx += (cx - x) * EDGE_FORCE;

  if (y < EDGE_PADDING) vy += (cy - y) * EDGE_FORCE;
  if (y > window.innerHeight - EDGE_PADDING) vy += (cy - y) * EDGE_FORCE;

  // Integrate
  x += vx;
  y += vy;

  // Friction
  vx *= FRICTION;
  vy *= FRICTION;

  // Render
  circle.style.transform =
    `translate(${x}px, ${y}px) translate(-50%, -50%)`;

  requestAnimationFrame(animate);
}
animate();
