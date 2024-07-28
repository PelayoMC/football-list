// import data from "../data.json" assert { type: "json" };
const fetchJSON = (...args) => {
  return fetch(...args).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      throw new Error(text);
    });
  });
};
function createTypeElement(type, attributes, inner) {
  var element = document.createElement(type);
  if (attributes)
    for (let att of attributes) {
      element.setAttribute(att.key, att.value);
    }
  if (inner) element.innerHTML = inner;
  return element;
}
function loadItems(divName, items) {
  const div = document.querySelector(`#${divName}`);
  for (let value of items) {
    div.appendChild(createTypeElement("h3", [{ key: "class", value: "h3-title" }], value["name"]));
    var diiv = createTypeElement("div", [{ key: "class", value: "btn-list" }]);
    div.appendChild(diiv);
    for (let i = 0; i < value[1080].length; i++) {
      var button = createTypeElement(
        "a",
        [
          { key: "class", value: "bootstrap-btn btn-blue" },
          { key: "href", value: value[1080][i] },
        ],
        `1080`
      );
      diiv.appendChild(button);
    }
    if (value[720])
      for (let j = 0; j < value[720].length; j++) {
        var button = createTypeElement(
          "a",
          [
            { key: "class", value: "bootstrap-btn btn-orange" },
            { key: "href", value: value[720][j] },
          ],
          `720`
        );
        diiv.appendChild(button);
      }
  }
}
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    loadItems("football-data", data.liga);
    loadItems("champions-data", data.champions);
    loadItems("f1-data", data.f1);
    loadItems("sports-data", data.sports);
  })
  .catch((error) => console.log(error));
// loadItems("football-data", footballChannels);
