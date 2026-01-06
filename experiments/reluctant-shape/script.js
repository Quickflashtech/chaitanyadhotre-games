const circle = document.querySelector(".reluctant-circle");
const stage = document.querySelector(".reluctant-stage");
const IDLE_FORCE = 0.006;
const IDLE_SPEED = 0.0008;
const FRICTION = 0.965;

let idleTime = Math.random() * 1000;
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

let vx = 0;
let vy = 0;

const REPULSE_RADIUS = 160;
const REPULSE_STRENGTH = 0.35;

const EDGE_PADDING = 120;
const EDGE_FORCE = 0.006;

const FRICTION = 0.92;

let mouseX = null;
let mouseY = null;

// Track mouse
stage.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

stage.addEventListener("mouseleave", () => {
  mouseX = null;
  mouseY = null;
});

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

  // Idle drift (only when no mouse)
  if (mouseX === null) {
    idleTime += IDLE_SPEED;
    vx += Math.sin(idleTime * 1.3) * IDLE_FORCE;
    vy += Math.cos(idleTime * 1.1) * IDLE_FORCE;
  }

  // Edge correction (push back toward center)
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  if (x < EDGE_PADDING) vx += (cx - x) * EDGE_FORCE;
  if (x > window.innerWidth - EDGE_PADDING) vx += (cx - x) * EDGE_FORCE;

  if (y < EDGE_PADDING) vy += (cy - y) * EDGE_FORCE;
  if (y > window.innerHeight - EDGE_PADDING) vy += (cy - y) * EDGE_FORCE;

  // Apply velocity
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
