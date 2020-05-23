$(document).ready(function () {
  // My API Key
  var appID = "3f8ee6c995827a58abf1e6cb5e587a74";
  // Empty array for searched cities
  var cities = [];

  // On click event for each button that sets a query parameter equal to the input city
  function displayCityWeather(city) {
    // Concatinates Query URL
    let weather =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
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
        "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      // Converts from K to F and rounds to nearest int
      $("#temperature").html(
        Math.round(((response.main.temp - 273.15) * 9) / 5 + 32) + "°F"
      );
      $("#humidity").html(response.main.humidity + "%");
      // Converts from meters per sec to miles per hour and rounds to nearest int
      $("#windSpeed").html(Math.round(response.wind.speed * 2.237) + " MPH");

      getUV(response);
      getFiveDay(response);
    });
  }

  // UV Index function
  function getUV(response) {
    let uvIndex =
      "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      appID +
      "&lat=" +
      response.coord.lat +
      "&lon=" +
      response.coord.lon;

    $.ajax({
      url: uvIndex,
      method: "GET",
    }).then(function (data) {
      $("#uvIndex").html(data.value);

      if (data.value < 3) {
        $("#uvIndex")
          .addClass("favorable")
          .removeClass("moderate")
          .removeClass("severe");
      } else if (data.value >= 3 && data.value < 7) {
        $("#uvIndex")
          .addClass("moderate")
          .removeClass("favorable")
          .removeClass("severe");
      } else {
        $("#uvIndex")
          .addClass("severe")
          .removeClass("moderate")
          .removeClass("favorable");
      }
    });
  }

  // Five Day Forecast Function
  function getFiveDay(response) {
    let fiveDay =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      response.name +
      "&appid=" +
      appID;

    $.ajax({
      url: fiveDay,
      method: "GET",
    }).then(function (info) {
      // Day 1
      $("#dayOneDate").html(moment().add(1, "days").format("(MM/DD/YYYY)"));
      $("#dayOneIcon").attr(
        "src",
        "https://openweathermap.org/img/w/" +
          info.list[0].weather[0].icon +
          ".png"
      );
      // Converts from K to F and rounds to nearest int
      $("#dayOneTemp").html(
        Math.round(((info.list[0].main.temp - 273.15) * 9) / 5 + 32) + "°F"
      );
      $("#dayOneHumidity").html(info.list[0].main.humidity + "%");

      // Day 2
      $("#dayTwoDate").html(moment().add(2, "days").format("(MM/DD/YYYY)"));
      $("#dayTwoIcon").attr(
        "src",
        "https://openweathermap.org/img/w/" +
          info.list[1].weather[0].icon +
          ".png"
      );
      // Converts from K to F and rounds to nearest int
      $("#dayTwoTemp").html(
        Math.round(((info.list[1].main.temp - 273.15) * 9) / 5 + 32) + "°F"
      );
      $("#dayTwoHumidity").html(info.list[1].main.humidity + "%");

      // Day 3
      $("#dayThreeDate").html(moment().add(3, "days").format("(MM/DD/YYYY)"));
      $("#dayThreeIcon").attr(
        "src",
        "https://openweathermap.org/img/w/" +
          info.list[2].weather[0].icon +
          ".png"
      );
      // Converts from K to F and rounds to nearest int
      $("#dayThreeTemp").html(
        Math.round(((info.list[2].main.temp - 273.15) * 9) / 5 + 32) + "°F"
      );
      $("#dayThreeHumidity").html(info.list[2].main.humidity + "%");

      // Day 4
      $("#dayFourDate").html(moment().add(4, "days").format("(MM/DD/YYYY)"));
      $("#dayFourIcon").attr(
        "src",
        "https://openweathermap.org/img/w/" +
          info.list[3].weather[0].icon +
          ".png"
      );
      // Converts from K to F and rounds to nearest int
      $("#dayFourTemp").html(
        Math.round(((info.list[3].main.temp - 273.15) * 9) / 5 + 32) + "°F"
      );
      $("#dayFourHumidity").html(info.list[3].main.humidity + "%");

      // Day 5
      $("#dayFiveDate").html(moment().add(5, "days").format("(MM/DD/YYYY)"));
      $("#dayFiveIcon").attr(
        "src",
        "https://openweathermap.org/img/w/" +
          info.list[4].weather[0].icon +
          ".png"
      );
      // Converts from K to F and rounds to nearest int
      $("#dayFiveTemp").html(
        Math.round(((info.list[4].main.temp - 273.15) * 9) / 5 + 32) + "°F"
      );
      $("#dayFiveHumidity").html(info.list[4].main.humidity + "%");
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
      renderButtons(cities);
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
