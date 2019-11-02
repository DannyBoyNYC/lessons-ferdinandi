'use strict';

var displayElem = document.querySelector('.quote');
var btn = document.querySelector('button');
var quotes = [];
displayElem.innerText = 'Click the button for wisdom.';

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function makeRequest(endpoint, callback) {
  if (!endpoint || !callback) return;
  fetch(endpoint)
    .then(handleErrors)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.log(error));
}

function getWisdom() {
  if (!event.target.matches('button')) return;
  makeRequest('http://ron-swanson-quotes.herokuapp.com/v2/quotes', post => {
    if (quotes.indexOf(post[0]) > -1) {
      console.log('hit');
      btn.click();
      return;
    }
    displayElem.innerHTML = post;
    quotes.push(post[0]);
    if (quotes.length > 50) {
      quotes = [];
    }
  });
  event.target.innerText = 'More Ron';
}

document.addEventListener('click', getWisdom);
