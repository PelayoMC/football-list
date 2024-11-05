export async function obtainSchedule(extension) {
  const { openModal, closeModal } = await import("../modal/modalActions.mjs");
  const { convertDate, initialFilterDate, endingFilterDate, crateElements } = await import("./loadUtils.mjs");
  fetch("config.json")
    .then((res) => res.json())
    .then((conf) => {
      const { URL_SCHEDULE, PROXY_SCHEDULE } = conf;
      fetch(PROXY_SCHEDULE + URL_SCHEDULE + extension)
        .then((response) => response.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const data = Array.from(doc.querySelectorAll(".media-body"))
            .map((el) => {
              const children = el.children;
              const hour = parseInt(children[0].children[1].children[1].getAttribute("data-unixtime")) * 1000;
              const eventTitle = children[1].innerText;
              const eventSubtitle = children[2].innerHTML;
              const length = parseInt(children[0].children[2].children[0].innerText.split(" ")[1]);
              console.log(eventSubtitle);

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
          if (data.length === 0) throw new Error("Sin datos que cargar");
          crateElements(data);
        })
        .then(() => {
          openModal();
        })
        .catch((error) => {
          closeModal();
          console.error("Error:", error);
          alert(error.message);
        });
    });
}
