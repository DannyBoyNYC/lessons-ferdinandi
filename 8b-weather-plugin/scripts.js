var weather = function(options) {
  var defaults = {
    selector: 'app',
    apiKey: '29763027292641c7b2d8d12a877b4bf5',
    locationAPI: 'https://ipapi.co/json',
    weatherAPI: 'https://api.weatherbit.io/v2.0/current',
    message: "Right now in {city}, it's {temperature} and {conditions}.",
  };

  var settings = Object.assign(defaults, options);
  var selector = document.getElementById(defaults.selector);

  var getLocation = function() {
    fetch(settings.locationAPI)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(location => getWeather(location.city, location.region_code))
      .catch(error => {
        selector.textContent = 'Unable to get weather data at this time.';
        console.warn(error);
      });
  };

  var drawScreen = function(weather) {
    selector.innerHTML = `
  <h2>${sanitizeHTML(weather.city_name)}, ${sanitizeHTML(
      weather.state_code,
    )}</h2>

  <div class="icon">
    ${showIcon(settings.icon, weather)}
    <h3>${sanitizeHTML(weather.weather.description)}</h3>
  </div>

  ${composeMessage(settings.message, weather)}
  `;
  };

  // compose message
  var composeMessage = function(message, weather) {
    composedMessage = message
      .replace('{city}', sanitizeHTML(weather.city_name))
      .replace(
        '{temperature}',
        `${sanitizeHTML(
          settings.unit === 'celcius' ? weather.temp : cToF(weather.temp),
        )} &deg; ${settings.unit === 'celcius' ? 'celcius' : 'fahrenheit'}`,
      )
      .replace(
        '{conditions}',
        sanitizeHTML(weather.weather.description.toLowerCase()),
      );
    return composedMessage;
  };

  // show icon
  var showIcon = function(iconSetting, weather) {
    if (iconSetting === true) {
      return `<img src=https://www.weatherbit.io/static/img/icons/${sanitizeHTML(
        weather.weather.icon,
      )}.png alt=${sanitizeHTML(weather.weather.description)} />`;
    } else {
      return '';
    }
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
    fetch(
      `${settings.weatherAPI}?&city=${city},${region}&key=${settings.apiKey}`,
    )
      .then(data => data.json())
      .then(weather => drawScreen(weather.data[0]));
  };

  getLocation();
};

weather({
  city: 'Vancouver',
  selector: 'poop',
  unit: 'celcius',
  icon: true,
  message:
    "At this moment in {city} its around {temperature} and lookin' like {conditions}.",
});
