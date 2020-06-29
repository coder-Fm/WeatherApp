let temperature = document.querySelector('.current .temp');
let cityName = document.querySelector('.location .city');
let countryName = document.querySelector(".countryloc");
let iconElement = document.querySelector(".weather-icon");
let date = document.querySelector('.float-child .date');
let weather_el = document.querySelector('.current .weather');
let hilow = document.querySelector('.hi-low .hi');
let low = document.querySelector('.hi-low .low');
let celsiusConvert = document.querySelector(".celsius-convert");
let fahrenheitConvert = document.querySelector(".fahrenheit-convert");
let feelslike = document.querySelector(".FeelsLike p");
let humidity = document.querySelector(".Humidity p");
let pressure = document.querySelector(".Pressure p");
let visibility = document.querySelector(".Visibility p");

const searchbox = document.querySelector('.search-box');
const weather = {};
weather.temperature = { unit : "fahrenheit" }
weather.feelslike = { unit : "fahrenheit" }
weather.temp_max = { unit : "fahrenheit" }
weather.temp_min = { unit : "fahrenheit" }
weather.pressure = { unit :"InHg" }
weather.visibility = { unit :"mi" }

const api = {
  key: "47ee6d430b2fb1babf79e2e3687b3f79",
  base: "https://api.openweathermap.org/data/2.5/"
}
const Rankine = 459;


searchbox.addEventListener('keypress', setQuery);
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value); }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
    .then(response => {

      return response.json();
      })
      .then(data =>{
        console.log(data);
        weather.country = data.sys.country;
        weather.name = data.name;
        weather.iconId = data.weather[0].icon; //icon
        weather.temperature.value = Math.round((data.main.temp * (9/5)) - Rankine);
        weather.description = data.weather[0].description;
        weather.name = data.name;
        weather.temp_max.value = Math.round((data.main.temp_max * (9/5)) - Rankine);
        weather.temp_min.value = Math.round((data.main.temp_min * (9/5)) - Rankine);
        weather.feelslike.value = Math.round((data.main.feels_like * (9/5)) - Rankine);
        weather.humidity = data.main.humidity;
        weather.pressure.value = (data.main.pressure / 33.86388158).toFixed(2); // conversion of Mb to inHg
        weather.visibility.value = Math.round((data.visibility * (0.62137119224)) / 1000);
      })
      .then(function() {
        displayResults();
      });

      function displayResults() {
        temperature.innerHTML = `${Math.round(weather.temperature.value)}° <span>F</span>`;
        cityName.innerText = `${weather.name}, ${weather.country}`;
        iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
        date.innerText = new Date().toLocaleString('en-us', {  weekday: 'long' });
        weather_el.innerText = weather.description;
        hilow.innerHTML = `${Math.round(weather.temp_min.value)}°F/${Math.round(weather.temp_max.value)}°F`;
        feelslike.innerHTML = `${Math.round(weather.feelslike.value)}° <span>F</span>`;
        humidity.innerHTML = `${weather.humidity}<span>%</span>`;
        pressure.innerHTML = `${weather.pressure.value}<span> inHg</span>`;
        visibility.innerHTML = `${weather.visibility.value}<span> mi</span>`;
      }

      function FahrenheitTocelsius(temperature) {
        return (temperature - 32) / (9/5);
      }

      // user-click temperature C
      celsiusConvert.addEventListener("click", function() {

        if(weather.temperature.value === undefined)
          return;

        if(weather.temperature.unit === "fahrenheit") {
          let celsius1 = FahrenheitTocelsius(weather.temperature.value);
          celsius1 = Math.floor(celsius1);
          temperature.innerHTML = `${celsius1}° <span>C</span>`;
          weather.temperature.unit = "celsius";

          let celsius2 = FahrenheitTocelsius(weather.temp_max.value);
          celsius2 = Math.floor(celsius2);
          let celsius3 = FahrenheitTocelsius(weather.temp_min.value);
          celsius3 = Math.floor(celsius3);
          hilow.innerHTML = `${celsius2}°C/${celsius3}°C`;
          weather.temp_max.unit = "celsius";
          weather.temp_min.unit = "celsius";

          let celsius4 = FahrenheitTocelsius(weather.feelslike.value);
          celsius4 = Math.floor(celsius4);
          feelslike.innerHTML = `${celsius4}° <span>C</span>`;
          weather.feelslike.unit = "celsius";

        }
      });

      // user-click temperature F
      fahrenheitConvert.addEventListener("click", function() {

        if(weather.temperature.value === undefined)
          return;

        else {
          temperature.innerHTML = `${weather.temperature.value}° <span>F</span>`;
          weather.temperature.unit = "fahrenheit";
          hilow.innerHTML = `${weather.temp_max.value}°F/${weather.temp_min.value}°F`;
          weather.temp_max.unit = "fahrenheit";
          weather.temp_min.unit = "fahrenheit";
          feelslike.innerHTML = `${weather.feelslike.value}° <span>F</span>`;
          weather.feelslike.unit = "fahrenheit";
        }
      });
  
}
