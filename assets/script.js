// 4. Save city to local storage
// 5. Post array of past city searches as a list of buttons
//   - prepend most recent search to top of list
// 6. Replace div content with most recent search information
// 7. Create div for 5 day forecast
// 8. Create a module (maybe?) for each of the next 5 days
//   - date
//   - temp
//   - humidity
// 9. Add symbols to incicate cloudy, sunny, etc
// 10. Add Corresponding color to uv index
// 11. Reformat

$(document).ready(function () {
  // My API Key
  var appID = "3f8ee6c995827a58abf1e6cb5e587a74";

  // On click event for each button that sets a query parameter equal to the input city
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
