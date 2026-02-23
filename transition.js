// =====================
// Page Transition System
// =====================

const transition = document.querySelector(".page-transition");

// Fade OUT when navigating to experiment
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
      window.location.href = href;
    }
  });
});

// Fade IN on load
window.addEventListener("load", () => {
  if (transition) {
    transition.classList.remove("active");
  }
});

// =====================
// Experiment Close Logic
// =====================

const closeBtn = document.querySelector(".experiment-close");

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    transition.classList.add("active");

    setTimeout(() => {
      window.location.href = "../../index.html";
    }, 280);
  });
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && closeBtn) {
    transition.classList.add("active");

    setTimeout(() => {
      window.location.href = "../../index.html";
    }, 280);
  }
});