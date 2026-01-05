// experiments site logic will live here
const experimentBtn = document.querySelector(".experiment-item");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".overlay-close");
const overlayBg = document.querySelector(".overlay-bg");

function openOverlay() {
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeOverlay() {
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

experimentBtn.addEventListener("click", openOverlay);
closeBtn.addEventListener("click", closeOverlay);
overlay.addEventListener("click", closeOverlay);

const overlayContent = document.querySelector(".overlay-content");

overlayContent.addEventListener("click", (e) => {
  e.stopPropagation();
});


window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeOverlay();
});

const cursorDot = document.querySelector(".cursor-dot");
const EDGE = 20;

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  // cursor dot
  cursorDot.style.left = `${x}px`;
  cursorDot.style.top = `${y}px`;

  // weight target
  targetX = x;
  targetY = y;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const EDGE = 20;

  const nearEdge =
    x < EDGE ||
    x > vw - EDGE ||
    y < EDGE ||
    y > vh - EDGE;

  cursorDot.style.opacity = nearEdge ? "0" : "1";
});


const weightCircle = document.querySelector(".circle");

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

let currentX = targetX;
let currentY = targetY;

// How heavy the circle feels (lower = heavier)
const EASING = 0.04;

const hoverTargets = document.querySelectorAll("button");

hoverTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorDot.classList.add("cursor-hover");
  });

  el.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("cursor-hover");
  });
});

function animateWeight() {
  currentX += (targetX - currentX) * EASING;
  currentY += (targetY - currentY) * EASING;

  if (Math.abs(targetX - currentX) < 0.1) currentX = targetX;
  if (Math.abs(targetY - currentY) < 0.1) currentY = targetY;

  weightCircle.style.left = `${currentX}px`;
  weightCircle.style.top = `${currentY}px`;

  requestAnimationFrame(animateWeight);
}

animateWeight();

