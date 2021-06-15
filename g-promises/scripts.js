const API = `https://ron-swanson-quotes.herokuapp.com/v2/quotes`
const btn = document.querySelector('#get-quote')
const blockQuote = document.querySelector('blockquote')
const collectedWisdom = document.querySelector('#collected-wisdom')

let ronsWisdom = []

function convertToJSON(response) {
  return response.ok
    ? response.json()
    : Promise.reject(new Error(response.status))
}

function renderQuote(data) {
  ronsWisdom.push(data[0])
  blockQuote.innerText = ronsWisdom[ronsWisdom.length - 1]
  collectedWisdom.innerHTML = ronsWisdom
    .map((wise) => `<p>${wise}</p>`)
    .join('')
}

function errorHandler(error) {
  blockQuote.innerHTML = `Sorry, something went wrong.`
  console.error(error)
}

function getQuote() {
  fetch(API)
    .then(convertToJSON)
    // .then(function (response) {
    //   if (response.ok) {
    //     return response.json()
    //   }
    //   return response.json().then(function (json) {
    //     throw json
    //   })
    // })
    .then(renderQuote)
    // .then(function (data) {
    //   ronsWisdom.push(data[0])
    //   blockQuote.innerText = ronsWisdom[ronsWisdom.length - 1]
    //   collectedWisdom.innerHTML = ronsWisdom
    //     .map((wise) => `<p>${wise}</p>`)
    //     .join('')
    // })
    .catch(errorHandler)
  // .catch(function (error) {
  //   console.warn(error)
  // })
}

btn.addEventListener('click', getQuote)
window.addEventListener('load', getQuote)
