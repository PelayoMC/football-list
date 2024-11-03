async function loadItems(divName, items) {
  const { createTypeElement, createScheduleBtn, createBlueBtn, createOrangeBtn } = await import("./createBtns.js");
  const div = document.querySelector(`#${divName}`);
  for (let i = 0; i < items.length; i++) {
    var value = items[i];
    div.appendChild(
      createTypeElement({
        type: "h3",
        attributes: [{ key: "class", value: "h3-title" }],
        inner: value["name"],
      })
    );
    var diiv = createTypeElement({
      type: "div",
      attributes: [{ key: "class", value: "btn-list" }],
    });
    div.appendChild(diiv);
    // SCHEDULE
    createScheduleBtn(diiv, "🕒", `${i + 1}`);
    for (let i = 0; i < value[1080].length; i++) {
      // 1080p
      createBlueBtn(diiv, "1080p", value[1080][i]);
    }
    if (value[720])
      for (let j = 0; j < value[720].length; j++) {
        // 720p
        createOrangeBtn(diiv, "720p", value[720][j]);
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
