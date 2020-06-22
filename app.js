window.addEventListener("load", () => {
  let lon;
  let lat;
  let tempDescription = document.querySelector(".temperature-description p");
  let temperature = document.querySelector(".temperature-degree p");
  let cityName = document.querySelector(".city");
  let countryName = document.querySelector(".countryloc");
  let iconElement = document.querySelector(".weather-icon");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const key = "47ee6d430b2fb1babf79e2e3687b3f79";
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

      // weather data
      const weather = {};
      weather.temperature = {
          unit : "celsius"
      }
      const KELVIN = 273;
      //

      fetch(api)
      .then(response => {
        return response.json();
        })
        .then(data =>{
          console.log(data);

          weather.country = data.sys.country; //location
          weather.iconId = data.weather[0].icon; //icon
          weather.temperature.value = Math.floor(data.main.temp - KELVIN); //temp
          weather.description = data.weather[0].description;
          weather.name = data.name;

      })
      .then(function() {
        displayResults();
        });

        function displayResults() {
          iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
          temperature.innerHTML =`${weather.temperature.value} ° <span>C</span>`;
          tempDescription.innerHTML = weather.description;
          //locationElement.innerHTML = `${weather.city}, ${weather.country}`;
          cityName.innerHTML = weather.name;
          countryName.innerHTML = weather.country;

        }

        // temperature conversion
        function celsiusToFahrenheit(temperature) {
          return (temperature * 9/5) + 32;
        }

        // user-click temperature
        temperature.addEventListener("click", function() {
          if(weather.temperature.value === undefined)
            return;

            if(weather.temperature.unit === "celsius") {

              let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
              fahrenheit = Math.floor(fahrenheit);
              temperature.innerHTML = `${fahrenheit}° <span>F</span>`;
              weather.temperature.unit = "fahrenheit";
            }
            else {
              temperature.innerHTML = `${weather.temperature.value}° <span>C</span>`;
              weather.temperature.unit = "celsius";
            }
        });

    });
  }

});
