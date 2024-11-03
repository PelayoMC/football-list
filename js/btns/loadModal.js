function closeModal() {
  const modal = document.getElementById("myModal");
  document.getElementById("navigation").style.position = "sticky";
  document.getElementById("modal-table").remove();
  modal.style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("myModal");
  const closeButton = document.querySelector(".close-button");
  closeButton.addEventListener("click", () => closeModal());
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});
