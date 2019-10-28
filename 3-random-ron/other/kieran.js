(function(d) {
  //
  // Variables
  //

  var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes',
    app = d.querySelector('#app'),
    announcedContent = d.querySelector('.screen-reader'),
    button = d.querySelector('button');

  //
  // Functions
  //

  function getJSON(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }

  function insertQuote(data) {
    app.innerHTML =
      "<blockquote class='athelas ml0 mt0 pl4 black-90 bl bw2 b--blue'>" +
      "<p class='f5 f4-m f3-l lh-copy measure mt0'>" +
      data +
      '</p>' +
      '</blockquote>';
    announcedContent.textContent = app.textContent;
  }

  function insertError(error) {
    app.innerHTML =
      "<p class='lh-copy measure'>" +
      'Oh no! There was a problem getting the Ron Swanson quote! 😞' +
      '</p>';
    announcedContent.textContent = app.textContent;
  }

  function fetchQuote() {
    fetch(url)
      .then(getJSON)
      .then(insertQuote)
      .catch(insertError);
  }

  //
  // Init
  //

  fetchQuote();

  button.addEventListener('click', fetchQuote, false);
})(document);
