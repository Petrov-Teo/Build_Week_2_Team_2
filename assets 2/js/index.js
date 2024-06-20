const annunci = document.getElementById("annunci");
const nascondiAnnunciBtn = document.getElementById("nascondiAnnunciBtn");

nascondiAnnunciBtn.addEventListener("click", () => {
  annunci.remove();
});

const activities = document.getElementById("activities");
const hideActivitiesBtn = document.getElementById("hideActivitiesBtn");
const showActivitiesBtn = document.getElementById("showActivitiesBtn");

hideActivitiesBtn.addEventListener("click", () => {
  activities.classList.remove("d-lg-block");
});

showActivitiesBtn.addEventListener("click", () => {
  activities.classList.toggle("d-lg-block");
});
