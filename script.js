// Homepage logic only (no experiments)

const isMobile = window.matchMedia("(max-width: 768px)").matches;
const cursorDot = document.querySelector(".cursor-dot");
const transition = document.querySelector(".page-transition");


// --------------------
// Cursor logic (simple, consistent)
// --------------------
if (!isMobile && cursorDot) {
  const EDGE = 20;
document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  cursorDot.style.left = `${x}px`;
  cursorDot.style.top = `${y}px`;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const nearEdge =
    x < EDGE ||
    x > vw - EDGE ||
    y < EDGE ||
    y > vh - EDGE;

  cursorDot.style.opacity = nearEdge ? "0" : "1";
});


  // Hover states
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.classList.add("cursor-hover");
    });

    el.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("cursor-hover");
    });
  });
}

// Expand cursor on experiment items
document.querySelectorAll(".experiment-item").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorDot.classList.add("cursor-active");
  });

  el.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("cursor-active");
  });
});


// --------------------
// Page transition for experiments
// --------------------
document.querySelectorAll(".experiment-item").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const href = link.getAttribute("href");

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
