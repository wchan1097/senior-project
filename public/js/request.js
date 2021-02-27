function resizeMap() {
  let width = $("#map").width() + "px";
  $("#map").height(width);
}

$("#estimates").click(function () {
  $("#providers").load("../components/ride-confirmation.html");
});

resizeMap();

window.addEventListener("resize", resizeMap);

$("#transportationTab").click(function () {
  $("#transportationContainer").height(($("#transportationContainer").height() == 0) ? "216px" : "0");

});
$("#userManagementTab").click(function () {
  $("#userManagementContainer").height(($("#userManagementContainer").height() == 0) ? "96px" : "0");
});