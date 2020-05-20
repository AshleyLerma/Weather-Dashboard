$(document).ready(function () {
  var appID = "3f8ee6c995827a58abf1e6cb5e587a74";

  $(".query_btn").click(function () {
    var query_param = $(this).prev().val();

    if ($(this).prev().attr("placeholder") == "City") {
      var weather =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        query_param +
        "&APPID=" +
        appID;
    }
    $.getJSON(weather, function (json) {
      $("#city").html(json.name);
      $("#weatherDescription").html(json.weather[0].description);
      $("#weatherIcon").attr(
        "src",
        "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png"
      );
      $("#temperature").html(json.main.temp);
      $("#humidity").html(json.main.humidity);
      $("#windSpeed").html(json.main.windSpeed);
      $("#uvIndex").html(json.main.uvIndex);
    });
  });
});
