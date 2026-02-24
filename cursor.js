const cursorDot = document.querySelector(".cursor-dot");

if (cursorDot && window.matchMedia("(min-width: 769px)").matches) {

  document.addEventListener("mousemove", (e) => {

    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;

    const EDGE = 40;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const distLeft = e.clientX;
    const distRight = vw - e.clientX;
    const distTop = e.clientY;
    const distBottom = vh - e.clientY;

    const minDist = Math.min(distLeft, distRight, distTop, distBottom);

    let opacity = 1;

    if (minDist < EDGE) {
      opacity = minDist / EDGE;
    }

    cursorDot.style.opacity = opacity;
  });

  // General hover effect (links + buttons)
  document.querySelectorAll("a, button:not(.experiment-close)").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.classList.add("cursor-hover");
    });

    el.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("cursor-hover");
    });
  });


  // Expand cursor on experiment items
  document.querySelectorAll(".experiment-item").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.classList.add("cursor-active");
    });

    el.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("cursor-active");
    });
  });

}