const circle = document.querySelector(".reluctant-circle");
const stage = document.querySelector(".reluctant-stage");
const closeBtn = document.querySelector(".overlay-close");
const pageTransition = document.querySelector(".page-transition");

// Fade IN on load
if (pageTransition) {
  pageTransition.classList.add("active");

  requestAnimationFrame(() => {
    pageTransition.classList.remove("active");
  });
}

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
function closeExperiment() {
  removeHint();

  if (!pageTransition) {
    window.history.back();
    return;
  }

  pageTransition.classList.add("active");

  setTimeout(() => {
    window.history.back();
  }, 260);
}

if (closeBtn) {
  closeBtn.addEventListener("click", closeExperiment);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeExperiment();
});

let hintTimeout = null;
let hintEl = null;

function showHint() {
  if (window.matchMedia("(max-width: 768px)").matches) return;

  hintEl = document.createElement("div");
  hintEl.className = "experiment-hint";
  hintEl.textContent = "Move closer. The shape resists.";

  document.body.appendChild(hintEl);

  hintTimeout = setTimeout(() => {
    hintEl.style.opacity = "0";
    setTimeout(() => hintEl.remove(), 600);
  }, 6000);
}

function removeHint() {
  if (hintTimeout) clearTimeout(hintTimeout);
  if (hintEl) hintEl.remove();
}

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
  // ----- shared center reference -----
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  // ----- Cursor repulsion -----
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

  // ----- Idle drift (when cursor influence is weak) -----
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

  // ----- Soft territory (NOT centering) -----
  const dxCenter = x - cx;
  const dyCenter = y - cy;
  const distFromCenter = Math.hypot(dxCenter, dyCenter);

  const TERRITORY_RADIUS = 260;

  if (distFromCenter > TERRITORY_RADIUS) {
    const excess = distFromCenter - TERRITORY_RADIUS;
    const pull = excess * 0.00006;

    vx -= (dxCenter / distFromCenter) * pull;
    vy -= (dyCenter / distFromCenter) * pull;
  }

  // ----- Edge correction -----
  if (x < EDGE_PADDING) vx += (cx - x) * EDGE_FORCE;
  if (x > window.innerWidth - EDGE_PADDING) vx += (cx - x) * EDGE_FORCE;

  if (y < EDGE_PADDING) vy += (cy - y) * EDGE_FORCE;
  if (y > window.innerHeight - EDGE_PADDING) vy += (cy - y) * EDGE_FORCE;

  // ----- Integrate -----
  x += vx;
  y += vy;

  // ----- Friction -----
  vx *= FRICTION;
  vy *= FRICTION;

  // ----- Render -----
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  requestAnimationFrame(animate);
}
showHint();
animate();
