const cursorDot = document.querySelector(".cursor-dot");

if (cursorDot) {
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;

    const EDGE = 20;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const nearEdge =
      e.clientX < EDGE ||
      e.clientX > vw - EDGE ||
      e.clientY < EDGE ||
      e.clientY > vh - EDGE;

    cursorDot.style.opacity = nearEdge ? "0" : "1";
  });
}

/* Cursor hover logic */
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorDot.classList.add("cursor-hover");
  });

  el.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("cursor-hover");
  });
});

document.querySelectorAll(".experiment-item").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorDot.classList.add("cursor-active");
  });

  el.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("cursor-active");
  });
});

/* Page transition for experiments */
document.querySelectorAll(".experiment-item").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const href = link.getAttribute("href");

    const transition = document.querySelector(".page-transition");

    if (transition) {
      transition.classList.add("active");

      setTimeout(() => {
        window.location.href = href;
      }, 280);
    } else {
      // Fallback: navigate immediately
      window.location.href = href;
    }
  });
});

/* Reveal page transition logic */
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
