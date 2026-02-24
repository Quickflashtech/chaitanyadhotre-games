const circle = document.querySelector(".weight-circle");
const weightCloseBtn = document.querySelector(".experiment-close");

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

let currentX = targetX;
let currentY = targetY;

const EASING = 0.04;
const EDGE_PADDING = 48;
const AVOID_RADIUS = 110;
const PUSH_STRENGTH = 60;

// Track mouse
window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function animate() {

  let adjustedX = targetX;
  let adjustedY = targetY;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // =====================
  // Edge soft bounds (SAFE CLAMP)
  // =====================
  adjustedX = Math.max(EDGE_PADDING, Math.min(vw - EDGE_PADDING, adjustedX));
  adjustedY = Math.max(EDGE_PADDING, Math.min(vh - EDGE_PADDING, adjustedY));

  // =====================
  // Close button repulsion
  // =====================
  if (weightCloseBtn) {
    const rect = weightCloseBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = adjustedX - cx;
    const dy = adjustedY - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < AVOID_RADIUS && distance > 0.001) {
      const force = (AVOID_RADIUS - distance) / AVOID_RADIUS;

      adjustedX += (dx / distance) * force * PUSH_STRENGTH;
      adjustedY += (dy / distance) * force * PUSH_STRENGTH;
    }
  }

  // =====================
  // Inertia
  // =====================
  currentX += (adjustedX - currentX) * EASING;
  currentY += (adjustedY - currentY) * EASING;

  circle.style.left = `${currentX}px`;
  circle.style.top = `${currentY}px`;

  requestAnimationFrame(animate);
}

animate();