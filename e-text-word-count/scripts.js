const textInput = document.querySelector('#text-input')
const characterCount = document.querySelector('#character-count')
const numberCount = document.querySelector('#number-count')
const wordCount = document.querySelector('#word-count')

const regex = /[0-9]/g

function showCharacterCount(event) {
  if (!event.target.matches('#text-input')) return
  characterCount.innerText = textInput.value.length

  let numberOfNumbers = textInput.value.match(regex)
  numberCount.innerText = numberOfNumbers === null ? 0 : numberOfNumbers.length
  showWordCount()
}

function showWordCount() {
  let numWords = textInput.value
    .split(/[\n\r\s]+/g)
    .filter((word) => word.length > 0)
  wordCount.innerText = numWords.length
}

document.addEventListener('input', showCharacterCount)
