const API = 'https://jsonplaceholder.typicode.com/posts/'

function traditionalFn() {
  fetch(API)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log('Traditional Fetch', data)
    })
  console.log('Traditional Message')
}
traditionalFn()

async function asyncFn() {
  await fetch(API)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log('Async Fetch', data)
    })
  console.log('Async Message')
}
asyncFn()

// This returns a promise
async function getTheAnswer() {
  return 42
}
let answer = getTheAnswer()
console.log(answer)
// logs 42 into the console
answer.then(function (data) {
  console.log(data)
})
