export function createTypeElement(attrs) {
  const { type, attributes, inner, onclick } = attrs;
  var element = document.createElement(type);
  if (attributes)
    for (let att of attributes) {
      element.setAttribute(att.key, att.value);
    }
  if (inner) element.innerHTML = inner;
  if (onclick) {
    element.setAttribute("id", `btn-${onclick}`);
    element.addEventListener("click", async () => {
      document.getElementById("navigation").style.display = "none";
      document.getElementById("myModal").style.display = "flex";
    });
  }
  return element;
}

function createBtnElement(attrs) {
  const { parent, text, color, onclick } = attrs;
  var attrArray = [];
  if (color) attrArray.push({ key: "class", value: color });
  parent.appendChild(
    createTypeElement({
      type: "div",
      inner: text,
      attributes: attrArray,
      onclick: onclick,
    })
  );
}

export function createScheduleBtn(parent, text, value) {
  createBtnElement({
    parent: parent,
    color: "bootstrap-btn btn-white",
    text: text,
    onclick: value,
  });
}

function createAElement(attrs) {
  const { parent, text, color, value } = attrs;
  var attrArray = [];
  if (color) attrArray.push({ key: "class", value: color });
  if (value) attrArray.push({ key: "href", value: value });
  parent.appendChild(
    createTypeElement({
      type: "a",
      attributes: attrArray,
      inner: text,
    })
  );
}

export function createBlueBtn(parent, text, value) {
  createAElement({
    parent: parent,
    text: text,
    color: "bootstrap-btn btn-blue",
    value: value,
  });
}

export function createOrangeBtn(parent, text, value) {
  createAElement({
    parent: parent,
    text: text,
    color: "bootstrap-btn btn-orange",
    value: value,
  });
}
