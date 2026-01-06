// Homepage logic only (no experiments)

const isMobile = window.matchMedia("(max-width: 768px)").matches;
const cursorDot = document.querySelector(".cursor-dot");
const transition = document.querySelector(".page-transition");

// --------------------
// Cursor logic (simple, consistent)
// --------------------
if (!isMobile && cursorDot) {
  document.addEventListener("mousemove", (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
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
