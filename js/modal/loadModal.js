document.addEventListener("DOMContentLoaded", async function () {
  const { closeModal } = await import("./modalActions.mjs");
  const modal = document.getElementById("myModal");
  const closeButton = document.querySelector(".close-button");
  closeButton.addEventListener("click", () => closeModal());
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});
