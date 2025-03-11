// Idea for this effect comes from https://www.youtube.com/watch?v=Y6wLZSDJE8E
const allHoverImages = document.querySelectorAll(".small-images img");
const imgContainer = document.querySelector(".big-image");

window.addEventListener("DOMContentLoaded", () => {
  // Ensure there's a default image to show
  if (allHoverImages.length > 0 && imgContainer) {
    imgContainer.src = allHoverImages[3].src; // Set the initial image to the last image
    allHoverImages[0].parentElement.classList.add("active");
  }
});

allHoverImages.forEach((image) => {
  image.addEventListener("mouseover", () => {
    imgContainer.src = image.src; // Update the large image with the small image's src
    resetActiveImg();
    image.parentElement.classList.add("active");
  });
});

function resetActiveImg() {
  allHoverImages.forEach((img) => {
    img.parentElement.classList.remove("active");
  });
}
