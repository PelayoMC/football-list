export async function openModal() {
  document.getElementById("navigation").style.position = "static";
  document.getElementById("myModal").style.display = "flex";
}
export async function closeModal() {
  const modal = document.getElementById("myModal");
  document.getElementById("navigation").style.position = "sticky";
  document.getElementById("modal-table").remove();
  modal.style.display = "none";
}
