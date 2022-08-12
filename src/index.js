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

  let result = `${month}, ${number}`;
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
    "Thursday",
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

let celsiusTemp = document.querySelector("#temp").innerHTML;

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
    `images//${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", message);
}

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", searchLocation);

// Celsius + Fahrenheit

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = fahrenheitTemp;
}

function showCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);
