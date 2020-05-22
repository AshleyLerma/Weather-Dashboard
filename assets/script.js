// 1. Add UV index data plus corresponding color
// 2. Create div for 5 day forecast
// 3. Create a div (module maybe?) for each of the next 5 days
//   - date
//   - temp
//   - humidity
// 4. Reformat

$(document).ready(function () {
  // My API Key
  var appID = "3f8ee6c995827a58abf1e6cb5e587a74";
  // Empty array for searched cities
  var cities = [];

  // On click event for each button that sets a query parameter equal to the input city
  function displayCityWeather(city) {
    // Concatinates Query URL
    let weather =
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

  // When the city search button is clicked
  $("#add-city").on("click", function (event) {
    // This line grabs the input from the textbox
    let citySearch = $("#city-input").val().trim();
    // Calls the display with the user input as the city
    displayCityWeather(citySearch);

    // This prevents submitting a blank input
    if (citySearch !== "") {
      // Adding city from the textbox to cities array
      cities.push(citySearch);

      // Save to local storage as JSON string
      localStorage.setItem("cities", JSON.stringify(cities));

      // Clears textbox
      $("#city-input").val("");
      // Renders buttons to page
      renderButtons();
    } else {
      return;
    }
  });

  // Render past searches as buttons to the screen
  function renderButtons() {
    // Clear existing buttons to prevent duplicates
    $("#buttons-view").empty();
    // Loop through cities array to create a button for each
    for (let i = 0; i < cities.length; i++) {
      let cityBtn = $("<button>");
      cityBtn.attr("data-name", cities[i]);
      cityBtn.text(cities[i]);
      $("#buttons-view").prepend(cityBtn);
      // creates an on click specific to each button passing the specific city as an argument
      $(document).on("click", "[data-name='" + cities[i] + "']", function (
        event
      ) {
        displayCityWeather(cities[i]);
      });
    }
  }
  // Get cities array from past searches that were saved to local storage
  cities = JSON.parse(localStorage.getItem("cities"));

  // Calling the renderButtons function to display the past search buttons
  renderButtons();
});
