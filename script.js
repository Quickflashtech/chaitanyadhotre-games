// Page reveal animation

function revealPage() {
  const content = document.querySelector(".page-content");

  if (content) {
    requestAnimationFrame(() => {
      content.classList.add("is-visible");
    });
  }
}

window.addEventListener("load", revealPage);
window.addEventListener("pageshow", revealPage);


// Disable right-click globally
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});


// Disable common developer shortcuts
document.addEventListener("keydown", (e) => {

  // F12
  if (e.key === "F12") {
    e.preventDefault();
  }

  // Ctrl+Shift+I or Ctrl+Shift+J
  if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) {
    e.preventDefault();
  }

  // Ctrl+U
  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
  }

});