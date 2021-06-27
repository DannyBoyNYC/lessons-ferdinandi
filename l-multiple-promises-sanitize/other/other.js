// https://codepen.io/karlyanelson/pen/PopMjqd?editors=1011
const app = document.querySelector('#app')
const articlesEndpoint = 'https://vanillajsacademy.com/api/dragons.json'
const authorsEndpoint = 'https://vanillajsacademy.com/api/dragons-authors.json'

const showError = (error) => {
  app.textContent =
    'Something went wrong getting your articles. Please refresh the page and try again.'
}

const articleLayout = ({ title, author, article, pubdate, url, bio }) => {
  return `
    <article>
      <header>
        <h2><a href="${url}">${title}</a></h2>
        <div class="byline">By <address>${author}</address> on <time pubdate>${pubdate}</time></div>
      </header>
      <p>${article}</p>
      ${bio && `<p class="bio">${bio}</p>`}
    </article>`
}

const showArticles = (articles) => {
  app.innerHTML = articles.map(articleLayout).join('')
}

const fetchDragons = async () => {
  try {
    let responses = await Promise.all([
      fetch(articlesEndpoint),
      fetch(authorsEndpoint),
    ])

    responses.forEach((response) => {
      // console.log(' hers made it  ', response)
      if (!response.ok) {
        throw new Error('Response failed. Status: ' + response.status)
      }
    })

    let data = await Promise.all(
      responses.map(function (response) {
        return response.json()
      })
    )

    if (!data) {
      throw new Error('No data')
    }

    const combinedData = { ...data[0], ...data[1] }

    if (!combinedData.articles || !combinedData.articles.length) {
      showError()
      throw new Error(
        `No articles. (articles.length: ${combinedData.articles?.length})`
      )
      return
    }

    if (!combinedData.authors || !combinedData.authors.length) {
      console.warn(
        new Error(
          `No authors. (authors.length: ${combinedData.authors?.length})`
        )
      )
    }

    console.log('before:::combinedData', combinedData)

    let articles = combinedData.articles.map((article) => {
      // if (combinedData.authors?.length) {
        let articleAuthor = combinedData.authors.find((author) => {
          return author.author === article.author
        })

        return { ...article, bio: articleAuthor.bio }
      } 
      // else {
      //   console.log(' does this ever run? ' )
      //   return article
      // }
    // }
    )

    console.log('after:::articles', articles)

    showArticles(articles)
  } catch (error) {
    showError()
    throw new Error(error)
  }
}

fetchDragons()
