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
overlayBg.addEventListener("click", closeOverlay);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeOverlay();
});

