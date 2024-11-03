document.addEventListener("DOMContentLoaded", function (event) {
  // Get the modal, open button, and close button elements
  const modal = document.getElementById("myModal");
  const closeButton = document.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    document.getElementById("navigation").style.position = "sticky";
    modal.style.display = "none";
  });
  // Hide the modal when clicking outside of the modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      document.getElementById("navigation").style.position = "sticky";
      modal.style.display = "none";
    }
  });
});
