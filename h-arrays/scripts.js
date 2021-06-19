// Get the blockquote and button elements
let quote = document.querySelector('#quote')
let btn = document.querySelector('#get-quote')

let ronsWisdom = []
let numberOfQuotes = 0
let maxNumberOfQuotes = 50

function checkForDupesAndDisplay(data) {
  console.log(ronsWisdom.length)
  numberOfQuotes++
  if (ronsWisdom.includes(data[0]) && numberOfQuotes <= maxNumberOfQuotes) {
    console.log(' dupe detected ', data[0])
    getQuote()
  } else {
    ronsWisdom.push(data[0])
    if (ronsWisdom.length > maxNumberOfQuotes) {
      ronsWisdom.shift()
    }
    return (quote.textContent = ronsWisdom[ronsWisdom.length - 1])
  }
}

// Get a fresh quote and render it into the DOM
function getQuote() {
  fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(function (response) {
      if (response.ok) {
        return response.json()
      }
      throw response.status
    })
    .then(checkForDupesAndDisplay)
    .catch(function (error) {
      quote.textContent =
        '[Something went wrong, sorry!] I have a joke for you... The government in this town is excellent, and uses your tax dollars efficiently.'
    })
}

// Get a quote on page load
getQuote()

// Get a quote when the #get-quote button is clicked
btn.addEventListener('click', getQuote)
