function convertDate(unixDate) {
  var date = new Date(unixDate * 1000);
  date.setHours(date.getHours() + 1);
  var isoString = date.toISOString();
  var split = isoString.split("T");
  return split[0] + " " + split[1].split(".")[0];
}

function crateElements(elements) {
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
    newRow.appendChild(dataDate);
    const dataEvent = document.createElement("td");
    dataEvent.textContent = element.event;
    newRow.appendChild(dataEvent);
    table.appendChild(newRow);
  }
  document.getElementById("modal-data").appendChild(table);
}

const url = "https://miguia.tv/v/";
const proxy = "https://corsproxy.io/?";
export function obtainSchedule(extension) {
  fetch(proxy + url + extension)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const data = Array.from(doc.querySelectorAll(".media-body"))
        .slice(0, 60)
        .map((el) => {
          const children = el.children;
          const hour = children[0].children[1].children[1].getAttribute("data-unixtime");
          const event = children[2].innerHTML;
          const length = parseInt(children[0].children[2].children[0].innerText.split(" ")[1]);
          return {
            date: `${convertDate(hour)}`,
            event: `(${length}min) ${event}`,
            length: length,
          };
        })
        .filter((el) => el.length > 50);
      if (data.length === 0) alert("Error cargando datos");
      crateElements(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error cargando datos");
    });
}
