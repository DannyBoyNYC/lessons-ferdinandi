/**
 * Get an article by its ID
 * @param  {Integer} id The article ID
 */
function getArticleByID(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(function (response) {
      // If the response is successful, get the JSON data
      if (response.ok) {
        return response.json()
      }
      // Otherwise, throw an error
      throw 'Something went wrong.'
    })
    .then(function (data) {
      console.log(data)
    })
    .catch(function (error) {
      console.warn(error)
    })
}
// Get the article with an ID of 3
// getArticleByID(3)

/**
 * structured async
 * @param {integer} id
 */
async function getArticleByIDAsync(id) {
  // Get the post data
  let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  // If the call failed, throw an error
  if (!response.ok) {
    throw 'Something went wrong.'
  }
  // Otherwise, get the post JSON
  let data = await response.json()
  // Log the data to the console
  console.log(data)
}
// getArticleByIDAsync(4)

// Get the article with an ID of 999999
// log a warning in the console if something goes wrong
getArticleByIDAsync(999999).catch(function (error) {
  console.warn(error)
})

async function getArticleByIDTry(id) {
  try {
    // Get the post data
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    )

    // If the call failed, throw an error
    if (!response.ok) {
      throw 'Something went wrong.'
    }

    // Otherwise, get the post JSON
    let data = await response.json()

    // Log the data to the console
    console.log(data)
  } catch (error) {
    console.warn(error)
  }
}

// Get the article with an ID of 999999
// if there's an error, a warning is logged to the console by the catch() block in the function
getArticleByIDTry(999999)
