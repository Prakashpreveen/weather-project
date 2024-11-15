const apiKey = "ade9bc15e60759d2b8eb894de980d188";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const loadingIndicator = document.querySelector(".loading"); // Loading indicator
const weatherDisplay = document.querySelector(".weather"); // Weather display section

// Function to check weather
async function checkWeather(city) {
  try {
    searchBtn.style.display = "none"; // Hide the search button
    weatherDisplay.classList.remove("visible"); // Hide weather display initially
    weatherDisplay.classList.add("hidden");

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();

      document.querySelector(".city-name").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      // Set the weather icon based on the weather condition
      if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (data.weather[0].main === "Snow") {
        weatherIcon.src = "images/snow.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }

    // Hide loading indicator and show weather display
    loadingIndicator.classList.add("hidden"); // Hide loading indicator
    searchBtn.style.display = "block"; // Show search button again
    weatherDisplay.classList.remove("hidden");
    weatherDisplay.classList.add("visible"); // Show weather display
  } catch (error) {
    console.error(error);

    // Hide loading indicator in case of error
    loadingIndicator.classList.add("hidden");
    searchBtn.style.display = "block"; // Show search button again

    // Optionally show an alert or message about the error
    alert("Error fetching data. Please try again.");
  }
}

// Event listeners for search button and Enter key
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  searchBox.value = "";
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
    searchBox.value = "";
  }
});

// Optional feature to change placeholder text when typing
searchBox.addEventListener("focus", () => {
  searchBox.placeholder = "Type a city...";
});
