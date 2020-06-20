//select elements
const notificationElement = document.querySelector(".notification");
const locationElement = document.querySelector(".location p");
const dateElement = document.querySelector(".date");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const hilowElement = document.querySelector(".hi-low");

// weather data - API
const weather = {};
weather.temperature = {
    unit : "celsius"
}

//App constants andvars
const KELVIN = 273;
//api key
const key = "47ee6d430b2fb1babf79e2e3687b3f79";

//check browser geolocaiton support
if("geolocaiton" in navigator) {
  navigator.geolocaiton.getCurrentPosition(setPosition, showError);
}
else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>";
}

// user's location (by city id, or name, by geographic coordinates)- geolocaiton services
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getResults(latitude, longitude);
}

//show geolocaiton error
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getResults(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${key}`;
  fetch(api).then(function(response) {
    let data = response.json();
    return data;
  })
  .then(function(data) {
    weather.city = data.name; // loction
    weather.country = data.sys.country; //location
    weather.iconId = data.weather[0].icon; //icon
    weather.temperature.value = Math.floor(data.main.temp - KELVIN); //temp
    weather.description = data.weather[0].description; //description
    //weather.hilow = data.// date
    //hi/low
    //hi/low


  })
  .then(function() {
    displayResults();
    });
}
// end of search



// display Weather
function displayResults() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML =`${weather.temperature.value} ° <span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
  let now = new Date();

  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}
