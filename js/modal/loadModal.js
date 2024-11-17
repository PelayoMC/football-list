document.addEventListener("DOMContentLoaded", async function () {
  //MODAL
  const { closeModal } = await import("./modalUtils.js");
  const modal = document.getElementById("scheduler");
  const closeButton = document.querySelector(".close-button");
  //ERROR
  const { closeError } = await import("../error/errorUtils.js");
  const err = document.getElementById("error");
  closeButton.addEventListener("click", () => {
    closeModal();
    closeError();
  });
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
    if (event.target === err) {
      closeError();
    }
  });
});
