// nytDocumentation = 'https://developer.nytimes.com/top_stories_v2.json';

var elem = document.querySelector('#app');
var nytapi = 'uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0';
var categories = ['food', 'fashion', 'travel'];
var limit = 3;
var storyArray = [];

var processFeed = function(stories) {
  stories.forEach(function(story) {
    var storyEl = document.createElement('div');
    storyEl.className = 'feed-item';
    storyEl.innerHTML = `
    <div class="entry">
      <h4>${story.section}</h4>
      <div>
      <img src="${story.multimedia[0].url}" /> 
      <h3><a target="_blank" href="${story.short_url}">${story.title}</a></h3>
      </div>
      <p>${story.abstract}</p>
    </div>
    `;
    storyArray.push(storyEl); // build an array - NOT BEING USED

    elem.prepend(storyEl);
  });
  console.log(storyArray); // just curious!
};

var requestStories = function(url, method) {
  var request = new XMLHttpRequest();
  return new Promise(function(resolve, reject) {
    request.onreadystatechange = function() {
      if (request.readyState !== 4) return;
      if (request.status >= 200 && request.status < 300) {
        resolve(request); // successful
      } else {
        reject({
          status: request.status,
          statusText: request.statusText,
        });
      }
    };
    request.open(method || 'GET', url, true);
    request.send();
  });
};

categories.forEach(function(category) {
  requestStories(
    'https://api.nytimes.com/svc/topstories/v2/' +
      category +
      '.json?api-key=' +
      nytapi,
  )
    .then(function(posts) {
      var data = JSON.parse(posts.responseText);
      var stories = data.results.slice(0, limit);
      processFeed(stories);
    })
    .catch(function(error) {
      console.log(error);
    });
});
