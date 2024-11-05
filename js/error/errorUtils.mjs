export async function openError(txt) {
  document.getElementById("error").style.display = "flex";
  document.getElementById("error-msg").innerText = txt;
}
export async function closeError() {
  document.getElementById("error").style.display = "none";
  document.getElementById("error-msg").innerText = null;
}
