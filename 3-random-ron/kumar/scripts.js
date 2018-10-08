var makeRequest = function(url, method, success, failure, always) {

    // Make sure a URL and method were provided
    if (!url || !method) return;
  
    // Set up our HTTP request
    var xhr = new XMLHttpRequest();
  
    // Setup our listener to process request state changes
    xhr.onreadystatechange = function() {
  
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
  
  var sanitizeHTML = function (str) {
      var temp = document.createElement('div');
      temp.textContent = str;
      return temp.innerHTML;
  };
  
  var quoteHistory   = [],
      containerQuote = document.querySelector('#randQuote'),
      btnNext        = document.querySelector('#btnNext'),
      delayInSeconds = 30,
      quoteTimer;
  
  btnNext.addEventListener('click', getNewQuote, false);
  
  function countDown( count ){
    if (count == 0) {
      getNewQuote();
    } else {
      btnNext.innerHTML = "Next in " + count + (count == 1? " second." : " seconds.");
      quoteTimer = setTimeout(function(){ countDown( count - 1 ); }, 1000);
    }
  }
  
  function clearTimer() {
    if (quoteTimer) clearTimeout(quoteTimer);
    btnNext.innerHTML = "Fetching ...";
  }
  
  function getNewQuote() {
    clearTimer();
    makeRequest('//ron-swanson-quotes.herokuapp.com/v2/quotes', 'GET',
      function( rQuote ){
      
        if (quoteHistory.length > 100) rQuotes = []; //reset Quotes
      
        if (quoteHistory.indexOf( rQuote[0] ) < 0) { //check for duplicate
          quoteHistory.push( rQuote[0] );
          containerQuote.innerHTML = sanitizeHTML( rQuote[0] );
          countDown( delayInSeconds );
        } else {
          getNewQuote();
        }
        
      },
      function(){
        getNewQuote();
      }
    );
  
  }
  
  getNewQuote();