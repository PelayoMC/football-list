export async function openModal(schedule) {
  if (schedule) {
    const { obtainSchedule } = await import("../schedule/loadScheduler.mjs");
    document.getElementById("navigation").style.position = "static";
    document.getElementById("myModal").style.display = "flex";
    obtainSchedule(schedule);
  }
}
