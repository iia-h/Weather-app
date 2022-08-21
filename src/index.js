// Month + date
let currentDate = new Date();
function formatDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let number = date.getDate();

  let year = date.getFullYear();

  let result = `${month} ${number}, ${year}`;
  return result;
}

let date = document.querySelector("#date");
date.innerHTML = formatDate(currentDate);

// Day + time
function formatDay() {
  let currentDay = new Date();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = week[currentDay.getDay()];
  let hours = currentDay.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDay.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let result = `${day}, ${hours}:${minutes}`;
  return result;
}
//Time format: 12-hour period AM/PM
function getTimeNow() {
  let now = new Date();
  let hour = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let seconds = String(now.getSeconds()).padStart(2, "0");
  let meridiem = "";

  let time = `${hour}:${minutes}:${seconds}${meridiem}`;
  timeNow.innerHTML = `${time}`;

  //Performs function for a 'live clock'
  let t = setTimeout(function () {
    getTimeNow();
  }, 1000);
}
//Display user's local time
let timeNow = document.querySelector("#time");
getTimeNow();
//____________

let day = document.querySelector("#day");
day.innerHTML = formatDay();

// Change location

function searchCity(city) {
  let apiKey = "ca3de197620a1521a455c4239b865368";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityImputElement = document.querySelector("#city-input").value;
  searchCity(cityImputElement);
}

let searchBtn = document.querySelector("#city-form");
searchBtn.addEventListener("submit", handleSubmit);

// Current location

function searchLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function currentLocation(position) {
  let apiKey = "ca3de197620a1521a455c4239b865368";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  descriptionElement.innerHTML = response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", "message");

  getForecast(response.data.coord);
}

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", searchLocation);

// Celsius + Fahrenheit

function showFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  tempElement.innerHTML = fahrenheitTemp;

  if (isCelsius) {
    let temperature = document.querySelectorAll(
      ".weather-forecast-temperature"
    );
    for (let i = 0; i < temperature.length; i++) {
      let temperatureFahrenheit =
        (parseInt(temperature[i].innerText) * 9) / 5 + 32;
      temperature[i].innerHTML = `${Math.round(temperatureFahrenheit)}°`;
    }

    isCelsius = !isCelsius;
  }
}

function showCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemp);

  if (!isCelsius) {
    let temperature = document.querySelectorAll(
      ".weather-forecast-temperature"
    );
    for (let i = 0; i < temperature.length; i++) {
      let temperatureCelsius =
        ((parseInt(temperature[i].innerText) - 32) * 5) / 9;
      temperature[i].innerHTML = `${Math.round(temperatureCelsius)}°`;
    }
    isCelsius = !isCelsius;
  }
}

let celsiusTemp = document.querySelector("#temp").innerHTML;
let isCelsius = true;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

// Forecast section

function getForecast(coordinates) {
  let apiKey = "ca3de197620a1521a455c4239b865368";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatWeek(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row text-center">`;
  forecast.forEach(function (forecastDay, index) {
    if ((index < 7) & (index > 0)) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2 pt-2">
             <div class="weather-forecast-day">${formatWeek(
               forecastDay.dt
             )}</div>
             <img src="images/${
               forecastDay.weather[0].icon
             }.png" class="weather-icon" />
             <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span> 
                <span class="weather-forecast-temperature weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
             </div>
          </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

searchCity("Dnipro");
