API = 'https://vanillajsacademy.com/api/dragons.json'
const app = document.querySelector('#app')

async function getArticles() {
  try {
    const response = await fetch(API)
    if (!response.ok) {
      throw 'Something went wrong.'
    }
    let data = await response.json()
    createTOC(data.articles)
  } catch (error) {
    console.error(error)
  }
}

function createTOC(articles) {
  const titles = articles
    .map((article) => `<li><a href="${article.url}">${article.title}</a></li>`)
    .join(' ')
  app.innerHTML = `<ul>${titles}</ul>`
  createArticleCards(articles)
}

function createArticleCards(articles) {
  const cards = articles
    .map(
      (article) =>
        `<article id=${article.url.substring(1)}>
          <h2>${article.title}</h2>
          <h3>${article.author}</h3>
          <date>${article.pubdate}</date>
          <p>${article.article}</p>
          <a href="#">back</a>
        </article>`
    )
    .join(' ')
  app.innerHTML += cards
}
getArticles()
