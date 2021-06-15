//Select elements from DOM
let text = document.querySelector('#text-input')
let counters = document.querySelectorAll('[data-count]')

// counters
let countHandlers = {
  words: function (textInput) {
    return textInput.value
      .replaceAll('\n', ' ')
      .split(' ')
      .filter(function (item) {
        return !!item.trim()
      }).length
  },
  char: function (textInput) {
    return textInput.value.length
  },
}

function handleEvent(event) {
  for (let counter of counters) {
    let countHandler = counter.getAttribute('data-count')
    console.log(' countHandler ', countHandler) // string: words characters
    if (!countHandler || !countHandlers[countHandler]) return
    // what is countHandlers[countHandler] ? object access using square brackets
    // console.log(
    //   ' countHandlers[countHandler] ',
    //   typeof countHandlers[countHandler] // function:
    // )
    counter.innerText = countHandlers[countHandler](event.target)
  }
}

// Event listener
text.addEventListener('input', handleEvent)
