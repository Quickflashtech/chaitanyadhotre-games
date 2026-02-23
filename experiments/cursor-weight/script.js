const circle = document.querySelector(".weight-circle");

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

let currentX = targetX;
let currentY = targetY;

const EASING = 0.04;

// Track mouse
window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

// Animation loop
function animate() {

  currentX += (targetX - currentX) * EASING;
  currentY += (targetY - currentY) * EASING;

  circle.style.left = `${currentX}px`;
  circle.style.top = `${currentY}px`;

  requestAnimationFrame(animate);
}

animate();