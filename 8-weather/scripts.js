(function weatherApp() {
  var app = document.getElementById('app');
  var locationAPI = 'https://ipapi.co/json';
  var weatherAPI = 'https://api.weatherbit.io/v2.0/current';
  var apiKey = '29763027292641c7b2d8d12a877b4bf5';

  var getLocation = function() {
    fetch(locationAPI)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(location => getWeather(location.city, location.region_code))
      .catch(error => {
        app.textContent = 'Unable to get weather data at this time.';
        console.warn(error);
      });
  };

  var drawScreen = function(weather) {
    app.innerHTML = `
  <h2>${sanitizeHTML(weather.city_name)}, ${sanitizeHTML(
      weather.state_code,
    )}</h2>
  <div style="display: flex; align-items: center;">
    <img src=https://www.weatherbit.io/static/img/icons/${sanitizeHTML(
      weather.weather.icon,
    )}.png alt=${sanitizeHTML(weather.weather.description)} />
    <h3>${sanitizeHTML(weather.weather.description)}</h3>
  </div>
  <p>The current temperature in ${sanitizeHTML(
    weather.city_name,
  )} is ${sanitizeHTML(weather.temp)} degrees celcius, ${sanitizeHTML(
      cToF(weather.temp),
    )} degrees Fahrenheit.</p>`;
  };

  /**
   * Convert fahrenheit to celcius
   * @param  {String} temp The temperature in celcius
   * @return {Number}      The temperature in fahrenheit
   */
  var cToF = function(temp) {
    temp = (parseFloat(temp) * 9) / 5 + 32;
    return Math.ceil(temp);
  };

  /**
   * Sanitize and encode all HTML in a user-submitted string
   * @param  {String} str  The user-submitted string
   * @return {String} str  The sanitized string
   */
  var sanitizeHTML = function(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  };

  var getWeather = function(city, region) {
    fetch(`${weatherAPI}?&city=${city},${region}&key=${apiKey}`)
      .then(data => data.json())
      .then(weather => drawScreen(weather.data[0]));
  };

  getLocation();
})();

weatherApp();
