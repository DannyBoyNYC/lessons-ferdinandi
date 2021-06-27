const authorAPI = 'https://vanillajsacademy.com/api/dragons-authors.json'
const storiesAPI = 'https://vanillajsacademy.com/api/dragons.json'
const app = document.querySelector('#app')

function renderFail() {
  app.innerHTML =
    '<p>The dragons burned all the copies. Unable to get new articles at this time. Sorry!</p>'
}

async function getArticles() {
  Promise.all([fetch(storiesAPI), fetch(authorAPI)])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((data) => createTOC(data[0].articles, data[1].authors))
    .catch((error) => {
      console.warn(error)
      renderFail()
    })
}

function createTOC(articles, authors) {
  const titles = articles
    .map((article) => `<li><a href="${article.url}">${article.title}</a></li>`)
    .join(' ')
  app.innerHTML = `<ul>${titles}</ul>`
  createArticleCards(articles, authors)
}

function createArticleCards(articles, authors) {
  const cards = articles
    .map(
      (article) =>
        `<article id=${article.url.substring(1)}>
          <h2>${article.title}</h2>

          <h3>by ${article.author}</h3>
          <date>${article.pubdate}</date>
          <p>${article.article}</p>
          <p>${getAuthorBio(article.author, authors)}</p>
        </article>`
    )
    .join(' ')
  app.innerHTML += `<main>${cards}</main>`
}

function getAuthorBio(currAuthor, authors) {
  const currAuthor = authors.find((author) => currAuthor === author.author)
  return currAuthor.bio
}

getArticles()
