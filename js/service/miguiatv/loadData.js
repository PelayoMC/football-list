export async function loadDataMiGuiaTv(html) {
  const { convertDate, initialFilterDate, endingFilterDate } = await import("../../schedule/scheduleUtils.js");
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const data = Array.from(doc.querySelectorAll(".media-body"))
    .map((el) => {
      const children = el.children;
      const hour = parseInt(children[0].children[1].children[1].getAttribute("data-unixtime")) * 1000;
      const eventTitle = children[1].innerText;
      const eventSubtitle = children[2].innerHTML;
      const length = parseInt(children[0].children[2].children[0].innerText.split(" ")[1]);
      return {
        ms: hour,
        date: `${convertDate(hour)}`,
        event: `${eventTitle}`,
        subtitle: `(${length}min) ${eventSubtitle}`,
        length: length,
      };
    })
    .filter((el) => el.ms > initialFilterDate())
    .filter((el) => el.ms < endingFilterDate());
  return data;
}
