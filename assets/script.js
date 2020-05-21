// 1. Save cities array to local storage so that it persists through refresh
// 2. Create div for 5 day forecast
// 3. Create a module (maybe?) for each of the next 5 days
//   - date
//   - temp
//   - humidity
// 4. Add UV index data plus corresponding color
// 5. Reformat

$(document).ready(function () {
  // My API Key
  var appID = "3f8ee6c995827a58abf1e6cb5e587a74";
  // Empty array for searched cities
  var cities = [];

  // On click event for each button that sets a query parameter equal to the input city
  function displayCityWeather() {
    var city = $(this).attr("data-name");

    // Concatinates Query URL
    var weather =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&APPID=" +
      appID;

    // Gets all the city data
    $.ajax({
      url: weather,
      method: "GET",
    }).then(function (response) {
      $("#city").html(response.name);
      // Gets current date from moment
      $("#date").html(moment().format("(MM/DD/YYYY)"));
      $("#weatherIcon").attr(
        "src",
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      // Converts from K to F and rounds to nearest int
      $("#temperature").html(
        Math.round(((response.main.temp - 273.15) * 9) / 5 + 32) + "°F"
      );
      $("#humidity").html(response.main.humidity + "%");
      // Converts from meters per sec to miles per hour and rounds to nearest int
      $("#windSpeed").html(Math.round(response.wind.speed * 2.237) + " MPH");

      //TODO: Add UV index data
      $("#uvIndex").html();
    });
  }

  // This function handles events where a city button is clicked
  $("#add-city").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var city = $("#city-input").val().trim();

    if (city !== "") {
      // Adding city from the textbox to cities array
      cities.push(city);
    } else {
      // This prevents submitting a blank input
      return;
    }
    // Calling renderButtons
    renderButtons();
  });

  // Render past searches as buttons on the screen
  function renderButtons() {
    // Clear existing buttons to prevent duplicates
    $("#buttons-view").empty();
    // Loop through cities array
    for (let i = 0; i < cities.length; i++) {
      let cityBtn = $("<button>");
      cityBtn.addClass("city-btn");
      cityBtn.attr("data-name", cities[i]);
      cityBtn.text(cities[i]);
      // Adds the new search as a button at the top of the list
      $("#buttons-view").prepend(cityBtn);
    }
  }

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".city-btn", displayCityWeather);

  // Calling the renderButtons function to display the initial buttons
  renderButtons();
});
