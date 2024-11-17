export async function openModal() {
  document.getElementById("navigation").style.position = "static";
  document.getElementById("scheduler").style.display = "flex";
}
export async function closeModal() {
  const modal = document.getElementById("scheduler");
  const modalTable = document.getElementById("modal-table");
  document.getElementById("navigation").style.position = "sticky";
  if (modalTable) {
    modalTable.remove();
    modal.style.display = "none";
  }
}
