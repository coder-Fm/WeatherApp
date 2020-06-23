window.addEventListener("load", () => {
  let lon;
  let lat;
  let tempDescription = document.querySelector(".temperature-description p");
  let temperature = document.querySelector(".temperature-degree p");
  let cityName = document.querySelector(".city");
  let countryName = document.querySelector(".countryloc");
  let iconElement = document.querySelector(".weather-icon");
  let selectElement = document.getElementById("cityselect");
  let searchBtn = document.getElementById("searchButton");
  searchBtn.addEventListener('click', searchHandler);
  let currentBtn = document.getElementById("currentButton");
  currentBtn.addEventListener('click', currentHandler);

  const key = "47ee6d430b2fb1babf79e2e3687b3f79";
  let api;

  function searchHandler() {
    let opt = `${selectElement.value}`;
    api = `http://api.openweathermap.org/data/2.5/weather?q=${opt}&appid=${key}`;
    getData();
  }


  // weather data
  const weather = {};
  weather.temperature = {
      unit : "fahrenheit"
  }

  const Rankine = 459;
  
  function currentHandler() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        lon = position.coords.longitude;
        lat = position.coords.latitude;

        api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

        getData();
      });
    }
    else { alert("Browser Doesn't Support Geolocation"); }
  }

  function getData() {
    fetch(api)
      .then(response => {
        return response.json();
        })
        .then(data =>{
          console.log(data);

          weather.country = data.sys.country; //location
          weather.iconId = data.weather[0].icon; //icon
          //weather.temperature.value = Math.floor(data.main.temp - KELVIN); //temp
          weather.temperature.value = Math.round((data.main.temp * (9/5)) - Rankine);
          weather.description = data.weather[0].description;
          weather.name = data.name;

      })
      .then(function() {
        displayResults();
        });

        function displayResults() {
          iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
          temperature.innerHTML =`${weather.temperature.value} ° <span>F</span>`;
          tempDescription.innerHTML = weather.description;
          cityName.innerHTML = weather.name;
          countryName.innerHTML = weather.country;

        }

        function FahrenheitTocelsius(temperature) {
          return (temperature - 32) / (9/5);
        }

        // user-click temperature
        temperature.addEventListener("click", function() {
          if(weather.temperature.value === undefined)
            return;

            if(weather.temperature.unit === "fahrenheit") {
              let celsius = FahrenheitTocelsius(weather.temperature.value);
              celsius = Math.floor(celsius);
              temperature.innerHTML = `${celsius}° <span>C</span>`;
              weather.temperature.unit = "celsius";
            }
            else {
              temperature.innerHTML = `${weather.temperature.value}° <span>F</span>`;
              weather.temperature.unit = "fahrenheit";
            }
        });
  }
});
