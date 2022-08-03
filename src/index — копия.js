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

// Form + City

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");

  if (cityInput.value) {
    city.innerHTML = `${cityInput.value}`;
  } else {
    city.innerHTML = `Dnipro`;
  }

  let apiKey = "ca3de197620a1521a455c4239b865368";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showGPSTemperature);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", changeCity);

// Temperature

let apiKey = "ca3de197620a1521a455c4239b865368";
let city = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

let temperature = 0;

function showTemp(response) {
  temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  temp.innerHTML = temperature;
}
axios.get(apiUrl).then(showTemp);

// Celsius + Fahrenheit

let tempCelsius = temperature;
let tempFahrenheit = Math.round((tempCelsius * 9) / 5 + 32);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", clickCelsius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", clickFahrenheit);

function clickCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = tempCelsius;
}

function clickFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = tempFahrenheit;
}
