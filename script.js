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

const EDGE_X = 20;
const EDGE_Y = 10;

window.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  cursorDot.style.left = `${x}px`;
  cursorDot.style.top = `${y}px`;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const nearEdge =
    x < EDGE_X ||
    x > vw - EDGE_X ||
    y < EDGE_Y ||
    y > vh - EDGE_Y;

  cursorDot.style.opacity = nearEdge ? "0" : "1";
});

const hoverTargets = document.querySelectorAll("button");

hoverTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorDot.classList.add("cursor-hover");
  });

  el.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("cursor-hover");
  });
});


