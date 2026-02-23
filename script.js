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