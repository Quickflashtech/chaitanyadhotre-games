const circle = document.querySelector(".reluctant-circle");
const stage = document.querySelector(".reluctant-stage");

let mouseX = homeX;
let mouseY = homeY;

let stageRect;
let homeX, homeY;
let currentX, currentY;
let targetX, targetY;

function measureStage() {
  stageRect = stage.getBoundingClientRect();
  homeX = stageRect.width / 2;
  homeY = stageRect.height / 2;

  currentX = homeX;
  currentY = homeY;
  targetX = homeX;
  targetY = homeY;
}

const AWARE_RADIUS = 140;
const MAX_PUSH = 32;
const DELAY = 140;
const EASE = 0.08;

let reactTimeout = null;

// position helper
function applyPosition() {
  circle.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
}

// mouse tracking
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


// return home when leaving
stage.addEventListener("mouseleave", () => {
  targetX = homeX;
  targetY = homeY;
});

// animation loop
function animate() {
  currentX += (targetX - currentX) * EASE;
  currentY += (targetY - currentY) * EASE;

  applyPosition();
  requestAnimationFrame(animate);
}

measureStage();

animate();

// handle resize
window.addEventListener("resize", measureStage);
  stageRect = stage.getBoundingClientRect();
  homeX = stageRect.width / 2;
  homeY = stageRect.height / 2;
});
