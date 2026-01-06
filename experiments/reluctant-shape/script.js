const circle = document.querySelector(".reluctant-circle");
const stage = document.querySelector(".reluctant-stage");
const closeBtn = document.querySelector(".overlay-close");

// ---------- Close logic ----------
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

// ---------- State ----------
let stageRect;
let homeX = 0;
let homeY = 0;

let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;

let mouseX = 0;
let mouseY = 0;

const AWARE_RADIUS = 140;
const MAX_PUSH = 32;
const DELAY = 140;
const EASE = 0.08;

let reactTimeout = null;

// ---------- Measure ----------
function measureStage() {
  if (!stage) return;

  stageRect = stage.getBoundingClientRect();

  homeX = stageRect.width / 2;
  homeY = stageRect.height / 2;

  currentX = homeX;
  currentY = homeY;
  targetX = homeX;
  targetY = homeY;

  applyPosition();
}

// ---------- Position ----------
function applyPosition() {
  circle.style.transform =
    `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
}

// ---------- Mouse ----------
stage.addEventListener("mousemove", (e) => {
  mouseX = e.clientX - stageRect.left;
  mouseY = e.clientY - stageRect.top;

  const dx = mouseX - currentX;
  const dy = mouseY - currentY;
  const distance = Math.hypot(dx, dy);

  if (distance < AWARE_RADIUS && !reactTimeout) {
    reactTimeout = setTimeout(() => {
      const strength = (AWARE_RADIUS - distance) / AWARE_RADIUS;
      const push = Math.min(strength * MAX_PUSH, MAX_PUSH);

      const angle = Math.atan2(dy, dx);

      targetX = homeX - Math.cos(angle) * push;
      targetY = homeY - Math.sin(angle) * push;

      reactTimeout = null;
    }, DELAY);
  }
});

// ---------- Leave ----------
stage.addEventListener("mouseleave", () => {
  targetX = homeX;
  targetY = homeY;
});

// ---------- Animate ----------
function animate() {
  currentX += (targetX - currentX) * EASE;
  currentY += (targetY - currentY) * EASE;

  applyPosition();
  requestAnimationFrame(animate);
}

// ---------- Init ----------
measureStage();
animate();

window.addEventListener("resize", measureStage);
