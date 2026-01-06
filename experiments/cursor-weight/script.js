const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".overlay-close");
const overlayBg = document.querySelector(".overlay-bg");
const closeButton = document.querySelector(".overlay-close");
const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {
  document.body.style.cursor = "auto";
}

// Mobile hint
let hintTimeout = null;
let hintElement = null;
let idleTime = 0;

// Overlay hint
function showExperimentHint() { ... }
function removeExperimentHint() { ... }

//Overlay open and close logic
function openOverlay() {
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  showExperimentHint();
}

function closeOverlay() {
  overlay.classList.remove("active");
  document.body.style.overflow = "";
  removeExperimentHint();
}

//Overlay close handling
closeBtn.addEventListener("click", closeOverlay);
overlay.addEventListener("click", closeOverlay);

const overlayContent = document.querySelector(".overlay-content");
overlayContent.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeOverlay();
  removeExperimentHint();
});

// Cursor dot logic
const cursorDot = document.querySelector(".cursor-dot");
const EDGE = 20;

if (!isMobile) {
  document.addEventListener("mousemove", (e) => {
    ...
  });
}

// Weight physics
const weightCircle = document.querySelector(".circle");

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

let currentX = targetX;
let currentY = targetY;

const EASING = 0.04;

let currentScale = 1;
const BASE_SCALE = 1;
const MIN_SCALE = 0.92;
const SCALE_EASING = 0.12;

function animateWeight() { ... }

animateWeight();

// Button hover logic
const hoverTargets = document.querySelectorAll("button");

hoverTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorDot.classList.add("cursor-hover");
  });

  el.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("cursor-hover");
  });
});

openOverlay();
