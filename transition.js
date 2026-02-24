// Click sounds
const clickSound = new Audio(
  document.body.classList.contains("experiment")
    ? "../../sounds/click.mp3"
    : "sounds/click.mp3"
);

clickSound.volume = 0.24;

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

// =====================
// Page Transition System
// =====================

const transition = document.querySelector(".page-transition");

// Fade OUT when navigating from homepage
const experimentLinks = document.querySelectorAll(".experiment-item");

if (experimentLinks.length > 0) {
  experimentLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const href = link.getAttribute("href");

      if (transition) {
        playClick();
        transition.classList.add("active");

        setTimeout(() => {
          window.location.href = href;
        }, 280);
      } else {
        window.location.href = href;
      }
    });
  });
}

// Fade IN on load (all pages)
window.addEventListener("load", () => {
  if (transition) {
    transition.classList.remove("active");
  }
});

// =====================
// Experiment Close Logic
// =====================

const closeBtn = document.querySelector(".experiment-close");

function exitExperiment() {
  if (!transition) {
    window.location.href = "../../index.html";
    return;
  }
  playClick();
  transition.classList.add("active");

  setTimeout(() => {
    window.location.href = "../../index.html";
  }, 280);
}

if (closeBtn) {
  closeBtn.addEventListener("click", exitExperiment);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && closeBtn) {
    exitExperiment();
  }
});