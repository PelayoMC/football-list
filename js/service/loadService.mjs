export async function loadService(url, html) {
  const { URL_SCHEDULE_MIGUIATV } = await import("../../config.mjs");
  const { loadDataMiGuiaTv } = await import("./miguiatv/loadData.mjs");
  switch (url) {
    case URL_SCHEDULE_MIGUIATV:
      return loadDataMiGuiaTv(html);
  }
}
