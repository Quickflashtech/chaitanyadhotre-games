const cursorDot = document.querySelector(".cursor-dot");

if (cursorDot && window.matchMedia("(min-width: 769px)").matches) {
  document.addEventListener("mousemove", (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;

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
