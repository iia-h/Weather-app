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

function changeCity(city) {
  let apiKey = "ca3de197620a1521a455c4239b865368";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  changeCity(city);
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

let celsiusTemp = 0;

function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/h`;
  let message = response.data.weather[0].main;
  document.querySelector("#weather-type").innerHTML = message;
  celsiusTemp = Math.round(response.data.main.temp);
}

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", searchLocation);

// Celsius + Fahrenheit

function clickFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  temp.innerHTML = fahrenheitTemp;
}

function clickCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = celsiusTemp;
}



let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", clickFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", clickCelsius);
