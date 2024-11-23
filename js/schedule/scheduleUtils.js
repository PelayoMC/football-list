export function convertDate(unixDate) {
  var date = new Date(unixDate);
  date.setHours(date.getHours() + 1);
  var isoString = date.toISOString();
  var split = isoString.split("T");
  return split[0] + " " + split[1].split(".")[0];
}

export function initialFilterDate() {
  var date = new Date();
  date.setHours(date.getHours() - 2);
  return date.getTime();
}

export function endingFilterDate() {
  var date = new Date();
  date.setHours(date.getHours() + 20);
  return date.getTime();
}

export function crateElements(elements) {
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
    const splittedDate = element.date.split(" ");
    dataDate.textContent = splittedDate[0] + "\r\n";
    dataDate.textContent += splittedDate[1];
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
