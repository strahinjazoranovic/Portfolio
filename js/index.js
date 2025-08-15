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

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

const contactForm = document.getElementById("contact-form");
const overlay = document.getElementById("overlay");
const contactButton = document.querySelector(".contact");
const contactClose = document.getElementById("close-contact");

// Laat de form en overlay zien
contactButton.addEventListener("click", () => {
  contactForm.style.display = "block";
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

// Sluit de form en overlay als je op de sluit knop klikt
contactClose.addEventListener("click", () => {
  contactForm.style.display = "none";
  overlay.classList.remove("active");
  document.body.style.overflow = "";
});

// Sluit de form en overlay als je op de overlay klikt
overlay.addEventListener("click", () => {
  contactForm.style.display = "none";
  overlay.classList.remove("active");
  document.body.style.overflow = "";
});