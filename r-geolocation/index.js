import {sanitizeHTML} from '../modules/sanitize.js';
import {sanitizeHTMLAlt} from '../modules/sanitizeAlt.js';
const weatherBitKEY = 'f53546b63aa946a4bfdd16c46fa7c57a';
const weatherBitBaseURL = 'https://api.weatherbit.io/v2.0/current';
const weatherElem = document.querySelector('#app');
const DEV_MODE = true;

async function getWeather(lon, lat) {
  try {
    const savedWeather = await sessionStorage.getItem('weatherBitSaved');
      if (savedWeather && DEV_MODE) {
        console.log(' getting weather from storage ');
        displayWeather(JSON.parse(savedWeather));
      } else {
        console.log(' getting weather from API ');
        let response = await fetch(
          `${weatherBitBaseURL}?lat=${lat}&lon=${lon}&key=${weatherBitKEY}`,
        );
      if (!response.ok) {
        throw 'Response failed. Status: ' + response.status;
      }
      let data = await response.json();
      sessionStorage.setItem('weatherBitSaved', JSON.stringify(data.data[0]));
      console.log(' foo ',  data.data[0] );
      displayWeather(data.data[0]);
    }
  } catch(error){
    console.warn(error);
  }
}

/**
 * gather the user's location details
 * @param  {Object} position The location details
 */
function getLocation() {
  const savedLocation = sessionStorage.getItem('locationSaved');
  if (savedLocation  && DEV_MODE) {
    console.log(' getting location from storage ');
    let locData = JSON.parse(savedLocation);
    let lon = locData.lon;
    let lat = locData.lat;
    getWeather(lon, lat);
  } else {
    navigator.geolocation.getCurrentPosition(getLocationFromGeolocation, logError);
  }
}

function getLocationFromGeolocation(position){
  console.log(' getting location from geolocation ');
  const locData = {};
  locData.lon = position.coords.longitude;
  locData.lat = position.coords.latitude;
  sessionStorage.setItem('locationSaved', JSON.stringify(locData));
  getWeather(locData.lon, locData.lat);
}

/**
 * Log an error message
 * @param  {Object} error The error details
 */
function logError(error) {
  console.warn(error);
  weatherElem.innerHTML = `Sorry, something went wrong. Please try again. Details: ${error}`;
}

function displayWeather({city_name, state_code, country_code, temp, weather}) {
  const html = `
    <img class="img-small" src="https://www.weatherbit.io/static/img/icons/${
      weather.icon
    }.png" alt="${sanitizeHTML(weather.description)}." />

    In ${sanitizeHTML(city_name)}, ${sanitizeHTML(state_code)} ${sanitizeHTML(country_code)} 
    it is currently ${sanitizeHTMLAlt(temp)} degress celcius with ${sanitizeHTML(weather.description)}. 
  `;
  weatherElem.innerHTML = html;
}

getLocation();