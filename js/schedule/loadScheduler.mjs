function convertDate(unixDate) {
  var date = new Date(unixDate);
  date.setHours(date.getHours() + 1);
  var isoString = date.toISOString();
  var split = isoString.split("T");
  return split[0] + " " + split[1].split(".")[0];
}

function initialFilterDate() {
  var date = new Date();
  date.setHours(date.getHours() - 2);
  return date.getTime();
}

function endingFilterDate() {
  var date = new Date();
  date.setHours(date.getHours() + 20);
  console.log(date.getTime());

  return date.getTime();
}

function crateElements(elements) {
  let countMark = 1;
  const table = document.createElement("table");
  table.setAttribute("id", "modal-table");
  const newHeaders = document.createElement("tr");
  const titleDate = document.createElement("th");
  titleDate.textContent = "FECHA";
  const titleEvent = document.createElement("th");
  titleEvent.textContent = "EVENTO";
  newHeaders.appendChild(titleDate);
  newHeaders.appendChild(titleEvent);
  table.appendChild(newHeaders);
  for (let i = 0; i < elements.length; i++) {
    const newRow = document.createElement("tr");
    const element = elements[i];
    const dataDate = document.createElement("td");
    dataDate.textContent = element.date;
    dataDate.className = "event-date";
    newRow.appendChild(dataDate);
    const tdEvent = document.createElement("td");
    const dataEvent = document.createElement("div");
    const dataSubevent = document.createElement("div");
    dataEvent.textContent = element.event;
    dataEvent.className = "event-title";
    dataSubevent.textContent = element.subtitle;
    tdEvent.appendChild(dataEvent);
    tdEvent.appendChild(dataSubevent);
    newRow.appendChild(tdEvent);
    if (countMark > 0 && element.ms > initialFilterDate()) {
      newRow.className = "actual-event";
      countMark--;
    }
    table.appendChild(newRow);
  }
  document.getElementById("modal-data").appendChild(table);
}

const url = "https://miguia.tv/v/";
const proxy = "https://corsproxy.io/?";
export async function obtainSchedule(extension) {
  const { openModal, closeModal } = await import("../modal/modalActions.mjs");
  fetch(proxy + url + extension)
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
      if (data.length === 0) throw new Error("Error cargando datos");
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
}
