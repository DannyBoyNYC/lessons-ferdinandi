'use strict';

var displayElem = document.querySelector('.quote');
displayElem.innerText = 'Click the button for wisdom.';

function makeRequest(endpoint, callback) {
  if (!endpoint || !callback) return;
  fetch(endpoint)
    .then(response => response.json())
    .then(data => callback(data));
}

function getWisdom() {
  if (!event.target.matches('button')) return;
  makeRequest('http://ron-swanson-quotes.herokuapp.com/v2/quotes', post => {
    displayElem.innerHTML = `<blockquote>${post}</bockquote>`;
  });
  event.target.innerText = 'More Ron';
}

document.addEventListener('click', getWisdom);
