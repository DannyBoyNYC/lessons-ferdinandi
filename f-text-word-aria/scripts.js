const text = document.querySelector('#text-input')
let count = document.querySelector('#count')

const handleEvent = () => {
  // Get the word count
  let words = text.value.split(/[\s]+/g).filter(function (word) {
    return word.length
  })
  count.textContent = `You've written ${words.length} words and ${text.value.length} characters.`
}

document.addEventListener('input', handleEvent)
