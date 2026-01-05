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

window.addEventListener("mousemove", (e) => {
  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;
  cursorDot.style.opacity = "1";
});

window.addEventListener("mouseleave", () => {
  cursorDot.style.opacity = "0";
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


