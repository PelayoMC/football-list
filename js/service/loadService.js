export async function loadService(url, html) {
  const { URL_SCHEDULE_MIGUIATV } = await import("../../config.js");
  const { loadDataMiGuiaTv } = await import("./miguiatv/loadData.js");
  switch (url) {
    case URL_SCHEDULE_MIGUIATV:
      return loadDataMiGuiaTv(html);
  }
}
