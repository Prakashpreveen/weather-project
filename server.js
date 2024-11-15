const apiKey = "ade9bc15e60759d2b8eb894de980d188";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const loadingIndicator = document.querySelector(".loading");
const weatherDisplay = document.querySelector(".weather");

async function checkWeather(city) {
  try {
    loadingIndicator.style.display = "block";
    weatherDisplay.classList.remove("visible");
    weatherDisplay.classList.add("hidden");
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Check if the response is ok (status code 200)
    if (!response.ok) {
      throw new Error("City not found");
    }

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
    loadingIndicator.style.display = "none";
    weatherDisplay.classList.remove("hidden");
    weatherDisplay.classList.add("visible");
  } catch (error) {
    console.error(error);
    loadingIndicator.style.display = "none";
  }
}

// Event listeners for search button and Enter key
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
