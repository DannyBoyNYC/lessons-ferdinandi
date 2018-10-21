var weatherApp = (function() {
  "use strict";

  var publicAPIs = {};
  var settings;
  var userLocation;

  var defaults = {
    apiKey: "29763027292641c7b2d8d12a877b4bf5",
    locationAPI: "https://ipapi.co/json",
    containerElem: document.getElementById("app"),
    weatherAPI: "https://api.weatherbit.io/v2.0/current",
    metric: "celcius"
  };

  var extend = function() {
    // Variables
    var extended = {};

    // Merge the object into the extended object
    var merge = function(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          extended[prop] = obj[prop];
        }
      }
    };

    // Loop through each object and conduct a merge
    for (var i = 0; i < arguments.length; i++) {
      merge(arguments[i]);
    }

    return extended;
  };

  var getAPI = function(url, method) {
    var request = new XMLHttpRequest();
    return new Promise(function(resolve, reject) {
      request.onreadystatechange = function() {
        if (request.readyState !== 4) return;
        if (request.status >= 200 && request.status < 300) {
          resolve(request); // successful
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          });
        }
      };
      request.open(method || "GET", url, true);
      request.send();
    });
  };

  getAPI(defaults.locationAPI, "GET").then(function(data) {
    var city = JSON.parse(data.responseText).city;
    getWeather(city);
  });

  var getWeather = function(city) {
    var request = `${defaults.weatherAPI}?&city=${city}&key=${defaults.apiKey}`;
    getAPI(request, "GET")
      .then(function(data) {
        var weatherData = JSON.parse(data.responseText).data[0];
        drawScreen(weatherData, city);
      })
      .catch(function(error) {
        drawScreen(error);
      });
  };

  var drawScreen = function(data, city) {
    defaults.containerElem.innerText = `
    The current temperature in ${city} is ${data.temp} degrees ${
      defaults.metric
    }.
    `;
  };

  publicAPIs.init = function(options) {
    settings = extend(defaults, options || {});
    console.log(settings);
  };

  return publicAPIs;
})();

weatherApp.init("los Angeles");
