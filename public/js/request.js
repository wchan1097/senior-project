function resizeMap() {
  let width = $("#map").width() + "px";
  $("#map").height(width);
}

$("#estimates").click(function () {
  $("#providers").load("../components/ride-confirmation.html");
});

resizeMap();

window.addEventListener("resize", resizeMap);