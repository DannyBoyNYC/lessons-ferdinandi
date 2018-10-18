var weatherApp = (function() {
  'use strict';
  
  var publicAPIs = {};
  var settings;
  var userLocation;
  
  var defaults = {
    apiKey: "29763027292641c7b2d8d12a877b4bf5",
    locationAPI: "https://ipapi.co/json",
    containerElem: document.getElementById("app"),
    weatherAPI: "https://api.weatherbit.io/v2.0/current"
  }
  
  var makeRequest = function (url, method, success, failure, always) {
    if (!url || !method) return;
    
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      
      if (xhr.status >= 200 && xhr.status < 300) {
        if (success && typeof success === "function") {
          success(JSON.parse(xhr.responseText), xhr);
        }
      } else {
        if (failure && typeof failure === "function") {
          failure(xhr);
        }
      }
      if (always && typeof always === "function") {
        always(JSON.parse(xhr.responseText), xhr);
      }
    };
    
    xhr.open(method, url);
    xhr.send();
  };
  
  var extend = function () {
    
    // Variables
    var extended = {};
    
    // Merge the object into the extended object
    var merge = function (obj) {
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
  
  
  var getAPI = function (url, method) {
    var request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
      request.onreadystatechange = function () {
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
      request.open(method || 'GET', url, true);
      request.send();
    });
  }
  
  getAPI(defaults.locationAPI, 'GET')
  .then(function (data) {
    var city = (JSON.parse(data.responseText).city);
    getWeather(city)
  })
  
  var getWeather = function (city) {
    var request = `${defaults.weatherAPI}?&city=${userLocation}&key=${defaults.apiKey}`;
    console.log(request)
    console.log(city)
  }
  
  // makeRequest(locationService, "GET", function(data) {
  //   makeRequest(weather, "GET", function(weatherData) {
  //     var rawWeatherData = weatherData.data[0];
  //     drawScreen(rawWeatherData);
  //   });
  // });
  
  // var drawScreen = function(data) {
  //   containerElem.innerText = `
  //   The current temperature is ${data.temp} degrees Fahrenheit.
  //   `;
  //   //   console.log(data);
  // }
  
  publicAPIs.init = function (options) {
    settings = extend(defaults, options || {});
    // getWeather();
  };
  
  return publicAPIs;
  
})();

weatherApp.init();
