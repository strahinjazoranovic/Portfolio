// Animation handeler for the hidden elements once you scroll
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

// Navbar buttons
const navbarButtonLeft = document.querySelectorAll(".navbarButtonLeft");
const navbarButtonRight = document.querySelectorAll(".navbarButtonRight");

// Sections
const leftSection = document.getElementById("leftSection");
const rightSection = document.getElementById("rightSection");

// Close buttons
const rightCloseButton = document.getElementById("rightCloseButton");
const leftCloseButton = document.getElementById("leftCloseButton");

const frontSection = document.getElementById("frontSection");

// If an user clicks on the navbarButtonRight open rightSection
if (rightSection) {
  navbarButtonRight.forEach((button) => {
    button.addEventListener("click", () => {
      rightSection.classList.add("open");
      history.replaceState(null, "", "#rightSection");
      document.body.style.overflow = "hidden";
    });
  });
}

// If an user clicks on the right close button close the right section
if (rightCloseButton && rightSection) {
  rightCloseButton.addEventListener("click", () => {
    rightSection.classList.remove("open");
    if (window.location.hash === "#rightSection") {
      history.replaceState(null, "", window.location.pathname);
    }
    document.body.style.overflow = "auto";
  });
}

// If an user clicks on the navbarButtonLeft open LeftSection
if (leftSection) {
  navbarButtonLeft.forEach((button) => {
    button.addEventListener("click", () => {
      leftSection.classList.add("open");
      history.replaceState(null, "", "#leftSection");
      document.body.style.overflow = "hidden";
    });
  });
}

// If an user clicks on the right close button close the right section
if (leftCloseButton && leftSection) {
  leftCloseButton.addEventListener("click", () => {
    leftSection.classList.remove("open");
    if (window.location.hash === "#leftSection") {
      history.replaceState(null, "", window.location.pathname);
    }
    document.body.style.overflow = "auto";
  });
}

const rightDot = document.getElementById("rightDot");
const leftDot = document.getElementById("leftDot");
const dots = document.getElementById("dots");

const carouselTrack = document.querySelector(".carouselTrack");
const slides = document.querySelectorAll(".carouselTrack .carouselSlide");

// Set the currentIndex to start at 0
let currentIndex = 0;

// For going to an new slide
function goToSlide(index) {
  if (slides.length === 0) return;
  currentIndex = (index + slides.length) % slides.length;
  updateCarousel();
}

// Update carousel
function updateCarousel() {
  if (!carouselTrack || slides.length === 0) return;

  carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  slides.forEach((slide, index) => {
    const isActive = index === currentIndex;
    slide.setAttribute("aria-hidden", String(!isActive));
    slide.querySelectorAll("a, button").forEach((el) => {
      el.tabIndex = isActive ? 0 : -1;
    });
  });

  updateDots();
}

function updateDots() {
  if (!dots) return;

  dots.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "carouselDot";
    dot.setAttribute("aria-label", `Go to project ${index + 1}`);
    dot.setAttribute("aria-current", String(index === currentIndex));

    if (index === currentIndex) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => goToSlide(index));

    dots.appendChild(dot);
  });
}

// Eventlisteners on the dots so they can call goToSlide with currentIndex +1 or -1
rightDot?.addEventListener("click", () => goToSlide(currentIndex + 1));
leftDot?.addEventListener("click", () => goToSlide(currentIndex - 1));

// Keyboard navigation while the projects panel is open
document.addEventListener("keydown", (e) => {
  // Check if the rightSection is open and if it is not return
  if (!rightSection?.classList.contains("open")) return;

  // If an user presses arrowRight/Left call the goToSlide with currentIndex +1 or -1
  if (e.key === "ArrowRight") goToSlide(currentIndex + 1);
  if (e.key === "ArrowLeft") goToSlide(currentIndex - 1);
});

// Touch swipe support
let touchStartX = null;

carouselTrack?.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches[0].clientX;
  },
  { passive: true },
);

carouselTrack?.addEventListener(
  "touchend",
  (e) => {
    if (touchStartX === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const SWIPE_THRESHOLD = 40;

    if (deltaX > SWIPE_THRESHOLD) goToSlide(currentIndex - 1);
    else if (deltaX < -SWIPE_THRESHOLD) goToSlide(currentIndex + 1);

    touchStartX = null;
  },
  { passive: true },
);

updateCarousel();
