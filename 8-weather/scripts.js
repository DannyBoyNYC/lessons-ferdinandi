var apiKey = "29763027292641c7b2d8d12a877b4bf5";
var locationService = "https://ipapi.co/json";
var containerElem = document.getElementById("app");
var currentService = "https://api.weatherbit.io/v2.0/current";

var makeRequest = function(url, method, success, failure, always) {
  if (!url || !method) return;

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
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
    // if (always && typeof always === "function") {
    //   always(JSON.parse(xhr.responseText), xhr);
    // }
  };

  xhr.open(method, url);
  xhr.send();
};

// var map = makeRequest(locationService, "GET", function(data) {
//   loc = [data.latitude, data.longitude];
// });

// console.log(map);

makeRequest(locationService, "GET", function(data) {
  var loc = [data.latitude, data.longitude];
  var weather = `${currentService}?&lat=${loc[0]}&lon=${loc[1]}&key=${apiKey}`;

  makeRequest(weather, "GET", function(weatherData) {
    var rawWeatherData = weatherData.data[0];
    drawScreen(rawWeatherData);
  });
});

var drawScreen = function(data) {
  containerElem.innerText = `
  The current temperature is ${data.temp} degrees Fahrenheit.
  `;
  //   console.log(data);
};
