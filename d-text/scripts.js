const textInput = document.querySelector('#text-input')
const characterCount = document.querySelector('#character-count')
const numberCount = document.querySelector('#number-count')

const regex = /[0-9]/g

function showCharacterCount(event) {
  if (!event.target.matches('#text-input')) return
  characterCount.innerText = textInput.value.length

  let numberOfNumbers = textInput.value.match(regex)
  console.log(' numberOfNumbers ', numberOfNumbers)
  numberCount.innerText = numberOfNumbers === null ? 0 : numberOfNumbers.length
}

document.addEventListener('input', showCharacterCount)
