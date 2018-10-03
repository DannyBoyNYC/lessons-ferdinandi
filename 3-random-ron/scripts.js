// // http://ron-swanson-quotes.herokuapp.com/v2/quotes

// // Set up our HTTP request
// var xhr = new XMLHttpRequest();

// // Setup our listener to process request state changes
// xhr.onreadystatechange = function () {

//     // Only run if the request is complete
//     if (xhr.readyState !== 4) return;

//     // Process our return data
//     if (xhr.status >= 200 && xhr.status < 300) {
//         // This will run when the request is successful
//         console.log('success!', xhr);
//     } else {
//         // This will run when it's not
//         console.log('The request failed!');
//     }

//     // This will run either way
//     // All three of these are optional, depending on what you're trying to do
//     console.log('This always runs...');

// };

// xhr.open('GET', 'https://jsonplaceholder.typicode.com	/posts?userId=1');
// xhr.send();

var makeRequest = function (url, method, success, failure, always) {
  
  // Make sure a URL and method were provided
  if (!url || !method) return;
  
  // Set up our HTTP request
  var xhr = new XMLHttpRequest();
  
  // Setup our listener to process request state changes
  xhr.onreadystatechange = function () {
    
    // Only run if the request is complete
    if (xhr.readyState !== 4) return;
    
    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
      // Run the success callback
      if (success && typeof success === 'function') {
        success(JSON.parse(xhr.responseText), xhr);
      }
    } else {
      // Run the failure callback
      if (failure && typeof failure === 'function') {
        failure(xhr);
      }
    }
    
    if (always && typeof always === 'function') {
      always(JSON.parse(xhr.responseText), xhr);
    }
    
  };
  
  // Create and send a request
  // Defaults to GET
  xhr.open(method, url);
  xhr.send();
  
};

var displayElem = document.querySelector('blockquote');
displayElem.innerText = "Click the button below for a quote."

var buttonElem = document.querySelector('button');
buttonElem.addEventListener('click', swanSong)

function swanSong() {
  makeRequest('http://ron-swanson-quotes.herokuapp.com/v2/quotes', 'GET', function (posts) {
  posts.forEach(function (post) {
    console.log(post)
    
    displayElem.innerText = post;
  })
})
}


