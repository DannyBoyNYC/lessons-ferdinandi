const authorsAPI = 'https://vanillajsacademy.com/api/dragons-authors.json';
const storiesAPI = 'https://vanillajsacademy.com/api/dragons.json';
const app = document.querySelector('#app');

function renderFail() {
  app.innerHTML = '<p>Unable to get new articles at this time. Sorry!</p>';
}

/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
function sanitizeHTML(str) {
  return str.replace(/javascript:/gi, '').replace(/[^\w-_. ]/gi, (c) => `&#${c.charCodeAt(0)};`);
}

function renderArticles(articles) {
  const titles = articles
    .map((article) => `<li><a href="${sanitizeHTML(article.url)}">${sanitizeHTML(article.title)}</a></li>`)
    .join(' ');

  const cards = articles
    .map(
      (article) => `<article id=${sanitizeHTML(article.url.substring(1))}>
          <h2>${sanitizeHTML(article.title)}</h2>
          <h3>by ${sanitizeHTML(article.author)}</h3>
          <date>${sanitizeHTML(article.pubdate)}</date>
          <p>${sanitizeHTML(article.article)}</p>
          <p>${sanitizeHTML(article.bio)}</p>
        </article>`,
    )
    .join(' ');

  app.innerHTML = `<ul>${titles}</ul><main>${cards}</main>`;
}

const getArticles = async () => {
  try {
    const responses = await Promise.all([
      fetch(storiesAPI),
      fetch(authorsAPI),
    ]);

    responses.forEach((response) => {
      if (!response.ok) {
        throw new Error(`Response failed: 
        ${response.status}`);
      }
    });

    const data = await Promise.all(
      responses.map(
        (response) => response.json(),
      ),
    );

    const { articles } = data[0];
    const { authors } = data[1];

    const hydratedArticles = articles.map((article) => {
      const articleAuthor = authors.find((author) => author.author === article.author);
      return { ...article, bio: articleAuthor.bio };
    });
    renderArticles(hydratedArticles);
  } catch (error) {
    renderFail();
    throw new Error(error);
  }
};

getArticles();
