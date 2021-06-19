const API = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes'
let quote = document.querySelector('#quote')
let btn = document.querySelector('#get-quote')
// Hold previous used quotes
let quotes = []

// Get a fresh quote and render it into the DOM
async function getQuote() {
  try {
    let response = await fetch(API)

    if (!response.ok) {
      throw response.status
    }

    let data = await response.json()

    // If there are at least 50 previously used quotes, remove the first one
    if (quotes.length > 49) {
      quotes.shift()
    }
    // If this quote was already used, recursively fetch a new one
    // Then, end the current callback function
    if (quotes.includes(data[0])) {
      getQuote()
      return
    }
    // Otherwise, update the UI and
    quote.textContent = data[0]
    // add the quote to the list
    quotes.push(data[0])
  } catch (error) {
    console.warn(error)
    quote.textContent =
      '[Something went wrong, sorry!] I have a joke for you... The government in this town is excellent, and uses your tax dollars efficiently.'
  }
}

// Get a quote on page load
getQuote()

// Get a quote when the #get-quote button is clicked
btn.addEventListener('click', getQuote)
