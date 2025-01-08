document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  let currentIndex = 0;

  // Update the slider position
  function updateSlider() {
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
  }

  // Navigate to the previous slide
  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  });

  // Navigate to the next slide
  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  });
});
