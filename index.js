const apiKey = "57919df3f1f214c6d91adfc8b75bfee4";
const searchResult = document.getElementById("search-result");
const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

async function fetchData(cityName) {
  const response = await fetch(`${baseUrl}&q=${cityName}`);
  const data = await response.json();
  return data;
}

async function getData() {
  const humidityValue = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind-speed");
  const degreeCelsius = document.getElementById("degree-celsius");
  const weatherIcon = document.getElementById("weather-icon");
  const weatherData = await fetchData(searchBox.value);

  if (weatherData.cod == 404) {
    document.getElementsByClassName("bottom")[0].style.display = "none";
    searchResult.innerHTML = weatherData.message;
    degreeCelsius.style.display = "none";
    searchBox.value = "";
    weatherIcon.src = "/icons/no-data.png";
  } else {
    document.getElementsByClassName("bottom")[0].style.display = "flex";
    degreeCelsius.style.display = "block";
    searchResult.innerHTML = searchBox.value;
    humidityValue.innerHTML = weatherData.main.humidity + "%";
    windSpeed.innerHTML = weatherData.wind.speed + " km/h";
    degreeCelsius.innerHTML =
      Math.round(weatherData.main.temp) + `<span>°C</span>`;
    searchBox.value = "";
    if (weatherData.weather[0].main === "Clouds") {
      weatherIcon.src = "/icons/clouds.png";
    } else if (weatherData.weather[0].main === "Clear") {
      weatherIcon.src = "/icons/clear.png";
    } else if (weatherData.weather[0].main === "Rain") {
      weatherIcon.src = "/icons/rain.png";
    } else if (weatherData.weather[0].main === "Drizzle") {
      weatherIcon.src = "/icons/drizzle.png";
    } else if (weatherData.weather[0].main === "Mist") {
      weatherIcon.src = "/icons/mist.png";
    } else;
  }
  console.log(weatherData);
}

function mainfn() {
  searchButton.addEventListener("click", () => {
    if (searchBox.value === "") {
      return;
    } else {
      getData();
    }
  });
  searchBox.addEventListener("keydown", (e) => {
    if (searchBox.value === "") {
      return;
    } else {
      if (e.key == "Enter") {
        getData();
      }
    }
  });
}

mainfn();
