export async function obtainSchedule(extension) {
  const { openModal, closeModal } = await import("../modal/modalUtils.mjs");
  const { openLoader, closeLoader } = await import("../loader/loaderUtils.mjs");
  const { openError } = await import("../error/errorUtils.mjs");
  const { crateElements } = await import("./scheduleUtils.mjs");
  const { loadService } = await import("../service/loadService.mjs");
  openLoader();
  const { URL_SCHEDULE, PROXY_SCHEDULE } = await import("../../config.mjs");
  fetch(PROXY_SCHEDULE + URL_SCHEDULE + extension)
    .then((response) => response.text())
    .then((html) => {
      return loadService(URL_SCHEDULE, html);
    })
    .then((data) => {
      closeLoader();
      if (data.length === 0) throw new Error("Sin datos que cargar");
      else crateElements(data);
    })
    .then(openModal)
    .catch((error) => {
      closeModal();
      console.error("Error:", error);
      openError(error.message);
    });
}
